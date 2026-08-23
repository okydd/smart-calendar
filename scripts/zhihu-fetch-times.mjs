// 补采知乎回答的发布/编辑时间（createdTime/updatedTime，Unix 秒），知乎 API 已返回，仅回填缺失项。
// 速率：每条间睡 GAP；每 CHUNK 条后睡 CHUNK_SLEEP（等限频窗口）；失败 45s 退避重试 3 次，最终失败跳过。
// 断点续跑：已有 createdTime 的记录自动跳过，可反复重跑补齐失败的。
import { spawnSync } from 'node:child_process';
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const NODE = 'C:/Users/xuch/.workbuddy/binaries/node/versions/22.22.2/node.exe';
const CLI = 'C:/Users/xuch/.workbuddy/binaries/node/workspace/node_modules/zhihu-cli/scripts/cli.js';
const GAP = Number(process.env.GAP || 3500);
const CHUNK = Number(process.env.CHUNK || 12);
const CHUNK_SLEEP = Number(process.env.CHUNK_SLEEP || 150);
const outDir = join(__dirname, '..', 'data');

function runCli(args) {
  const r = spawnSync(NODE, [CLI, ...args], { encoding: 'utf8', maxBuffer: 120 * 1024 * 1024 });
  if (r.error) return { __err: r.error.message };
  const out = (r.stdout || '').trim();
  const s = out.indexOf('{');
  if (s < 0) return null;
  try { return JSON.parse(out.slice(s)); } catch { return null; }
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
async function fetchWithRetry(args, label) {
  for (let i = 0; i < 3; i++) {
    const j = runCli(args);
    if (j && j.ok === true && j.data) return j.data;
    const msg = String(j?.error?.message || j?.__err || 'null').slice(0, 60);
    if (i < 2) { console.log(`    [${label}] 限频/错误(${i + 1}/3): ${msg} → 退避45s`); await sleep(45000); }
    else console.log(`    [${label}] 最终失败: ${msg}`);
  }
  return null;
}
function save(items, note) {
  const all = [...items].sort((a, b) => b.voteupCount - a.voteupCount);
  mkdirSync(outDir, { recursive: true });
  const meta = JSON.parse(readFileSync(join(outDir, 'zhihu-db.json'), 'utf8'));
  writeFileSync(join(outDir, 'zhihu-db.json'),
    JSON.stringify({ ...meta, total: all.length, generatedAt: new Date().toISOString(), lastNote: note, items: all }, null, 2));
}

const db = JSON.parse(readFileSync(join(outDir, 'zhihu-db.json'), 'utf8'));
let items = db.items || [];
let todo = items.filter(r => !r.createdTime && !r.updatedTime);
console.log(`[start] 待补时间: ${todo.length} 条 | 已有时间 ${items.filter(r => r.createdTime || r.updatedTime).length}/${items.length} | gap=${GAP} chunk=${CHUNK} sleep=${CHUNK_SLEEP}`);

let done = 0, fail = 0;
for (let i = 0; i < todo.length; i += CHUNK) {
  const batch = todo.slice(i, i + CHUNK);
  console.log(`\n=== 批次 ${Math.floor(i / CHUNK) + 1} (${i + 1}..${Math.min(i + CHUNK, todo.length)})/${todo.length} ===`);
  for (const rec of batch) {
    const data = await fetchWithRetry(['answer', rec.contentId], 'time');
    if (data) {
      if (data.createdTime) rec.createdTime = data.createdTime;
      if (data.updatedTime) rec.updatedTime = data.updatedTime;
      done++;
      console.log(`  ✓ ${rec.contentId} created=${rec.createdTime} updated=${rec.updatedTime}`);
    } else { fail++; console.log(`  ✗ ${rec.contentId} 失败`); }
    await sleep(GAP);
    save(items, `time batch ${Math.floor(i / CHUNK) + 1}`);
  }
  if (i + CHUNK < todo.length) { console.log(`[chunk sleep] ${CHUNK_SLEEP}s 等窗口...`); await sleep(CHUNK_SLEEP * 1000); }
}
console.log(`\n[done] 时间补齐 ${done}，失败 ${fail}；累计有时间 ${items.filter(r => r.createdTime || r.updatedTime).length}/${items.length}`);
save(items, 'fetch-times complete');
