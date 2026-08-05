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
  monthGridDays,
  timeRangeLabel,
  timeToMinutes,
  toDateStr,
  weekdayCN,
  WEEK_CN,
  type Dayjs
} from '../utils/date';
import { TAG_COLORS } from '../constants';
import type { CalendarEvent } from '../types';

const WEEK_DAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

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

/** 相对时间提示：已过期 / 剩X小时 / 剩X天 */
function timeHint(d: Dayjs, e: CalendarEvent): string {
  const today = dayjs().startOf('day');
  const eventDay = d.startOf('day');
  if (eventDay.isBefore(today, 'day')) return '已过期';
  if (eventDay.isAfter(today, 'day')) {
    const days = eventDay.diff(today, 'day');
    return `剩${days}天`;
  }
  // 今天：若还有具体开始时间，计算剩余小时
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
  const days = useMemo(() => monthGridDays(currentDate), [currentDate]);
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

  // 日 / 周 / 月 分组
  const { dayEvents, weekEvents, monthEvents } = useMemo(() => {
    const selectedKey = toDateStr(currentDate);
    const weekStart = currentDate.weekday(0);
    const weekEnd = currentDate.weekday(6);
    const monthStart = currentDate.startOf('month');
    const monthEnd = currentDate.endOf('month');

    const day: CalendarEvent[] = [];
    const week: CalendarEvent[] = [];
    const month: CalendarEvent[] = [];

    for (const e of filteredEvents) {
      const d = dayjs(e.date);
      if (!d.isValid()) continue;
      if (e.date === selectedKey) {
        day.push(e);
      } else if (!d.isBefore(weekStart, 'day') && !d.isAfter(weekEnd, 'day')) {
        week.push(e);
      } else if (!d.isBefore(monthStart, 'day') && !d.isAfter(monthEnd, 'day')) {
        month.push(e);
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
    return { dayEvents: day, weekEvents: week, monthEvents: month };
  }, [filteredEvents, currentDate]);

  const selectedKey = toDateStr(currentDate);
  const isToday = currentDate.isSame(today, 'day');

  const renderEventRow = (e: CalendarEvent) => {
    const d = dayjs(e.date);
    const expired = !e.done && d.isValid() && d.isBefore(today, 'day');
    return (
      <div key={e.id} className="remind-row" onClick={() => openEdit(e)}>
        <span className="remind-bar" style={{ background: TAG_COLORS[e.tag].color }} />
        <div className="remind-main">
          <div className="remind-head">
            <span className="remind-date">
              {d.month() + 1}月{d.date()}日 {WEEK_DAYS[(d.day() + 6) % 7]}
            </span>
            {!e.allDay && e.startTime ? (
              <span className="remind-time">{e.startTime}</span>
            ) : (
              <span className="remind-time all-day">全天</span>
            )}
            <span className={`remind-hint${expired ? ' expired' : ''}`}>{timeHint(d, e)}</span>
          </div>
          <div className={`remind-title${e.done ? ' done' : ''}`}>{e.title}</div>
          <div className="remind-tags">
            <span
              className="remind-dot"
              style={{ background: TAG_COLORS[e.tag].color }}
            />
            <span className="remind-tag-name">{TAG_COLORS[e.tag].label}</span>
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
          {WEEK_CN.map((w, i) => (
            <span key={w} className={i === 0 || i === 6 ? 'we' : ''}>
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
                {evts.length > 0 && !isOut && (
                  <div className="dots">
                    {evts.slice(0, 3).map((e) => (
                      <span
                        key={e.id}
                        className="dot"
                        style={{
                          background: TAG_COLORS[e.tag].color,
                          opacity: e.done ? 0.35 : 1
                        }}
                      />
                    ))}
                    {evts.length > 3 && (
                      <span className="dot mini" style={{ background: '#9aa0b4' }} />
                    )}
                  </div>
                )}
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
          <span className="remind-range">
            {currentDate.month() + 1}月{currentDate.date()}日 {WEEK_DAYS[(currentDate.day() + 6) % 7]}
          </span>
          {isToday && <span className="today-tag">今</span>}
        </div>
        {dayEvents.length === 0 ? (
          <div className="empty-remind" onClick={() => openCreate({ date: selectedKey })}>
            <CheckOutlined className="empty-check" />
            今天暂无安排
            <PlusOutlined className="empty-plus" />
          </div>
        ) : (
          <div className="remind-list">{dayEvents.map(renderEventRow)}</div>
        )}
      </section>

      {/* 周提醒 */}
      {weekEvents.length > 0 && (
        <section className="remind-card">
          <div className="remind-header">
            <AppstoreOutlined className="remind-ico" />
            <span className="remind-label">周提醒</span>
            <span className="remind-count">{weekEvents.length}</span>
          </div>
          <div className="remind-list">{weekEvents.map(renderEventRow)}</div>
        </section>
      )}

      {/* 月提醒 */}
      {monthEvents.length > 0 && (
        <section className="remind-card">
          <div className="remind-header">
            <CalendarOutlined className="remind-ico" />
            <span className="remind-label">月提醒</span>
            <span className="remind-range">
              {currentDate.month() + 1}月 - {currentDate.add(1, 'month').month() + 1}月
            </span>
            <span className="remind-count">{monthEvents.length}</span>
          </div>
          <div className="remind-list">{monthEvents.map(renderEventRow)}</div>
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
