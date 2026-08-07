import React, {
  createContext,
  useCallback,
  useContext,
  useState
} from 'react';
import { message } from 'antd';
import type { CalendarEvent } from '../types';
import { useSync } from './SyncContext';

export interface EventModalState {
  open: boolean;
  mode: 'create' | 'edit';
  initial: Partial<CalendarEvent> | null;
}

/** 事件查看页（只读查看，含编辑/删除/新建入口） */
export interface EventViewState {
  open: boolean;
  event: CalendarEvent | null;
}

interface UIContextValue {
  eventModal: EventModalState;
  openCreate: (initial?: Partial<CalendarEvent>) => void;
  openEdit: (event: CalendarEvent) => void;
  closeEventModal: () => void;
  /** 事件查看页 */
  eventView: EventViewState;
  openView: (event: CalendarEvent) => void;
  closeEventView: () => void;
  /** 移动端侧边栏抽屉 */
  sidebarOpen: boolean;
  setSidebarOpen: (b: boolean) => void;
  /** 移动端详情抽屉 */
  detailOpen: boolean;
  setDetailOpen: (b: boolean) => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [eventModal, setEventModal] = useState<EventModalState>({
    open: false,
    mode: 'create',
    initial: null
  });
  const [eventView, setEventView] = useState<EventViewState>({ open: false, event: null });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  // 仅已登录（已获授权）账号可新建/编辑；未登录的访客只能查看，不能改动数据
  const { userId } = useSync();

  const openCreate = useCallback(
    (initial?: Partial<CalendarEvent>) => {
      if (!userId) {
        message.warning('请先在「更多 → 云同步」登录后再新建事件');
        return;
      }
      setEventModal({ open: true, mode: 'create', initial: initial ?? null });
    },
    [userId]
  );

  const openEdit = useCallback(
    (event: CalendarEvent) => {
      if (!userId) {
        message.warning('请先在「更多 → 云同步」登录后再编辑事件');
        return;
      }
      setEventModal({ open: true, mode: 'edit', initial: event });
    },
    [userId]
  );

  const closeEventModal = useCallback(() => {
    setEventModal((m) => ({ ...m, open: false }));
  }, []);

  const openView = useCallback((event: CalendarEvent) => {
    setEventView({ open: true, event });
  }, []);

  const closeEventView = useCallback(() => {
    setEventView((m) => ({ ...m, open: false }));
  }, []);

  const value: UIContextValue = {
    eventModal,
    openCreate,
    openEdit,
    closeEventModal,
    eventView,
    openView,
    closeEventView,
    sidebarOpen,
    setSidebarOpen,
    detailOpen,
    setDetailOpen
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI 必须在 UIProvider 内使用');
  return ctx;
}
