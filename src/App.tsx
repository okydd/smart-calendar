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
import QuestionsPage from './mobile/QuestionsPage';
import SettingsPage from './mobile/SettingsPage';
import ReminderSettingsPage from './mobile/ReminderSettingsPage';
import DataSettingsPage from './mobile/DataSettingsPage';
import VersionHistoryPage from './mobile/VersionHistoryPage';
import SyncPanel from './mobile/SyncPanel';
import ShareView from './mobile/ShareView';
import { dayjs, lunarDateLabel, weekdayCN } from './utils/date';
import { checkDueReminders } from './utils/notify';
import { getStrongRemindPrefs } from './utils/remindPrefs';
import { startAutoExportScheduler } from './utils/autoExport';
import { setNativeBadge } from './utils/badge';
import { hostImages } from './utils/imageHost';
import { registerQuotaRescuer } from './utils/storage';
import type { CalendarEvent } from './types';

function Shell() {
  const navigate = useNavigate();
  const location = useLocation();
  const { events, search, setSearch, filteredEvents, updateEvent } = useCalendar();
  const { openView } = useUI();
  const { userId } = useSync();
  const isSettings = location.pathname === '/settings';
  const isSettingsSub = location.pathname.startsWith('/settings/');
  const [syncOpen, setSyncOpen] = useState(false);

  /** 事件到期提醒检查：打开即查、每 60 秒、回到前台/可见时各查一次 */
  const eventsRef = useRef(events);
  useEffect(() => {
    eventsRef.current = events;
  }, [events]);

  /**
   * 每日自动推送：注册真正的「每天 05:00 定时」推送（APP 运行期间准时触发），
   * 并保留「打开APP后 / 回到前台」的兜底补发；不在页面暴露任何按钮/提示。
   * 仅登录且已配置邮箱、且当前>=5点、且当天未发过时触发。
   */
  useEffect(() => {
    return startAutoExportScheduler(() => eventsRef.current, userId);
  }, [userId]);

  /**
   * 预约系统级提醒（钉钉式强提醒的关键）：登录后首次把未来提醒同步到原生/系统通知，
   * 这样即使 APP 在后台、锁屏甚至被杀，到点也会横幅弹窗 + 响铃 + 振动。
   * Web/PWA 无系统级排期能力，此步自动跳过，仅运行时弹通知。
   */
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    (async () => {
      const {
        getNotifyPermission,
        requestNotifyPermission,
        syncScheduledReminders
      } = await import('./utils/localNotify');
      const prefs = getStrongRemindPrefs();
      if (!prefs.enabled) return;
      const perm = await getNotifyPermission();
      if (perm === 'prompt') {
        try {
          await requestNotifyPermission();
        } catch {
          /* 部分浏览器需用户手势才能授权，忽略 */
        }
      }
      if (!cancelled) await syncScheduledReminders(eventsRef.current);
    })().catch(() => {
      /* 提醒排期失败不影响主流程 */
    });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  /** 事件增删改或云同步后，重新排期未来提醒（防抖，避免频繁排期） */
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    let timer = 0;
    (async () => {
      const { syncScheduledReminders } = await import('./utils/localNotify');
      if (!getStrongRemindPrefs().enabled) return;
      timer = window.setTimeout(() => {
        if (!cancelled) syncScheduledReminders(eventsRef.current).catch(() => {});
      }, 500);
    })().catch(() => {
      /* 忽略排期异常 */
    });
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [events, userId]);

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

  return (
    <div className="app-shell">
      {isSettings ? (
        <div className="topbar-spacer" />
      ) : isSettingsSub ? null : (
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

        </header>
      )}

      <div className="app-content">
        <div className="app-content-inner">
          <Routes>
            <Route path="/" element={<Navigate to="/calendar" replace />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/todos" element={<QuestionsPage />} />
            <Route
              path="/settings"
              element={<SettingsPage onOpenSync={() => setSyncOpen(true)} />}
            />
            <Route path="/settings/reminder" element={<ReminderSettingsPage />} />
            <Route path="/settings/data" element={<DataSettingsPage />} />
            <Route path="/settings/versions" element={<VersionHistoryPage />} />
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
          {pending > 0 && <span className="tab-badge">{pending > 99 ? '99+' : pending}</span>}
        </button>
        <button
          className={`tabbar-item${tab === 'todos' ? ' active' : ''}`}
          onClick={() => navigate('/todos')}
        >
          <UnorderedListOutlined className="tab-ico" />
          思考题
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
