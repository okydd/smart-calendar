import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ConfigProvider, App as AntApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'antd/dist/reset.css';
import './styles/global.css';
import './styles/mobile.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#3b7cff',
          borderRadius: 10,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }
      }}
    >
      <AntApp>
        <HashRouter>
          <App />
        </HashRouter>
      </AntApp>
    </ConfigProvider>
  </React.StrictMode>
);

// 移除首屏加载遮罩：一旦 React 首帧渲染出内容立刻淡出，不再固定停留
const boot = document.getElementById('boot');
if (boot) {
  const root = document.getElementById('root');
  let removed = false;
  const hide = () => {
    if (removed) return;
    removed = true;
    boot.style.opacity = '0';
    window.setTimeout(() => boot.remove(), 140);
  };
  const waitPaint = () => {
    if (root && root.childElementCount > 0) {
      // 已渲染出内容，下一帧移除，避免白闪
      requestAnimationFrame(hide);
    } else {
      requestAnimationFrame(waitPaint);
    }
  };
  requestAnimationFrame(waitPaint);
  // 兜底：最多 1.2 秒后强制移除
  window.setTimeout(hide, 1200);
}

// 注册 Service Worker，实现离线可用
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`)
      .catch(() => {
        /* 忽略注册失败（例如非 HTTPS 环境） */
      });
  });
}
