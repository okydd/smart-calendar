import { chromium } from 'file:///C:/Users/xuch/.workbuddy/binaries/node/workspace/node_modules/playwright-core/index.mjs';

const BASE = 'http://127.0.0.1:4173/';
const CHROME = 'C:/Users/xuch/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const KEY = 'calendarEvents';

function seed() {
  const qs = [
    { id: 'q1', kind: 'question', title: '数学压轴题思路', date: '2026-08-18', description: '先分析题干条件，再构造辅助函数。', done: false, deleted: false, updatedAt: Date.now() }
  ];
  return JSON.stringify(qs);
}

const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 390, height: 780 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

await page.goto(BASE, { waitUntil: 'networkidle' });
await page.evaluate(({ k, v }) => localStorage.setItem(k, v), { k: KEY, v: seed() });
await page.reload({ waitUntil: 'networkidle' });

await page.getByText('思考题', { exact: true }).first().click();
await page.waitForTimeout(400);

await page.locator('.q-card').first().click();
await page.waitForSelector('.q-detail-modal', { timeout: 5000 });
await page.waitForTimeout(300);

const results = {};
// 「完成状态」文字不再出现
results.noStatusLabel = (await page.locator('.q-status-block .evv-status-label').count()) === 0;
// 分段切换仍在
const blockText = await page.locator('.q-status-block').innerText();
results.hasToggle = blockText.includes('未完成') && blockText.includes('已完成');
results.optCount = (await page.locator('.q-status-block .evv-toggle .opt').count()) === 2;
// 切换仍可用
await page.locator('.q-status-block .evv-toggle .opt.done').click();
await page.waitForTimeout(300);
results.toggleWorks = (await page.locator('.q-status-block .evv-toggle .opt.done.active').count()) === 1;

console.log(JSON.stringify(results, null, 2));
console.log('CONSOLE_ERRORS:', errors.length, JSON.stringify(errors.slice(0, 5)));
const ok = Object.values(results).every(Boolean) && errors.length === 0;
await browser.close();
process.exit(ok ? 0 : 1);
