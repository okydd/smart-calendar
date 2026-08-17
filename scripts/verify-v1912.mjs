import { chromium } from 'file:///C:/Users/xuch/.workbuddy/binaries/node/workspace/node_modules/playwright-core/index.mjs';

const BASE = 'http://127.0.0.1:4173/';
const CHROME = 'C:/Users/xuch/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const KEY = 'calendarEvents';

function seed() {
  const qs = [
    { id: 'q1', kind: 'question', title: '数学压轴题思路', date: '2026-08-18', description: '先分析题干条件，再构造辅助函数。'.repeat(20), done: false, deleted: false, updatedAt: Date.now() },
    { id: 'q2', kind: 'question', title: '英语作文模板', date: '2026-08-15', description: '三段式结构：引入、论证、总结。', done: true, deleted: false, updatedAt: Date.now() }
  ];
  const ev = [
    { id: 'e1', kind: 'event', title: '普通日历事件', date: '2026-08-20', allDay: true, deleted: false, updatedAt: Date.now() }
  ];
  return JSON.stringify([...qs, ...ev]);
}

const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 390, height: 780 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

await page.goto(BASE, { waitUntil: 'networkidle' });
await page.evaluate(({ k, v }) => localStorage.setItem(k, v), { k: KEY, v: seed() });
await page.reload({ waitUntil: 'networkidle' });

// 进入思考题页（底部 Tab）
await page.getByText('思考题', { exact: true }).first().click();
await page.waitForTimeout(400);

const results = {};

// ① 列表不显示备注
const listText = await page.locator('.q-list').innerText();
results.listNoDesc = !listText.includes('先分析题干条件') && listText.includes('数学压轴题思路');

// ④ 列表日期短格式（无「周二」等星期）
results.dateShort = listText.includes('8月18日') && !/8月18日\s*(周一|周二|周三|周四|周五|周六|周日)/.test(listText);

// 打开第一个详情
await page.locator('.q-card').first().click();
await page.waitForSelector('.q-detail-modal', { timeout: 5000 });
await page.waitForTimeout(300);

// ② 备注默认收起（body 不渲染）
results.noteCollapsed = (await page.locator('.q-detail-note-body').count()) === 0;
// 展开
await page.locator('.q-note-toggle').click();
await page.waitForTimeout(200);
results.noteExpanded = (await page.locator('.q-detail-note-body').count()) === 1;
// 内部滚动条
const scrollable = await page.locator('.q-detail-note-body').evaluate((el) => el.scrollHeight > el.clientHeight + 4);
results.noteScroll = scrollable;

// ③ 两行按钮
const rows = await page.locator('.q-row').count();
results.twoRows = rows === 2;
// 第一行左：evv-toggle 完成状态；右：编辑
const row1 = page.locator('.q-row').first();
results.hasToggle = (await row1.locator('.evv-toggle').count()) === 1;
results.row1Edit = (await row1.locator('.q-btn.edit').count()) === 1;
// 第二行：删除 + 取消
const row2 = page.locator('.q-row').nth(1);
results.row2Danger = (await row2.locator('.q-btn.danger').count()) === 1;
results.row2Cancel = (await row2.locator('.q-btn.cancel').count()) === 1;

// 完成状态切换：当前 未完成（q1 done=false），点「已完成」
const doneOpt = page.locator('.evv-toggle .opt.done');
await doneOpt.click();
await page.waitForTimeout(300);
const afterActive = await page.locator('.evv-toggle .opt.done.active').count();
results.toggleWorks = afterActive === 1;

// 关闭详情
await page.locator('.q-detail-modal .ant-modal-close').click();
await page.waitForTimeout(300);

console.log(JSON.stringify(results, null, 2));
console.log('CONSOLE_ERRORS:', errors.length, JSON.stringify(errors.slice(0, 5)));

const ok = Object.values(results).every(Boolean) && errors.length === 0;
await browser.close();
process.exit(ok ? 0 : 1);
