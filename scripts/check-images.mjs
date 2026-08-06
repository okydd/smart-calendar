// 诊断：查看云端 calendar_events 的 images 列现状（是否真的有图片数据）
// 用法：node scripts/check-images.mjs
import fs from 'fs';

const secrets = JSON.parse(fs.readFileSync('.secrets.json', 'utf8'));
const ref = secrets.supabaseProjectRef;
const token = secrets.supabaseToken;

async function q(sql) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ query: sql })
  });
  const text = await res.text();
  return { status: res.status, text };
}

// 1) 列结构
const cols = await q(
  `select column_name, data_type from information_schema.columns
   where table_schema='public' and table_name='calendar_events' order by ordinal_position;`
);
console.log('--- 列结构 ---', cols.status);
console.log(cols.text);

// 2) 每条事件的图片数量与标题（不打印图片内容）
const rows = await q(
  `select title, date, important,
          jsonb_array_length(coalesce(images,'[]'::jsonb)) as img_count,
          length(images::text) as img_bytes,
          updated_at
   from public.calendar_events
   where coalesce(deleted,false) = false
   order by updated_at desc limit 40;`
);
console.log('--- 事件图片统计 ---', rows.status);
console.log(rows.text);
