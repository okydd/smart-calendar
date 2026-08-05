import React, {
  createContext,
  useCallback,
  useContext,
  useState
} from 'react';
import type { CalendarEvent } from '../types';

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

  const openCreate = useCallback((initial?: Partial<CalendarEvent>) => {
    setEventModal({ open: true, mode: 'create', initial: initial ?? null });
  }, []);

  const openEdit = useCallback((event: CalendarEvent) => {
    setEventModal({ open: true, mode: 'edit', initial: event });
  }, []);

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
