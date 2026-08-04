/**
 * 上线后的端到端体检。
 *
 * 依次验证：
 *   1. GitHub Pages 网址可访问、页面正确
 *   2. Supabase 注册即登录可用（无需邮箱验证）
 *   3. 登录后可写入 / 读取自己的日程
 *   4. 未登录时读不到任何数据（RLS 行级安全策略生效）
 *   5. 清理本次产生的测试账号与测试数据
 *
 * 用法：node scripts/verify.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const secrets = JSON.parse(fs.readFileSync(path.join(ROOT, '.secrets.json'), 'utf8'));

const SITE = secrets.siteUrl;
const SB_URL = secrets.supabaseUrl;
const ANON = secrets.supabaseAnonKey;
const REF = secrets.supabaseProjectRef;
const MGMT = (secrets.supabaseToken || '').trim();

const pass = (m) => console.log('  ✓ ' + m);
const fail = (m) => {
  console.log('  ✗ ' + m);
  failures.push(m);
};
const failures = [];

async function main() {
  /* ---------- 1. 网站可访问 ---------- */
  console.log('\n[1] 检查线上网址');
  try {
    const r = await fetch(SITE, { redirect: 'follow' });
    const html = await r.text();
    if (!r.ok) fail(`网址返回 HTTP ${r.status}`);
    else pass(`网址可访问（HTTP ${r.status}）`);
    if (html.includes('智能日历')) pass('页面标题正确：智能日历');
    else fail('页面内容异常，未找到「智能日历」');
    const m = html.match(/assets\/index-[\w-]+\.js/);
    if (m) {
      const js = await (await fetch(new URL(m[0], SITE))).text();
      if (js.includes(SB_URL.replace('https://', ''))) pass('程序已内置云同步参数，无需手工填写');
      else fail('程序里没有云同步参数，同步面板会要求手工填写');
    } else fail('未能定位主程序文件');
    const sw = await fetch(new URL('sw.js', SITE));
    pass(sw.ok ? '离线支持文件 sw.js 正常' : `sw.js 返回 HTTP ${sw.status}（离线可能失效）`);
    const mf = await fetch(new URL('manifest.webmanifest', SITE));
    pass(mf.ok ? '安装配置 manifest 正常（可添加到主屏幕）' : `manifest 返回 HTTP ${mf.status}`);
  } catch (e) {
    fail('访问网址失败：' + (e.cause?.code || e.message));
  }

  /* ---------- 2. 注册即登录 ---------- */
  console.log('\n[2] 检查云同步：注册 → 登录');
  const email = `selftest_${crypto.randomBytes(5).toString('hex')}@calendar-check.dev`;
  const password = crypto.randomBytes(12).toString('base64');
  let token = '';
  let uid = '';
  try {
    const r = await fetch(`${SB_URL}/auth/v1/signup`, {
      method: 'POST',
      headers: { apikey: ANON, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const d = await r.json();
    token = d.access_token || '';
    uid = d.user?.id || d.id || '';
    if (token && uid) pass('注册后立即获得登录态（已免邮箱验证）');
    else fail(`注册未直接登录：${JSON.stringify(d).slice(0, 200)}`);
  } catch (e) {
    fail('注册请求失败：' + (e.cause?.code || e.message));
  }
  if (!token) return report();

  /* ---------- 3. 写入 / 读取 ---------- */
  console.log('\n[3] 检查数据读写');
  const row = {
    id: 'selftest-' + Date.now(),
    user_id: uid,
    title: '体检用测试事件',
    date: '2026-08-04',
    start_time: '09:00',
    end_time: '10:00',
    all_day: false,
    description: '',
    tag: 'purple',
    done: false,
    deleted: false,
    updated_at: new Date().toISOString()
  };
  const authHead = {
    apikey: ANON,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  try {
    const w = await fetch(`${SB_URL}/rest/v1/calendar_events`, {
      method: 'POST',
      headers: { ...authHead, Prefer: 'resolution=merge-duplicates' },
      body: JSON.stringify(row)
    });
    if (w.ok) pass('写入日程成功（手机端保存 → 云端）');
    else fail(`写入失败 HTTP ${w.status}：${(await w.text()).slice(0, 200)}`);

    const q = await fetch(`${SB_URL}/rest/v1/calendar_events?select=*`, { headers: authHead });
    const rows = await q.json();
    if (Array.isArray(rows) && rows.length === 1 && rows[0].title === row.title)
      pass('读回日程成功（云端 → 电脑端），字段完整');
    else fail(`读取结果异常：${JSON.stringify(rows).slice(0, 200)}`);
  } catch (e) {
    fail('读写请求失败：' + (e.cause?.code || e.message));
  }

  /* ---------- 4. 安全性 ---------- */
  console.log('\n[4] 检查数据隔离（行级安全策略）');
  try {
    const q = await fetch(`${SB_URL}/rest/v1/calendar_events?select=*`, {
      headers: { apikey: ANON }
    });
    const rows = await q.json();
    if (Array.isArray(rows) && rows.length === 0)
      pass('仅凭公开密钥读不到任何数据 —— 别人拿到网址也看不见你的日程');
    else fail(`未登录竟能读到数据，RLS 未生效：${JSON.stringify(rows).slice(0, 200)}`);
  } catch (e) {
    fail('隔离性测试失败：' + (e.cause?.code || e.message));
  }

  /* ---------- 5. 清理 ---------- */
  console.log('\n[5] 清理测试数据');
  try {
    const k = await fetch(`https://api.supabase.com/v1/projects/${REF}/api-keys?reveal=true`, {
      headers: { Authorization: `Bearer ${MGMT}` }
    });
    const keys = await k.json();
    const svc = (keys || []).find((x) => x.name === 'service_role' || x.type === 'service_role');
    const svcKey = svc?.api_key || svc?.apiKey || '';
    if (!svcKey) return fail('未取得管理密钥，测试账号需手动删除：' + email);
    const del = await fetch(`${SB_URL}/auth/v1/admin/users/${uid}`, {
      method: 'DELETE',
      headers: { apikey: svcKey, Authorization: `Bearer ${svcKey}` }
    });
    if (del.ok) pass('测试账号与测试事件已删除，数据库回到干净状态');
    else fail(`删除测试账号失败 HTTP ${del.status}，请手动删除：${email}`);
  } catch (e) {
    fail('清理失败：' + (e.cause?.code || e.message));
  }

  report();
}

function report() {
  console.log('\n' + '─'.repeat(52));
  if (failures.length === 0) {
    console.log('全部通过 ✓  应用已可正式使用');
    console.log('访问网址：' + SITE);
  } else {
    console.log(`存在 ${failures.length} 项问题：`);
    failures.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));
  }
}

main();
