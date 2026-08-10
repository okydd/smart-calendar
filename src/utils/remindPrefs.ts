/**
 * 强提醒开关（本机设置）—— 纯 localStorage 逻辑，不依赖任何原生 / Capacitor API。
 *
 * 单独拆出此模块的目的：把「开关读取」这类零依赖的纯逻辑，与依赖 Capacitor 的
 * 本地通知实现（localNotify.ts）彻底解耦。这样首屏（App / notify / 设置页）可以
 * 安全静态引入本模块，而把 @capacitor/local-notifications 隔离在 localNotify.ts 中，
 * 仅在用户真正用到提醒功能时才动态加载，避免 Capacitor 模块在首屏求值时可能导致
 * 部分运行环境（Android WebView 等）白屏。
 */

const PREF_KEY = 'calendarStrongRemind';

export interface StrongRemindPrefs {
  /** 总开关 */
  enabled: boolean;
  /** 响铃 */
  sound: boolean;
  /** 振动 */
  vibrate: boolean;
}

const DEFAULT_PREFS: StrongRemindPrefs = { enabled: true, sound: true, vibrate: true };

export function getStrongRemindPrefs(): StrongRemindPrefs {
  try {
    const raw = localStorage.getItem(PREF_KEY);
    if (raw) return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return DEFAULT_PREFS;
}

export function saveStrongRemindPrefs(p: StrongRemindPrefs): void {
  try {
    localStorage.setItem(PREF_KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}
