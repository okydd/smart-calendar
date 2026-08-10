import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ConfigProvider, App as AntApp, theme as antdTheme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'antd/dist/reset.css';
import './styles/global.css';
import './styles/mobile.css';
import App from './App';
import { ThemeProvider, useResolvedTheme } from './utils/theme';

const FONT_FAMILY =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

/** 顶层错误边界：任何渲染期异常都显示为可读提示而非白板，并给出重试入口 */
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: Error | null }> {
  state: { error: Error | null } = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('App crashed:', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            fontFamily: FONT_FAMILY,
            color: '#333',
            background: '#fff',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>页面加载出错</div>
          <pre
            style={{
              maxWidth: '90vw',
              maxHeight: '40vh',
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              fontSize: 12,
              color: '#d4380d',
              background: '#fff1f0',
              border: '1px solid #ffccc7',
              borderRadius: 8,
              padding: 12,
              marginBottom: 16
            }}
          >
            {String(this.state.error?.stack || this.state.error?.message || this.state.error)}
          </pre>
          <button
            onClick={() => location.reload()}
            style={{
              padding: '10px 24px',
              fontSize: 15,
              color: '#fff',
              background: '#3b7cff',
              border: 'none',
              borderRadius: 10
            }}
          >
            重试
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function AntdLayer({ children }: { children: React.ReactNode }) {
  const resolved = useResolvedTheme();
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: resolved === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#3b7cff',
          borderRadius: 10,
          fontFamily: FONT_FAMILY
        }
      }}
    >
      <AntApp>{children}</AntApp>
    </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <AntdLayer>
          <HashRouter>
            <App />
          </HashRouter>
        </AntdLayer>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

// 注册 Service Worker / 自动更新。
// 网页、PWA、以及「在线壳模式」的原生 APK 都需要：
// APK 通过 https 加载线上页面，SW 既提供离线缓存，也让版本更新自动生效。
// 注册 Service Worker，实现离线可用；加时间戳防止浏览器/中间缓存旧 sw.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = `${import.meta.env.BASE_URL}sw.js?__v=${Date.now()}`;
    navigator.serviceWorker
      .register(swUrl, { updateViaCache: 'none' })
      .then((reg) => {
        // 立即检查更新；若发现新 SW 则等待其激活后刷新
        reg.update().catch(() => {});
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'activated' && navigator.serviceWorker.controller) {
              // 已有旧 SW 控制页面，提示用户刷新以使用新版本
              if (!sessionStorage.getItem('appReloading')) {
                sessionStorage.setItem('appReloading', '1');
                location.reload();
              }
            }
          });
        });
      })
      .catch(() => {
        /* 忽略注册失败（例如非 HTTPS 环境） */
      });
  });
}

// 每次打开网址：若线上版本比本机已加载版本新，自动刷新摘取最新版本
(function checkAppUpdate() {
  const VERSION_URL = `${import.meta.env.BASE_URL}version.json`;
  const STORE_KEY = 'appVersion';
  const RELOAD_FLAG = 'appReloading';
  const BYPASS_FLAG = 'appBypassCache';

  function reload(bypassCache: boolean) {
    if (bypassCache) {
      sessionStorage.setItem(BYPASS_FLAG, '1');
      const sep = location.href.includes('?') ? '&' : '?';
      location.href = location.href.split('#')[0] + sep + '_nocache=' + Date.now() + location.hash;
    } else {
      sessionStorage.setItem(RELOAD_FLAG, '1');
      location.reload();
    }
  }

  fetch(VERSION_URL + '?_=' + Date.now(), { cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : null))
    .then((j) => {
      if (!j || !j.version) return;
      const cur = localStorage.getItem(STORE_KEY);
      if (!cur) {
        localStorage.setItem(STORE_KEY, j.version);
        return;
      }
      if (cur === j.version) {
        // 版本一致：如果此前已经强制绕过缓存，清理标记
        sessionStorage.removeItem(BYPASS_FLAG);
        return;
      }
      // 版本不一致：先记录目标版本
      localStorage.setItem(STORE_KEY, j.version);
      if (sessionStorage.getItem(BYPASS_FLAG)) {
        // 已经绕过缓存刷新过一次，仍不一致，说明 URL 参数被保留或 SW 仍缓存；强制清理 SW 并硬刷新
        sessionStorage.removeItem(BYPASS_FLAG);
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.ready.then((reg) => reg.unregister()).catch(() => {});
        }
        setTimeout(() => location.reload(), 300);
        return;
      }
      if (!sessionStorage.getItem(RELOAD_FLAG)) {
        reload(false);
      } else {
        reload(true);
      }
    })
    .catch(() => {
      /* 忽略网络异常（如离线） */
    });
})();
