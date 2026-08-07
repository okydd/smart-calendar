import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import type { SyncStatus } from '../types';
import { useCalendar } from './CalendarContext';
import { getClient, resetClient } from '../sync/client';
import {
  getSupabaseConfig,
  isConfigFromEnv,
  saveSupabaseConfig,
  clearSupabaseConfig,
  validateConfig
} from '../sync/config';
import { eventToRow, mergeEvents, rowToEvent, type RemoteRow } from '../sync/merge';
import { getNotifySettings, saveNotifySettings, type NotifySettings } from '../utils/notify';
import { fetchCloudNotify, pushCloudNotify } from '../sync/notifySettings';

const TABLE = 'calendar_events';
const LAST_SYNC_KEY = 'calendarLastSync';
/** 轮询间隔：60 秒拉一次云端。仅在已登录且开启同步时轮询；本地无变更时
 *  仅做轻量拉取，不会推送；可见性/在线状态变化才会立即触发，页面负担很小。 */
const POLL_MS = 60_000;
/** 本地变更后延迟推送，合并高频操作 */
const PUSH_DEBOUNCE_MS = 1500;

interface SyncContextValue {
  status: SyncStatus;
  /** 已登录用户邮箱 */
  email: string | null;
  /** 上次同步成功时间 */
  lastSyncAt: string | null;
  /** 最近一次错误信息 */
  error: string | null;
  /** 是否已配置 Supabase */
  configured: boolean;
  /** 配置是否由部署方写死（界面只读） */
  configLocked: boolean;
  /** 当前配置的 Project URL（用于界面回显） */
  configUrl: string;
  saveConfig: (url: string, anonKey: string) => string | null;
  removeConfig: () => void;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  sendReset: (email: string) => Promise<string | null>;
  syncNow: () => Promise<void>;
  /** 当前登录用户 id（未登录为 null） */
  userId: string | null;
  /** 通知设置云端同步版本号，变化时本机设置已被云端覆盖 */
  notifySettingsVersion: number;
  /** 把通知设置推送到云端（跨设备同步），返回是否成功 */
  syncNotifySettings: (s: NotifySettings) => Promise<boolean>;
}

const SyncContext = createContext<SyncContextValue | null>(null);

/** 把 Supabase 的英文报错翻译成能看懂的中文 */
function humanizeError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes('invalid login credentials')) return '邮箱或密码不正确';
  if (m.includes('user already registered')) return '该邮箱已注册，请直接登录';
  if (m.includes('password should be at least')) return '密码至少需要 6 位';
  if (m.includes('unable to validate email') || m.includes('invalid email'))
    return '邮箱格式不正确';
  if (m.includes('email not confirmed')) return '邮箱尚未验证，请先到邮箱点击验证链接';
  if (m.includes('signups not allowed') || m.includes('signup is disabled') || m.includes('not allowed to sign up'))
    return '当前已关闭开放注册，如需账号请联系管理员开通';
  if (m.includes('does not exist') && m.includes('relation'))
    return '云端数据表未创建，请先在 Supabase 执行建表 SQL（见 SETUP.md）';
  if (m.includes('failed to fetch') || m.includes('networkerror'))
    return '网络连接失败，请检查网络或 Project URL 是否正确';
  if (m.includes('row-level security') || m.includes('violates row-level'))
    return '权限策略未生效，请确认已执行 SETUP.md 中的 RLS 策略语句';
  if (m.includes('over_email_send_rate_limit') || m.includes('rate limit'))
    return '操作过于频繁，请稍后再试';
  return msg;
}

