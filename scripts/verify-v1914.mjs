import { chromium } from 'file:///C:/Users/xuch/.workbuddy/binaries/node/workspace/node_modules/playwright-core/index.mjs';

const BASE = 'http://127.0.0.1:4173/';
const KEY = 'calendarEvents';
const CHROME = 'C:/Users/xuch/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';

function seed() {
  const today = new Date();
  const d = (off) => {
    const x = new Date(today); x.setDate(x.getDate() + off);
    return x.toISOString().slice(0, 10);
  };
  return JSON.stringify([
    { id: 'q1', title: '测试思考题一', date: d(1), description: '这是一段备注内容，用于验证详情备注收起与内部滚动。', kind: 'question', done: false, deleted: false, createdAt: Date.now(), updatedAt: Date.now() },
  ]);
}

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

// 进入思考题页
await page.click('.tabbar-item:nth-child(2)');
await page.waitForSelector('.q-card', { timeout: 8000 });
check('列表卡片存在', await page.$('.q-card'));

// 打开详情
await page.click('.q-card');
await page.waitForSelector('.q-detail', { timeout: 8000 });

const block = await page.$('.q-status-block');
check('状态块存在', block);
const toggle = await page.$('.q-status-block .evv-toggle');
check('横排文字分段存在', toggle);
check('含两个选项(未完成/已完成)', (await page.$$('.q-status-block .evv-toggle .opt')).length === 2);

// 计算高度：状态块应与编辑按钮同高（普通按钮高度，约40-48px），且不应再是带边框阴影的高卡片
const m = await page.evaluate(() => {
  const blk = document.querySelector('.q-status-block');
  const toggle = document.querySelector('.q-status-block .evv-toggle');
  const edit = document.querySelector('.q-btn.edit');
  const danger = document.querySelector('.q-btn.danger');
  const opt = document.querySelector('.q-status-block .evv-toggle .opt');
  const cs = getComputedStyle(blk);
  const tr = toggle.getBoundingClientRect();
  const er = edit.getBoundingClientRect();
  const dr = danger.getBoundingClientRect();
  const or = opt.getBoundingClientRect();
  return {
    blockBorder: cs.borderTopWidth,
    blockShadow: cs.boxShadow,
    toggleH: Math.round(tr.height),
    editH: Math.round(er.height),
    dangerH: Math.round(dr.height),
    optH: Math.round(or.height),
    diff: Math.abs(Math.round(tr.height) - Math.round(er.height)),
  };
});
check('状态块无边框(已去卡片)', m.blockBorder === '0px');
check('状态块无阴影', m.blockShadow === 'none');
check('切换高度=编辑按钮高度(误差<=4px)', m.diff <= 4);
check('切换高度与编辑按钮一致(普通按钮高度)', m.toggleH >= m.editH - 4 && m.toggleH <= m.editH + 4);

// 切换为已完成
await page.click('.q-status-block .evv-toggle .opt.done');
await page.waitForTimeout(150);
const doneActive = await page.evaluate(() => {
  const opt = document.querySelector('.q-status-block .evv-toggle .opt.done');
  return opt.classList.contains('active');
});
check('点击已完成切换生效', doneActive);

await browser.close();
const pass = checks.every((c) => c.ok) && errors.length === 0;
console.log(JSON.stringify({ checks, errors, metrics: m }, null, 2));
console.log(pass ? 'ALL PASS' : 'FAIL');
process.exit(pass ? 0 : 1);
