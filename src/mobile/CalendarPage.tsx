import { useMemo, useRef, useState } from 'react';
import { LeftOutlined, RightOutlined, PlusOutlined, CheckOutlined } from '@ant-design/icons';
import { useCalendar } from '../context/CalendarContext';
import { useUI } from '../context/UIContext';
import {
  dayjs,
  monthGridDays,
  timeRangeLabel,
  timeToMinutes,
  toDateStr,
  weekdayCN,
  WEEK_CN
} from '../utils/date';
import { TAG_COLORS } from '../constants';
import type { CalendarEvent } from '../types';

/**
 * 移动端日历页：月历网格 + 当日事项列表 + 悬浮新增按钮。
 * 支持左右滑动切换月份。
 */
export default function CalendarPage({ showFab = true }: { showFab?: boolean }) {
  const { filteredEvents, currentDate, setCurrentDate, toggleDone } = useCalendar();
  const { openCreate, openEdit } = useUI();
  const [slide, setSlide] = useState<'' | 'slide-left' | 'slide-right'>('');
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  const today = dayjs();
  const days = useMemo(() => monthGridDays(currentDate), [currentDate]);

  /** 按日期归组事件，便于渲染圆点与当日列表 */
  const byDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const e of filteredEvents) {
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
  }, [filteredEvents]);

  const selectedKey = toDateStr(currentDate);
  const dayEvents = byDate.get(selectedKey) ?? [];

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

  return (
    <div className="page">
      <div className="cal-card">
        <div className="month-bar">
          <div className="month-title">
            {currentDate.year()}年{currentDate.month() + 1}月
          </div>
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
                  {evts.length > 3 && <span className="dot mini" style={{ background: '#9aa0b4' }} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="day-head">
        <h3>
          {currentDate.month() + 1}月{currentDate.date()}日 {weekdayCN(currentDate)}
        </h3>
        <span>{dayEvents.length ? `${dayEvents.length} 项日程` : '暂无日程'}</span>
      </div>

      {dayEvents.length === 0 ? (
        <div className="empty-day">
          <span className="big">🗓️</span>
          这一天还没有安排
          <br />
          点击右下角 + 添加日程
        </div>
      ) : (
        dayEvents.map((e) => (
          <div key={e.id} className="ev-card" onClick={() => openEdit(e)}>
            <span className="ev-bar" style={{ background: TAG_COLORS[e.tag].color }} />
            <div className="ev-main">
              <div className={`ev-title${e.done ? ' done' : ''}`}>{e.title}</div>
              {e.description ? <div className="ev-desc">{e.description}</div> : null}
              <div className="ev-meta">
                <span className="ev-time">{timeRangeLabel(e)}</span>
                <span
                  className="tag-chip"
                  style={{ background: TAG_COLORS[e.tag].color }}
                >
                  {TAG_COLORS[e.tag].label}
                </span>
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
        ))
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
