#!/usr/bin/env node
/**
 * 通过 GitHub Contents API 推送指定文件（git push 的备选通道）。
 *
 * 用途：本机 git 走 Windows schannel，在网络被干扰时常报
 *      "schannel: failed to receive handshake, SSL/TLS connection failed"，
 *      而 Node 的 fetch 走自带 TLS 栈通常仍然可用。
 *      此脚本用 HTTPS API 直接提交文件，绕开 git 传输层。
 *
 * 用法：
 *   node scripts/push-files.mjs <文件路径> [更多文件…] [--message "提交说明"]
 * 示例：
 *   node scripts/push-files.mjs .github/workflows/keepalive.yml
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
const BRANCH = 'main';

if (!TOKEN || TOKEN.includes('PASTE_HERE')) {
  console.error('✗ .secrets.json 中的 githubToken 未填写');
  process.exit(1);
}

const args = process.argv.slice(2);
let message = '';
const files = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--message' || args[i] === '-m') {
    message = args[++i] || '';
  } else {
    files.push(args[i]);
  }
}
if (!files.length) {
  console.error('用法: node scripts/push-files.mjs <文件路径> [更多文件…] [-m "说明"]');
  process.exit(1);
}

const H = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'Content-Type': 'application/json',
  'User-Agent': 'smart-calendar-setup'
};

/** 带重试的 API 调用，抵抗偶发 TLS 抖动 */
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
      return { ok: res.ok, status: res.status, data };
    } catch (e) {
      lastErr = e;
      if (i < tries - 1) await new Promise((r) => setTimeout(r, 2500 * (i + 1)));
    }
  }
  throw lastErr;
}

async function main() {
  console.log(`仓库 ${OWNER}/${REPO} · 分支 ${BRANCH}`);
  let changed = 0;

  for (const rel of files) {
    const norm = rel.replace(/\\/g, '/');
    const abs = path.join(ROOT, norm);
    if (!fs.existsSync(abs)) {
      console.log(`  ✗ ${norm} 本地不存在，跳过`);
      continue;
    }
    const content = fs.readFileSync(abs);
    const b64 = content.toString('base64');

    // 取远端当前版本的 sha（存在则为更新，不存在则为新建）
    const cur = await api(
      'GET',
      `/repos/${OWNER}/${REPO}/contents/${encodeURI(norm)}?ref=${BRANCH}`
    );
    const sha = cur.ok && cur.data && cur.data.sha ? cur.data.sha : undefined;

    if (sha && cur.data.content) {
      const remote = Buffer.from(cur.data.content, 'base64');
      if (remote.equals(content)) {
        console.log(`  = ${norm} 内容一致，跳过`);
        continue;
      }
    }

    const put = await api('PUT', `/repos/${OWNER}/${REPO}/contents/${encodeURI(norm)}`, {
      message: message || `chore: 更新 ${norm}`,
      content: b64,
      branch: BRANCH,
      ...(sha ? { sha } : {})
    });

    if (!put.ok) {
      console.log(`  ✗ ${norm} 提交失败 (HTTP ${put.status})`);
      console.log('    ', JSON.stringify(put.data).slice(0, 300));
      process.exitCode = 1;
      continue;
    }
    console.log(`  ${sha ? '↑ 已更新' : '+ 已新建'} ${norm}`);
    changed++;
  }

  console.log(changed ? `\n✓ 完成，共提交 ${changed} 个文件` : '\n✓ 完成，无需变更');
}

main().catch((e) => {
  console.error('✗ 失败：', e.message);
  process.exit(1);
});
