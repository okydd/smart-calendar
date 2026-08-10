#!/usr/bin/env node
/**
 * 通过 GitHub Git Data API 把 dist/ 整目录发布到 gh-pages 分支（git push 的备选通道）。
 *
 * 背景：本机 git 走 Windows schannel，在沙箱/网络受扰时常报
 *      "RPC failed; HTTP 408" 或 "schannel: failed to receive handshake"，
 *      导致 `git push origin gh-pages --force` 无法完成。
 *      Node 自带的 fetch 走独立 TLS 栈，通常仍然可用。
 *
 * v2（支持版本回退）：
 *   - 普通提交（以当前 gh-pages HEAD 为父节点），历史线性累积，旧版本始终可达；
 *   - 把本次构建完整快照写入 `versions/<semver>/`，永久保留；
 *   - 发布前先把「当前线上版本」的整份文件快照到 `versions/<线上semver>/`，
 *     这样即使从未单独打过包，也能回退到上一个线上版本；
 *   - 保留历史 `versions/*` 快照不被清掉。
 *   回退（scripts/rollback.mjs 或 APP 内一键）即把某个 `versions/<semver>/` 还原到根目录。
 *
 * 用法：
 *   node scripts/deploy-ghpages.mjs [-m "提交说明"] [--dir dist]
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SECRETS = path.join(ROOT, '.secrets.json');

if (!fs.existsSync(SECRETS)) {
  console.error('✗ 未找到 .secrets.json');
  process.exit(1);
}
const s = JSON.parse(fs.readFileSync(SECRETS, 'utf8'));
const TOKEN = String(s.githubToken || '').trim();
const OWNER = String(s.githubOwner || 'okydd').trim();
const REPO = String(s.githubRepo || 'smart-calendar').trim();
const BRANCH = 'gh-pages';

if (!TOKEN || TOKEN.includes('PASTE_HERE')) {
  console.error('✗ .secrets.json 中的 githubToken 未填写');
  process.exit(1);
}

const args = process.argv.slice(2);
let message = '';
let distDir = 'dist';
for (let i = 0; i < args.length; i++) {
  if (args[i] === '-m' || args[i] === '--message') message = args[++i] || '';
  else if (args[i] === '--dir') distDir = args[++i] || 'dist';
}
const DIST = path.join(ROOT, distDir);
if (!fs.existsSync(DIST)) {
  console.error(`✗ 目录不存在：${DIST}`);
  process.exit(1);
}

const H = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'Content-Type': 'application/json',
  'User-Agent': 'smart-calendar-deploy'
};

/** 带重试的 API 调用，抵抗偶发 TLS / 5xx 抖动 */
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

/** 递归收集目录下所有文件的相对路径（posix 分隔符） */
function walk(dir, base = '') {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const abs = path.join(dir, name);
    const rel = base ? `${base}/${name}` : name;
    if (fs.statSync(abs).isDirectory()) out.push(...walk(abs, rel));
    else out.push(rel);
  }
  return out;
}

/** 取语义版本号（来自 version-meta.json） */
function semverOf() {
  try {
    const m = JSON.parse(fs.readFileSync(path.join(ROOT, 'version-meta.json'), 'utf8'));
    if (m && typeof m.semver === 'string') return m.semver.replace(/^V/i, '').toLowerCase();
  } catch {
    /* ignore */
  }
  return 'v1.0';
}

