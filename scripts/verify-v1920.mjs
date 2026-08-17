import { chromium } from 'file:///C:/Users/xuch/.workbuddy/binaries/node/workspace/node_modules/playwright-core/index.mjs';

const BASE = 'http://127.0.0.1:4173/';
const KEY = 'calendarEvents';
const CHROME = 'C:/Users/xuch/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';

function seed() {
  const mk = (id, date, title, done) => ({
    id, kind: 'question', title, date, startTime: '', endTime: '', allDay: true,
    description: '', tag: 'blue', done: !!done, deleted: false, important: false,
    updatedAt: new Date().toISOString(), createdAt: new Date().toISOString(),
    reminder: null
  });
  const td = new Date().toISOString().slice(0, 10);
  const y = new Date(); y.setDate(y.getDate() - 2);
  const yd = y.toISOString().slice(0, 10);
  const t = new Date(); t.setDate(t.getDate() + 3);
  const td2 = t.toISOString().slice(0, 10);
  return JSON.stringify([
    mk('q-today-1', td, '今日思考题A', false),
    mk('q-today-2', td, '今日思考题B', true),
    mk('q-old-1', yd, '前天的思考题', false),
    mk('q-future-1', td2, '三天后的思考题', false)
  ]);
}

let pass = 0, fail = 0;
const check = (name, cond) => {
  if (cond) { pass++; console.log('  PASS', name); }
  else { fail++; console.log('  FAIL', name); }
};
const dayOf = (off) => { const d = new Date(); d.setDate(d.getDate() + off); return d.getDate(); };

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 390, height: 780 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(String(e)));

await page.goto(BASE, { waitUntil: 'networkidle' });
await page.evaluate((v) => localStorage.setItem(v[0], v[1]), [KEY, seed()]);
await page.reload({ waitUntil: 'networkidle' });
await page.goto(BASE + '#/todos', { waitUntil: 'networkidle' });
await page.waitForSelector('.q-card', { timeout: 8000 });

// 1. 今日日期锚点：蓝色背景方块（始终保留）
const todayChip = await page.evaluate(() => {
  const c = document.querySelector('.q-date-chip.today');
  if (!c) return null;
  const cs = getComputedStyle(c);
  const dayCs = getComputedStyle(c.querySelector('.q-day'));
  return { bg: cs.backgroundColor, day: dayCs.color, hasActive: c.classList.contains('active') };
});
check('存在今日日期锚点(.q-date-chip.today)', !!todayChip);
check('今日锚点=蓝底 rgb(76,110,245)', todayChip && todayChip.bg === 'rgb(76, 110, 245)');
check('今日锚点文字=白色 rgb(255,255,255)', todayChip && todayChip.day === 'rgb(255, 255, 255)');

// 2. 默认高亮卡片仍只有 1 张（卡片规则不变）
const cardHi = await page.evaluate(() => [...document.querySelectorAll('.q-card.hi')].length);
check('默认高亮卡片数=1', cardHi === 1);

// 3. 点击未来日期 → 该锚点变 1px 淡蓝边框，今日锚点仍蓝底
async function clickChip(dayNum) {
  await page.evaluate((dn) => {
    const chips = [...document.querySelectorAll('.q-date-chip')];
    const chip = chips.find((c) => c.textContent && c.textContent.trim().startsWith(String(dn)));
    if (chip) chip.click();
  }, dayNum);
  await page.waitForTimeout(300);
}
await clickChip(dayOf(3));
const after = await page.evaluate(() => {
  const today = document.querySelector('.q-date-chip.today');
  const active = document.querySelector('.q-date-chip.active:not(.q-date-chip.today)');
  const tcs = today ? getComputedStyle(today) : null;
  const acs = active ? getComputedStyle(active) : null;
  return {
    todayBg: tcs ? tcs.backgroundColor : null,
    activeBorder: acs ? acs.borderTopColor : null,
    activeWidth: acs ? acs.borderTopWidth : null
  };
});
check('切换后今日锚点仍蓝底', after.todayBg === 'rgb(76, 110, 245)');
check('切换后选中锚点存在(非今日)', after.activeBorder !== null);
check('选中锚点=1px 淡蓝边框 rgb(116,143,252)',
  after.activeBorder === 'rgb(116, 143, 252)' && after.activeWidth === '1px');
check('切换后高亮卡片仍=1', (await page.evaluate(() => [...document.querySelectorAll('.q-card.hi')].length)) === 1);

check('控制台零报错', errors.length === 0);
if (errors.length) console.log('  console errors:', errors.slice(0, 5));

await browser.close();
console.log(`\nV1.9.20 结果: ${pass} 通过 / ${fail} 失败`);
process.exit(fail ? 1 : 0);
