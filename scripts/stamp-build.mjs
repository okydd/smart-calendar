#!/usr/bin/env node
/**
 * 构建后打时间戳：
 * 1) 把 dist/sw.js 里的 __BUILD_TIME__ 替换为本次构建时间 → 缓存名每次都变，强制淘汰旧缓存；
 * 2) 重写 dist/version.json → 前端启动时对比版本号，发现新版自动刷新。
 *
 * 说明：version.json 必须在构建时生成，不能依赖 public/version.json 手动维护，
 *      否则 CI 重新构建会把线上版本号退回到旧值。
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');

const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
// 统一按北京时间（UTC+8）输出，便于人工核对
const bj = new Date(now.getTime() + (8 * 60 + now.getTimezoneOffset()) * 60000);
const fallback =
  `${bj.getFullYear()}-${pad(bj.getMonth() + 1)}-${pad(bj.getDate())}` +
  `T${pad(bj.getHours())}:${pad(bj.getMinutes())}:${pad(bj.getSeconds())}+08:00`;

// 优先复用 vite.config.ts 在构建开始时写入的版本号，
// 保证「打进代码里的版本」和「version.json 里的版本」完全一致。
let version = fallback;
try {
  const stampFile = path.join(ROOT, '.build-version');
  const v = fs.readFileSync(stampFile, 'utf8').trim();
  if (v) version = v;
} catch {
  /* 没有就用当前时间 */
}

// 1) Service Worker 缓存名
const swPath = path.join(DIST, 'sw.js');
if (fs.existsSync(swPath)) {
  const stamp = now.toISOString().replace(/[:.]/g, '-');
  fs.writeFileSync(swPath, fs.readFileSync(swPath, 'utf8').replace(/__BUILD_TIME__/g, stamp));
  console.log('SW build time:', stamp);
}

// 2) 版本文件
fs.writeFileSync(
  path.join(DIST, 'version.json'),
  JSON.stringify({ version, buildTime: version }, null, 2) + '\n'
);
console.log('version:', version);
