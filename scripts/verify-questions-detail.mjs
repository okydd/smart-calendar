import fs from 'fs';
const PW = 'file:///C:/Users/xuch/.workbuddy/binaries/node/workspace/node_modules/playwright-core/index.mjs';
const { chromium } = await import(PW);

const PORT = process.argv[2] || '4401';
const CHROME = 'C:/Users/xuch/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const launchOpts = { args: ['--no-sandbox'] };
if (fs.existsSync(CHROME)) launchOpts.executablePath = CHROME;

const browser = await chromium.launch(launchOpts);
const page = await browser.newPage({ viewport: { width: 420, height: 820 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

const base = `http://localhost:${PORT}`;
await page.goto(base + '/#/todos', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

// 建一个带备注的题
await page.locator('.q-add-btn').click();
await page.waitForTimeout(400);
await page.locator('.q-input').first().fill('如何设计一个高可用的分布式缓存系统？');
await page.locator('.q-textarea').fill('调研 Redis 集群 + 本地 LRU 两级缓存方案，并评估命中率与一致性。');
await page.locator('.ant-modal-footer .ant-btn-primary').click();
await page.waitForTimeout(700);

// 打开详情
await page.locator('.q-card').first().click();
await page.waitForTimeout(500);

// 1) 不应有「议题日期」字样
const bodyText = await page.locator('.q-detail').innerText();
const hasIssueDate = bodyText.includes('议题日期');
console.log('议题日期前缀存在?', hasIssueDate);

// 2) 三按钮均存在
const labels = await page.locator('.q-actions .q-btn').allInnerTexts();
console.log('按钮文本:', JSON.stringify(labels));

// 3) 三按钮在同一行（y 坐标接近）
const boxes = await page.locator('.q-actions .q-btn').evaluateAll((els) =>
  els.map((e) => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width }; })
);
const sameRow = boxes.length === 3 && Math.abs(boxes[0].y - boxes[1].y) < 2 && Math.abs(boxes[1].y - boxes[2].y) < 2;
const even = boxes.length === 3 && Math.abs(boxes[0].w - boxes[1].w) < 3 && Math.abs(boxes[1].w - boxes[2].w) < 3;
console.log('三按钮同行?', sameRow, ' 等宽?', even);

// 4) 关闭 X 突出且不与标题重叠
const closeBox = await page.locator('.q-detail-modal .ant-modal-close').boundingBox();
const titleBox = await page.locator('.q-detail-title').boundingBox();
console.log('close X box:', JSON.stringify(closeBox), ' title box:', JSON.stringify(titleBox));
const noOverlap = closeBox && titleBox && (titleBox.x + titleBox.width - 36) <= closeBox.x + 4;
console.log('标题与X不重叠?', noOverlap);

// 5) 弹窗垂直居中
const modalBox = await page.locator('.ant-modal.q-detail-modal').boundingBox()
  || await page.locator('.q-detail-modal').boundingBox();
const vh = 820;
const centered = modalBox && (modalBox.y > vh * 0.18 && modalBox.y < vh * 0.6);
console.log('modal box:', JSON.stringify(modalBox), ' 居中(top在中间区域)?', centered);

await page.screenshot({ path: 'scripts/shot-qdetail.png' });

console.log('--- console errors ---');
console.log(errors.length ? errors.join('\n') : '(none)');

await browser.close();
console.log('RESULT:', JSON.stringify({ hasIssueDate, sameRow, even, noOverlap, centered, errors: errors.length }));
