import { useMemo, useState } from 'react';
import { CheckOutlined, DownOutlined } from '@ant-design/icons';
import { useCalendar } from '../context/CalendarContext';
import { useUI } from '../context/UIContext';
import {
  dayjs,
  parseDateStr,
  timeRangeLabel,
  timeToMinutes,
  toDateStr,
  weekdayCN,
  type Dayjs
} from '../utils/date';
import { TAG_COLORS } from '../constants';
import type { CalendarEvent } from '../types';

interface Group {
  key: string;
  label: string;
  items: CalendarEvent[];
  overdue?: boolean;
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

/**
 * 移动端办事清单页：按 已过期 / 今天 / 本周 / 本月 / 以后 分组，
 * 支持勾选完成、已完成折叠、快速添加。
 */
export default function TodoPage() {
  const { filteredEvents, addEvent, toggleDone } = useCalendar();
  const { openEdit } = useUI();
  const [draft, setDraft] = useState('');
  const [doneOpen, setDoneOpen] = useState(false);

  const today = useMemo(() => dayjs().startOf('day'), []);

  const { groups, doneItems } = useMemo(() => {
    const weekEnd = today.weekday(6);
    const monthEnd = today.endOf('month');

    const overdue: CalendarEvent[] = [];
    const todayList: CalendarEvent[] = [];
    const week: CalendarEvent[] = [];
    const month: CalendarEvent[] = [];
    const later: CalendarEvent[] = [];
    const done: CalendarEvent[] = [];

    for (const e of filteredEvents) {
      if (e.done) {
        done.push(e);
        continue;
      }
      const d = parseDateStr(e.date);
      if (!d.isValid()) {
        later.push(e);
      } else if (d.isBefore(today, 'day')) {
        overdue.push(e);
      } else if (d.isSame(today, 'day')) {
        todayList.push(e);
      } else if (!d.isAfter(weekEnd, 'day')) {
        week.push(e);
      } else if (!d.isAfter(monthEnd, 'day')) {
        month.push(e);
      } else {
        later.push(e);
      }
    }

    [overdue, todayList, week, month, later].forEach((a) => a.sort(sortEvents));
    done.sort((a, b) => sortEvents(b, a));

    const gs: Group[] = [
      { key: 'overdue', label: '已过期', items: overdue, overdue: true },
      { key: 'today', label: '今天', items: todayList },
      { key: 'week', label: '本周', items: week },
      { key: 'month', label: '本月', items: month },
      { key: 'later', label: '以后', items: later }
    ].filter((g) => g.items.length > 0);

    return { groups: gs, doneItems: done };
  }, [filteredEvents, today]);

  const handleAdd = () => {
    const title = draft.trim();
    if (!title) return;
    addEvent({
      title,
      date: toDateStr(dayjs()),
      startTime: '',
      endTime: '',
      allDay: true,
      description: '',
      tag: 'purple',
      done: false
    });
    setDraft('');
  };

  const renderItem = (e: CalendarEvent) => {
    const d = parseDateStr(e.date);
    const isOverdue = !e.done && d.isValid() && d.isBefore(today, 'day');
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
          <div className={`todo-title${e.done ? ' done' : ''}`}>{e.title}</div>
          <div className="todo-meta">
            <span
              className="todo-dot"
              style={{ background: TAG_COLORS[e.tag].color }}
            />
            <span className={isOverdue ? 'overdue-txt' : ''}>
              {d.isValid() ? dateLabel(d, today) : '未设置日期'}
            </span>
            {!e.allDay && e.startTime ? <span>{timeRangeLabel(e)}</span> : null}
            <span>{TAG_COLORS[e.tag].label}</span>
          </div>
        </div>
      </div>
    );
  };

  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="page">
      <div className="quick-add">
        <input
          value={draft}
          onChange={(ev) => setDraft(ev.target.value)}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter') handleAdd();
          }}
          placeholder="添加待办事项，回车即可…"
          maxLength={50}
        />
        <button onClick={handleAdd} disabled={!draft.trim()}>
          添加
        </button>
      </div>

      {total === 0 && doneItems.length === 0 ? (
        <div className="empty-todo">
          <span className="big">✅</span>
          还没有待办事项
          <br />
          在上方输入框添加第一条吧
        </div>
      ) : null}

      {groups.map((g) => (
        <section className="todo-group" key={g.key}>
          <div className={`group-head${g.overdue ? ' overdue' : ''}`}>
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
            <h4>已完成</h4>
            <span className="count">{doneItems.length}</span>
            <DownOutlined className={`chev${doneOpen ? ' open' : ''}`} />
          </div>
          {doneOpen && doneItems.map(renderItem)}
        </section>
      )}
    </div>
  );
}
