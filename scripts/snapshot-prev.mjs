#!/usr/bin/env node
/**
 * 把某个历史提交（通常是当前 gh-pages 的父提交）的根目录文件，
 * 快照为 versions/<semver>/，合并进当前 gh-pages tree（不改动线上根目录）。
 *
 * 用途：首次启用版本快照机制时，补快照“上一个线上版本”（其文件仅存在于父提交 tree 中）。
 *
 * 用法：
 *   node scripts/snapshot-prev.mjs --from <commitSha> --as V1.0
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
  'User-Agent': 'smart-calendar-snapshot'
};

async function api(method, urlPath, body, tries = 5) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch('https://api.github.com' + urlPath, { method, headers: H, body: body ? JSON.stringify(body) : undefined });
      const text = await res.text();
      let data = null;
      try { data = text ? JSON.parse(text) : null; } catch { data = text; }
      if (!res.ok && (res.status >= 500 || res.status === 400 || res.status === 401) && i < tries - 1) {
        await new Promise((r) => setTimeout(r, 2500 * (i + 1)));
        continue;
      }
      return { ok: res.ok, status: res.status, data };
    } catch (e) {
      if (i < tries - 1) await new Promise((r) => setTimeout(r, 2500 * (i + 1)));
      else throw e;
    }
  }
}

function norm(v) { return v.replace(/^V/i, '').toLowerCase(); }

async function main() {
  const args = process.argv.slice(2);
  let from = null, as = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--from') from = args[++i];
    else if (args[i] === '--as') as = args[++i];
  }
  if (!from || !as) throw new Error('用法：node scripts/snapshot-prev.mjs --from <commitSha> --as V1.0');
  const target = norm(as);

  const head = await api('GET', `/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`);
  if (!head.ok) throw new Error('读取 HEAD 失败：' + head.status);
  const parentSha = head.data?.object?.sha;
  const cur = await api('GET', `/repos/${OWNER}/${REPO}/git/trees/${BRANCH}?recursive=1`);
  if (!cur.ok) throw new Error('读取当前 tree 失败：' + cur.status);
  const curTree = cur.data?.tree || [];

  const src = await api('GET', `/repos/${OWNER}/${REPO}/git/commits/${from}`);
  if (!src.ok) throw new Error('读取源提交失败：' + src.status);
  const srcTree = await api('GET', `/repos/${OWNER}/${REPO}/git/trees/${src.data.tree.sha}?recursive=1`);
  if (!srcTree.ok) throw new Error('读取源 tree 失败：' + srcTree.status);
  // 快照源提交的全部文件（含 assets/、icons/ 等子目录）；源提交本身不含 versions/，无需排除
  const srcRoot = (srcTree.data?.tree || []).filter((e) => e.type === 'blob');

  const byPath = new Map();
  for (const e of curTree) byPath.set(e.path, e); // 保留当前根目录 + 已有 versions/*
  for (const e of srcRoot) byPath.set(`versions/${target}/${e.path}`, { path: `versions/${target}/${e.path}`, mode: e.mode, type: e.type, sha: e.sha });

  const tree = [...byPath.values()];
  const t = await api('POST', `/repos/${OWNER}/${REPO}/git/trees`, { tree });
  if (!t.ok) throw new Error('tree 失败：' + t.status);
  const c = await api('POST', `/repos/${OWNER}/${REPO}/git/commits`, {
    message: `snapshot ${target} from ${from.slice(0, 7)}`,
    tree: t.data.sha,
    parents: parentSha ? [parentSha] : []
  });
  if (!c.ok) throw new Error('commit 失败：' + c.status);
  const up = await api('PATCH', `/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, { sha: c.data.sha, force: true });
  if (!up.ok) throw new Error('更新 ref 失败：' + up.status);
  console.log(`✓ 已将 ${from.slice(0, 7)} 的根目录快照为 versions/${target}/（commit ${c.data.sha.slice(0, 7)}）`);
}

main().catch((e) => { console.error('✗ 失败：', e.message); process.exit(1); });
