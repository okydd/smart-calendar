// 一次性初始化：为事件图片创建 Supabase Storage 公开桶 + RLS 策略。
// 桶公开可读（邮件 <img> 需免登录加载），写入/删除仅限已登录用户。
// 用法：node scripts/setup-storage.mjs
import fs from 'fs';

const secrets = JSON.parse(fs.readFileSync('.secrets.json', 'utf8'));
const ref = secrets.supabaseProjectRef;
const token = secrets.supabaseToken;

const stmts = [
  `insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
   values ('event-images', 'event-images', true, 5242880, '{image/png,image/jpeg,image/webp}')
   on conflict (id) do update set public = true, file_size_limit = 5242880;`,

  `drop policy if exists "event-images public read" on storage.objects;`,
  `create policy "event-images public read" on storage.objects
     for select using (bucket_id = 'event-images');`,

  `drop policy if exists "event-images auth insert" on storage.objects;`,
  `create policy "event-images auth insert" on storage.objects
     for insert with check (bucket_id = 'event-images' and auth.role() = 'authenticated');`,

  `drop policy if exists "event-images auth delete" on storage.objects;`,
  `create policy "event-images auth delete" on storage.objects
     for delete using (bucket_id = 'event-images' and auth.role() = 'authenticated');`
];

async function run(sql) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'x-client-info': 'smart-calendar-setup-storage'
    },
    body: JSON.stringify({ query: sql })
  });
  const text = await res.text();
  console.log('HTTP', res.status, '|', sql.slice(0, 60).replace(/\s+/g, ' '));
  if (res.status >= 400) console.log('  ->', text.slice(0, 400));
}

for (const s of stmts) {
  await run(s);
}
console.log('done');
