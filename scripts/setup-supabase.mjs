/**
 * 一键配置 Supabase 云同步后端。
 *
 * 读取 .secrets.json 中的 supabaseToken，自动完成：
 *   1. 查询组织
 *   2. 创建（或复用）名为 smart-calendar 的免费项目
 *   3. 等待数据库就绪
 *   4. 建表 calendar_events + 行级安全策略 RLS
 *   5. 开启「注册即登录」（免邮箱验证）
 *   6. 取回 Project URL 与 anon key，写入 .secrets.json 与 .env.production
 *
 * 用法：node scripts/setup-supabase.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SECRETS = path.join(ROOT, '.secrets.json');
const API = 'https://api.supabase.com';

const PROJECT_NAME = 'smart-calendar';
const REGION = 'ap-northeast-1'; // 东京，国内访问延迟较低

const SQL = `
create table if not exists public.calendar_events (
  id          text        not null,
  user_id     uuid        not null references auth.users(id) on delete cascade,
  title       text        not null default '',
  date        text        not null default '',
  start_time  text        not null default '',
  end_time    text        not null default '',
  all_day     boolean     not null default false,
  description text        not null default '',
  tag         text        not null default 'purple',
  done        boolean     not null default false,
  deleted     boolean     not null default false,
  important   boolean     not null default false,
  images      jsonb       not null default '[]'::jsonb,
  updated_at  timestamptz not null default now(),
  primary key (user_id, id)
);

alter table public.calendar_events enable row level security;

drop policy if exists "read own"   on public.calendar_events;
drop policy if exists "insert own" on public.calendar_events;
drop policy if exists "update own" on public.calendar_events;
drop policy if exists "delete own" on public.calendar_events;

create policy "read own"   on public.calendar_events
  for select using (auth.uid() = user_id);
create policy "insert own" on public.calendar_events
  for insert with check (auth.uid() = user_id);
create policy "update own" on public.calendar_events
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "delete own" on public.calendar_events
  for delete using (auth.uid() = user_id);

create index if not exists calendar_events_user_updated_idx
  on public.calendar_events (user_id, updated_at desc);

-- 通知设置（每用户一份，跨设备云端同步）
create table if not exists public.user_notify_settings (
  user_id            uuid        primary key references auth.users(id) on delete cascade,
  email_target       text        not null default '',
  emailjs_service_id text        not null default '',
  emailjs_template_id text       not null default '',
  emailjs_public_key text        not null default '',
  wechat_send_key    text        not null default '',
  auto_send          boolean     not null default false,
  auto_send_time     text        not null default '04:00',
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

/* ---------- 工具 ---------- */
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
function writeSecrets(o) {
  fs.writeFileSync(SECRETS, JSON.stringify(o, null, 2), 'utf8');
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

/* ---------- 主流程 ---------- */
async function main() {
  const secrets = readSecrets();
  TOKEN = (secrets.supabaseToken || '').trim();
  if (!TOKEN) die('.secrets.json 中缺少 supabaseToken');

  // 1. 组织
  log('查询 Supabase 组织…');
  const orgs = await api('GET', '/v1/organizations');
  if (!orgs.ok) die(`无法读取组织（HTTP ${orgs.status}）：${JSON.stringify(orgs.data)}`);
  if (!Array.isArray(orgs.data) || orgs.data.length === 0) {
    die('账号下没有组织，请先在 supabase.com 网页上完成初始引导');
  }
  const org = orgs.data[0];
  log(`使用组织：${org.name} (${org.id})`);

  // 2. 项目：先找同名，没有则创建
  log('检查已有项目…');
  const list = await api('GET', '/v1/projects');
  if (!list.ok) die(`无法读取项目列表（HTTP ${list.status}）：${JSON.stringify(list.data)}`);
  let project = (list.data || []).find((p) => p.name === PROJECT_NAME);

  if (project) {
    log(`复用已存在的项目：${project.name} (${project.id})`);
  } else {
    const dbPass =
      secrets.supabaseDbPassword ||
      crypto.randomBytes(18).toString('base64').replace(/[+/=]/g, 'A');
    log(`创建新项目 ${PROJECT_NAME}（区域 ${REGION}）…`);
    const created = await api('POST', '/v1/projects', {
      name: PROJECT_NAME,
      organization_id: org.id,
      plan: 'free',
      region: REGION,
      db_pass: dbPass
    });
    if (!created.ok) {
      die(`创建项目失败（HTTP ${created.status}）：${JSON.stringify(created.data)}`);
    }
    project = created.data;
    secrets.supabaseDbPassword = dbPass;
    writeSecrets(secrets);
    log(`项目已创建：${project.id}（数据库密码已保存到 .secrets.json）`);
  }

  const ref = project.id || project.ref;
  if (!ref) die('未能取得项目 ref');

  // 3. 等待就绪
  log('等待数据库启动（首次创建约需 1~3 分钟）…');
  let healthy = false;
  for (let i = 0; i < 60; i++) {
    const cur = await api('GET', '/v1/projects');
    const p = (cur.data || []).find((x) => x.id === ref);
    const st = p?.status || 'UNKNOWN';
    if (st === 'ACTIVE_HEALTHY') {
      healthy = true;
      break;
    }
    if (i % 3 === 0) log(`  状态：${st}（已等待 ${i * 10}s）`);
    await sleep(10000);
  }
  if (!healthy) die('数据库启动超时，请稍后重新运行本脚本（项目已创建，会自动复用）');
  log('数据库已就绪');

  // 4. 建表 + RLS（新项目 API 网关可能稍滞后，做重试）
  log('创建数据表与安全策略…');
  let sqlOk = false;
  for (let i = 0; i < 10; i++) {
    const r = await api('POST', `/v1/projects/${ref}/database/query`, { query: SQL });
    if (r.ok) {
      sqlOk = true;
      break;
    }
    if (i === 0) log(`  等待 SQL 接口可用…（HTTP ${r.status}）`);
    await sleep(10000);
  }
  if (!sqlOk) die('建表失败，请把 SETUP.md 里的 SQL 手动粘贴到 Supabase SQL Editor 执行');
  log('数据表 calendar_events 与 RLS 策略已就绪');

  // 5. 注册即登录（免邮箱验证），失败不阻断
  log('配置注册方式（免邮箱验证）…');
  const auth = await api('PATCH', `/v1/projects/${ref}/config/auth`, {
    mailer_autoconfirm: true
  });
  log(auth.ok ? '  已开启注册即登录' : `  跳过（HTTP ${auth.status}，可在网页后台手动关闭邮箱验证）`);

  // 6. 取 anon key
  log('读取 anon public key…');
  let anonKey = '';
  for (const suffix of ['?reveal=true', '']) {
    const r = await api('GET', `/v1/projects/${ref}/api-keys${suffix}`);
    if (r.ok && Array.isArray(r.data)) {
      const k = r.data.find((x) => x.name === 'anon' || x.type === 'anon');
      if (k) {
        anonKey = k.api_key || k.apiKey || k.key || '';
        if (anonKey) break;
      }
    }
  }
  if (!anonKey) die('未能读取 anon key，请到 Supabase 后台 Settings → API 手动复制');

  const url = `https://${ref}.supabase.co`;

  // 7. 落盘
  secrets.supabaseProjectRef = ref;
  secrets.supabaseUrl = url;
  secrets.supabaseAnonKey = anonKey;
  writeSecrets(secrets);

  fs.writeFileSync(
    path.join(ROOT, '.env.production'),
    `# 由 scripts/setup-supabase.mjs 自动生成\n` +
      `# anon key 属于公开密钥，配合数据库 RLS 策略使用，可安全提交到仓库\n` +
      `VITE_SUPABASE_URL=${url}\n` +
      `VITE_SUPABASE_ANON_KEY=${anonKey}\n`,
    'utf8'
  );

  console.log('\n✓ Supabase 配置完成');
  console.log(`  Project URL : ${url}`);
  console.log(`  anon key    : ${anonKey.slice(0, 24)}…（完整值已写入 .env.production）`);
  console.log(`  后台地址    : https://supabase.com/dashboard/project/${ref}`);
}

main().catch((e) => die(e?.stack || String(e)));
