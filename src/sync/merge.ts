import type { CalendarEvent, ReminderOffset } from '../types';

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
  important: boolean;
  /** 关联图片（dataURL 数组），存为 jsonb */
  images: string[];
  /** 提前提醒偏移量（可多个），存为 jsonb */
  reminder: ReminderOffset[] | null;
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
    important: Boolean(r.important),
    images: Array.isArray(r.images) ? (r.images as string[]) : [],
    reminder: Array.isArray(r.reminder) ? (r.reminder as ReminderOffset[]) : undefined,
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
    important: Boolean(e.important),
    images: Array.isArray(e.images) ? e.images : [],
    reminder: Array.isArray(e.reminder) ? e.reminder : [],
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
    const rT = ts(r.updatedAt);
    const lT = ts(l.updatedAt);
    let winner: CalendarEvent;
    let pull: boolean;
    let push: boolean;

    if (rT > lT) {
      winner = r;
      pull = true;
      push = false;
    } else if (lT > rT) {
      winner = l;
      pull = false;
      push = true;
    } else {
      // 时间戳相同：优先选有图片的一方，避免图片在同步中被静默丢弃
      const rHas = Array.isArray(r.images) && r.images.length > 0;
      const lHas = Array.isArray(l.images) && l.images.length > 0;
      if (rHas && !lHas) {
        winner = r;
        pull = true;
        push = false;
      } else if (lHas && !rHas) {
        winner = l;
        pull = false;
        push = true;
      } else {
        // 双方无差异（同时有图或同时无图），以云端为准
        winner = r;
        pull = true;
        push = false;
      }
    }

    // 自愈：无论哪方按时间胜出，只要胜出方缺失图片而另一方有，
    // 就把图片补回。这样可彻底杜绝「手机端图片消失 / 本地无图覆盖云端有图」的反向丢失。
    if (!Array.isArray(winner.images) || winner.images.length === 0) {
      const other = winner === r ? l : r;
      if (Array.isArray(other.images) && other.images.length > 0) {
        winner = { ...winner, images: other.images };
        push = true; // 带图版本需要写回（本地或云端）
        pull = false;
      }
    }

    // 自愈：提醒（reminder）同理，避免同步中静默丢失。
    // 历史原因：reminder 字段曾未写入 RemoteRow/云表，导致云同步把多提醒事件
    // 的提醒整体清空、进而原生排期被 cancelAllScheduled 全部取消（最早一个响后其余失效）。
    if (!Array.isArray(winner.reminder) || winner.reminder.length === 0) {
      const otherRem = winner === r ? l : r;
      if (Array.isArray(otherRem.reminder) && otherRem.reminder.length > 0) {
        winner = { ...winner, reminder: otherRem.reminder };
        push = true; // 带提醒版本需要写回（本地或云端）
        pull = false;
      }
    }

    map.set(r.id, winner);
    if (pull) pulledCount++;
    if (push) toPush.push(winner);
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
