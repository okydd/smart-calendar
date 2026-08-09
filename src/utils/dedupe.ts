import type { CalendarEvent } from '../types';

/**
 * 重复事件检测与清理。
 *
 * 背景：历史上示例事件使用随机 ID 生成，本机 localStorage 被清空后会重新生成一批
 * 内容相同但 ID 不同的事件；云同步的 mergeEvents 以 id 为主键做 LWW，无法识别它们
 * 是同一条，于是「月提醒」等列表里出现完全一样的两条数据。
 *
 * 这里按「内容指纹」而非 ID 判重，保留信息最完整的一条，其余转为墓碑（deleted:true），
 * 这样删除动作也会同步到云端和其它设备。
 */

/** 生成内容指纹：标题 + 日期 + 时间 + 全天标记 */
export function fingerprint(e: CalendarEvent): string {
  const title = (e.title || '').trim().replace(/\s+/g, ' ');
  const start = e.allDay ? '' : (e.startTime || '').trim();
  const end = e.allDay ? '' : (e.endTime || '').trim();
  return [title, e.date, start, end, e.allDay ? '1' : '0'].join('\u0001');
}

/** 打分：内容越完整分数越高，用于在重复组里挑选保留项 */
function richness(e: CalendarEvent): number {
  let s = 0;
  if (e.description && e.description.trim()) s += 2;
  if (e.images && e.images.length) s += e.images.length * 3;
  if (e.reminder && e.reminder.length) s += 2;
  if (e.important) s += 1;
  if (e.done) s += 1;
  return s;
}

export interface DuplicateGroup {
  /** 内容指纹 */
  key: string;
  /** 展示用标题 */
  title: string;
  /** 展示用日期 */
  date: string;
  /** 保留的事件 */
  keep: CalendarEvent;
  /** 需要清除的重复事件 */
  drop: CalendarEvent[];
}

/** 找出所有重复组（仅统计未删除事件） */
export function findDuplicateGroups(events: CalendarEvent[]): DuplicateGroup[] {
  const map = new Map<string, CalendarEvent[]>();
  for (const e of events) {
    if (e.deleted) continue;
    if (!e.title || !e.date) continue;
    const k = fingerprint(e);
    const arr = map.get(k);
    if (arr) arr.push(e);
    else map.set(k, [e]);
  }

  const groups: DuplicateGroup[] = [];
  for (const [key, arr] of map) {
    if (arr.length < 2) continue;
    // 内容更完整的优先保留；并列时保留最近修改的；再并列按 id 排序保证结果稳定
    const sorted = [...arr].sort((a, b) => {
      const dr = richness(b) - richness(a);
      if (dr !== 0) return dr;
      const ta = Date.parse(a.updatedAt || '') || 0;
      const tb = Date.parse(b.updatedAt || '') || 0;
      if (tb !== ta) return tb - ta;
      return a.id.localeCompare(b.id);
    });
    const [keep, ...drop] = sorted;
    groups.push({ key, title: keep.title, date: keep.date, keep, drop });
  }

  groups.sort((a, b) => a.date.localeCompare(b.date));
  return groups;
}

/** 重复事件总条数（可清理掉的数量） */
export function countDuplicates(events: CalendarEvent[]): number {
  return findDuplicateGroups(events).reduce((n, g) => n + g.drop.length, 0);
}

/**
 * 执行清理：把重复项转为墓碑。
 * 返回新的完整数组（含墓碑）与清理条数。
 */
export function dedupeEvents(events: CalendarEvent[]): {
  events: CalendarEvent[];
  removed: number;
} {
  const groups = findDuplicateGroups(events);
  if (!groups.length) return { events, removed: 0 };

  const dropIds = new Set<string>();
  for (const g of groups) for (const d of g.drop) dropIds.add(d.id);

  const now = new Date().toISOString();
  const next = events.map((e) =>
    dropIds.has(e.id) ? { ...e, deleted: true, updatedAt: now } : e
  );
  return { events: next, removed: dropIds.size };
}
