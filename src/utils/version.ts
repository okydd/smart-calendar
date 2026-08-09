/**
 * 版本检查：判断当前运行的前端是否为线上最新版本。
 *
 * - 当前版本：构建时由 vite define 注入的 __APP_VERSION__；
 * - 线上版本：读取部署目录下的 version.json（由 scripts/stamp-build.mjs 生成）。
 * 两者由同一次构建产出，字符串相等即代表已是最新。
 */

/** 当前运行版本（构建时注入；开发模式下为 dev） */
export const CURRENT_VERSION: string =
  typeof __APP_VERSION__ === 'string' && __APP_VERSION__ ? __APP_VERSION__ : 'dev';

export interface VersionInfo {
  /** 当前运行版本 */
  current: string;
  /** 线上最新版本，检查失败为 null */
  latest: string | null;
  /** 是否已是最新（检查失败按 true 处理，避免误报） */
  isLatest: boolean;
  /** 检查失败原因 */
  error?: string;
}

/** 把 2026-08-09T16:20:31+08:00 显示为 2026.08.09 16:20 */
export function formatVersion(v: string | null | undefined): string {
  if (!v) return '—';
  if (v === 'dev') return '开发版';
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(v);
  if (!m) return v;
  return `${m[1]}.${m[2]}.${m[3]} ${m[4]}:${m[5]}`;
}

/** 拉取线上 version.json 并与当前版本比对 */
export async function checkLatestVersion(): Promise<VersionInfo> {
  const url = `${import.meta.env.BASE_URL}version.json?_=${Date.now()}`;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12000);
    const res = await fetch(url, { cache: 'no-store', signal: ctrl.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as { version?: string };
    const latest = typeof json?.version === 'string' ? json.version : null;
    if (!latest) throw new Error('版本文件格式异常');
    return {
      current: CURRENT_VERSION,
      latest,
      isLatest: CURRENT_VERSION === 'dev' ? true : latest === CURRENT_VERSION
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return {
      current: CURRENT_VERSION,
      latest: null,
      isLatest: true,
      error: msg.includes('abort') ? '检查超时，请稍后重试' : '网络异常：' + msg
    };
  }
}

/**
 * 立即升级到最新版本：注销 Service Worker + 清空 CacheStorage + 绕过缓存硬刷新。
 * 在线壳 APK 里同样有效（页面来自线上，无需重装 APK）。
 */
export async function applyLatestVersion(): Promise<void> {
  try {
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister().catch(() => false)));
    }
  } catch {
    /* ignore */
  }
  try {
    if (typeof caches !== 'undefined') {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k).catch(() => false)));
    }
  } catch {
    /* ignore */
  }
  try {
    localStorage.removeItem('appVersion');
    sessionStorage.removeItem('appReloading');
    sessionStorage.removeItem('appBypassCache');
  } catch {
    /* ignore */
  }
  const base = location.href.split('#')[0].split('?')[0];
  location.replace(`${base}?_nocache=${Date.now()}${location.hash}`);
}
