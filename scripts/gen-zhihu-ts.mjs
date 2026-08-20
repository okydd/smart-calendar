// 把 data/zhihu-db.json（路线B：zhihu-cli 登录态 API 真实采集）转为 src/data/zhihu.ts
// 用法：node scripts/gen-zhihu-ts.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const db = JSON.parse(readFileSync(join(root, 'data', 'zhihu-db.json'), 'utf8'));

const items = (db.items || [])
  .filter((r) => r && r.voteupCount >= (db.minVote || 10000))
  .sort((a, b) => b.voteupCount - a.voteupCount);

const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();

function emitAnswer(a) {
  const lines = [];
  lines.push('  {');
  lines.push(`    id: ${JSON.stringify(a.contentId)},`);
  lines.push(`    question: ${JSON.stringify(a.questionTitle || a.title)},`);
  lines.push(`    author: ${JSON.stringify(a.author)},`);
  lines.push(`    voteUp: ${a.voteupCount},`);
  if (a.excerpt) lines.push(`    excerpt: ${JSON.stringify(a.excerpt)},`);
  // 正文按 \n 分段（DB 中已是纯文本换行）
  lines.push(`    content: ${JSON.stringify(a.content || '')},`);
  if (a.link) lines.push(`    link: ${JSON.stringify(a.link)},`);
  if (a.grade) lines.push(`    grade: ${JSON.stringify(a.grade)},`);
  if (typeof a.commentCount === 'number') lines.push(`    commentCount: ${a.commentCount},`);
  const cmts = (a.comments || []).filter((c) => c && c.content);
  if (cmts.length) {
    lines.push('    comments: [');
    for (const c of cmts) {
      lines.push(
        `      { author: ${JSON.stringify(clean(c.author) || '(匿名)')}, content: ${JSON.stringify(
          c.content
        )}, voteCount: ${c.voteCount || 0} },`
      );
    }
    lines.push('    ],');
  }
  lines.push('  }');
  return lines.join('\n');
}

const header = `// 知乎高赞回答内容（本地收藏，不进云同步）。
// 维护方式：本文件由 scripts/gen-zhihu-ts.mjs 从 data/zhihu-db.json 自动生成，
// 亦可直接手改。界面仅展示 voteUp > 10000 的回答，并按点赞从高到低排列。
//
// 数据来源：知乎官方开放平台 / zhihu-cli 登录态 API 真实采集（非转载、非虚构），
// 每条均含完整正文与精选评论（按赞排序），link 指向知乎原文。

export interface ZhihuComment {
  /** 评论者昵称（无则「(匿名)」） */
  author: string;
  /** 评论正文 */
  content: string;
  /** 评论点赞数 */
  voteCount: number;
}

export interface ZhihuAnswer {
  /** 唯一 ID（取自知乎 ContentID） */
  id: string;
  /** 问题标题 */
  question: string;
  /** 答主昵称 */
  author: string;
  /** 点赞数（次） */
  voteUp: number;
  /** 列表摘要（可选） */
  excerpt?: string;
  /** 回答正文，'\\n' 分段 */
  content: string;
  /** 知乎原文链接 */
  link?: string;
  /** 分级：SSS(≥10万) / SS(≥5万) / S(≥2万) / A(≥1万) */
  grade?: string;
  /** 知乎官方评论总数（非已抓取数） */
  commentCount?: number;
  /** 精选评论（已抓取的前 N 条，按赞排序） */
  comments?: ZhihuComment[];
}
`;

const array = items.map(emitAnswer).join(',\n');
const out =
  header + `\nexport const zhihuAnswers: ZhihuAnswer[] = [\n${array}\n];\n`;

writeFileSync(join(root, 'src', 'data', 'zhihu.ts'), out, 'utf8');
console.log(`[gen] 已生成 src/data/zhihu.ts，共 ${items.length} 篇`);
