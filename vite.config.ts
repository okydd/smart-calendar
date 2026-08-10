import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

/**
 * 构建版本号（北京时间）。
 * 同一个值会被：
 *  1) define 注入到前端代码里（__APP_VERSION__ = 当前运行的版本）；
 *  2) 写入根目录 .build-version，供 scripts/stamp-build.mjs 生成 dist/version.json
 *     （线上最新版本）。两边一致，前端才能正确判断「是否已是最新版」。
 */
function buildVersion(): string {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  const bj = new Date(now.getTime() + (8 * 60 + now.getTimezoneOffset()) * 60000)
  return (
    `${bj.getFullYear()}-${pad(bj.getMonth() + 1)}-${pad(bj.getDate())}` +
    `T${pad(bj.getHours())}:${pad(bj.getMinutes())}:${pad(bj.getSeconds())}+08:00`
  )
}

const APP_VERSION = buildVersion()
try {
  fs.writeFileSync(path.resolve(import.meta.dirname, '.build-version'), APP_VERSION)
} catch {
  /* 开发模式下写不了也不影响 */
}

/** 语义版本号（V主.次），来自 version-meta.json，供「版本历史 / 回退」展示 */
let APP_SEMVER = 'V1.0'
try {
  const metaRaw = fs.readFileSync(path.resolve(import.meta.dirname, 'version-meta.json'), 'utf8')
  const meta = JSON.parse(metaRaw)
  if (meta && typeof meta.semver === 'string') APP_SEMVER = meta.semver
} catch {
  /* 读不到用默认值 */
}

// https://vitejs.dev/config/
// base 使用相对路径 './'，这样无论部署在域名根目录还是
// GitHub Pages 的 /<仓库名>/ 子路径下，资源引用都能正确解析。
export default defineConfig({
  base: './',
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(APP_VERSION),
    __APP_SEMVER__: JSON.stringify(APP_SEMVER)
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false
  },
  build: {
    outDir: 'dist',
    // 本机沙箱环境下删除中文路径目录会失败，交由 CI / 手动清理
    emptyOutDir: false,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        /**
         * 拆分第三方依赖为多个中等体积的 chunk：
         * 1) 首屏与后续更新只需下载变化的部分，缓存命中率更高；
         * 2) 发布通道（GitHub API / 受限网络）对单个 >1MB 文件上传会失败，
         *    拆包后每个文件都在安全区间内；
         * 3) 把存在循环引用的 Ant Design / rc-component / @ant-design 生态
         *    合并为同一块，避免 chunk 间循环导致运行时模块初始化失败。
         */
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          // Ant Design 生态（含 rc-component）存在包间循环引用，必须同 chunk
          if (
            id.includes('/antd/') ||
            id.includes('/rc-') ||
            id.includes('@rc-component') ||
            id.includes('@ant-design')
          ) {
            return 'vendor-antd';
          }
          // React 全家桶 + 路由层
          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/scheduler/') ||
            id.includes('/react-router') ||
            id.includes('/@remix-run/router/')
          ) {
            return 'vendor-react';
          }
          // 其余通用库（dayjs、supabase、lunar-javascript 等）
          return 'vendor';
        }
      }
    }
  }
})
