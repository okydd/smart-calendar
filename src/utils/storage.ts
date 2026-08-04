import type { CalendarEvent } from '../types';
import { STORAGE_KEY } from '../constants';
import { genId } from './date';

/** 墓碑保留天数：超过该期限的已删除记录会被物理清除 */
const TOMBSTONE_TTL_DAYS = 90;

/**
 * 从 localStorage 读取事件数组（含软删除墓碑）。
 * 若不存在或解析失败返回 null，由调用方决定回退到示例数据。
 */
export function loadEvents(): CalendarEvent[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    const now = Date.now();
    const ttl = TOMBSTONE_TTL_DAYS * 24 * 3600 * 1000;
    // 补全旧数据缺失的 updatedAt，并清理过期墓碑
    return (parsed as CalendarEvent[])
      .filter((e) => {
        if (!e?.deleted) return true;
        const t = e.updatedAt ? Date.parse(e.updatedAt) : 0;
        return now - t < ttl;
      })
      .map((e) => ({
        ...e,
        updatedAt: e.updatedAt || new Date(0).toISOString()
      }));
  } catch {
    return null;
  }
}

/** 将事件数组写入 localStorage */
export function saveEvents(events: CalendarEvent[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (err) {
    console.error('保存日历事件失败', err);
  }
}

/** 校验并规范化导入的 JSON 数据，过滤非法项并返回有效事件 */
export function sanitizeImported(raw: unknown): CalendarEvent[] {
  if (!Array.isArray(raw)) throw new Error('JSON 根节点必须是事件数组');
  const valid: CalendarEvent[] = [];
  const nowIso = new Date().toISOString();
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const o = item as Record<string, unknown>;
    if (typeof o.title !== 'string' || !o.title.trim()) continue;
    if (typeof o.date !== 'string') continue;
    const tag = typeof o.tag === 'string' ? o.tag : 'purple';
    valid.push({
      id: typeof o.id === 'string' && o.id ? o.id : genId(),
      title: o.title,
      date: o.date,
      startTime: typeof o.startTime === 'string' ? o.startTime : '',
      endTime: typeof o.endTime === 'string' ? o.endTime : '',
      allDay: Boolean(o.allDay),
      description: typeof o.description === 'string' ? o.description : '',
      done: Boolean(o.done),
      deleted: Boolean(o.deleted),
      updatedAt: typeof o.updatedAt === 'string' ? o.updatedAt : nowIso,
      tag: (['purple', 'green', 'orange', 'red', 'blue', 'pink'].includes(tag)
        ? tag
        : 'purple') as CalendarEvent['tag']
    });
  }
  return valid;
}
