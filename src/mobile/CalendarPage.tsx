import { useMemo, useRef, useState } from 'react';
import {
  LeftOutlined,
  RightOutlined,
  PlusOutlined,
  CheckOutlined,
  BellOutlined,
  AppstoreOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { useCalendar } from '../context/CalendarContext';
import { useUI } from '../context/UIContext';
import {
  dayjs,
  timeToMinutes,
  toDateStr,
  type Dayjs
} from '../utils/date';
import { TAG_COLORS } from '../constants';
import type { CalendarEvent } from '../types';

const WEEK_DAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const WEEK_HEAD = ['一', '二', '三', '四', '五', '六', '日'];

/** 按日期归组事件 */
function groupByDate(events: CalendarEvent[]) {
  const map = new Map<string, CalendarEvent[]>();
  for (const e of events) {
    const arr = map.get(e.date);
    if (arr) arr.push(e);
    else map.set(e.date, [e]);
  }
  for (const arr of map.values()) {
    arr.sort((a, b) => {
      if (a.allDay !== b.allDay) return a.allDay ? -1 : 1;
      return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
    });
  }
  return map;
}

/** 相对时间提示：已过期 / 剩X小时 / 剩X天 / 今天 */
function timeHint(d: Dayjs, e: CalendarEvent): string {
  const today = dayjs().startOf('day');
  const eventDay = d.startOf('day');
  if (eventDay.isBefore(today, 'day')) return '已过期';
  if (eventDay.isAfter(today, 'day')) {
    const days = eventDay.diff(today, 'day');
    return `剩${days}天`;
  }
  if (!e.allDay && e.startTime) {
    const now = dayjs();
    const [h, m] = e.startTime.split(':').map(Number);
    const start = dayjs().hour(h).minute(m).startOf('minute');
    if (start.isAfter(now)) {
      const hours = Math.max(1, Math.ceil(start.diff(now, 'hour', true)));
      return `剩${hours}小时`;
    }
  }
  return '今天';
}

export default function CalendarPage({ showFab = true }: { showFab?: boolean }) {
  const { filteredEvents, currentDate, setCurrentDate, toggleDone } = useCalendar();
  const { openCreate, openEdit } = useUI();
  const [slide, setSlide] = useState<'' | 'slide-left' | 'slide-right'>('');
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  const today = dayjs();
  const days = useMemo(() => {
    const start = currentDate.startOf('month').subtract((currentDate.date(1).day() + 6) % 7, 'day');
    return Array.from({ length: 42 }, (_, i) => start.add(i, 'day'));
  }, [currentDate]);
  const byDate = useMemo(() => groupByDate(filteredEvents), [filteredEvents]);

  const goMonth = (delta: number) => {
    setSlide(delta > 0 ? 'slide-left' : 'slide-right');
    setCurrentDate(currentDate.add(delta, 'month'));
    window.setTimeout(() => setSlide(''), 260);
  };

  const goToday = () => {
    setSlide('');
    setCurrentDate(dayjs());
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchRef.current;
    if (!start) return;
    touchRef.current = null;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.6) {
      goMonth(dx < 0 ? 1 : -1);
    }
  };

  // 日 / 周 / 月 分组（周一为每周第一天）
  const { dayEvents, weekEvents, monthEvents, monthRangeLabel } = useMemo(() => {
    const mondayThis = currentDate.isoWeekday(1);
    const weekStart = mondayThis;
    const weekEnd = mondayThis.add(6, 'day');
    const nextWeekStart = weekStart.add(7, 'day');
    const nextWeekEnd = weekEnd.add(7, 'day');
    const wk3Start = weekStart.add(14, 'day');
    const wk3End = weekEnd.add(14, 'day');
    const wk4Start = weekStart.add(21, 'day');
    const wk4End = weekEnd.add(21, 'day');

    const inRange = (d: Dayjs, s: Dayjs, e: Dayjs) =>
      !d.isBefore(s, 'day') && !d.isAfter(e, 'day');

    const selectedKey = toDateStr(currentDate);

    const day: CalendarEvent[] = [];
    const week: CalendarEvent[] = [];
    const month: CalendarEvent[] = [];

    for (const e of filteredEvents) {
      const d = dayjs(e.date);
      if (!d.isValid()) continue;
      if (e.date === selectedKey) {
        day.push(e);
        continue;
      }
      if (inRange(d, weekStart, weekEnd) || inRange(d, nextWeekStart, nextWeekEnd)) {
        week.push(e);
        continue;
      }
      if (inRange(d, wk3Start, wk3End) || inRange(d, wk4Start, wk4End)) {
        month.push(e);
        continue;
      }
    }

    const sorter = (a: CalendarEvent, b: CalendarEvent) => {
      if (a.date !== b.date) return a.date < b.date ? -1 : 1;
      if (a.allDay !== b.allDay) return a.allDay ? -1 : 1;
      return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
    };

    day.sort(sorter);
    week.sort(sorter);
    month.sort(sorter);

    const label = `第3周 ${wk3Start.month() + 1}/${wk3Start.date()} - 第4周 ${wk4End.month() + 1}/${wk4End.date()}`;
    return { dayEvents: day, weekEvents: week, monthEvents: month, monthRangeLabel: label };
  }, [filteredEvents, currentDate]);

  const selectedKey = toDateStr(currentDate);
  const isToday = currentDate.isSame(today, 'day');

  /** 渲染一条提醒：两行（标题+标签 / 时间），左侧灰边、重要才彩色 */
  const renderEventRow = (e: CalendarEvent, showDate: boolean) => {
    const d = dayjs(e.date);
    const expired = !e.done && d.isValid() && d.isBefore(today, 'day');
    const color = TAG_COLORS[e.tag].color;
    const timeText = e.allDay || !e.startTime ? '全天' : e.startTime;
    const dateText =
      showDate && d.isValid()
        ? `${d.month() + 1}月${d.date()}日 ${WEEK_DAYS[(d.day() + 6) % 7]}`
        : '';
    return (
      <div key={e.id} className="remind-row" onClick={() => openEdit(e)}>
        <span
          className="remind-bar"
          style={{ background: e.important ? color : 'var(--c-border)' }}
        />
        <div className="remind-main">
          <div className="remind-title-line">
            <span className={`remind-title${e.done ? ' done' : ''}`}>{e.title}</span>
            <span className="tag-chip" style={{ background: `${color}22`, color }}>
              {TAG_COLORS[e.tag].label}
            </span>
          </div>
          <div className="remind-time-line">
            {showDate && dateText ? <span className="remind-date">{dateText}</span> : null}
            <span className={`remind-time${e.allDay || !e.startTime ? ' all-day' : ''}`}>
              {timeText}
            </span>
            <span className={`remind-hint${expired ? ' expired' : ''}`}>{timeHint(d, e)}</span>
          </div>
        </div>
        <button
          className={`todo-check${e.done ? ' checked' : ''}`}
          onClick={(ev) => {
            ev.stopPropagation();
            toggleDone(e.id);
          }}
          aria-label="标记完成"
        >
          <CheckOutlined />
        </button>
      </div>
    );
  };

  return (
    <div className="page">
      <div className="cal-card">
        <div className="month-bar">
          <div className="month-title">
            {currentDate.year()}年{currentDate.month() + 1}月
          </div>
          <div className="month-nav">
            <button className="nav-btn" onClick={() => goMonth(-1)} aria-label="上个月">
              <LeftOutlined />
            </button>
            <button className="nav-btn" onClick={() => goMonth(1)} aria-label="下个月">
              <RightOutlined />
            </button>
            <button className="today-btn" onClick={goToday}>
              今天
            </button>
          </div>
        </div>

        <div className="week-head">
          {WEEK_HEAD.map((w, i) => (
            <span key={w} className={i >= 5 ? 'we' : ''}>
              {w}
            </span>
          ))}
        </div>

        <div
          className={`month-grid ${slide}`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {days.map((d) => {
            const key = toDateStr(d);
            const evts = byDate.get(key) ?? [];
            const isOut = d.month() !== currentDate.month();
            const isWeekend = d.day() === 0 || d.day() === 6;
            const cls = [
              'mcell',
              isOut ? 'out' : '',
              isWeekend ? 'weekend' : '',
              d.isSame(today, 'day') ? 'today' : '',
              key === selectedKey ? 'selected' : ''
            ]
              .filter(Boolean)
              .join(' ');
            return (
              <div key={key} className={cls} onClick={() => setCurrentDate(d)}>
                <span className="dnum">{d.date()}</span>
                {evts.length > 0 && !isOut && <span className="event-ring" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* 日提醒 */}
      <section className="remind-card">
        <div className="remind-header">
          <BellOutlined className="remind-ico" />
          <span className="remind-label">日提醒</span>
          {isToday && <span className="today-tag">今</span>}
        </div>
        {dayEvents.length === 0 ? (
          <div className="empty-remind" onClick={() => openCreate({ date: selectedKey })}>
            <CheckOutlined className="empty-check" />
            今天暂无安排
            <PlusOutlined className="empty-plus" />
          </div>
        ) : (
          <div className="remind-list">{dayEvents.map((e) => renderEventRow(e, false))}</div>
        )}
      </section>

      {/* 周提醒（本周 + 下周） */}
      {weekEvents.length > 0 && (
        <section className="remind-card">
          <div className="remind-header">
            <AppstoreOutlined className="remind-ico" />
            <span className="remind-label">周提醒</span>
            <span className="remind-count">{weekEvents.length}</span>
          </div>
          <div className="remind-list">{weekEvents.map((e) => renderEventRow(e, true))}</div>
        </section>
      )}

      {/* 月提醒（第 3、4 周） */}
      {monthEvents.length > 0 && (
        <section className="remind-card">
          <div className="remind-header">
            <CalendarOutlined className="remind-ico" />
            <span className="remind-label">月提醒</span>
            <span className="remind-range">{monthRangeLabel}</span>
            <span className="remind-count">{monthEvents.length}</span>
          </div>
          <div className="remind-list">{monthEvents.map((e) => renderEventRow(e, true))}</div>
        </section>
      )}

      {showFab && (
        <button
          className="fab"
          onClick={() => openCreate({ date: selectedKey })}
          aria-label="新建日程"
        >
          <PlusOutlined />
        </button>
      )}
    </div>
  );
}
