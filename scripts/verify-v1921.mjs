import { chromium } from 'file:///C:/Users/xuch/.workbuddy/binaries/node/workspace/node_modules/playwright-core/index.mjs';

const BASE = 'http://127.0.0.1:4173/';
const KEY = 'calendarEvents';
const CHROME = 'C:/Users/xuch/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';

function seed() {
  const td = new Date().toISOString().slice(0, 10);
  const ev = {
    id: 'ev-1', kind: 'event', title: '测试事件', date: td,
    startTime: '09:00', endTime: '10:00', allDay: false,
    description: '备注内容', tag: 'blue', done: false, deleted: false,
    important: false, updatedAt: new Date().toISOString(), createdAt: new Date().toISOString(),
    reminder: null
  };
  return JSON.stringify([ev]);
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

// 打开今天的事件详情（点击 .event-pill）
await page.waitForSelector('.event-pill', { timeout: 8000 });
await page.click('.event-pill');
await page.waitForSelector('.ev-view', { timeout: 8000 });

// 取消按钮（.ev-btn-gray）：浅灰背景块 + 边框
const cancel = await page.evaluate(() => {
  const c = document.querySelector('.ev-btn-gray');
  if (!c) return null;
  const cs = getComputedStyle(c);
  return {
    bg: cs.backgroundColor, color: cs.color,
    bw: cs.borderTopWidth, bc: cs.borderTopColor, text: c.textContent.trim()
  };
});
check('存在取消按钮(.ev-btn-gray)', !!cancel);
check('取消=浅灰背景块 rgb(238,240,244)', cancel && cancel.bg === 'rgb(238, 240, 244)');
check('取消=灰字 rgb(82,88,102)', cancel && cancel.color === 'rgb(82, 88, 102)');
check('取消=1px 边框 rgb(226,229,236)', cancel && cancel.bw === '1px' && cancel.bc === 'rgb(226, 229, 236)');
check('取消按钮文字=取消', cancel && cancel.text === '取消');

// 删除按钮（.ev-btn-danger）：淡红背景块 + 红边框 + 红字
const del = await page.evaluate(() => {
  const c = document.querySelector('.ev-btn-danger');
  if (!c) return null;
  const cs = getComputedStyle(c);
  return {
    bg: cs.backgroundColor, color: cs.color,
    bw: cs.borderTopWidth, bc: cs.borderTopColor, text: c.textContent.trim()
  };
});
check('存在删除按钮(.ev-btn-danger)', !!del);
check('删除=淡红背景块 rgb(255,241,240)', del && del.bg === 'rgb(255, 241, 240)');
check('删除=红字 rgb(250,82,82)', del && del.color === 'rgb(250, 82, 82)');
check('删除=1px 红边框 rgb(255,201,196)', del && del.bw === '1px' && del.bc === 'rgb(255, 201, 196)');
check('删除按钮文字=删除', del && del.text === '删除');

check('控制台零报错', errors.length === 0);
if (errors.length) console.log('  console errors:', errors.slice(0, 5));

await browser.close();
console.log(`\nV1.9.21 结果: ${pass} 通过 / ${fail} 失败`);
process.exit(fail ? 1 : 0);
