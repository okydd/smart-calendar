import { chromium } from 'file:///C:/Users/xuch/.workbuddy/binaries/node/workspace/node_modules/playwright-core/index.mjs';

const BASE = 'http://127.0.0.1:4173/';
const KEY = 'calendarEvents';
const CHROME = 'C:/Users/xuch/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';

function seed() {
  const today = new Date();
  const fmt = (x) => x.toISOString().slice(0, 10);
  const d1 = new Date(today); d1.setDate(d1.getDate() + 3);
  const d2 = new Date(today); d2.setDate(d2.getDate() + 7);
  return JSON.stringify([
    { id: 'q_today', title: '今日思考题', date: fmt(today), description: '', kind: 'question', done: false, deleted: false, createdAt: Date.now(), updatedAt: Date.now() },
    { id: 'q_d1', title: '三天后思考题', date: fmt(d1), description: '', kind: 'question', done: false, deleted: false, createdAt: Date.now(), updatedAt: Date.now() },
    { id: 'q_d2', title: '七天后思考题', date: fmt(d2), description: '', kind: 'question', done: false, deleted: false, createdAt: Date.now(), updatedAt: Date.now() },
  ]);
}
// 用本地 today 计算（与页面 dayjs 同源时区）
function todayStr() { const x = new Date(); return x.toISOString().slice(0, 10); }

const checks = [];
function check(name, cond) { checks.push({ name, ok: !!cond }); }

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 390, height: 800 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(e.message));

await page.goto(BASE, { waitUntil: 'networkidle' });
await page.evaluate(([k, v]) => localStorage.setItem(k, v), [KEY, seed()]);
await page.reload({ waitUntil: 'networkidle' });

await page.click('.tabbar-item:nth-child(2)');
await page.waitForSelector('.q-date-chip', { timeout: 8000 });

// 取今日 chip 与另一日期 chip
const before = await page.evaluate((ts) => {
  const chips = [...document.querySelectorAll('.q-date-chip')];
  const today = chips.find((c) => c.classList.contains('today'));
  const nonToday = chips.find((c) => !c.classList.contains('today'));
  const cs = (el) => { const s = getComputedStyle(el); return { bg: s.backgroundColor, border: s.borderTopColor, borderW: s.borderTopWidth }; };
  return {
    chips: chips.length,
    todayBg: today ? cs(today).bg : null,
    todayHasBlueBg: today ? cs(today).bg : null,
    nonTodayActive: nonToday ? nonToday.classList.contains('active') : null,
    nonToday: nonToday ? cs(nonToday) : null,
    ts,
  };
}, todayStr());

check('存在日期锚点', before.chips >= 2);
check('今日 chip 蓝色背景', before.todayBg === 'rgb(76, 110, 245)' || (before.todayBg && before.todayBg !== 'rgba(0, 0, 0, 0)'));

// 点击一个非今日的日期，使其变为选中
const clicked = await page.evaluate(() => {
  const chips = [...document.querySelectorAll('.q-date-chip')];
  const target = chips.find((c) => !c.classList.contains('today'));
  target.click();
  return true;
});
await page.waitForTimeout(200);

const after = await page.evaluate((ts) => {
  const chips = [...document.querySelectorAll('.q-date-chip')];
  const today = chips.find((c) => c.classList.contains('today'));
  const active = chips.find((c) => c.classList.contains('active'));
  const cs = (el) => { const s = getComputedStyle(el); return { bg: s.backgroundColor, border: s.borderTopColor, borderW: s.borderTopWidth }; };
  return {
    todayBg: today ? cs(today).bg : null,
    activeIsToday: active ? active.classList.contains('today') : null,
    active: active ? cs(active) : null,
    ts,
  };
}, todayStr());

// 选中态应为淡蓝边框（白底 / 浅蓝底，非实心蓝底），且边框有颜色
check('点击后选中态非实心蓝底', after.active && after.active.bg !== 'rgb(76, 110, 245)');
check('点击后选中态有淡蓝边框', after.active && after.active.borderW !== '0px' && after.active.border !== 'rgb(236, 236, 240)');
check('今日仍为蓝色背景', after.todayBg === 'rgb(76, 110, 245)');

await browser.close();
const pass = checks.every((c) => c.ok) && errors.length === 0;
console.log(JSON.stringify({ checks, errors, before, after }, null, 2));
console.log(pass ? 'ALL PASS' : 'FAIL');
process.exit(pass ? 0 : 1);
