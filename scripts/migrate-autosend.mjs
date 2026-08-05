// 一次性迁移：给 user_notify_settings 增加 auto_send / auto_send_time 两列
// 用法：node scripts/migrate-autosend.mjs
import fs from 'fs';

const secrets = JSON.parse(fs.readFileSync('.secrets.json', 'utf8'));
const ref = secrets.supabaseProjectRef;
const token = secrets.supabaseToken;

const sql = `ALTER TABLE user_notify_settings
  ADD COLUMN IF NOT EXISTS auto_send boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS auto_send_time text NOT NULL DEFAULT '04:00';`;

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
