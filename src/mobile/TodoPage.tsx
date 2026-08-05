import { useMemo, useState } from 'react';
import { CheckOutlined, DownOutlined } from '@ant-design/icons';
import { useCalendar } from '../context/CalendarContext';
import { useUI } from '../context/UIContext';
import {
  dayjs,
  parseDateStr,
  timeToMinutes,
  weekdayCN,
  type Dayjs
} from '../utils/date';
import { TAG_COLORS } from '../constants';
import type { CalendarEvent } from '../types';

interface Group {
  key: string;
  label: string;
  items: CalendarEvent[];
}

/** 按日期与时间排序 */
function sortEvents(a: CalendarEvent, b: CalendarEvent): number {
  if (a.date !== b.date) return a.date < b.date ? -1 : 1;
  if (a.allDay !== b.allDay) return a.allDay ? -1 : 1;
  return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
}

/** 相对日期文案 */
function dateLabel(d: Dayjs, today: Dayjs): string {
  if (d.isSame(today, 'day')) return '今天';
  if (d.isSame(today.add(1, 'day'), 'day')) return '明天';
  if (d.isSame(today.subtract(1, 'day'), 'day')) return '昨天';
  if (d.isSame(today, 'year')) return `${d.month() + 1}月${d.date()}日 ${weekdayCN(d)}`;
  return d.format('YYYY年M月D日');
}

/** 右侧状态提示 */
function statusHint(d: Dayjs, e: CalendarEvent, today: Dayjs): string {
  if (e.done) return '已完成';
  if (d.isBefore(today, 'day')) return '已过期';
  if (d.isSame(today, 'day')) {
    if (!e.allDay && e.startTime) {
      const now = dayjs();
      const [h, m] = e.startTime.split(':').map(Number);
      const start = dayjs().hour(h).minute(m);
      if (start.isAfter(now)) {
        const hours = Math.max(1, Math.ceil(start.diff(now, 'hour', true)));
        return `剩${hours}小时`;
      }
    }
    return '今天';
  }
  const days = d.diff(today, 'day');
  return `剩${days}天`;
}

/**
 * 办事清单页：按 本周 / 下周 / 其它时间 / 已完成 分组（周一为每周第一天）。
 */
export default function TodoPage() {
  const { filteredEvents, toggleDone } = useCalendar();
  const { openEdit } = useUI();
  const [doneOpen, setDoneOpen] = useState(false);

  const today = useMemo(() => dayjs().startOf('day'), []);

  const { groups, doneItems } = useMemo(() => {
    const weekStart = today.isoWeekday(1);
    const weekEnd = today.isoWeekday(7);
    const nextWeekStart = weekStart.add(7, 'day');
    const nextWeekEnd = weekEnd.add(7, 'day');

    const week: CalendarEvent[] = [];
    const nextWeek: CalendarEvent[] = [];
    const other: CalendarEvent[] = [];
    const done: CalendarEvent[] = [];

    for (const e of filteredEvents) {
      if (e.done) {
        done.push(e);
        continue;
      }
      const d = parseDateStr(e.date);
      if (!d.isValid()) {
        other.push(e);
      } else if (!d.isBefore(weekStart, 'day') && !d.isAfter(weekEnd, 'day')) {
        week.push(e);
      } else if (!d.isBefore(nextWeekStart, 'day') && !d.isAfter(nextWeekEnd, 'day')) {
        nextWeek.push(e);
      } else {
        other.push(e);
      }
    }

    [week, nextWeek, other].forEach((a) => a.sort(sortEvents));
    done.sort((a, b) => sortEvents(b, a));

    const gs: Group[] = [
      { key: 'week', label: '本周', items: week },
      { key: 'nextWeek', label: '下周', items: nextWeek },
      { key: 'other', label: '其它时间', items: other }
    ].filter((g) => g.items.length > 0);

    return { groups: gs, doneItems: done };
  }, [filteredEvents, today]);

  const renderItem = (e: CalendarEvent) => {
    const d = parseDateStr(e.date);
    const hint = d.isValid() ? statusHint(d, e, today) : '未设置日期';
    const expired = !e.done && d.isValid() && d.isBefore(today, 'day');
    const color = TAG_COLORS[e.tag].color;
    const timeText = e.allDay || !e.startTime ? '全天' : e.startTime;
    const dateText = d.isValid() ? dateLabel(d, today) : '未设置日期';
    return (
      <div className="todo-item" key={e.id}>
        <button
          className={`todo-check${e.done ? ' checked' : ''}`}
          onClick={() => toggleDone(e.id)}
          aria-label={e.done ? '取消完成' : '标记完成'}
        >
          <CheckOutlined />
        </button>
        <div className="todo-body" onClick={() => openEdit(e)}>
          <div className="remind-title-line">
            <span className={`remind-title${e.done ? ' done' : ''}`}>{e.title}</span>
            <span className="tag-chip" style={{ background: `${color}22`, color }}>
              {TAG_COLORS[e.tag].label}
            </span>
          </div>
          <div className="remind-time-line">
            <span className="remind-date">{dateText}</span>
            <span className={`remind-time${e.allDay || !e.startTime ? ' all-day' : ''}`}>
              {timeText}
            </span>
          </div>
        </div>
        <div className={`todo-hint${expired ? ' expired' : e.done ? ' done' : ''}`}>{hint}</div>
      </div>
    );
  };

  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="page">
      {total === 0 && doneItems.length === 0 ? (
        <div className="empty-todo">
          <span className="big">✅</span>
          还没有待办事项
          <br />
          点击右下角 + 添加一条吧
        </div>
      ) : null}

      {groups.map((g) => (
        <section className="todo-group" key={g.key}>
          <div className="group-head">
            <h4>{g.label}</h4>
            <span className="count">{g.items.length}</span>
          </div>
          {g.items.map(renderItem)}
        </section>
      ))}

      {doneItems.length > 0 && (
        <section className="todo-group done-section">
          <div
            className="group-head clickable"
            onClick={() => setDoneOpen((v) => !v)}
          >
            <h4>已完成事项</h4>
            <span className="count">{doneItems.length}</span>
            <DownOutlined className={`chev${doneOpen ? ' open' : ''}`} />
          </div>
          {doneOpen && doneItems.map(renderItem)}
        </section>
      )}
    </div>
  );
}
