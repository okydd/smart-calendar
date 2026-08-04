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
    chunkSizeWarningLimit: 1500
  }
})
