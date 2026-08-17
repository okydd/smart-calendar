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
  const today = new Date(); today.setDate(today.getDate());
  const td = today.toISOString().slice(0, 10);
  const y = new Date(); y.setDate(y.getDate() - 2);
  const yd = y.toISOString().slice(0, 10);
  const t = new Date(); t.setDate(t.getDate() + 3);
  const td2 = t.toISOString().slice(0, 10);
  return JSON.stringify([
    mk('q-today-1', td, '今日思考题A', false),
    mk('q-today-2', td, '今日思考题B（已完成）', true),
    mk('q-old-1', yd, '前天的思考题', false),
    mk('q-future-1', td2, '三天后的思考题', false)
  ]);
}

let pass = 0, fail = 0;
const check = (name, cond) => {
  if (cond) { pass++; console.log('  PASS', name); }
  else { fail++; console.log('  FAIL', name); }
};

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 390, height: 780 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(String(e)));

await page.goto(BASE, { waitUntil: 'networkidle' });
await page.evaluate((v) => localStorage.setItem(v[0], v[1]), [KEY, seed()]);
await page.reload({ waitUntil: 'networkidle' });

// 进入思考题页（HashRouter：直接定位 #/todos）
await page.goto(BASE + '#/todos', { waitUntil: 'networkidle' });
await page.waitForSelector('.q-card', { timeout: 8000 });

// 今日卡片应有蓝色边框（呼应今日蓝底方块）
const todayCard = await page.evaluate(() => {
  const c = document.querySelector('.q-card.today');
  if (!c) return null;
  const cs = getComputedStyle(c);
  return { border: cs.borderTopColor, bg: cs.backgroundColor, w: cs.borderTopWidth };
});
check('存在今日卡片(.q-card.today)', !!todayCard);
check('今日卡片=蓝色边框 rgb(76,110,245)', todayCard && todayCard.border === 'rgb(76, 110, 245)');
check('今日卡片=2px 边框', todayCard && todayCard.w === '2px');
check('今日卡片=浅蓝底 rgb(238,243,255)', todayCard && todayCard.bg === 'rgb(238, 243, 255)');

// 默认 activeDate = 最新日期（未来日期 td2），其卡片应有淡蓝边框
const selCard = await page.evaluate(() => {
  const c = document.querySelector('.q-card.sel');
  if (!c) return null;
  const cs = getComputedStyle(c);
  return { border: cs.borderTopColor, w: cs.borderTopWidth };
});
check('存在选中态卡片(.q-card.sel)', !!selCard);
check('选中态卡片=淡蓝边框 rgb(116,143,252)', selCard && selCard.border === 'rgb(116, 143, 252)');

// 点击「前天」日期锚点，对应卡片应切换为淡蓝边框，今日卡片不再带 sel
const before = await page.evaluate(() => {
  const chips = [...document.querySelectorAll('.q-date-chip')];
  const yChip = chips.find((c) => c.textContent && c.textContent.includes(String(new Date(Date.now() - 2 * 864e5).getDate())));
  return !!yChip;
});
check('能找到前天日期锚点', before);

await page.evaluate(() => {
  const chips = [...document.querySelectorAll('.q-date-chip')];
  const yDay = String(new Date(Date.now() - 2 * 864e5).getDate());
  const yChip = chips.find((c) => c.textContent && c.textContent.trim().startsWith(yDay));
  if (yChip) yChip.click();
});

await page.waitForTimeout(400);
const after = await page.evaluate(() => {
  const sel = [...document.querySelectorAll('.q-card.sel')];
  const todayHasSel = !!document.querySelector('.q-card.today.sel') || !![...document.querySelectorAll('.q-card.today')].find((c) => c.classList.contains('sel'));
  return {
    selCount: sel.length,
    selBorders: sel.map((c) => getComputedStyle(c).borderTopColor),
    todayHasSel
  };
});
check('切换日期后选中卡片数=1', after.selCount === 1);
check('切换后选中卡片=淡蓝边框', after.selBorders.every((b) => b === 'rgb(116, 143, 252)'));
check('今日卡片不被误标为 sel', !after.todayHasSel);

check('控制台零报错', errors.length === 0);
if (errors.length) console.log('  console errors:', errors.slice(0, 5));

await browser.close();
console.log(`\nV1.9.18 结果: ${pass} 通过 / ${fail} 失败`);
process.exit(fail ? 1 : 0);
