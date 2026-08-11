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

// 应用已挂载：通知内联兜底脚本移除可能短暂出现的错误浮层（自愈合，避免「闪一下」）。
try {
  if (typeof window !== 'undefined' && (window as any).__hideBootFallback) {
    (window as any).__hideBootFallback();
  }
  (window as any).__appReady = true;
} catch {
  /* ignore */
}

/**
 * 自动刷新熔断器（SW 更新与版本自检共用）。
 * 没有它时，CDN 传播期返回不一致的版本信息会导致无限刷新 → 页面永远白屏。
 */
const RELOAD_GUARD = {
  COUNT_KEY: 'appReloadCount',
  LAST_KEY: 'appReloadAt',
  MAX: 2,
  MIN_INTERVAL_MS: 60000,
  get(k: string) {
    try {
      return sessionStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set(k: string, v: string) {
    try {
      sessionStorage.setItem(k, v);
    } catch {
      /* ignore */
    }
  },
  del(k: string) {
    try {
      sessionStorage.removeItem(k);
    } catch {
      /* ignore */
    }
  },
  can(): boolean {
    if (Number(this.get(this.COUNT_KEY) || '0') >= this.MAX) return false;
    const last = Number(this.get(this.LAST_KEY) || '0');
    return !(last && Date.now() - last < this.MIN_INTERVAL_MS);
  },
  mark() {
    this.set(this.COUNT_KEY, String(Number(this.get(this.COUNT_KEY) || '0') + 1));
    this.set(this.LAST_KEY, String(Date.now()));
  }
};

// 注册 Service Worker / 自动更新。
// 网页、PWA、以及「在线壳模式」的原生 APK 都需要：
// APK 通过 https 加载线上页面，SW 既提供离线缓存，也让版本更新自动生效。
// 注册 Service Worker，实现离线可用。注意：注册 URL 必须是固定的（不带时间戳），
// 否则每次页面加载都会被当成「不同的 SW」而触发更新 → 自动刷新循环。SW 的更新
// 由 updateViaCache:'none' + 构建时注入的 __BUILD_TIME__（每次部署字节不同）自动完成。

// 「清除缓存并重载」会在跳转型加载时写入该标记：本次仅做纯网络加载，
// 跳过 SW 注册与自动刷新，避免被尚未完全注销的旧 SW 重新接管而再次卡死。
// 只计算一次，供下方 SW 注册与版本自检共用。
const FRESH_LOAD = (function (): boolean {
  try {
    if (sessionStorage.getItem('__freshLoad')) {
      sessionStorage.removeItem('__freshLoad');
      return true;
    }
  } catch {
    /* ignore */
  }
  return false;
})();

if ('serviceWorker' in navigator && !FRESH_LOAD) {
  const hadController = !!navigator.serviceWorker.controller; // 注册前是否已被旧 SW 控制，用于区分「首次安装」与「真正更新」
  window.addEventListener('load', () => {
    const swUrl = `${import.meta.env.BASE_URL}sw.js`;
    navigator.serviceWorker
      .register(swUrl, { updateViaCache: 'none' })
      .then((reg) => {
        // 立即检查更新；若发现新 SW 则等待其激活后刷新
        reg.update().catch(() => {});
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', () => {
            // 仅在「替换已存在的旧 SW」时重载；首次安装（hadController=false）不重载，
            // 否则 SW 接管（clients.claim）会让每次打开 APP 都触发一次刷新 → 反复闪动。
            if (newWorker.state === 'activated' && navigator.serviceWorker.controller && hadController) {
              if (RELOAD_GUARD.can()) {
                RELOAD_GUARD.mark();
                try {
                  sessionStorage.setItem('__freshLoad', '1');
                } catch {
                  /* ignore */
                }
                const sep = location.href.includes('?') ? '&' : '?';
                location.replace(location.href.split('#')[0] + sep + '_nocache=' + Date.now() + (location.hash || ''));
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

// 每次打开网址：若线上版本比本机已加载版本新，自动刷新摘取最新版本。
//
// ⚠️ 这里必须有「熔断」：GitHub Pages 是多节点 CDN，发布后的传播期内不同节点
// 可能返回不一致的 version.json。没有上限时会出现
// 「刷新 → 版本又对不上 → 再刷新」的死循环，页面永远停在空白，
// 用户看到的就是打不开的白板。因此限制：
//   1) 同一会话最多自动刷新 MAX_RELOADS 次；
//   2) 两次自动刷新至少间隔 MIN_INTERVAL_MS；
//   3) 超限后只静默记录版本号，交由用户下次自行打开时更新。
(function checkAppUpdate() {
  const VERSION_URL = `${import.meta.env.BASE_URL}version.json`;
  const STORE_KEY = 'appVersion';
  const ss = RELOAD_GUARD;

  // 强制全新加载（来自「清除缓存并重载」）：仅记录当前 semver，不再触发任何刷新，避免旧 SW 干扰。
  if (FRESH_LOAD) {
    fetch(VERSION_URL + '?_=' + Date.now(), { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (j && j.semver) {
          try {
            localStorage.setItem(STORE_KEY, j.semver);
          } catch {
            /* ignore */
          }
        }
      })
      .catch(() => {});
    return;
  }

  fetch(VERSION_URL + '?_=' + Date.now(), { cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : null))
    .then((j) => {
      if (!j || !j.semver) return;
      let cur: string | null = null;
      try {
        cur = localStorage.getItem(STORE_KEY);
      } catch {
        return; // 存储不可用时不做任何自动刷新，避免反复重载
      }
      const remember = (v: string) => {
        try {
          localStorage.setItem(STORE_KEY, v);
        } catch {
          /* ignore */
        }
      };
      // 没有记录，或已是最新版本（用 semver 比较，部署后固定不变，不会因 CDN 抖动误判）：仅记录，不刷新。
      if (!cur || cur === j.semver) {
        remember(j.semver);
        return;
      }
      // 发现新版本：受熔断限制下，以「纯网络 + 跳过 SW 注册」方式重载，
      // 立即摘取最新版本，且不会与 SW 的 updatefound 刷新叠加成连环刷新。
      if (!ss.can()) {
        remember(j.semver); // 已达刷新上限：记录版本号，等下次打开再更新。
        return;
      }
      ss.mark();
      try {
        sessionStorage.setItem('__freshLoad', '1');
      } catch {
        /* ignore */
      }
      const sep = location.href.includes('?') ? '&' : '?';
      location.replace(location.href.split('#')[0] + sep + '_nocache=' + Date.now() + (location.hash || ''));
    })
    .catch(() => {
      /* 忽略网络异常（如离线） */
    });
})();
