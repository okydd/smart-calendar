// 一次性迁移：给 calendar_events 增加 kind 列（text），
// 支持「思考题」作为独立数据类型与日历事件分开存储/同步。
// 用法：node scripts/migrate-kind.mjs
import fs from 'fs';

const secrets = JSON.parse(fs.readFileSync('.secrets.json', 'utf8'));
const ref = secrets.supabaseProjectRef;
const token = secrets.supabaseToken;

const sql = `ALTER TABLE public.calendar_events
  ADD COLUMN IF NOT EXISTS kind text NOT NULL DEFAULT 'event';`;

const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'x-client-info': 'smart-calendar-migrate'
  },
  body: JSON.stringify({ query: sql })
});

const text = await res.text();
console.log('HTTP', res.status);
console.log(text.slice(0, 500));
