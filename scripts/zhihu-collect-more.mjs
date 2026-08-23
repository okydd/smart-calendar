// 扩采多样类型高赞回答（路线B）：覆盖情感/职场/理财/健康/科技/历史/心理/生活等，
// 与 zhihu-collect-gentle.mjs 逻辑一致，仅替换 QUERIES 为多样化词、TARGET=100。
// 增量落库（APPEND 现有库），筛选 voteupCount≥MIN(10000)，达标即停。
import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const NODE = 'C:/Users/xuch/.workbuddy/binaries/node/versions/22.22.2/node.exe';
const CLI = 'C:/Users/xuch/.workbuddy/binaries/node/workspace/node_modules/zhihu-cli/scripts/cli.js';
const MIN = Number(process.env.MIN_VOTE || 10000);
const COOLDOWN = Number(process.env.COOLDOWN || 60);
const GAP = Number(process.env.GAP || 3000);
const CHUNK = Number(process.env.CHUNK || 10);
const CHUNK_SLEEP = Number(process.env.CHUNK_SLEEP || 180);
const TARGET = Number(process.env.TARGET || 100);
const outDir = join(__dirname, '..', 'data');

function grade(v) {
  if (v >= 100000) return 'SSS';
  if (v >= 50000) return 'SS';
  if (v >= 20000) return 'S';
  return 'A';
}
function runCli(args) {
  const r = spawnSync(NODE, [CLI, ...args], { encoding: 'utf8', maxBuffer: 80 * 1024 * 1024 });
  if (r.error) return { __err: r.error.message };
  const out = (r.stdout || '').trim();
  const s = out.indexOf('{');
  if (s < 0) return null;
  try { return JSON.parse(out.slice(s)); } catch { return null; }
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function save(seen, errCount, note) {
  const all = [...seen.values()].sort((a, b) => b.voteupCount - a.voteupCount);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'zhihu-db.json'),
    JSON.stringify({ version: 2, source: 'zhihu-cli', minVote: MIN, total: all.length, fetched: false, generatedAt: new Date().toISOString(), incremental: true, lastNote: note, items: all }, null, 2));
  console.log(`[save@${new Date().toLocaleTimeString('zh-CN')}] 累计 ${all.length} 条 (错误 ${errCount})`);
}

// 多样化类型 query（避免自我提升类扎堆），覆盖情感/职场/理财/健康/科技/历史/心理/生活
const QUERIES = [
  // 情感
  '恋爱', '感情', '分手', '婚姻', '异地恋', '如何脱单', '喜欢的人', '相亲', '亲密关系',
  // 职场
  '职场', '面试', '升职', '跳槽', '同事关系', '领导', '工作压力', '职业规划', '第一份工作',
  // 理财
  '理财', '投资', '基金', '股票', '存钱', '赚钱', '财务自由', '消费观', '通货膨胀',
  // 健康
  '健身', '减肥', '跑步', '睡眠', '养生', '饮食', '运动', '颈椎病', '护眼',
  // 科技
  '人工智能', '编程', 'Python', '前端开发', '算法', 'ChatGPT', '大数据', '程序员',
  // 历史
  '历史', '中国历史', '三国', '唐朝', '明朝', '历史人物', '宋朝',
  // 心理
  '心理学', '抑郁', '原生家庭', '性格', '内向', '情商', '自信心',
  // 生活
  '旅行', '美食', '做饭', '电影推荐', '摄影', '护肤', '穿搭',
  // 思维/成长补充
  '认知升级', '决策', '人脉', '副业', '英语口语', '考研', '沟通技巧',
];

const seen = new Map();
let errCount = 0;
try {
  const old = JSON.parse(readFileSync(join(outDir, 'zhihu-db.json'), 'utf8'));
  for (const r of old.items || []) if (r.contentId) seen.set(String(r.contentId), r);
  if (seen.size) console.log(`[append] 预填 ${seen.size} 条已有记录`);
} catch { /* 无旧库 */ }

async function collectQuery(q) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const json = runCli(['search', '-q', q, '--type', 'general', '--limit', '50', '--answers', '10', '--offset', '0']);
    if (json && json.ok === true) {
      let hit = 0, ans = 0;
      for (const it of json.data || []) {
        for (const a of it.answers || []) {
          ans++;
          const v = Number(a.voteupCount || 0);
          if (v < MIN) continue;
          const id = String(a.id);
          if (seen.has(id)) continue;
          seen.set(id, {
            contentId: id, type: 'answer',
            questionId: a.questionId || null, questionTitle: a.questionTitle || '',
            title: a.questionTitle || '', author: a.author?.name || '', authorToken: a.author?.urlToken || '',
            excerpt: (a.excerpt || '').replace(/\s+/g, ' ').slice(0, 400),
            voteupCount: v, commentCount: Number(a.commentCount || 0),
            url: a.url || '', grade: grade(v), query: q, collectedAt: new Date().toISOString(),
          });
          hit++;
        }
      }
      if (hit > 0 || ans > 0) console.log(`  "${q}" 新增≥${MIN}:${hit} (累计${seen.size})`);
      return true;
    }
    const msg = json?.error?.message || json?.__err || 'null';
    errCount++;
    console.log(`  "${q}" 限频/错误(${attempt + 1}/3): ${String(msg).slice(0, 50)} → 退避${attempt < 2 ? 45 : 0}s`);
    if (attempt < 2) await sleep(45000);
  }
  return false;
}

console.log(`[start] 冷却 ${COOLDOWN}s | queries=${QUERIES.length} minVote=${MIN} target=${TARGET} chunk=${CHUNK}`);
await sleep(COOLDOWN * 1000);

for (let i = 0; i < QUERIES.length; i += CHUNK) {
  const batch = QUERIES.slice(i, i + CHUNK);
  console.log(`\n=== 批次 ${Math.floor(i / CHUNK) + 1} (${i + 1}..${Math.min(i + CHUNK, QUERIES.length)}/${QUERIES.length}) ===`);
  for (const q of batch) {
    await collectQuery(q);
    await sleep(GAP);
    if (seen.size >= TARGET) { console.log(`\n[target] 已达 ${TARGET} 篇，提前停止`); save(seen, errCount, 'reached target'); process.exit(0); }
  }
  save(seen, errCount, `batch ${Math.floor(i / CHUNK) + 1} done`);
  if (i + CHUNK < QUERIES.length) { console.log(`[chunk sleep] ${CHUNK_SLEEP}s 等窗口...`); await sleep(CHUNK_SLEEP * 1000); }
}

save(seen, errCount, 'all queries done');
console.log(`\n[done] 去重后≥${MIN}赞总数: ${seen.size}  错误: ${errCount}`);
