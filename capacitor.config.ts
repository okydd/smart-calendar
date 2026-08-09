import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.smartcalendar.app',
  appName: '智能日历',
  webDir: 'dist',
  server: {
    // 在线壳模式：APK 只作为外壳，页面从 GitHub Pages 线上地址加载。
    // 这样以后网页版更新后，手机 App 打开即为最新版，无需重新安装 APK。
    // 首次启动需联网；成功加载一次后由 Service Worker 缓存，之后离线也能打开。
    url: 'https://okydd.github.io/smart-calendar/',
    // 原生 WebView 用 https scheme，避免 file:// 下部分 Web API 受限
    androidScheme: 'https',
    cleartext: false
  },
  android: {
    // 允许 WebView 使用混合内容之外的默认安全策略
    allowMixedContent: false
  }
};

export default config;
