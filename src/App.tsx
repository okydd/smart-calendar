import { useEffect, useMemo, useRef, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Modal } from 'antd';
import {
  MoreOutlined,
  CalendarOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import { CalendarProvider, useCalendar } from './context/CalendarContext';
import { SyncProvider } from './context/SyncContext';
import { UIProvider } from './context/UIContext';
import EventModal from './components/EventModal';
import EventView from './components/EventView';
import CalendarPage from './mobile/CalendarPage';
import TodoPage from './mobile/TodoPage';
import MoreSheet from './mobile/MoreSheet';
import SyncPanel from './mobile/SyncPanel';
import { dayjs, lunarDateLabel, weekdayCN } from './utils/date';
import { checkDueReminders, getNotifySettings, emailConfigured, sendDailyDigest } from './utils/notify';

function Shell() {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeTags, clearTags, events, search, setSearch, filteredEvents } = useCalendar();
  const [moreOpen, setMoreOpen] = useState(false);
  const [syncOpen, setSyncOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const installable = !!deferredPrompt;

  useEffect(() => {
    const handler = (e: any) => {
      // 阻止浏览器默认的安装提示，保留下来由按钮触发
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  /** 微信到期提醒检查：打开即查、每 60 秒、回到前台/可见时各查一次 */
  const eventsRef = useRef(events);
  useEffect(() => {
    eventsRef.current = events;
  }, [events]);
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

  const handleInstall = async () => {
    if (!deferredPrompt) {
      Modal.info({
        title: '安装到手机桌面',
        content: (
          <div style={{ fontSize: 13, lineHeight: 1.9 }}>
            <b>安卓 / 鸿蒙：</b>用浏览器打开本网址，点右上角菜单 →「添加到主屏幕 / 安装应用」。
            <br />
            <b>iPhone：</b>用 Safari 打开本网址，点底部分享按钮 →「添加到主屏幕」。
            <br />
            安装后会生成独立图标，全屏运行，断网也能使用。
          </div>
        ),
        okText: '知道了'
      });
      return;
    }
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const today = dayjs();
  const lunar = useMemo(() => lunarDateLabel(today), [today]);

  const tab = location.pathname.startsWith('/todos') ? 'todos' : 'calendar';

  /** 待办角标：今天当天、且未完成的待办数量（与清单「今天」组一致） */
  const pending = useMemo(
    () =>
      events.filter((e) => {
        const d = dayjs(e.date);
        return d.isValid() && d.isSame(today, 'day') && !e.done;
      }).length,
    [events, today]
  );

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
          <button
            className="topbar-btn"
            onClick={() => setMoreOpen(true)}
            aria-label="更多"
          >
            <MoreOutlined />
          </button>
        </div>

        {activeTags.length > 0 && (
          <div className="filter-hint">
            已按 {activeTags.length} 个标签筛选
            <button onClick={clearTags}>清除</button>
          </div>
        )}
      </header>

      <div className="app-content">
        {search && (
          <div className="search-banner">
            <span className="search-banner-text">
              搜索「{search}」共 {filteredEvents.length} 条
            </span>
            <button className="search-banner-back" onClick={() => setSearch('')}>
              返回
            </button>
          </div>
        )}
        <div className="app-content-inner">
          <Routes>
            <Route path="/" element={<Navigate to="/calendar" replace />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/todos" element={<TodoPage />} />
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
      </nav>

      <EventModal />
      <EventView />
      <MoreSheet
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        onOpenSync={() => setSyncOpen(true)}
        installable={installable}
        onInstall={handleInstall}
      />
      <SyncPanel open={syncOpen} onClose={() => setSyncOpen(false)} />
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
