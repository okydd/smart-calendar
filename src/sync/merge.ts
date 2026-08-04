import type { CalendarEvent } from '../types';

/** 云端表行结构（snake_case） */
export interface RemoteRow {
  id: string;
  user_id?: string;
  title: string;
  date: string;
  start_time: string | null;
  end_time: string | null;
  all_day: boolean;
  description: string | null;
  tag: string;
  done: boolean;
  deleted: boolean;
  updated_at: string;
}

const TAGS = ['purple', 'green', 'orange', 'red', 'blue', 'pink'];

/** 云端行 → 本地事件 */
export function rowToEvent(r: RemoteRow): CalendarEvent {
  return {
    id: r.id,
    title: r.title ?? '',
    date: r.date ?? '',
    startTime: r.start_time ?? '',
    endTime: r.end_time ?? '',
    allDay: Boolean(r.all_day),
    description: r.description ?? '',
    tag: (TAGS.includes(r.tag) ? r.tag : 'purple') as CalendarEvent['tag'],
    done: Boolean(r.done),
    deleted: Boolean(r.deleted),
    updatedAt: r.updated_at
  };
}

/** 本地事件 → 云端行 */
export function eventToRow(e: CalendarEvent, userId: string): RemoteRow {
  return {
    id: e.id,
    user_id: userId,
    title: e.title ?? '',
    date: e.date ?? '',
    start_time: e.startTime ?? '',
    end_time: e.endTime ?? '',
    all_day: Boolean(e.allDay),
    description: e.description ?? '',
    tag: TAGS.includes(e.tag) ? e.tag : 'purple',
    done: Boolean(e.done),
    deleted: Boolean(e.deleted),
    updated_at: e.updatedAt || new Date(0).toISOString()
  };
}

const ts = (s?: string) => (s ? Date.parse(s) || 0 : 0);

export interface MergeResult {
  /** 合并后的完整数据集（含墓碑） */
  merged: CalendarEvent[];
  /** 需要推送到云端的记录（本地更新或云端缺失） */
  toPush: CalendarEvent[];
  /** 从云端新拉取/更新的条数，用于提示 */
  pulledCount: number;
}

/**
 * 双向合并：以事件 id 为主键，逐条比较 updatedAt，取较新者（Last-Write-Wins）。
 *
 * - 本地有、云端无 → 推送
 * - 云端有、本地无 → 拉取
 * - 两边都有 → 时间戳新的胜出；本地更新则推送
 * - 删除通过 deleted 墓碑传播，不会因为一端缺失而复活
 */
export function mergeEvents(
  local: CalendarEvent[],
  remote: CalendarEvent[]
): MergeResult {
  const map = new Map<string, CalendarEvent>();
  const toPush: CalendarEvent[] = [];
  let pulledCount = 0;

  for (const e of local) map.set(e.id, e);

  for (const r of remote) {
    const l = map.get(r.id);
    if (!l) {
      map.set(r.id, r);
      pulledCount++;
      continue;
    }
    if (ts(r.updatedAt) > ts(l.updatedAt)) {
      map.set(r.id, r);
      pulledCount++;
    } else if (ts(l.updatedAt) > ts(r.updatedAt)) {
      toPush.push(l);
    }
    // 时间戳相同视为一致，无需处理
  }

  const remoteIds = new Set(remote.map((r) => r.id));
  for (const l of local) {
    if (!remoteIds.has(l.id)) toPush.push(l);
  }

  return {
    merged: Array.from(map.values()),
    toPush,
    pulledCount
  };
}
