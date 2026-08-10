/**
 * 一键回退（客户端）：把某个已发布版本的快照还原到站点根目录。
 *
 * 部署脚本（scripts/deploy-ghpages.mjs v2）会把每个版本的整份产物
 * 永久保留在 gh-pages 的 `versions/<semver>/` 目录下。回退即：
 *   1) 取线上 gh-pages 完整 tree；
 *   2) 用 `versions/<目标版本>/` 下的文件覆盖根目录对应文件；
 *   3) 保留 `versions/` 全部历史快照（不被清掉）；
 *   4) 以当前 HEAD 为父节点提交，强制更新 gh-pages 引用。
 *
 * 鉴权：默认需要 ROLLBACK_PAT（仅 actions:write / contents:write 的细粒度令牌）。
 * 未配置时本函数直接返回失败，由调用方提示改用 scripts/rollback.mjs。
 */

import { ROLLBACK_PAT } from '../constants';

const OWNER = 'okydd';
const REPO = 'smart-calendar';
const BRANCH = 'gh-pages';

export interface RollbackResult {
  ok: boolean;
  msg: string;
}

async function api(method: string, path: string, body?: unknown, token?: string): Promise<{ ok: boolean; status: number; data: any }> {
  const res = await fetch('https://api.github.com' + path, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      'User-Agent': 'smart-calendar-rollback'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  return { ok: res.ok, status: res.status, data };
}

/**
 * 回退到指定语义版本（如 "V1.0"）。返回结果供 UI 提示。
 * 注意：回退成功后需刷新页面（并清 SW 缓存）才能看到旧版本。
 */
export async function triggerRollback(semver: string): Promise<RollbackResult> {
  const token = (ROLLBACK_PAT || '').trim();
  if (!token) {
    return { ok: false, msg: '未配置回退令牌：请联系开发者执行回退，或前往发布页查看历史版本。' };
  }
  const prefix = 'versions/' + semver.toLowerCase() + '/';
  try {
    // 1) 当前 gh-pages 完整 tree
    const t = await api('GET', `/repos/${OWNER}/${REPO}/git/trees/${BRANCH}?recursive=1`, undefined, token);
    if (!t.ok) return { ok: false, msg: `读取线上文件树失败（HTTP ${t.status}）` };
    const entries: { path: string; mode: string; type: string; sha: string }[] = t.data?.tree || [];

    // 2) 目标版本快照 + 需保留的 versions/ 历史
    const snapshot: typeof entries = [];
    const versionsKeep: typeof entries = [];
    for (const e of entries) {
      if (e.path.startsWith(prefix) && e.type === 'blob') {
        snapshot.push({ path: e.path.slice(prefix.length), mode: e.mode, type: e.type, sha: e.sha });
      } else if (e.path.startsWith('versions/') && e.type === 'blob') {
        versionsKeep.push(e);
      }
    }
    if (!snapshot.length) {
      return { ok: false, msg: `未找到版本 ${semver} 的快照，可能该版本未保留回退数据。` };
    }

    // 3) 新 tree = 快照覆盖根目录 + 保留全部 versions/ 历史
    const newTree = [...snapshot, ...versionsKeep];
    const tr = await api('POST', `/repos/${OWNER}/${REPO}/git/trees`, { tree: newTree }, token);
    if (!tr.ok) return { ok: false, msg: `创建文件树失败（HTTP ${tr.status}）` };
    const treeSha = tr.data.sha;

    // 4) 以当前 HEAD 为父节点提交，保留历史
    const head = await api('GET', `/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, undefined, token);
    const parentSha = head.ok ? head.data?.object?.sha : undefined;
    const cm = await api(
      'POST',
      `/repos/${OWNER}/${REPO}/git/commits`,
      {
        message: `rollback to ${semver}`,
        tree: treeSha,
        parents: parentSha ? [parentSha] : []
      },
      token
    );
    if (!cm.ok) return { ok: false, msg: `创建回退提交失败（HTTP ${cm.status}）` };
    const commitSha = cm.data.sha;

    // 5) 强制更新引用
    const up = await api(
      'PATCH',
      `/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`,
      { sha: commitSha, force: true },
      token
    );
    if (!up.ok) return { ok: false, msg: `更新站点引用失败（HTTP ${up.status}）` };

    return { ok: true, msg: `已回退到 ${semver}，稍后刷新页面即可生效。` };
  } catch (e) {
    return { ok: false, msg: '回退失败：' + (e instanceof Error ? e.message : String(e)) };
  }
}
