/* 智能日历 Service Worker：离线可用（激进更新版） */
const CACHE = 'smart-calendar-v3-2026-08-30T13-36-13-220Z';
const CORE = ['./', './index.html', './manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(CORE).catch(() => undefined))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        // 清理所有非当前版本的缓存（包括同系列旧版本）
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

// 安全写入缓存：仅缓存同源 200 响应，任何失败静默忽略，避免抛出未捕获异常
function safePut(key, res) {
  if (!res || res.status !== 200 || res.type === 'opaque') return Promise.resolve();
  const copy = res.clone();
  return caches
    .open(CACHE)
    .then((c) => c.put(key, copy))
    .catch(() => undefined);
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  let url;
  try {
    url = new URL(req.url);
  } catch {
    return;
  }
  if (url.origin !== self.location.origin) return;

  // 不拦截版本检查与 SW 自身，避免污染自动更新 / SW 更新机制
  const path = url.pathname;
  if (path.endsWith('/version.json') || path.endsWith('/sw.js')) return;

  // 页面导航：始终网络优先；成功则刷新缓存，失败才回退旧缓存
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req, { cache: 'no-store' })
        .then((res) => {
          safePut('./index.html', res);
          return res;
        })
        .catch(() =>
          caches
            .match('./index.html')
            .then((r) => r || caches.match('./'))
            .then((r) => r || Response.error())
        )
    );
    return;
  }

  // 静态资源（JS/CSS/图片等）：网络优先，成功则刷新缓存，离线回退缓存
  event.respondWith(
    fetch(req, { cache: 'no-store' })
      .then((res) => {
        safePut(req, res);
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || Response.error()))
  );
});
