// 一次性迁移：给 calendar_events 增加 important / images 两列，
// 修复「电脑端加的图片 / 重要标记在手机端看不到」的跨设备同步丢字段问题。
// 用法：node scripts/migrate-images.mjs
import fs from 'fs';

const secrets = JSON.parse(fs.readFileSync('.secrets.json', 'utf8'));
const ref = secrets.supabaseProjectRef;
const token = secrets.supabaseToken;

const sql = `ALTER TABLE public.calendar_events
  ADD COLUMN IF NOT EXISTS important boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS images jsonb NOT NULL DEFAULT '[]'::jsonb;`;

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
