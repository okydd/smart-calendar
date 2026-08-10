#!/usr/bin/env node
/**
 * 快速回退到某个已发布版本（开发者侧）。
 *
 * 每个版本构建时已被 deploy-ghpages.mjs v2 永久快照在 gh-pages 的
 * `versions/<semver>/` 目录下。本脚本把该快照还原到站点的根目录，
 * 同时保留全部历史快照，供后续再次回退。
 *
 * 用法：
 *   node scripts/rollback.mjs --version V1.0        # 回退到指定版本
 *   node scripts/rollback.mjs                       # 不指定则回退到「当前版本的上一版」
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SECRETS = path.join(ROOT, '.secrets.json');
const s = JSON.parse(fs.readFileSync(SECRETS, 'utf8'));
const TOKEN = String(s.githubToken || '').trim();
const OWNER = String(s.githubOwner || 'okydd').trim();
const REPO = String(s.githubRepo || 'smart-calendar').trim();
const BRANCH = 'gh-pages';

const H = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'Content-Type': 'application/json',
  'User-Agent': 'smart-calendar-rollback'
};

async function api(method, urlPath, body, tries = 5) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch('https://api.github.com' + urlPath, {
        method,
        headers: H,
        body: body ? JSON.stringify(body) : undefined
      });
      const text = await res.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = text;
      }
      if (!res.ok && (res.status >= 500 || res.status === 400 || res.status === 401) && i < tries - 1) {
        await new Promise((r) => setTimeout(r, 2500 * (i + 1)));
        continue;
      }
      return { ok: res.ok, status: res.status, data };
    } catch (e) {
      lastErr = e;
      if (i < tries - 1) await new Promise((r) => setTimeout(r, 2500 * (i + 1)));
    }
  }
  throw lastErr;
}

function norm(v) {
  return v.replace(/^V/i, '').toLowerCase();
}

async function main() {
  const args = process.argv.slice(2);
  let target = null;
  let dryRun = false;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--version') target = args[++i];
    else if (args[i] === '--dry-run') dryRun = true;
    else if (!args[i].startsWith('-')) target = args[i];
  }

  // 解析当前线上版本
  const head = await api('GET', `/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`);
  if (!head.ok) throw new Error('读取 gh-pages HEAD 失败：' + head.status);
  const parentSha = head.data?.object?.sha;
  const tr = await api('GET', `/repos/${OWNER}/${REPO}/git/trees/${BRANCH}?recursive=1`);
  if (!tr.ok) throw new Error('读取 gh-pages tree 失败：' + tr.status);
  const tree = tr.data?.tree || [];

  let liveSemver = null;
  const vj = tree.find((e) => e.path === 'version.json' && e.type === 'blob');
  if (vj) {
    const br = await api('GET', `/repos/${OWNER}/${REPO}/git/blobs/${vj.sha}`);
    if (br.ok && br.data?.content) {
      try {
        const j = JSON.parse(Buffer.from(br.data.content, br.data.encoding || 'base64').toString('utf8'));
        if (j?.semver) liveSemver = norm(j.semver);
      } catch {
        /* ignore */
      }
    }
  }
  console.log('当前线上版本：', liveSemver || '(未知)');

  // 未指定版本 → 取 meta.log 中当前版本的上一个
  if (!target) {
    let meta = { log: [] };
    try {
      meta = JSON.parse(fs.readFileSync(path.join(ROOT, 'version-meta.json'), 'utf8'));
    } catch {
      /* ignore */
    }
    const log = (meta.log || []).filter((x) => x.rollback);
    const idx = log.findIndex((x) => norm(x.version) === liveSemver);
    if (idx < 0 || idx + 1 >= log.length) {
      throw new Error('无法确定「上一版本」：请在 version-meta.json 的 rollback 列表中确认，或显式传 --version');
    }
    target = norm(log[idx + 1].version);
    console.log('未指定版本，自动回退到上一版：', target);
  } else {
    target = norm(target);
  }

  const prefix = `versions/${target}/`;
  const snapshot = tree.filter((e) => e.type === 'blob' && e.path.startsWith(prefix)).map((e) => ({
    path: e.path.slice(prefix.length),
    mode: e.mode,
    type: e.type,
    sha: e.sha
  }));
  if (!snapshot.length) throw new Error(`未找到版本 ${target} 的快照（versions/${target}/ 不存在）`);

  // 保留全部历史 versions/* 快照
  const versionsKeep = tree.filter((e) => e.type === 'blob' && e.path.startsWith('versions/') && !e.path.startsWith(prefix));

  const newTree = [...snapshot, ...versionsKeep];
  const t = await api('POST', `/repos/${OWNER}/${REPO}/git/trees`, { tree: newTree });
  if (!t.ok) throw new Error('创建 tree 失败：' + t.status);

  if (dryRun) {
    const idx = snapshot.find((e) => e.path === 'index.html');
    const vj = snapshot.find((e) => e.path === 'version.json');
    console.log(`\n[dry-run] 将把根目录还原为版本 ${target}（共 ${snapshot.length} 个文件）`);
    console.log('  index.html:', idx ? idx.sha.slice(0, 7) : '(缺失)');
    console.log('  version.json:', vj ? vj.sha.slice(0, 7) : '(缺失)');
    console.log('  （未执行提交/更新引用）');
    return;
  }

  const c = await api('POST', `/repos/${OWNER}/${REPO}/git/commits`, {
    message: `rollback to ${target}`,
    tree: t.data.sha,
    parents: parentSha ? [parentSha] : []
  });
  if (!c.ok) throw new Error('创建 commit 失败：' + c.status);

  const up = await api('PATCH', `/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
    sha: c.data.sha,
    force: true
  });
  if (!up.ok) throw new Error('更新 ref 失败：' + up.status);

  console.log(`\n✓ 已回退到版本 ${target}（commit ${c.data.sha.slice(0, 7)}），稍后刷新页面即可生效。`);
}

main().catch((e) => {
  console.error('✗ 失败：', e.message);
  process.exit(1);
});
