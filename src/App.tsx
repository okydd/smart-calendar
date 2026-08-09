import { useEffect, useMemo, useRef, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Modal } from 'antd';
import {
  CalendarOutlined,
  UnorderedListOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { CalendarProvider, useCalendar } from './context/CalendarContext';
import { SyncProvider, useSync } from './context/SyncContext';
import { UIProvider, useUI } from './context/UIContext';
import EventModal from './components/EventModal';
import EventView from './components/EventView';
import CalendarPage from './mobile/CalendarPage';
import TodoPage from './mobile/TodoPage';
import SettingsPage from './mobile/SettingsPage';
import SyncPanel from './mobile/SyncPanel';
import ShareView from './mobile/ShareView';
import { dayjs, lunarDateLabel, weekdayCN } from './utils/date';
import { checkDueReminders, getNotifySettings, emailConfigured, sendDailyDigest } from './utils/notify';
import { setNativeBadge } from './utils/badge';
import { hostImages } from './utils/imageHost';
import { registerQuotaRescuer } from './utils/storage';
import type { CalendarEvent } from './types';

function Shell() {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeTags, clearTags, events, search, setSearch, filteredEvents, updateEvent } = useCalendar();
  const { openView } = useUI();
  const { userId } = useSync();
  const [syncOpen, setSyncOpen] = useState(false);

  /** 事件到期提醒检查：打开即查、每 60 秒、回到前台/可见时各查一次 */
  const eventsRef = useRef(events);
  useEffect(() => {
    eventsRef.current = events;
  }, [events]);

  /**
   * 注册 localStorage 配额满时的自动救援：把 base64 图片上传到 Supabase Storage 并替换为 URL，
   * 从而释放 localStorage 空间。未登录时无法上传，直接让保存失败并提示用户登录。
   */
  useEffect(() => {
    registerQuotaRescuer(async (events: CalendarEvent[]) => {
      if (!userId) throw new Error('未登录云同步账号，无法上传图片释放空间');
      const out: CalendarEvent[] = [];
      for (const e of events) {
        const orig = e.images || [];
        const hasDataUrl = orig.some((u) => typeof u === 'string' && u.startsWith('data:'));
        if (!hasDataUrl) {
          out.push(e);
          continue;
        }
        const hosted = await hostImages(orig);
        out.push({ ...e, images: hosted });
      }
      return out;
    });
    return () => {
      registerQuotaRescuer(null);
    };
  }, [userId]);

  /**
   * 登录后自动把本地 base64 图片托管为云端 URL（启动即执行，不限一次），
   * 从而释放 localStorage 空间、让邮件/分享能引用图片网址。
   */
  const migratedRef = useRef(false);
  useEffect(() => {
    if (!userId) return; // 仅登录后
    if (migratedRef.current) return;
    let cancelled = false;
    (async () => {
      const list = eventsRef.current.filter((e) =>
        (e.images || []).some((u) => typeof u === 'string' && u.startsWith('data:'))
      );
      if (!list.length) return;
      migratedRef.current = true;
      let allOk = true;
      for (const e of list) {
        if (cancelled) break;
        try {
          const orig = e.images || [];
          const hosted = await hostImages(orig);
          if (hosted.some((u, i) => u !== orig[i])) {
            updateEvent(e.id, { images: hosted });
          }
        } catch {
          allOk = false;
        }
      }
      // 成功后写入标记（quota 满时可能写失败，但下次启动会重试）
      if (allOk) {
        try { localStorage.setItem('calendarImgMigrated', '1'); } catch { /* 忽略 */ }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, updateEvent]);

  useEffect(() => {
    let alive = true;
    const tick = async () => {
      if (!alive) return;
      try {
        await checkDueReminders(eventsRef.current);
      } catch {
        /* 忽略提醒推送异常 */
      }
    };
    tick();
    const timer = window.setInterval(tick, 60_000);
    const onFocus = () => tick();
    const onVis = () => {
      if (document.visibilityState === 'visible') tick();
    };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('focus', onFocus);
    return () => {
      alive = false;
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  const today = dayjs();
  const lunar = useMemo(() => lunarDateLabel(today), [today]);

  const tab = location.pathname.startsWith('/todos')
    ? 'todos'
    : location.pathname.startsWith('/settings')
      ? 'settings'
      : 'calendar';

  /** 待办角标：今天当天、且未完成的待办数量（与清单「今天」组一致） */
  const pending = useMemo(
    () =>
      events.filter((e) => {
        const d = dayjs(e.date);
        return d.isValid() && d.isSame(today, 'day') && !e.done;
      }).length,
    [events, today]
  );

  /**
   * 系统级 App 图标角标（PWA Badging API）：已安装到桌面的 PWA 会在启动器图标上显示未读数，
   * 类似 QQ 消息红点。不支持的环境（iOS Safari、未安装、非安全上下文）静默忽略。
   */
  useEffect(() => {
    const nav = navigator as any;
    if (typeof nav.setAppBadge === 'function') {
      try {
        if (pending > 0) nav.setAppBadge(pending).catch(() => {});
        else nav.clearAppBadge().catch(() => {});
      } catch {
        /* 忽略不支持的环境 */
      }
    }
    // 原生安卓 APK 图标角标（今日未完成事件数）
    setNativeBadge(pending);
  }, [pending]);

  /** 每日定时发送：在设定时间自动把数据发到邮箱（应用打开期间触发，最佳努力） */
  useEffect(() => {
    let timer: number | undefined;
    let cancelled = false;
    const LAST_KEY = 'calendarLastAutoSend';
    const trySend = async () => {
      if (cancelled) return;
      const s = getNotifySettings();
      if (!s.autoSend) return;
      if (!emailConfigured(s)) return;
      const todayStr = dayjs().format('YYYY-MM-DD');
      const last = localStorage.getItem(LAST_KEY);
      if (last === todayStr) return; // 今天已发送
      const [h, m] = (s.autoSendTime || '04:00').split(':').map(Number);
      const now = dayjs();
      const target = now
        .startOf('day')
        .hour(h)
        .minute(m)
        .second(0);
      if (now.isBefore(target)) {
        // 还没到发送时间，等到达时再发
        const ms = target.diff(now);
        timer = window.setTimeout(trySend, Math.min(ms, 24 * 3600 * 1000));
        return;
      }
      localStorage.setItem(LAST_KEY, todayStr);
      const r = await sendDailyDigest(eventsRef.current);
      if (!r.ok && r.msg !== '未配置邮箱，仅本地操作') {
        // 发送失败：允许今天稍后重试
        localStorage.removeItem(LAST_KEY);
        console.warn('[auto-send] 每日发送失败:', r.msg);
      }
    };
    trySend();
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-row">
          <div className="topbar-title">
            <div className="topbar-date">
              {today.year()}年{today.month() + 1}月{today.date()}日
            </div>
            <div className="topbar-sub">
              {weekdayCN(today)} · 农历{lunar}
            </div>
          </div>
        </div>

        {activeTags.length > 0 && (
          <div className="filter-hint">
            已按 {activeTags.length} 个标签筛选
            <button onClick={clearTags}>清除</button>
          </div>
        )}
      </header>

      <div className="app-content">
        <div className="app-content-inner">
          <Routes>
            <Route path="/" element={<Navigate to="/calendar" replace />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/todos" element={<TodoPage />} />
            <Route
              path="/settings"
              element={<SettingsPage onOpenSync={() => setSyncOpen(true)} />}
            />
            <Route path="/share/:id" element={<ShareView />} />
            <Route path="*" element={<Navigate to="/calendar" replace />} />
          </Routes>
        </div>
      </div>

      <nav className="tabbar">
        <button
          className={`tabbar-item${tab === 'calendar' ? ' active' : ''}`}
          onClick={() => navigate('/calendar')}
        >
          <CalendarOutlined className="tab-ico" />
          日历
        </button>
        <button
          className={`tabbar-item${tab === 'todos' ? ' active' : ''}`}
          onClick={() => navigate('/todos')}
        >
          <UnorderedListOutlined className="tab-ico" />
          办事清单
          {pending > 0 && <span className="tab-badge">{pending > 99 ? '99+' : pending}</span>}
        </button>
        <button
          className={`tabbar-item${tab === 'settings' ? ' active' : ''}`}
          onClick={() => navigate('/settings')}
        >
          <SettingOutlined className="tab-ico" />
          设置
        </button>
      </nav>

      <EventModal />
      <EventView />
      <SyncPanel open={syncOpen} onClose={() => setSyncOpen(false)} />

      {/* 搜索结果弹窗：关掉后返回原页面 */}
      <Modal
        open={!!search}
        onCancel={() => setSearch('')}
        footer={null}
        title={`搜索「${search}」共 ${filteredEvents.length} 条`}
        className="search-modal"
        styles={{ body: { maxHeight: '70vh', overflowY: 'auto' } }}
      >
        <div className="search-result-list">
          {filteredEvents.length === 0 ? (
            <div className="search-empty">未找到匹配的事件</div>
          ) : (
            filteredEvents.map((e) => (
              <div
                key={e.id}
                className="search-result-item"
                onClick={() => {
                  openView(e);
                  setSearch('');
                }}
              >
                <span className={`sr-title${e.done ? ' done' : ''}`}>{e.title}</span>
                <span className="sr-date">
                  {e.date}
                  {e.startTime ? ' ' + e.startTime : ''}
                </span>
              </div>
            ))
          )}
        </div>
      </Modal>
    </div>
  );
}

export default function App() {
  return (
    <CalendarProvider>
      <SyncProvider>
        <UIProvider>
          <Shell />
        </UIProvider>
      </SyncProvider>
    </CalendarProvider>
  );
}
