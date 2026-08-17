import { chromium } from 'file:///C:/Users/xuch/.workbuddy/binaries/node/workspace/node_modules/playwright-core/index.mjs';

const BASE = 'http://127.0.0.1:4173';
const CHROME = 'C:/Users/xuch/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';

const seed = [
  {
    id: 'evt-1',
    title: '团队季度会议',
    date: '2026-08-20',
    description: '讨论下季度产品规划',
    startTime: '',
    endTime: '',
    allDay: true,
    tag: 'blue',
    kind: 'normal',
    done: false,
    important: false,
    deleted: false,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'q-1',
    title: '如何提升专注力',
    date: '2026-08-15',
    description: '尝试番茄工作法，25 分钟专注 + 5 分钟休息',
    startTime: '',
    endTime: '',
    allDay: true,
    tag: 'blue',
    kind: 'question',
    done: true,
    important: false,
    deleted: false,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'q-2',
    title: '本周读书计划',
    date: '2026-08-12',
    description: '读完《深度工作》',
    startTime: '',
    endTime: '',
    allDay: true,
    tag: 'blue',
    kind: 'question',
    done: false,
    important: false,
    deleted: false,
    updatedAt: new Date().toISOString()
  }
];

function log(...a) { console.log('[verify]', ...a); }

const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 390, height: 780 } });

const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

await page.addInitScript((data) => {
  localStorage.setItem('calendarEvents', JSON.stringify(data));
}, seed);

const results = {};

// 1) 设置页：搜索分组 + 分段切换
await page.goto(`${BASE}/#/settings`, { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
results.settingsSeg = await page.locator('.set-search-seg').count();
results.segOptions = await page.locator('.set-search-seg .ant-segmented-item').count();
results.searchInput = await page.locator('.set-search-row input').count();

// 切到「搜索思考题」并输入关键字
await page.locator('.set-search-seg .ant-segmented-item').nth(1).click();
await page.waitForTimeout(300);
await page.locator('.set-search-row input').fill('专注');
await page.waitForTimeout(400);
results.questionResults = await page.locator('.set-search-result .search-result-item').count();
results.questionResultTitle = results.questionResults
  ? await page.locator('.set-search-result .search-result-item .sr-title').first().innerText()
  : null;

// 点击该思考题结果 → 应跳到 /todos 并打开详情
if (results.questionResults) {
  await page.locator('.set-search-result .search-result-item').first().click();
  await page.waitForTimeout(600);
  results.afterClickUrl = page.url();
  results.detailOpened = await page.locator('.q-detail-modal').count();
  results.detailTitle = results.detailOpened
    ? await page.locator('.q-detail-title').innerText().catch(() => null)
    : null;
  // 关闭详情
  await page.locator('.q-detail-modal .ant-modal-close').click().catch(() => {});
  await page.waitForTimeout(300);
}

// 2) 思考题页：无搜索框 + 绿色 FAB + 淡绿边框
await page.goto(`${BASE}/#/todos`, { waitUntil: 'networkidle' });
await page.waitForTimeout(700);
results.qSearchAbsent = (await page.locator('.q-search').count()) === 0;
results.qMainHeadAbsent = (await page.locator('.q-main-head').count()) === 0;
results.greenFab = (await page.locator('.fab.green').count()) === 1;
results.qCards = await page.locator('.q-card').count();
// 已完成卡片应有 .done 类（淡绿边框）
results.doneCards = await page.locator('.q-card.done').count();
// 不应再出现右上角绿方块
results.oldDotAbsent = (await page.locator('.q-dot.done').count()) === 0;
// 完成标签
results.doneTag = await page.locator('.q-card-done-tag').count();

// 3) 日历页左侧抽屉无搜索
await page.goto(`${BASE}/#/`, { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
// 打开抽屉（汉堡按钮通常在左上）
const burger = page.locator('.side-toggle, .hamburger, header button').first();
await burger.click().catch(() => {});
await page.waitForTimeout(400);
results.sidebarSearchAbsent = (await page.locator('.side-section-title', { hasText: '搜索' }).count()) === 0;

results.consoleErrors = errors;
console.log(JSON.stringify(results, null, 2));

await browser.close();
