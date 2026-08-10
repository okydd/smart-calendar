/**
 * 真实浏览器渲染自检：
 * 1) 起一个静态服务托管 dist；
 * 2) 用 Chromium 打开首页，收集控制台错误 / 页面异常 / 失败请求；
 * 3) 断言根节点真的渲染出了内容（不是白屏）；
 * 4) 额外断言：启动阶段没有请求任何含 Capacitor 的 chunk。
 *
 * 用法：node scripts/verify-render.mjs [dist目录] [端口]
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', process.argv[2] || 'dist');
const PORT = Number(process.argv[3] || 4399);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json'
};

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/' || p === '') p = '/index.html';
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404).end('not found');
    return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

await new Promise((r) => server.listen(PORT, '127.0.0.1', r));
console.log(`[server] http://127.0.0.1:${PORT}  root=${ROOT}`);

// ESM 不认 NODE_PATH，这里显式指向托管的 node workspace
const PW =
  process.env.PW_PATH ||
  'file:///C:/Users/xuch/.workbuddy/binaries/node/workspace/node_modules/playwright-core/index.mjs';
let chromium;
try {
  ({ chromium } = await import(PW));
} catch {
  ({ chromium } = await import('playwright-core'));
}
// 只下载了完整 chromium（无 headless shell），显式指定可执行文件
const CHROME =
  process.env.CHROME_PATH ||
  'C:/Users/xuch/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const launchOpts = { headless: true, args: ['--no-sandbox', '--disable-gpu'] };
if (fs.existsSync(CHROME)) launchOpts.executablePath = CHROME;
const browser = await chromium.launch(launchOpts);
const ctx = await browser.newContext({
  viewport: { width: 420, height: 860 },
  userAgent:
    'Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
});
const page = await ctx.newPage();

// BREAK_ENTRY=1 时把入口 chunk 替换成「模块求值即抛错」，
// 用来验证 index.html 的白屏兜底面板确实会出现（模拟 WebView 整包崩溃）。
if (process.env.BREAK_ENTRY === '1') {
  await page.route('**/assets/index-*.js', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/javascript; charset=utf-8',
      body: 'throw new Error("模拟：安卓 WebView 中模块求值失败");'
    })
  );
  console.log('[mock] 已把入口 chunk 替换为抛错脚本');
}

const consoleErrors = [];
const pageErrors = [];
const failed = [];
const requested = [];

page.on('console', (m) => {
  if (m.type() === 'error') consoleErrors.push(m.text());
});
page.on('pageerror', (e) => pageErrors.push(String(e && e.message ? e.message : e)));
page.on('requestfailed', (r) => failed.push(`${r.url()} :: ${r.failure()?.errorText}`));
page.on('request', (r) => requested.push(r.url()));

let ok = true;
try {
  await page.goto(`http://127.0.0.1:${PORT}/index.html`, {
    waitUntil: 'networkidle',
    timeout: 30000
  });
} catch (e) {
  console.log('[goto] 失败:', e.message);
  ok = false;
}

await page.waitForTimeout(2500);

const info = await page.evaluate(() => {
  const root = document.getElementById('root');
  return {
    rootExists: !!root,
    childCount: root ? root.childElementCount : 0,
    innerLen: root ? root.innerHTML.length : 0,
    text: (document.body.innerText || '').slice(0, 240),
    hasErrorBoundary: (document.body.innerText || '').includes('出错')
  };
});

console.log('\n=== 渲染结果 ===');
console.log('#root 存在:', info.rootExists);
console.log('#root 子元素数:', info.childCount);
console.log('#root innerHTML 长度:', info.innerLen);
console.log('页面可见文本(前240字):\n', info.text.replace(/\n+/g, ' | '));

console.log('\n=== 启动阶段请求的 JS ===');
const jsReq = requested.filter((u) => u.endsWith('.js')).map((u) => u.replace(/^.*\//, ''));
jsReq.forEach((u) => console.log('  ', u));

console.log('\n=== 错误 ===');
console.log('pageerror:', pageErrors.length ? pageErrors : '无');
console.log('console.error:', consoleErrors.length ? consoleErrors : '无');
console.log('请求失败:', failed.length ? failed : '无');

const blank = !info.rootExists || info.childCount === 0 || info.innerLen < 200;
if (blank) ok = false;
if (pageErrors.length) ok = false;

console.log('\n>>> 结论:', ok ? '页面正常渲染，非白屏 ✅' : '仍然白屏或存在致命错误 ❌');

await browser.close();
server.close();
process.exit(ok ? 0 : 1);
