import { useEffect, useMemo, useRef, useState } from 'react';
import {
  LeftOutlined,
  RightOutlined,
  PlusOutlined,
  CalendarOutlined,
  EyeOutlined,
  DownOutlined,
  UpOutlined
} from '@ant-design/icons';
import { useCalendar } from '../context/CalendarContext';
import { useUI } from '../context/UIContext';
import { useSync } from '../context/SyncContext';
import {
  dayjs,
  timeToMinutes,
  toDateStr,
  type Dayjs
} from '../utils/date';
import { IMPORTANT_COLOR } from '../constants';
import Fab from '../components/Fab';
import EventFlags from '../components/EventFlags';
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
  return '';
}

/** 相对日标签：今天 / 明天 / 后天（用于周提醒在事件时间前标注，蓝色） */
function relativeDayLabel(d: Dayjs, today: Dayjs): string {
  if (d.isSame(today, 'day')) return '今天';
  if (d.isSame(today.add(1, 'day'), 'day')) return '明天';
  if (d.isSame(today.add(2, 'day'), 'day')) return '后天';
  return '';
}

export default function CalendarPage({ showFab = true }: { showFab?: boolean }) {
  const { filteredEvents, currentDate, setCurrentDate } = useCalendar();
  const { openCreate, openView } = useUI();
  const { userId, silentSync } = useSync();
  const [slide, setSlide] = useState<'' | 'slide-left' | 'slide-right'>('');
  const [monthView, setMonthView] = useState<Dayjs | null>(null);
  const [doneMonthView, setDoneMonthView] = useState<Dayjs | null>(null);
  const [doneExpanded, setDoneExpanded] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  /** 进入日历页时静默同步一次：确保日/周/月提醒打开即显示完整数据，
   *  不依赖手动刷新或等待定时轮询（解决「日提醒数量不能及时同步」）；
   *  走后台静默通道，不在前台显示「同步中」。 */
  useEffect(() => {
    if (userId) void silentSync();
  }, [userId, silentSync]);

  const today = dayjs();
  // 日历网格：默认收起只显示「选中日所在周 + 下一周」（14 天）；展开后显示完整月份（6 周）
  const visibleDays = useMemo(() => {
    if (expanded) {
      const start = currentDate.startOf('month').subtract((currentDate.date(1).day() + 6) % 7, 'day');
      return Array.from({ length: 42 }, (_, i) => start.add(i, 'day'));
    }
    const wkStart = currentDate.startOf('isoWeek');
    return Array.from({ length: 14 }, (_, i) => wkStart.add(i, 'day'));
  }, [expanded, currentDate]);
  const byDate = useMemo(() => groupByDate(filteredEvents), [filteredEvents]);

  // 「已归档」= 已完成 或 已过期（日期早于今天且未完成）；这类事件统一放到各段底部的「已完成」卡片
  const isArchived = (e: CalendarEvent) => {
    if (e.done) return true;
    const d = dayjs(e.date);
    return d.isValid() && d.isBefore(today, 'day');
  };

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
  const { dayActive, weekActive, monthActiveEvents, monthRangeLabel, weekRangeLabel } =
    useMemo(() => {
    // 周/月提醒范围固定在「今天所在周」，切换选中日期不会让周/月提醒消失
    const mondayThis = today.isoWeekday(1);
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

    const baseSorter = (a: CalendarEvent, b: CalendarEvent) => {
      if (a.date !== b.date) return a.date < b.date ? -1 : 1;
      if (a.allDay !== b.allDay) return a.allDay ? -1 : 1;
      return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
    };

    day.sort(baseSorter);
    week.sort(baseSorter);
    month.sort(baseSorter);

    // 日/周/月提醒：把「已完成」或「已过期」的事件从主列表移出，
    // 统一放到每段底部的「已完成」可折叠卡片（保持原样式/功能）
    const dayActive = day.filter((e) => !isArchived(e));
    const weekActive = week.filter((e) => !isArchived(e));
    const monthActiveEvents = month.filter((e) => !isArchived(e));

    const monthRangeLabel = `${wk3Start.month() + 1}月${wk3Start.date()}日 - ${wk4End.month() + 1}月${wk4End.date()}日`;
    const weekRangeLabel = `${weekStart.month() + 1}月${weekStart.date()}日 - ${nextWeekEnd.month() + 1}月${nextWeekEnd.date()}日`;
    return { dayActive, weekActive, monthActiveEvents, monthRangeLabel, weekRangeLabel };
  }, [filteredEvents, currentDate]);

  /** 按月查看：该月所有事件（按天归组） */
  const monthViewEvents = useMemo(() => {
    if (!monthView) return [];
    const ym = monthView.format('YYYY-MM');
    return filteredEvents
      .filter((e) => e.date.startsWith(ym) && !e.deleted)
      .sort((a, b) => {
        if (a.date !== b.date) return a.date < b.date ? -1 : 1;
        if (a.allDay !== b.allDay) return a.allDay ? -1 : 1;
        return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
      });
  }, [filteredEvents, monthView]);

  // 按月查看：主列表只显示活动事件（已完成/已过期经底部「已完成」卡片统一展示）
  const monthViewActive = useMemo(() => monthViewEvents.filter((e) => !isArchived(e)), [monthViewEvents]);

  // 日历最底部「已完成」卡片：列出全部「已完成 / 已过期」事件（不受日/周/月提醒范围限制）；
  // 点「按月查看」后仅取选中月份（用独立的 doneMonthView 状态，不与月提醒的 monthView 耦合）
  const doneArchivedEvents = useMemo(() => {
    const pool = doneMonthView
      ? filteredEvents.filter((e) => e.date.startsWith(doneMonthView.format('YYYY-MM')))
      : filteredEvents;
    return pool.filter((e) => isArchived(e)).reverse(); // 日期倒序，近的在前
  }, [doneMonthView, filteredEvents]);

  // 非按月查看模式：把已完成事件拆成「本周」与「其余」，默认只显示本周，多出的用展开按钮显示
  const { doneThisWeek, doneRest } = useMemo(() => {
    const ws = today.isoWeekday(1);
    const we = ws.add(6, 'day');
    const inWeek = (e: CalendarEvent) => {
      const d = dayjs(e.date);
      return d.isValid() && !d.isBefore(ws, 'day') && !d.isAfter(we, 'day');
    };
    return {
      doneThisWeek: doneArchivedEvents.filter(inWeek),
      doneRest: doneArchivedEvents.filter((e) => !inWeek(e))
    };
  }, [doneArchivedEvents]);

  const selectedKey = toDateStr(currentDate);
  const isToday = currentDate.isSame(today, 'day');
  const selWeekday = WEEK_DAYS[(currentDate.day() + 6) % 7];
  const selDateText = `${currentDate.month() + 1}月${currentDate.date()}日 ${selWeekday}`;

  /** 渲染一条提醒：日提醒为单行（时间→标题→标签），其余两行；重要事件整圈红框 */
  const renderEventRow = (e: CalendarEvent, showDate: boolean, isDay = false) => {
    const d = dayjs(e.date);
    const struck = !!e.done;
    const expired = !e.done && d.isValid() && d.isBefore(today, 'day');
    const timeText = e.allDay || !e.startTime ? '全天' : e.startTime;
    const dateText =
      showDate && d.isValid()
        ? `${d.month() + 1}月${d.date()}日 ${WEEK_DAYS[(d.day() + 6) % 7]}`
        : '';
    const cls = `event-pill${isDay ? ' event-pill-day' : ''}${e.important ? ' important' : ''}${e.done ? ' done-pill' : ' not-done'}`;
    const titleCls = `remind-title${struck ? ' struck' : ''}`;
    // 周/月提醒：事件日期为今天/明天/后天时，在时间前加蓝色相对标签；已完成事件不显示蓝色药丸（改灰显+删除线）
    const relLabel = showDate && !isDay && !e.done ? relativeDayLabel(d, today) : '';

    // 日提醒：一行显示「时间(底色药丸) + 标题 + 重要/注/图」，不显示倒计时
    if (isDay) {
      return (
        <div key={e.id} className={cls} onClick={() => openView(e)}>
          <div className="remind-oneline">
            {d.isSame(today, 'day') && !e.done ? (
              <span className="remind-rel-time">
                <span className="remind-rel">今天</span>
                <span className={`day-time${e.allDay || !e.startTime ? ' all-day' : ''}`}>{timeText}</span>
              </span>
            ) : (
              <span className={`day-time${e.allDay || !e.startTime ? ' all-day' : ''}${struck ? ' struck' : ''}`}>
                {timeText}
              </span>
            )}
            <span className={titleCls}>{e.title}</span>
            {e.important && <span className="imp-flag">重</span>}
            <EventFlags e={e} />
          </div>
        </div>
      );
    }

    return (
      <div key={e.id} className={cls} onClick={() => openView(e)}>
        <div className="remind-main">
          <div className="remind-title-line">
            <span className={titleCls}>{e.title}</span>
            {e.important && <span className="imp-flag">重</span>}
            <EventFlags e={e} />
          </div>
          <div className="remind-time-line">
            {showDate && dateText && (
              <span className={`remind-date${struck ? ' struck' : ''}${expired ? ' expired' : ''}`}>{dateText}</span>
            )}
            {relLabel ? (
              <span className="remind-rel-time">
                <span className="remind-rel">{relLabel}</span>
                <span className={`remind-time${e.allDay || !e.startTime ? ' all-day' : ''}${struck ? ' struck' : ''}${expired ? ' expired' : ''}`}>
                  {timeText}
                </span>
              </span>
            ) : (
              <span className={`remind-time${e.allDay || !e.startTime ? ' all-day' : ''}${struck ? ' struck' : ''}${expired ? ' expired' : ''}`}>
                {timeText}
              </span>
            )}
            <span className={`remind-hint${struck || expired ? ' expired' : ''}`}>{timeHint(d, e)}</span>
          </div>
        </div>
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
          {visibleDays.map((d) => {
            const key = toDateStr(d);
            const evts = byDate.get(key) ?? [];
            const isOut = d.month() !== currentDate.month();
            const isWeekend = d.day() === 0 || d.day() === 6;
            const isTodayCell = d.isSame(today, 'day');
            const cls = [
              'mcell',
              isOut ? 'out' : '',
              isWeekend ? 'weekend' : '',
              isTodayCell ? 'today' : '',
              key === selectedKey ? 'selected' : '',
              // 需求6：与今天色块同尺寸的淡色圆框；今天/选中已有底色时不再叠加边框
              evts.length > 0 && !isOut && !isTodayCell && key !== selectedKey
                ? 'has-event'
                : ''
            ]
              .filter(Boolean)
              .join(' ');
            return (
              <div key={key} className={cls} onClick={() => setCurrentDate(d)}>
                <span className="dnum">{d.date()}</span>
              </div>
            );
          })}
        </div>

        <div className="month-toggle">
          {expanded ? (
            <button className="month-toggle-btn" onClick={() => setExpanded(false)}>
              <UpOutlined /> 收起
            </button>
          ) : (
            <button className="month-toggle-btn" onClick={() => setExpanded(true)}>
              <DownOutlined /> 展开整月
            </button>
          )}
        </div>
      </div>

      {/* 日提醒 */}
      <section className="remind-card">
        <div className="remind-header today">
          <CalendarOutlined className="remind-ico" />
          <span className="remind-label">今天</span>
          <span className="remind-range">{selDateText}</span>
          <span
            className={`today-tag${isToday ? ' active' : ''}`}
            onClick={goToday}
            aria-label="今日提醒数"
          >
            {dayActive.length}
          </span>
        </div>
        {dayActive.length === 0 ? (
          <div className="empty-remind" onClick={() => openCreate({ date: selectedKey })}>
            <CalendarOutlined className="empty-check" />
            暂无安排
            <PlusOutlined className="empty-plus" />
          </div>
        ) : (
          <div className="remind-list">{dayActive.map((e) => renderEventRow(e, false, true))}</div>
        )}
      </section>

      {/* 周提醒（本周 + 下周） */}
      {weekActive.length > 0 && (
        <section className="remind-card">
          <div className="remind-header week">
            <CalendarOutlined className="remind-ico" />
            <span className="remind-label">本周</span>
            <span className="remind-range">{weekRangeLabel}</span>
            <span className="remind-count">{weekActive.length}</span>
          </div>
          <div className="remind-list">{weekActive.map((e) => renderEventRow(e, true))}</div>
        </section>
      )}

      {/* 月提醒（第 3、4 周 / 或按月查看） */}
      <section className="remind-card">
        <div className="remind-header month">
          <CalendarOutlined className="remind-ico" />
          <span className="remind-label">本月</span>
          {monthView ? (
            <>
              <button
                className="nav-btn month-nav-inline"
                onClick={() => setMonthView(monthView.subtract(1, 'month'))}
                aria-label="上个月"
              >
                <LeftOutlined />
              </button>
              <span className="remind-range month-nav-inline-label">
                {monthView.year()}年{monthView.month() + 1}月（{monthViewEvents.length}）
              </span>
              <button
                className="nav-btn month-nav-inline"
                onClick={() => setMonthView(monthView.add(1, 'month'))}
                aria-label="下个月"
              >
                <RightOutlined />
              </button>
              <button
                className="remind-back"
                onClick={() => setMonthView(null)}
                aria-label="返回近4周"
              >
                返回近4周
              </button>
            </>
          ) : (
            <>
              <span className="remind-range">{monthRangeLabel}</span>
              <button
                className="remind-back"
                onClick={() => setMonthView(currentDate.startOf('month'))}
                aria-label="按月查看"
              >
                <EyeOutlined /> 按月查看
              </button>
            </>
          )}
        </div>

        {monthView ? (
          <>
            {monthViewActive.length === 0 ? (
              <div className="empty-remind">暂无安排</div>
            ) : (
              <div className="remind-list">{monthViewActive.map((e) => renderEventRow(e, true))}</div>
            )}
          </>
        ) : (
          <>
            {monthActiveEvents.length === 0 ? (
              <div className="empty-remind">近 4 周暂无更多安排</div>
            ) : (
              <div className="remind-list">{monthActiveEvents.map((e) => renderEventRow(e, true))}</div>
            )}
          </>
        )}
      </section>

      {/* 已完成 / 已过期：日历最底部的统一卡片，标题结构与上方周提醒一致（图标+标签+范围+计数），
          并支持「按月查看」切换日期（独立 doneMonthView 状态），始终显示。
          默认（非按月查看）只显示本周已完成，多出的事件用底部展开/收起按钮（参考顶部日历）显示 */}
      <section className="remind-card done-card">
        <div className="remind-header done">
          <CalendarOutlined className="remind-ico" />
          <span className="remind-label">已完成</span>
          {doneMonthView ? (
            <>
              <button
                className="nav-btn month-nav-inline"
                onClick={() => setDoneMonthView(doneMonthView.subtract(1, 'month'))}
                aria-label="上个月"
              >
                <LeftOutlined />
              </button>
              <span className="remind-range month-nav-inline-label">
                {doneMonthView.year()}年{doneMonthView.month() + 1}月（{doneArchivedEvents.length}）
              </span>
              <button
                className="nav-btn month-nav-inline"
                onClick={() => setDoneMonthView(doneMonthView.add(1, 'month'))}
                aria-label="下个月"
              >
                <RightOutlined />
              </button>
              <button
                className="remind-back"
                onClick={() => setDoneMonthView(null)}
                aria-label="返回全部"
              >
                返回全部
              </button>
            </>
          ) : (
            <>
              <span className="remind-range">{doneExpanded ? '全部' : '本周'}</span>
              <span className="remind-count">
                {doneExpanded ? doneArchivedEvents.length : doneThisWeek.length}
              </span>
              <button
                className="remind-back"
                onClick={() => setDoneMonthView(currentDate.startOf('month'))}
                aria-label="按月查看"
              >
                <EyeOutlined /> 按月查看
              </button>
            </>
          )}
        </div>

        <div className="remind-list done-list">
          {doneMonthView ? (
            doneArchivedEvents.length === 0 ? (
              <div className="empty-remind">暂无已完成或已过期的事件</div>
            ) : (
              doneArchivedEvents.map((e) => renderEventRow(e, true))
            )
          ) : (
            <>
              {doneThisWeek.length === 0 && !doneExpanded ? (
                <div className="empty-remind">暂无已完成事件</div>
              ) : (
                doneThisWeek.map((e) => renderEventRow(e, true))
              )}
              {doneExpanded && doneRest.map((e) => renderEventRow(e, true))}
            </>
          )}
        </div>

        {/* 本周之外还有更多已完成事件：底部用向下按钮展开/收起（参考顶部日历的 展开整月 / 收起） */}
        {!doneMonthView && doneRest.length > 0 && (
          <div className="month-toggle">
            <button className="month-toggle-btn" onClick={() => setDoneExpanded((v) => !v)}>
              {doneExpanded ? <UpOutlined /> : <DownOutlined />}
              {doneExpanded ? '收起' : `展开全部（${doneRest.length}）`}
            </button>
          </div>
        )}
      </section>

      {showFab && <Fab onClick={() => openCreate({ date: selectedKey })} />}
    </div>
  );
}
