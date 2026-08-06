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

// 每次打开网址：若线上版本比本机已加载版本新，自动刷新摘取最新版本
(function checkAppUpdate() {
  const VERSION_URL = `${import.meta.env.BASE_URL}version.json`;
  const STORE_KEY = 'appVersion';
  const RELOAD_FLAG = 'appReloading';
  fetch(VERSION_URL + '?_=' + Date.now(), { cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : null))
    .then((j) => {
      if (!j || !j.version) return;
      const cur = localStorage.getItem(STORE_KEY);
      if (!cur) {
        localStorage.setItem(STORE_KEY, j.version);
        return;
      }
      if (cur !== j.version && !sessionStorage.getItem(RELOAD_FLAG)) {
        localStorage.setItem(STORE_KEY, j.version);
        sessionStorage.setItem(RELOAD_FLAG, '1');
        location.reload(true);
      }
    })
    .catch(() => {
      /* 忽略网络异常（如离线） */
    });
})();
