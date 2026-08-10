/**
 * 线上端到端自检：用移动端 UA 打开 GitHub Pages 上的真实页面，
 * 断言渲染成功、无致命错误，并检查启动阶段没有加载 Capacitor chunk。
 * 用法：node scripts/verify-live.mjs [url]
 */
import fs from 'node:fs';

const URL_ = process.argv[2] || 'https://okydd.github.io/smart-calendar/';

const PW =
  process.env.PW_PATH ||
  'file:///C:/Users/xuch/.workbuddy/binaries/node/workspace/node_modules/playwright-core/index.mjs';
let chromium;
try {
  ({ chromium } = await import(PW));
} catch {
  ({ chromium } = await import('playwright-core'));
}

const CHROME =
  process.env.CHROME_PATH ||
  'C:/Users/xuch/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const opts = { headless: true, args: ['--no-sandbox', '--disable-gpu'] };
if (fs.existsSync(CHROME)) opts.executablePath = CHROME;

const browser = await chromium.launch(opts);
const ctx = await browser.newContext({
  viewport: { width: 420, height: 860 },
  userAgent:
    'Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
});
const page = await ctx.newPage();

const pageErrors = [];
const failed = [];
const reqs = [];
const resps = [];
const logs = [];
page.on('pageerror', (e) => pageErrors.push(String(e?.message || e)));
page.on('requestfailed', (r) => failed.push(`${r.url()} :: ${r.failure()?.errorText}`));
page.on('request', (r) => reqs.push(r.url()));
page.on('response', (r) => resps.push(`${r.status()} ${r.url().replace(/^.*\//, '')}`));
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on('framenavigated', (f) => {
  if (f === page.mainFrame()) logs.push(`[nav] ${f.url()}`);
});

let ok = true;
try {
  await page.goto(URL_ + '?_t=' + Date.now(), { waitUntil: 'networkidle', timeout: 45000 });
} catch (e) {
  console.log('[goto] 失败:', e.message);
  ok = false;
}
await page.waitForTimeout(Number(process.env.WAIT_MS || 8000));

const info = await page.evaluate(() => {
  const r = document.getElementById('root');
  return {
    children: r ? r.childElementCount : 0,
    len: r ? r.innerHTML.length : 0,
    text: (document.body.innerText || '').slice(0, 200),
    semver: window.__APP_SEMVER__ || '(未暴露)'
  };
});

console.log('URL:', URL_);
console.log('#root 子元素:', info.children, '| innerHTML 长度:', info.len);
console.log('可见文本:', info.text.replace(/\n+/g, ' | '));
console.log('\n-- 响应状态 --');
resps.forEach((r) => console.log('  ', r));
console.log('\n-- console / 导航 --');
logs.forEach((l) => console.log('  ', l));
console.log('\npageerror:', pageErrors.length ? pageErrors : '无');
console.log('请求失败:', failed.length ? failed : '无');
console.log(
  '首屏是否加载 Capacitor 相关 chunk:',
  reqs.filter((u) => /localNotify|web-/.test(u)).join(', ') || '否 ✅'
);

if (info.children === 0 || info.len < 200) ok = false;
if (info.text.includes('页面未能正常启动')) ok = false;
if (pageErrors.length) ok = false;

console.log('\n>>> 线上结论:', ok ? '正常渲染 ✅' : '异常 ❌');
await browser.close();
process.exit(ok ? 0 : 1);
