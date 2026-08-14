// 一次性迁移：给 calendar_events 增加 reminder 列（jsonb），
// 修复「多提醒事件经云同步后被清空提醒、原生排期被 cancelAllScheduled 全部取消」的问题。
// 用法：node scripts/migrate-reminder.mjs
import fs from 'fs';

const secrets = JSON.parse(fs.readFileSync('.secrets.json', 'utf8'));
const ref = secrets.supabaseProjectRef;
const token = secrets.supabaseToken;

const sql = `ALTER TABLE public.calendar_events
  ADD COLUMN IF NOT EXISTS reminder jsonb NOT NULL DEFAULT '[]'::jsonb;`;

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
