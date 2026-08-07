import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// base 使用相对路径 './'，这样无论部署在域名根目录还是
// GitHub Pages 的 /<仓库名>/ 子路径下，资源引用都能正确解析。
export default defineConfig({
  base: './',
  plugins: [react()],
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
