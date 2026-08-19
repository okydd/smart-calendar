import { chromium } from 'file:///C:/Users/xuch/.workbuddy/binaries/node/workspace/node_modules/playwright-core/index.mjs';

const BASE = 'http://127.0.0.1:4173/';
const CHROME = 'C:/Users/xuch/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
let pass = 0, fail = 0;
const fails = [];
function check(name, ok, extra) {
  if (ok) { pass++; console.log('  ✓', name); }
  else { fail++; fails.push(name + (extra ? ' :: ' + extra : '')); console.log('  ✗', name, extra || ''); }
}

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: 390, height: 780 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  await page.goto(`${BASE}/#/calendar`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // 1) 底部导航 4 项且顺序正确
  const tabs = await page.$$eval('.tabbar-item', (els) => els.map((e) => e.textContent.replace(/\s+/g, '').trim()));
  console.log('tabbar =>', JSON.stringify(tabs));
  check('底部导航共 4 项', tabs.length === 4, JSON.stringify(tabs));
  check('顺序为 日历/思考题/知乎/设置',
    tabs.join('') === '日历思考题知乎设置', JSON.stringify(tabs));

  // 2) 点击「知乎」进入 /zhihu
  await page.click('.tabbar-item:nth-child(3)'); // 日历(1) 思考题(2) 知乎(3)
  await page.waitForTimeout(600);
  check('URL 包含 /zhihu', page.url().includes('/zhihu'));
  check('知乎页标题存在', !!(await page.$('.zhihu-head-title')));

  // 3) 列表卡片：点赞>1万 过滤 + 从高到低
  const cards = await page.$$('.zhihu-card');
  check('列表渲染卡片（示例 4 条）', cards.length === 4, '实际 ' + cards.length);

  const ranks = await page.$$eval('.zhihu-rank', (els) => els.map((e) => e.textContent.trim()));
  check('排名序号 1..4 连续', ranks.join(',') === '1,2,3,4', ranks.join(','));

  const votes = await page.$$eval('.zhihu-vote', (els) => els.map((e) => e.textContent.replace(/\s+/g, '').trim()));
  console.log('votes =>', JSON.stringify(votes));
  // 期望 18.6万赞 / 14.2万赞 / 11.3万赞 / 10.5万赞（从高到低）
  const order = votes.join('|');
  check('点赞按从高到低排列', order === '18.6万赞|14.2万赞|11.3万赞|10.5万赞', order);

  // 4) 点击首张卡片打开详情
  await page.click('.zhihu-card');
  await page.waitForTimeout(500);
  check('详情弹层出现', !!(await page.$('.zhihu-detail-modal')));
  const dq = await page.$eval('.zhihu-detail-q', (e) => e.textContent.trim()).catch(() => '');
  check('详情显示问题标题', dq.length > 0, dq);
  const paras = await page.$$('.zhihu-detail-p');
  check('详情正文有段落', paras.length >= 2, '段数 ' + paras.length);
  const dv = await page.$eval('.zhihu-detail-vote', (e) => e.textContent.replace(/\s+/g, '').trim()).catch(() => '');
  check('详情显示点赞数（万赞）', dv.includes('万赞'), dv);

  // 5) 关闭按钮
  await page.click('.zhihu-detail-close');
  await page.waitForTimeout(400);
  check('点关闭后详情关闭', !(await page.$('.zhihu-detail-modal')));

  // 6) 控制台零报错
  check('控制台无 error', errors.length === 0, errors.slice(0, 3).join(' || '));

  await browser.close();
  console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
  if (fail) { console.log('失败项：\n - ' + fails.join('\n - ')); process.exit(1); }
})().catch((e) => { console.error('脚本异常', e); process.exit(2); });
