// 验证页面在「无新版本」时不会自动刷新：监听 framenavigated，
// 统计是否在加载后自刷新（出现 _nocache / _r= 跳转）。同时检查渲染与报错。
import('file:///C:/Users/xuch/.workbuddy/binaries/node/workspace/node_modules/playwright-core/index.mjs').then(async (PW) => {
  const http = await import('node:http');
  const fs = await import('node:fs');
  const path = await import('node:path');
  const ROOT = path.resolve('dist');
  const PORT = Number(process.argv[2] || 4455);
  const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
  const srv = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/index.html';
    const f = path.join(ROOT, p);
    if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  });
  await new Promise((r) => srv.listen(PORT, '127.0.0.1', r));
  const CHROME = 'C:/Users/xuch/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
  const browser = await PW.chromium.launch({ headless: true, args: ['--no-sandbox'], executablePath: CHROME });
  const ctx = await browser.newContext({ viewport: { width: 420, height: 860 }, userAgent: 'Mozilla/5.0 (Linux; Android 13) Chrome/120 Mobile' });
  const page = await ctx.newPage();
  const navs = [];
  const errs = [];
  page.on('framenavigated', (f) => { if (f === page.mainFrame()) navs.push(page.url()); });
  page.on('pageerror', (e) => errs.push(String(e.message || e)));
  await page.goto('http://127.0.0.1:' + PORT + '/index.html', { waitUntil: 'load', timeout: 30000 }).catch((e) => console.log('goto:', e.message));
  await page.waitForTimeout(Number(process.env.WAIT_MS || 10000));
  const rootLen = await page.evaluate(() => document.getElementById('root')?.innerHTML.length || 0);
  const reloads = navs.filter((u) => u.includes('_nocache') || u.includes('_r=')).length;
  console.log('导航次数:', navs.length);
  console.log('自刷新(_nocache/_r)次数:', reloads);
  console.log('导航URLs:', navs.map((u) => u.replace(/127.0.0.1:\d+/, 'host')));
  console.log('root内容长度:', rootLen);
  console.log('pageerror:', errs.length ? errs : '无');
  console.log(reloads === 0 && rootLen > 1000 && errs.length === 0 ? '>>> 结论: 平时不会自动刷新，渲染正常 ✅' : '>>> 异常 ❌');
  await browser.close();
  srv.close();
});
