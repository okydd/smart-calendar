import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseConfig, type SupabaseConfig } from './config';

let client: SupabaseClient | null = null;
let signature = '';

/**
 * 获取 Supabase 客户端单例。
 * 配置变化时会重建实例；未配置时返回 null（纯本地模式）。
 */
export function getClient(): SupabaseClient | null {
  const cfg: SupabaseConfig | null = getSupabaseConfig();
  if (!cfg) {
    client = null;
    signature = '';
    return null;
  }
  const sig = `${cfg.url}|${cfg.anonKey}`;
  if (client && sig === signature) return client;
  client = createClient(cfg.url, cfg.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      storageKey: 'calendarAuth'
    }
  });
  signature = sig;
  return client;
}

/** 强制丢弃缓存实例（配置变更或退出登录后调用） */
export function resetClient(): void {
  client = null;
  signature = '';
}
