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

interface UIContextValue {
  eventModal: EventModalState;
  openCreate: (initial?: Partial<CalendarEvent>) => void;
  openEdit: (event: CalendarEvent) => void;
  closeEventModal: () => void;
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

  const value: UIContextValue = {
    eventModal,
    openCreate,
    openEdit,
    closeEventModal,
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
