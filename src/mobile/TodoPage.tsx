import { useMemo, useState } from 'react';
import {
  CheckOutlined,
  LeftOutlined,
  RightOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { useCalendar } from '../context/CalendarContext';
import { useUI } from '../context/UIContext';
import { useSync } from '../context/SyncContext';
import {
  dayjs,
  parseDateStr,
  timeToMinutes,
  weekdayCN,
  type Dayjs
} from '../utils/date';
import EventFlags from '../components/EventFlags';
import type { CalendarEvent } from '../types';

interface Group {
  key: string;
  label: string;
  items: CalendarEvent[];
  /** 即使为空也始终展示（如「今天」） */
  alwaysShow?: boolean;
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
 * 办事清单页：按 今天 / 本周 / 下周 / 其它时间 / 已完成 分组（周一为每周第一天）。
 */
export default function TodoPage() {
  const { filteredEvents, toggleDone } = useCalendar();
  const { openView } = useUI();
  const [doneMonth, setDoneMonth] = useState(() => dayjs().startOf('month'));
  const [doneShowAll, setDoneShowAll] = useState(false);

  const today = useMemo(() => dayjs().startOf('day'), []);
  const todayStr = today.format('YYYY-MM-DD');

  const { status } = useSync();

  const { groups, doneItems } = useMemo(() => {
    const weekStart = today.isoWeekday(1);
    const weekEnd = today.isoWeekday(7);
    const nextWeekStart = weekStart.add(7, 'day');
    const nextWeekEnd = weekEnd.add(7, 'day');

    const todayItems: CalendarEvent[] = [];
    const week: CalendarEvent[] = [];
    const nextWeek: CalendarEvent[] = [];
    const other: CalendarEvent[] = [];
    const done: CalendarEvent[] = [];

    for (const e of filteredEvents) {
      // 今天：无论是否完成都留在「今天待办」；仅「已完成」划线，不当即移入「已完成」；过期事件按正常样式显示
      if (e.date === todayStr) {
        todayItems.push(e);
        continue;
      }
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

    const isStruck = (e: CalendarEvent) => !!e.done;
    const sorterStruck = (a: CalendarEvent, b: CalendarEvent) => {
      const sa = isStruck(a) ? 1 : 0;
      const sb = isStruck(b) ? 1 : 0;
      if (sa !== sb) return sa - sb;
      return sortEvents(a, b);
    };

    [todayItems, week, nextWeek, other].forEach((a) => a.sort(sorterStruck));
    done.sort((a, b) => sortEvents(b, a));

    const gs: Group[] = [
      { key: 'today', label: '今天待办', items: todayItems, alwaysShow: true },
      { key: 'week', label: '本周待办', items: week },
      { key: 'nextWeek', label: '下周待办', items: nextWeek },
      { key: 'other', label: '其它时间', items: other }
    ].filter((g) => g.items.length > 0 || g.alwaysShow);

    return { groups: gs, doneItems: done };
  }, [filteredEvents, today, todayStr]);

  const doneFiltered = useMemo(() => {
    if (doneShowAll) return doneItems;
    const ym = doneMonth.format('YYYY-MM');
    return doneItems.filter((e) => e.date.startsWith(ym));
  }, [doneItems, doneMonth, doneShowAll]);

  const renderItem = (e: CalendarEvent) => {
    const d = parseDateStr(e.date);
    const hint = d.isValid() ? statusHint(d, e, today) : '未设置日期';
    const struck = !!e.done;
    const timeText = e.allDay || !e.startTime ? '全天' : e.startTime;
    const dateText = d.isValid() ? dateLabel(d, today) : '未设置日期';
    return (
      <div className={`event-pill todo-item${e.important ? ' important' : ''}${e.done ? ' done-pill' : ' not-done'}`} key={e.id}>
        <button
          className={`todo-check${e.done ? ' checked' : ''}`}
          onClick={() => toggleDone(e.id)}
          aria-label={e.done ? '取消完成' : '标记完成'}
        >
          <CheckOutlined />
        </button>
        <div className="todo-body" onClick={() => openView(e)}>
          <div className="remind-title-line">
            <span className={`remind-title${struck ? ' struck' : ''}`}>{e.title}</span>
            {e.important && <span className="imp-flag">重</span>}
            <EventFlags e={e} />
          </div>
          <div className="remind-time-line">
            <span className="remind-date">{dateText}</span>
            <span className={`remind-time${e.allDay || !e.startTime ? ' all-day' : ''}${struck ? ' struck' : ''}`}>
              {timeText}
            </span>
            <span className={`todo-days${e.done ? ' done' : ''}`}>{hint}</span>
          </div>
        </div>
      </div>
    );
  };

  const headerIcon = (key: string) => {
    switch (key) {
      case 'today':
      case 'week':
      case 'nextWeek':
        return <CalendarOutlined className="remind-ico" />;
      case 'other':
        return <ClockCircleOutlined className="remind-ico" />;
      default:
        return <CalendarOutlined className="remind-ico" />;
    }
  };

  return (
    <div className="page">
      {groups.map((g) => (
        <section className="remind-card" key={g.key}>
          <div className={`remind-header ${g.key}`}>
            {headerIcon(g.key)}
            <span className="remind-label">{g.label}</span>
            <span className="remind-count">{g.items.length}</span>
          </div>
          {g.items.length === 0 ? (
            g.key === 'today' && status === 'syncing' ? (
              <div className="todo-empty syncing">
                <SyncOutlined spin /> 同步中…
              </div>
            ) : (
              <div className="todo-empty">无事件，或事件已全部完成</div>
            )
          ) : (
            <div className="remind-list">{g.items.map(renderItem)}</div>
          )}
        </section>
      ))}

      {doneItems.length > 0 && (
        <section className="remind-card done-section">
          <div className="remind-header done">
            <CheckCircleOutlined className="remind-ico" />
            <span className="remind-label">已完成</span>
            <span className="remind-range">{doneMonth.year()}年{doneMonth.month() + 1}月</span>
            <div className="done-filter-inline">
              <button
                className="nav-btn month-nav-inline"
                onClick={() => setDoneMonth(doneMonth.subtract(1, 'month'))}
                aria-label="上月"
              >
                <LeftOutlined />
              </button>
              <button
                className="nav-btn month-nav-inline"
                onClick={() => setDoneMonth(doneMonth.add(1, 'month'))}
                aria-label="下月"
              >
                <RightOutlined />
              </button>
              <button
                className="remind-back"
                onClick={() => setDoneShowAll((v) => !v)}
              >
                {doneShowAll ? '按月份' : '全部'}
              </button>
            </div>
            <span className="remind-count">{doneItems.length}</span>
          </div>
          {doneFiltered.length === 0 ? (
            <div className="empty-remind">本月暂无已完成事项</div>
          ) : (
            <div className="remind-list">{doneFiltered.map(renderItem)}</div>
          )}
        </section>
      )}
    </div>
  );
}