export function SyncProvider({ children }: { children: React.ReactNode }) {
  const { snapshot, applyMerged, revision } = useCalendar();

  const [configured, setConfigured] = useState(() => getSupabaseConfig() !== null);
  const [configLocked] = useState(() => isConfigFromEnv());
  const [configUrl, setConfigUrl] = useState(() => getSupabaseConfig()?.url ?? '');
  const [status, setStatus] = useState<SyncStatus>(() =>
    getSupabaseConfig() ? 'signedOut' : 'disabled'
  );
  const [email, setEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [lastSyncAt, setLastSyncAt] = useState<string | null>(
    () => localStorage.getItem(LAST_SYNC_KEY)
  );
  const [error, setError] = useState<string | null>(null);
  const [notifySettingsVersion, setNotifySettingsVersion] = useState(0);

  const userIdRef = useRef<string | null>(null);
  const runningRef = useRef(false);
  /** 同步进行中又来了新变更时置位，结束后补一次 */
  const dirtyRef = useRef(false);

  /** 核心同步流程：拉取 → 合并 → 回写本地 → 推送差异 */
  const syncNow = useCallback(async () => {
    const supabase = getClient();
    const uid = userIdRef.current;
    if (!supabase || !uid) return;
    if (runningRef.current) {
      dirtyRef.current = true;
      return;
    }
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      setStatus('offline');
      return;
    }
    runningRef.current = true;
    setStatus('syncing');
    setError(null);
    try {
      const { data, error: selErr } = await supabase
        .from(TABLE)
        .select('*')
        .eq('user_id', uid);
      if (selErr) throw new Error(selErr.message);

      const remote = ((data ?? []) as RemoteRow[]).map(rowToEvent);
      const local = snapshot();
      const { merged, toPush } = mergeEvents(local, remote);

      applyMerged(merged);

      if (toPush.length) {
        // 分批上传，避免单请求过大
        const rows = toPush.map((e) => eventToRow(e, uid));
        for (let i = 0; i < rows.length; i += 200) {
          const { error: upErr } = await supabase
            .from(TABLE)
            .upsert(rows.slice(i, i + 200), { onConflict: 'user_id,id' });
          if (upErr) throw new Error(upErr.message);
        }
      }

      const now = new Date().toISOString();
      localStorage.setItem(LAST_SYNC_KEY, now);
      setLastSyncAt(now);
      setStatus('idle');
    } catch (e) {
      const msg = humanizeError(e instanceof Error ? e.message : String(e));
      setError(msg);
      setStatus('error');
    } finally {
      runningRef.current = false;
      if (dirtyRef.current) {
        dirtyRef.current = false;
        void syncNow();
      }
    }
  }, [snapshot, applyMerged]);

  /** 登录后从云端拉取通知设置并覆盖本地（云端无记录时本地不变） */
  const pullNotify = useCallback(async () => {
    const supabase = getClient();
    const uid = userIdRef.current;
    if (!supabase || !uid) return;
    const cloud = await fetchCloudNotify(supabase, uid);
    if (cloud) {
      saveNotifySettings(cloud);
      setNotifySettingsVersion((v) => v + 1);
    }
  }, []);

  /** 把当前通知设置 upsert 到云端（跨设备同步），返回是否成功 */
  const syncNotifySettings = useCallback(
    async (s: NotifySettings): Promise<boolean> => {
      const supabase = getClient();
      const uid = userIdRef.current;
      if (!supabase || !uid) return false;
      return pushCloudNotify(supabase, uid, s);
    },
    []
  );

  /** 恢复已有会话 & 监听登录状态变化 */
  useEffect(() => {
    if (!configured) return;
    const supabase = getClient();
    if (!supabase) return;
    let alive = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return;
      const s = data.session;
      if (s?.user) {
        userIdRef.current = s.user.id;
        setUserId(s.user.id);
        setEmail(s.user.email ?? null);
        setStatus('idle');
        void syncNow();
        void pullNotify();
      } else {
        setStatus('signedOut');
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (!alive) return;
      if (session?.user) {
        userIdRef.current = session.user.id;
        setUserId(session.user.id);
        setEmail(session.user.email ?? null);
        setStatus('idle');
        void pullNotify();
      } else {
        userIdRef.current = null;
        setUserId(null);
        setEmail(null);
        setStatus('signedOut');
      }
    });

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configured]);

  /** 本地数据变更 → 防抖推送 */
  useEffect(() => {
    if (revision === 0 || !userIdRef.current) return;
    const t = setTimeout(() => void syncNow(), PUSH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [revision, syncNow]);

  /** 定时轮询 + 回到前台 + 网络恢复时同步 */
  useEffect(() => {
    if (!configured) return;
    const timer = setInterval(() => {
      if (userIdRef.current && document.visibilityState === 'visible') void syncNow();
    }, POLL_MS);
    const onFocus = () => {
      if (userIdRef.current && document.visibilityState === 'visible') void syncNow();
    };
    const onOnline = () => {
      if (userIdRef.current) void syncNow();
    };
    document.addEventListener('visibilitychange', onFocus);
    window.addEventListener('focus', onFocus);
    window.addEventListener('online', onOnline);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onFocus);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('online', onOnline);
    };
  }, [configured, syncNow]);

  const saveConfig = useCallback((url: string, anonKey: string): string | null => {
    const invalid = validateConfig(url, anonKey);
    if (invalid) return invalid;
    saveSupabaseConfig({ url, anonKey });
    resetClient();
    setConfigUrl(url.trim().replace(/\/+$/, ''));
    setConfigured(true);
    setStatus('signedOut');
    setError(null);
    return null;
  }, []);

  const removeConfig = useCallback(() => {
    clearSupabaseConfig();
    resetClient();
    userIdRef.current = null;
    setEmail(null);
    setConfigUrl('');
    setConfigured(false);
    setStatus('disabled');
  }, []);

  const signIn = useCallback(
    async (mail: string, password: string): Promise<string | null> => {
      const supabase = getClient();
      if (!supabase) return '请先填写 Supabase 连接参数';
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email: mail.trim(),
        password
      });
      if (err) return humanizeError(err.message);
      if (data.user) {
        userIdRef.current = data.user.id;
        setUserId(data.user.id);
        setEmail(data.user.email ?? null);
        setStatus('idle');
        void syncNow();
        void pullNotify();
      }
      return null;
    },
    [syncNow]
  );

  const signUp = useCallback(
    async (mail: string, password: string): Promise<string | null> => {
      const supabase = getClient();
      if (!supabase) return '请先填写 Supabase 连接参数';
      const { data, error: err } = await supabase.auth.signUp({
        email: mail.trim(),
        password
      });
      if (err) return humanizeError(err.message);
      // 若项目开启了邮箱验证，此时 session 为空，需要用户先去邮箱确认
      if (!data.session) {
        return '__NEED_CONFIRM__';
      }
      if (data.user) {
        userIdRef.current = data.user.id;
        setUserId(data.user.id);
        setEmail(data.user.email ?? null);
        setStatus('idle');
        void syncNow();
        void pullNotify();
      }
      return null;
    },
    [syncNow]
  );

  const signOut = useCallback(async () => {
    const supabase = getClient();
    if (supabase) await supabase.auth.signOut();
    userIdRef.current = null;
    setEmail(null);
    setStatus('signedOut');
  }, []);

  const sendReset = useCallback(async (mail: string): Promise<string | null> => {
    const supabase = getClient();
    if (!supabase) return '请先填写 Supabase 连接参数';
    const { error: err } = await supabase.auth.resetPasswordForEmail(mail.trim(), {
      redirectTo: window.location.origin + window.location.pathname
    });
    return err ? humanizeError(err.message) : null;
  }, []);

  const value = useMemo<SyncContextValue>(
    () => ({
      status,
      email,
      lastSyncAt,
      error,
      configured,
      configLocked,
      configUrl,
      saveConfig,
      removeConfig,
      signIn,
      signUp,
      signOut,
      sendReset,
      syncNow,
      userId,
      notifySettingsVersion,
      syncNotifySettings
    }),
    [
      status,
      email,
      lastSyncAt,
      error,
      configured,
      configLocked,
      configUrl,
      saveConfig,
      removeConfig,
      signIn,
      signUp,
      signOut,
      sendReset,
      syncNow,
      userId,
      notifySettingsVersion,
      syncNotifySettings
    ]
  );

  return <SyncContext.Provider value={value}>{children}</SyncContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSync(): SyncContextValue {
  const ctx = useContext(SyncContext);
  if (!ctx) throw new Error('useSync 必须在 SyncProvider 内使用');
  return ctx;
}
