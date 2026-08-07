import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { message } from 'antd';
import { dayjs, type Dayjs } from '../utils/date';
import type { CalendarEvent, TagColor, ViewMode } from '../types';
import { loadEvents, saveEvents } from '../utils/storage';
import { generateSampleEvents } from '../data/sampleEvents';

const nowIso = () => new Date().toISOString();

/** 给事件补上最新修改时间戳 */
function stamp<T extends Partial<CalendarEvent>>(e: T): T & { updatedAt: string } {
  return { ...e, updatedAt: nowIso() };
}

interface CalendarContextValue {
  /** 全部有效事件（不含已删除墓碑） */
  events: CalendarEvent[];
  /** 含软删除墓碑的原始数据，仅同步引擎使用 */
  allEvents: CalendarEvent[];
  /** 经过搜索/标签过滤后的事件（视图使用） */
  filteredEvents: CalendarEvent[];
  /** 当前视图模式 */
  view: ViewMode;
  /** 导航/选中的日期 */
  currentDate: Dayjs;
  /** 选中的事件 ID */
  selectedEventId: string | null;
  /** 选中的事件对象 */
  selectedEvent: CalendarEvent | null;
  /** 搜索关键字 */
  search: string;
  /** 激活的标签筛选 */
  activeTags: TagColor[];
  /** 本地数据版本号，每次变更自增，供同步引擎监听 */
  revision: number;
  setView: (v: ViewMode) => void;
  setCurrentDate: (d: Dayjs) => void;
  selectEvent: (id: string | null) => void;
  setSearch: (s: string) => void;
  toggleTag: (t: TagColor) => void;
  clearTags: () => void;
  addEvent: (e: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, patch: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  /** 切换待办完成状态 */
  toggleDone: (id: string) => void;
  importEvents: (e: CalendarEvent[]) => void;
  resetSample: () => void;
  /** 同步引擎回写合并结果（不标记为本地变更） */
  applyMerged: (e: CalendarEvent[]) => void;
  /** 读取当前完整数据（含墓碑）的快照，避免闭包过期 */
  snapshot: () => CalendarEvent[];
}

const CalendarContext = createContext<CalendarContextValue | null>(null);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>(() => {
    const stored = loadEvents();
    if (stored) return stored;
    const sample = generateSampleEvents().map((e) => stamp(e) as CalendarEvent);
    saveEvents(sample);
    return sample;
  });
  const [view, setView] = useState<ViewMode>('month');
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [activeTags, setActiveTags] = useState<TagColor[]>([]);
  const [revision, setRevision] = useState(0);

  // 始终持有最新数据引用，供同步引擎在异步回调中读取
  const latestRef = useRef(allEvents);
  latestRef.current = allEvents;

  // 任意变更后持久化；若因 localStorage 配额不足失败，提示用户导出/清理
  const saveWarnedRef = useRef(false);
  useEffect(() => {
    const res = saveEvents(allEvents);
    if (!res.ok) {
      if (!saveWarnedRef.current) {
        saveWarnedRef.current = true;
        message.error(res.error, 6);
      }
    } else {
      saveWarnedRef.current = false;
    }
  }, [allEvents]);

  /** 本地变更：写入并触发同步 */
  const mutate = useCallback(
    (fn: (prev: CalendarEvent[]) => CalendarEvent[]) => {
      setAllEvents((prev) => {
        const next = fn(prev);
        latestRef.current = next;
        return next;
      });
      setRevision((r) => r + 1);
    },
    []
  );

  const events = useMemo(() => allEvents.filter((e) => !e.deleted), [allEvents]);

  const filteredEvents = useMemo(() => {
    const kw = search.trim().toLowerCase();
    return events.filter((e) => {
      if (activeTags.length && !activeTags.includes(e.tag)) return false;
      if (kw) {
        const hay = `${e.title} ${e.description || ''}`.toLowerCase();
        if (!hay.includes(kw)) return false;
      }
      return true;
    });
  }, [events, search, activeTags]);

  const selectedEvent = useMemo(
    () => events.find((e) => e.id === selectedEventId) ?? null,
    [events, selectedEventId]
  );

  const selectEvent = useCallback((id: string | null) => setSelectedEventId(id), []);

  const toggleTag = useCallback((t: TagColor) => {
    setActiveTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  }, []);

  const clearTags = useCallback(() => setActiveTags([]), []);

  const addEvent = useCallback(
    (e: Omit<CalendarEvent, 'id'>) => {
      mutate((prev) => [
        ...prev,
        stamp({ ...e, id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}` }) as CalendarEvent
      ]);
    },
    [mutate]
  );

  const updateEvent = useCallback(
    (id: string, patch: Partial<CalendarEvent>) => {
      mutate((prev) => prev.map((e) => (e.id === id ? { ...e, ...stamp(patch) } : e)));
    },
    [mutate]
  );

  /** 软删除：保留墓碑以便把删除动作同步到其它设备 */
  const deleteEvent = useCallback(
    (id: string) => {
      mutate((prev) =>
        prev.map((e) => (e.id === id ? { ...e, deleted: true, updatedAt: nowIso() } : e))
      );
      setSelectedEventId((cur) => (cur === id ? null : cur));
    },
    [mutate]
  );

  const toggleDone = useCallback(
    (id: string) => {
      mutate((prev) =>
        prev.map((e) => (e.id === id ? { ...e, done: !e.done, updatedAt: nowIso() } : e))
      );
    },
    [mutate]
  );

  /** 导入 JSON：导入列表外的既有事件转为墓碑，保证同步语义一致 */
  const importEvents = useCallback(
    (incoming: CalendarEvent[]) => {
      mutate((prev) => {
        const ids = new Set(incoming.map((e) => e.id));
        const tombstones = prev
          .filter((e) => !ids.has(e.id) && !e.deleted)
          .map((e) => ({ ...e, deleted: true, updatedAt: nowIso() }));
        const fresh = incoming.map((e) => ({ ...e, updatedAt: nowIso() }));
        return [...fresh, ...tombstones];
      });
      setSelectedEventId(null);
    },
    [mutate]
  );

  const resetSample = useCallback(() => {
    const sample = generateSampleEvents().map((e) => stamp(e) as CalendarEvent);
    importEvents(sample);
  }, [importEvents]);

  /** 同步引擎回写：不自增 revision，避免无限同步循环 */
  const applyMerged = useCallback((merged: CalendarEvent[]) => {
    setAllEvents(() => {
      latestRef.current = merged;
      return merged;
    });
  }, []);

  const snapshot = useCallback(() => latestRef.current, []);

  const value: CalendarContextValue = {
    events,
    allEvents,
    filteredEvents,
    view,
    currentDate,
    selectedEventId,
    selectedEvent,
    search,
    activeTags,
    revision,
    setView,
    setCurrentDate,
    selectEvent,
    setSearch,
    toggleTag,
    clearTags,
    addEvent,
    updateEvent,
    deleteEvent,
    toggleDone,
    importEvents,
    resetSample,
    applyMerged,
    snapshot
  };

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCalendar(): CalendarContextValue {
  const ctx = useContext(CalendarContext);
  if (!ctx) throw new Error('useCalendar 必须在 CalendarProvider 内使用');
  return ctx;
}
