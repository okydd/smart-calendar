/**
 * 仅为「已存在」的 Supabase 项目补建 user_notify_settings 表（通知设置云端同步用）。
 *
 * 该表独立于日历事件，是「每用户一份」的配置表：
 *   主键 user_id（关联 auth.users）
 *   + 各通知字段 + RLS（auth.uid() = user_id）
 *
 * 用法：node scripts/setup-notify-table.mjs
 * 依赖 .secrets.json 中的 supabaseToken 与 supabaseProjectRef。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SECRETS = path.join(ROOT, '.secrets.json');
const API = 'https://api.supabase.com';

const SQL = `
create table if not exists public.user_notify_settings (
  user_id            uuid        primary key references auth.users(id) on delete cascade,
  email_target       text        not null default '',
  emailjs_service_id text        not null default '',
  emailjs_template_id text       not null default '',
  emailjs_public_key text        not null default '',
  wechat_send_key    text        not null default '',
  updated_at         timestamptz not null default now()
);

alter table public.user_notify_settings enable row level security;

drop policy if exists "notify read own"   on public.user_notify_settings;
drop policy if exists "notify insert own" on public.user_notify_settings;
drop policy if exists "notify update own" on public.user_notify_settings;

create policy "notify read own"   on public.user_notify_settings
  for select using (auth.uid() = user_id);
create policy "notify insert own" on public.user_notify_settings
  for insert with check (auth.uid() = user_id);
create policy "notify update own" on public.user_notify_settings
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
`;

const log = (...a) => console.log('•', ...a);
const die = (m) => {
  console.error('\n✗ ' + m);
  process.exit(1);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function readSecrets() {
  if (!fs.existsSync(SECRETS)) die(`未找到 ${SECRETS}，请先创建并填入令牌`);
  return JSON.parse(fs.readFileSync(SECRETS, 'utf8'));
}

let TOKEN = '';
async function api(method, urlPath, body) {
  const res = await fetch(API + urlPath, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  return { ok: res.ok, status: res.status, data };
}

async function main() {
  const secrets = readSecrets();
  TOKEN = (secrets.supabaseToken || '').trim();
  if (!TOKEN) die('.secrets.json 中缺少 supabaseToken');
  const ref = secrets.supabaseProjectRef;
  if (!ref) die('.secrets.json 中缺少 supabaseProjectRef（请先运行 scripts/setup-supabase.mjs）');

  log(`对项目 ${ref} 创建 user_notify_settings 表…`);
  let ok = false;
  for (let i = 0; i < 12; i++) {
    const r = await api('POST', `/v1/projects/${ref}/database/query`, { query: SQL });
    if (r.ok) {
      ok = true;
      break;
    }
    const detail = r.data ? JSON.stringify(r.data).slice(0, 160) : '';
    log(`  重试（HTTP ${r.status}）${detail}`);
    await sleep(8000);
  }
  if (!ok) die('建表失败，可稍后重试，或手动到 Supabase SQL Editor 执行本脚本中的 SQL');

  console.log('\n✓ user_notify_settings 表与 RLS 策略已就绪');
  console.log('  前端登录同一账号后，通知设置将自动在设备间同步。');
}

main().catch((e) => die(e?.stack || String(e)));
