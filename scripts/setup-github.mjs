/**
 * 一键把项目发布到 GitHub Pages，得到一个长期有效的网址。
 *
 * 读取 .secrets.json 中的 githubToken，自动完成：
 *   1. 识别账号
 *   2. 创建（或复用）仓库 smart-calendar
 *   3. 推送全部代码到 main 分支
 *   4. 开启 GitHub Pages（由 Actions 构建）
 *   5. 等待首次自动构建完成
 *   6. 输出最终访问网址
 *
 * 用法：node scripts/setup-github.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SECRETS = path.join(ROOT, '.secrets.json');
const API = 'https://api.github.com';

const log = (...a) => console.log('•', ...a);
const die = (m) => {
  console.error('\n✗ ' + m);
  process.exit(1);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function readSecrets() {
  if (!fs.existsSync(SECRETS)) die(`未找到 ${SECRETS}，请先创建并填入令牌`);
  return JSON.parse(fs.readFileSync(SECRETS, 'utf8'));
}
function writeSecrets(o) {
  fs.writeFileSync(SECRETS, JSON.stringify(o, null, 2), 'utf8');
}

let TOKEN = '';
async function api(method, urlPath, body) {
  const res = await fetch(API + urlPath, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      'User-Agent': 'smart-calendar-setup'
    },
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
}

function git(cmd, opts = {}) {
  return execSync(`git ${cmd}`, {
    cwd: ROOT,
    stdio: opts.quiet ? 'pipe' : 'inherit',
    encoding: 'utf8',
    env: { ...process.env, GIT_TERMINAL_PROMPT: '0' }
  });
}

async function main() {
  const secrets = readSecrets();
  TOKEN = (secrets.githubToken || '').trim();
  if (!TOKEN) die('.secrets.json 中缺少 githubToken');
  const REPO = (secrets.githubRepo || 'smart-calendar').trim();

  // 1. 账号
  log('识别 GitHub 账号…');
  const me = await api('GET', '/user');
  if (!me.ok) die(`令牌无效或权限不足（HTTP ${me.status}）：${JSON.stringify(me.data)}`);
  const owner = me.data.login;
  log(`账号：${owner}`);

  // 2. 仓库
  log(`检查仓库 ${owner}/${REPO}…`);
  let repo = await api('GET', `/repos/${owner}/${REPO}`);
  if (repo.status === 404) {
    log('仓库不存在，正在创建…');
    const created = await api('POST', '/user/repos', {
      name: REPO,
      description: '智能日历 · 手机电脑双端可用的日程管理应用（PWA + 云同步）',
      private: false,
      has_issues: false,
      has_projects: false,
      has_wiki: false,
      auto_init: false
    });
    if (!created.ok) die(`创建仓库失败（HTTP ${created.status}）：${JSON.stringify(created.data)}`);
    repo = { ok: true, data: created.data };
    log('仓库已创建');
  } else if (!repo.ok) {
    die(`读取仓库失败（HTTP ${repo.status}）：${JSON.stringify(repo.data)}`);
  } else {
    log('仓库已存在，将直接更新');
  }

  // 3. 推送代码
  log('提交本地改动…');
  try {
    git('add -A', { quiet: true });
    git('-c core.quotepath=false commit -q -m "配置云同步参数并发布"', { quiet: true });
    log('  已生成新提交');
  } catch {
    log('  无新增改动，跳过提交');
  }

  log('切换到 main 分支…');
  try {
    git('branch -M main', { quiet: true });
  } catch {
    /* 已是 main */
  }

  log('推送到 GitHub（首次约需 10~60 秒）…');
  const authUrl = `https://x-access-token:${TOKEN}@github.com/${owner}/${REPO}.git`;
  const cleanUrl = `https://github.com/${owner}/${REPO}.git`;
  try {
    git('remote remove origin', { quiet: true });
  } catch {
    /* 本来就没有 */
  }
  git(`remote add origin ${authUrl}`, { quiet: true });
  try {
    git('push -u origin main --force', { quiet: true });
  } finally {
    // 不要把令牌留在 .git/config 里
    try {
      git(`remote set-url origin ${cleanUrl}`, { quiet: true });
    } catch {
      /* ignore */
    }
  }
  log('代码已推送');

  // 4. 开启 Pages（由 Actions 构建）
  log('开启 GitHub Pages…');
  const pagesCreate = await api('POST', `/repos/${owner}/${REPO}/pages`, {
    build_type: 'workflow'
  });
  if (pagesCreate.ok) {
    log('  Pages 已开启');
  } else if (pagesCreate.status === 409) {
    const upd = await api('PUT', `/repos/${owner}/${REPO}/pages`, { build_type: 'workflow' });
    log(upd.ok ? '  Pages 已存在，构建来源已更新' : '  Pages 已存在');
  } else {
    log(`  开启 Pages 返回 HTTP ${pagesCreate.status}，稍后会再次检查`);
  }

  // 5. 等待 Actions 构建
  log('等待自动构建与发布（约 1~3 分钟）…');
  let conclusion = null;
  let runUrl = '';
  for (let i = 0; i < 40; i++) {
    await sleep(10000);
    const runs = await api('GET', `/repos/${owner}/${REPO}/actions/runs?per_page=1`);
    const run = runs.data?.workflow_runs?.[0];
    if (!run) {
      if (i % 3 === 0) log(`  尚未检测到构建任务…（${(i + 1) * 10}s）`);
      continue;
    }
    runUrl = run.html_url;
    if (run.status === 'completed') {
      conclusion = run.conclusion;
      break;
    }
    if (i % 3 === 0) log(`  构建中：${run.status}（${(i + 1) * 10}s）`);
  }

  // 6. 结果
  const pages = await api('GET', `/repos/${owner}/${REPO}/pages`);
  const siteUrl = pages.data?.html_url || `https://${owner}.github.io/${REPO}/`;

  secrets.githubOwner = owner;
  secrets.githubRepoUrl = `https://github.com/${owner}/${REPO}`;
  secrets.siteUrl = siteUrl;
  writeSecrets(secrets);

  console.log('');
  if (conclusion === 'success') {
    console.log('✓ 发布成功');
  } else if (conclusion) {
    console.log(`⚠ 构建结束但结果为 ${conclusion}，请查看：${runUrl}`);
  } else {
    console.log('⚠ 构建仍在进行中，稍后可再次查看');
  }
  console.log(`  访问网址 : ${siteUrl}`);
  console.log(`  仓库地址 : https://github.com/${owner}/${REPO}`);
  if (runUrl) console.log(`  构建记录 : ${runUrl}`);
}

main().catch((e) => die(e?.stack || String(e)));
