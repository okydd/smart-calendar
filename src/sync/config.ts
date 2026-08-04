/**
 * Supabase 连接配置管理。
 *
 * 取值优先级：
 *  1. 构建时环境变量 VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY（部署时写入 GitHub Secrets）
 *  2. 用户在「更多 → 云同步」界面手工填写（保存在 localStorage）
 *
 * 两者都没有时，应用自动降级为纯本地模式，所有功能照常可用，只是不同步。
 */

const CFG_KEY = 'calendarSyncConfig';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

function readEnv(): SupabaseConfig | null {
  const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();
  const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim();
  if (url && anonKey) return { url, anonKey };
  return null;
}

function readLocal(): SupabaseConfig | null {
  try {
    const raw = localStorage.getItem(CFG_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw);
    if (typeof o?.url === 'string' && typeof o?.anonKey === 'string' && o.url && o.anonKey) {
      return { url: o.url.trim(), anonKey: o.anonKey.trim() };
    }
  } catch {
    /* ignore */
  }
  return null;
}

/** 获取当前生效的 Supabase 配置，未配置返回 null */
export function getSupabaseConfig(): SupabaseConfig | null {
  return readEnv() ?? readLocal();
}

/** 配置是否来自构建时环境变量（此时界面不允许修改） */
export function isConfigFromEnv(): boolean {
  return readEnv() !== null;
}

/** 保存用户手工填写的配置 */
export function saveSupabaseConfig(cfg: SupabaseConfig): void {
  localStorage.setItem(
    CFG_KEY,
    JSON.stringify({ url: cfg.url.trim().replace(/\/+$/, ''), anonKey: cfg.anonKey.trim() })
  );
}

/** 清除本地配置 */
export function clearSupabaseConfig(): void {
  localStorage.removeItem(CFG_KEY);
}

/** 简单校验用户填写的参数格式 */
export function validateConfig(url: string, anonKey: string): string | null {
  const u = url.trim();
  const k = anonKey.trim();
  if (!u) return '请填写 Project URL';
  if (!/^https:\/\/[a-z0-9-]+\.supabase\.(co|in)$/i.test(u.replace(/\/+$/, ''))) {
    return 'Project URL 格式应为 https://xxxxx.supabase.co';
  }
  if (!k) return '请填写 anon public key';
  if (k.length < 40) return 'anon key 看起来不完整，请复制完整的一长串字符';
  return null;
}
