import { useEffect, useMemo, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Input } from 'antd';
import {
  SearchOutlined,
  MoreOutlined,
  CalendarOutlined,
  UnorderedListOutlined,
  CloseOutlined,
  CloudSyncOutlined,
  CloudUploadOutlined,
  CloudOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { CalendarProvider, useCalendar } from './context/CalendarContext';
import { SyncProvider, useSync } from './context/SyncContext';
import { UIProvider } from './context/UIContext';
import EventModal from './components/EventModal';
import CalendarPage from './mobile/CalendarPage';
import TodoPage from './mobile/TodoPage';
import MoreSheet from './mobile/MoreSheet';
import SyncPanel from './mobile/SyncPanel';
import { dayjs, lunarDateLabel, weekdayCN } from './utils/date';

function Shell() {
  const navigate = useNavigate();
  const location = useLocation();
  const { search, setSearch, activeTags, clearTags, events } = useCalendar();
  const { status, email } = useSync();
  const [searchOpen, setSearchOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [syncOpen, setSyncOpen] = useState(false);

  const today = dayjs();
  const lunar = useMemo(() => lunarDateLabel(today), [today]);

  /** 顶部同步状态图标 */
  const syncIcon =
    status === 'syncing' ? (
      <CloudUploadOutlined spin />
    ) : status === 'error' ? (
      <ExclamationCircleOutlined />
    ) : email ? (
      <CloudSyncOutlined />
    ) : (
      <CloudOutlined />
    );

  const tab = location.pathname.startsWith('/todos') ? 'todos' : 'calendar';

  /** 待办角标：未完成且今天及以前的事项数量 */
  const pending = useMemo(
    () =>
      events.filter((e) => {
        if (e.done) return false;
        const d = dayjs(e.date);
        return d.isValid() && !d.isAfter(today, 'day');
      }).length,
    [events, today]
  );

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
            onClick={() => {
              setSearchOpen((v) => !v);
              if (searchOpen) setSearch('');
            }}
            aria-label="搜索"
          >
            {searchOpen ? <CloseOutlined /> : <SearchOutlined />}
          </button>
          <button
            className={`topbar-btn sync-state ${
              status === 'error' ? 'err' : email ? 'ok' : 'off'
            }`}
            onClick={() => setSyncOpen(true)}
            aria-label="云同步"
            title={
              status === 'error'
                ? '同步失败，点击查看'
                : email
                  ? `云同步已开启（${email}）`
                  : '云同步未开启，点击设置'
            }
          >
            {syncIcon}
          </button>
          <button
            className="topbar-btn"
            onClick={() => setMoreOpen(true)}
            aria-label="更多"
          >
            <MoreOutlined />
          </button>
        </div>

        {searchOpen && (
          <div className="topbar-search">
            <Input
              autoFocus
              allowClear
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              prefix={<SearchOutlined style={{ color: '#9aa0b4' }} />}
              placeholder="搜索标题或描述…"
            />
          </div>
        )}

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
      <MoreSheet
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        onOpenSync={() => setSyncOpen(true)}
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