async function main() {
  const newSemver = semverOf();
  const files = walk(DIST);
  console.log(`仓库 ${OWNER}/${REPO} · 分支 ${BRANCH} · 文件 ${files.length} 个 · 版本 ${newSemver}`);

  // 1) 上传 dist 全部 blob，得到「根目录」tree 条目
  const rootEntries = [];
  for (const rel of files) {
    const buf = fs.readFileSync(path.join(DIST, rel));
    const r = await api('POST', `/repos/${OWNER}/${REPO}/git/blobs`, {
      content: buf.toString('base64'),
      encoding: 'base64'
    });
    if (!r.ok) throw new Error(`blob ${rel} 失败 HTTP ${r.status}: ${JSON.stringify(r.data).slice(0, 200)}`);
    rootEntries.push({ path: rel, mode: '100644', type: 'blob', sha: r.data.sha });
    console.log(`  ↑ ${rel} (${(buf.length / 1024).toFixed(1)} KB)`);
  }

  // 2) 读取当前 gh-pages 完整 tree（用于保留历史版本快照 + 快照当前线上版本）
  let currentTree = [];
  let parentSha = undefined;
  let liveSemver = null;
  try {
    const head = await api('GET', `/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`);
    if (head.ok) {
      parentSha = head.data?.object?.sha;
      const tr = await api('GET', `/repos/${OWNER}/${REPO}/git/trees/${BRANCH}?recursive=1`);
      if (tr.ok) currentTree = tr.data?.tree || [];
      // 取线上版本号（version.json 的 semver 字段）
      const vj = currentTree.find((e) => e.path === 'version.json' && e.type === 'blob');
      if (vj) {
        const br = await api('GET', `/repos/${OWNER}/${REPO}/git/blobs/${vj.sha}`);
        if (br.ok && br.data?.content) {
          try {
            const txt = Buffer.from(br.data.content, br.data.encoding || 'base64').toString('utf8');
            const j = JSON.parse(txt);
            if (j && typeof j.semver === 'string') liveSemver = j.semver.replace(/^V/i, '').toLowerCase();
          } catch {
            /* ignore */
          }
        }
      }
    }
  } catch {
    /* 首次发布或读不到则忽略 */
  }

  // 3) 组装新 tree
  const byPath = new Map();
  const put = (e) => byPath.set(e.path, e);

  // 3a) 本次构建作为根目录
  for (const e of rootEntries) put(e);

  // 3b) 本次构建快照到 versions/<newSemver>/
  for (const e of rootEntries) put({ path: `versions/${newSemver}/${e.path}`, mode: e.mode, type: e.type, sha: e.sha });

  // 3c) 保留历史 versions/* 快照
  for (const e of currentTree) {
    if (e.path.startsWith('versions/') && e.type === 'blob' && !byPath.has(e.path)) put(e);
  }

  // 3d) 快照「当前线上版本」到 versions/<liveSemver>/（仅当与本次不同，避免重复）
  //     注意：快照整棵当前 tree（含 assets/、icons/ 等子目录），但排除 versions/ 自身，避免嵌套。
  if (liveSemver && liveSemver !== newSemver) {
    for (const e of currentTree) {
      if (e.type === 'blob' && !e.path.startsWith('versions/')) {
        const p = `versions/${liveSemver}/${e.path}`;
        if (!byPath.has(p)) put({ path: p, mode: e.mode, type: e.type, sha: e.sha });
      }
    }
    console.log(`  ◉ 已快照线上版本 ${liveSemver} 供回退`);
  }

  const tree = [...byPath.values()];

  // 4) 建 tree
  const t = await api('POST', `/repos/${OWNER}/${REPO}/git/trees`, { tree });
  if (!t.ok) throw new Error(`tree 失败 HTTP ${t.status}: ${JSON.stringify(t.data).slice(0, 200)}`);

  // 5) 建提交（以当前 HEAD 为父，历史线性累积）
  const c = await api('POST', `/repos/${OWNER}/${REPO}/git/commits`, {
    message: message || `deploy ${newSemver}${liveSemver && liveSemver !== newSemver ? ` (prev ${liveSemver})` : ''}`,
    tree: t.data.sha,
    parents: parentSha ? [parentSha] : []
  });
  if (!c.ok) throw new Error(`commit 失败 HTTP ${c.status}: ${JSON.stringify(c.data).slice(0, 200)}`);

  // 6) 强制更新分支引用
  let r = await api('PATCH', `/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
    sha: c.data.sha,
    force: true
  });
  if (!r.ok && r.status === 422) {
    r = await api('POST', `/repos/${OWNER}/${REPO}/git/refs`, {
      ref: `refs/heads/${BRANCH}`,
      sha: c.data.sha
    });
  }
  if (!r.ok) throw new Error(`更新 ref 失败 HTTP ${r.status}: ${JSON.stringify(r.data).slice(0, 200)}`);

  console.log(`\n✓ 已发布到 ${BRANCH}，commit ${c.data.sha.slice(0, 7)}（版本 ${newSemver}）`);
}

main().catch((e) => {
  console.error('✗ 失败：', e.message);
  process.exit(1);
});
