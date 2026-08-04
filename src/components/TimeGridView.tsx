import { useCallback, useEffect, useRef } from 'react';
import { App } from 'antd';
import { useCalendar } from '../context/CalendarContext';
import { useUI } from '../context/UIContext';
import {
  dayjs,
  weekDays,
  toDateStr,
  weekdayCN,
  timeToMinutes,
  minutesToTime,
  type Dayjs
} from '../utils/date';
import { TAG_COLORS, THEME } from '../constants';
import { setupHiDPICanvas, roundRect } from '../utils/canvas';
import type { CalendarEvent } from '../types';

const FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const ROW_H = 60;
const TIME_W = 56;
const DAY_HEADER = 48;
const ALLDAY_H = 26;
const TIME_AREA_TOP = DAY_HEADER + ALLDAY_H;
const TOTAL_H = TIME_AREA_TOP + 24 * ROW_H;

interface HitEv {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  kind: 'time' | 'allday';
  day: string;
  ev: CalendarEvent;
  startMin?: number;
  duration?: number;
}
interface Down {
  hit: HitEv;
  startX: number;
  startY: number;
}

const isNarrow = () => typeof window !== 'undefined' && window.innerWidth <= 1100;
const snap = (min: number) => Math.max(0, Math.min(1440, Math.round(min / 15) * 15));

export default function TimeGridView() {
  const { filteredEvents, currentDate, selectedEventId, view, selectEvent, updateEvent } =
    useCalendar();
  const { openCreate, setDetailOpen } = useUI();
  const { message } = App.useApp();

  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const hitRef = useRef<HitEv[]>([]);
  const downRef = useRef<Down | null>(null);
  const draggingRef = useRef(false);
  const dragPosRef = useRef<{ x: number; y: number } | null>(null);

  const getPos = (e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };
  const eventAt = (p: { x: number; y: number }) =>
    hitRef.current.find(
      (c) => p.x >= c.x && p.x < c.x + c.w && p.y >= c.y && p.y < c.y + c.h
    );

  const draw = useCallback(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const w = wrap.clientWidth;
    if (w <= 0) return;
    if (sizeRef.current.w !== w || sizeRef.current.h !== TOTAL_H) {
      setupHiDPICanvas(canvas, w, TOTAL_H);
      sizeRef.current = { w, h: TOTAL_H };
    }
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, w, TOTAL_H);

    const columns: Dayjs[] = view === 'day' ? [currentDate] : weekDays(currentDate);
    const colW = (w - TIME_W) / columns.length;
    const today = dayjs();

    // 时间轴标签 + 横向分隔线
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'right';
    for (let h = 0; h < 24; h++) {
      const y = TIME_AREA_TOP + h * ROW_H;
      ctx.fillStyle = '#999';
      ctx.font = `12px ${FONT}`;
      ctx.fillText(`${String(h).padStart(2, '0')}:00`, TIME_W - 10, y);
      ctx.strokeStyle = '#f0f0f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(TIME_W, y + 0.5);
      ctx.lineTo(w, y + 0.5);
      ctx.stroke();
    }

    const hits: HitEv[] = [];

    columns.forEach((day, ci) => {
      const colX = TIME_W + ci * colW;
      const isToday = day.isSame(today, 'day');
      const dayStr = toDateStr(day);

      // 列背景交替（周末浅灰）
      if (day.day() === 0 || day.day() === 6) {
        ctx.fillStyle = THEME.weekendBg;
        ctx.fillRect(colX, DAY_HEADER, colW, TOTAL_H - DAY_HEADER);
      }
      // 列分隔线
      ctx.strokeStyle = '#f0f0f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(colX + 0.5, DAY_HEADER);
      ctx.lineTo(colX + 0.5, TOTAL_H);
      ctx.stroke();

      // 日期标题
      ctx.textAlign = 'center';
      ctx.fillStyle = isToday ? THEME.todayBorder : '#333';
      ctx.font = isToday ? `bold 14px ${FONT}` : `13px ${FONT}`;
      ctx.fillText(`${day.month() + 1}月${day.date()}日`, colX + colW / 2, DAY_HEADER / 2 - 6);
      ctx.fillStyle = isToday ? THEME.todayBorder : '#999';
      ctx.font = `12px ${FONT}`;
      ctx.fillText(weekdayCN(day), colX + colW / 2, DAY_HEADER / 2 + 12);
      if (isToday) {
        ctx.fillStyle = THEME.todayBorder;
        roundRect(ctx, colX + colW / 2 - 22, 4, 44, 4, 2);
        ctx.fill();
      }

      // 全天事件条
      const allDay = filteredEvents.filter((e) => e.date === dayStr && e.allDay);
      let adY = DAY_HEADER + 3;
      allDay.forEach((ev) => {
        const color = TAG_COLORS[ev.tag].color;
        const bx = colX + 4;
        const bw = colW - 8;
        const bh = ALLDAY_H - 6;
        const isSel = ev.id === selectedEventId;
        const dragging = draggingRef.current && downRef.current?.hit.ev.id === ev.id;
        ctx.globalAlpha = dragging ? 0.3 : 1;
        roundRect(ctx, bx, adY, bw, bh, 5);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = `11px ${FONT}`;
        ctx.textAlign = 'left';
        const t = ev.title.length > 10 ? `${ev.title.slice(0, 10)}…` : ev.title;
        ctx.fillText(t, bx + 8, adY + bh / 2);
        ctx.globalAlpha = 1;
        hits.push({ id: ev.id, x: bx, y: adY, w: bw, h: bh, kind: 'allday', day: dayStr, ev });
        adY += bh + 3;
      });

      // 时间事件块
      const timed = filteredEvents
        .filter((e) => e.date === dayStr && !e.allDay)
        .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
      timed.forEach((ev) => {
        const color = TAG_COLORS[ev.tag].color;
        const startMin = timeToMinutes(ev.startTime);
        const endMin = ev.endTime ? timeToMinutes(ev.endTime) : startMin + 60;
        const top = TIME_AREA_TOP + (startMin / 60) * ROW_H;
        const blockH = Math.max(22, ((endMin - startMin) / 60) * ROW_H - 2);
        const bx = colX + 4;
        const bw = colW - 8;
        const isSel = ev.id === selectedEventId;
        const dragging = draggingRef.current && downRef.current?.hit.ev.id === ev.id;
        ctx.globalAlpha = dragging ? 0.3 : 1;
        roundRect(ctx, bx, top, bw, blockH, 6);
        ctx.fillStyle = `${color}22`;
        ctx.fill();
        // 左侧色条
        ctx.save();
        roundRect(ctx, bx, top, bw, blockH, 6);
        ctx.clip();
        ctx.fillStyle = color;
        ctx.fillRect(bx, top, 4, blockH);
        ctx.restore();
        if (isSel) {
          ctx.strokeStyle = THEME.todayBorder;
          ctx.lineWidth = 2;
          roundRect(ctx, bx, top, bw, blockH, 6);
          ctx.stroke();
        }
        ctx.fillStyle = '#333';
        ctx.font = `12px ${FONT}`;
        ctx.textAlign = 'left';
        const t = ev.title.length > 12 ? `${ev.title.slice(0, 12)}…` : ev.title;
        ctx.fillText(t, bx + 10, top + 13);
        ctx.fillStyle = '#777';
        ctx.font = `11px ${FONT}`;
        ctx.fillText(
          `${ev.startTime}${ev.endTime ? ' - ' + ev.endTime : ''}`,
          bx + 10,
          top + 28
        );
        ctx.globalAlpha = 1;
        hits.push({
          id: ev.id,
          x: bx,
          y: top,
          w: bw,
          h: blockH,
          kind: 'time',
          day: dayStr,
          ev,
          startMin,
          duration: Math.max(15, endMin - startMin)
        });
      });

      // 当前时间线
      if (isToday) {
        const nowMin = today.hour() * 60 + today.minute();
        const ly = TIME_AREA_TOP + (nowMin / 60) * ROW_H;
        ctx.strokeStyle = THEME.danger;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(colX, ly);
        ctx.lineTo(colX + colW, ly);
        ctx.stroke();
        ctx.fillStyle = THEME.danger;
        ctx.beginPath();
        ctx.arc(colX, ly, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // 拖拽跟随
    if (draggingRef.current && dragPosRef.current && downRef.current) {
      const hit = downRef.current.hit;
      const color = TAG_COLORS[hit.ev.tag].color;
      const px = dragPosRef.current.x;
      const py = dragPosRef.current.y;
      if (hit.kind === 'time') {
        const offset = downRef.current.startY - hit.y;
        const top = py - offset;
        const bx = TIME_W + Math.floor((px - TIME_W) / colW) * colW + 4;
        ctx.globalAlpha = 0.92;
        roundRect(ctx, bx, top, colW - 8, hit.h, 6);
        ctx.fillStyle = `${color}dd`;
        ctx.fill();
        ctx.fillStyle = color;
        ctx.fillRect(bx, top, 4, hit.h);
        ctx.fillStyle = '#fff';
        ctx.font = `12px ${FONT}`;
        ctx.textAlign = 'left';
        ctx.fillText(hit.ev.title, bx + 10, top + 13);
        ctx.globalAlpha = 1;
      } else {
        const bx = TIME_W + Math.floor((px - TIME_W) / colW) * colW + 4;
        ctx.globalAlpha = 0.92;
        roundRect(ctx, bx, py - (hit.h / 2), colW - 8, hit.h, 5);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    hitRef.current = hits;
  }, [filteredEvents, currentDate, selectedEventId, view]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(wrap);
    draw();
    return () => ro.disconnect();
  }, [draw]);

  // 日期切换时的平滑过渡动画
  useEffect(() => {
    const c = canvasRef.current;
    if (c) {
      c.style.animation = 'none';
      void c.offsetWidth;
      c.style.animation = 'fadeIn 0.35s ease';
    }
  }, [currentDate]);

  const colDayAt = (x: number): Dayjs | null => {
    const wrap = wrapRef.current;
    if (!wrap) return null;
    const w = wrap.clientWidth;
    const colW = (w - TIME_W) / (view === 'day' ? 1 : 7);
    if (x < TIME_W) return null;
    const idx = Math.floor((x - TIME_W) / colW);
    const cols = view === 'day' ? [currentDate] : weekDays(currentDate);
    return cols[Math.max(0, Math.min(cols.length - 1, idx))] ?? null;
  };

  const onDown = (e: React.MouseEvent) => {
    const p = getPos(e);
    const hit = eventAt(p);
    if (hit) {
      downRef.current = { hit, startX: p.x, startY: p.y };
      canvasRef.current!.style.cursor = 'grabbing';
    } else {
      downRef.current = null;
    }
  };

  const onMove = (e: React.MouseEvent) => {
    const p = getPos(e);
    const down = downRef.current;
    if (!down) {
      canvasRef.current!.style.cursor = eventAt(p) ? 'pointer' : 'default';
      return;
    }
    if (!draggingRef.current && Math.hypot(p.x - down.startX, p.y - down.startY) > 4) {
      draggingRef.current = true;
    }
    if (draggingRef.current) {
      dragPosRef.current = p;
      draw();
    }
  };

  const onUp = (e: React.MouseEvent) => {
    const p = getPos(e);
    const down = downRef.current;
    downRef.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = 'default';
    if (!down) return;
    const hit = down.hit;

    if (draggingRef.current) {
      draggingRef.current = false;
      dragPosRef.current = null;
      const targetDay = colDayAt(p.x);
      if (!targetDay) {
        draw();
        return;
      }
      if (hit.kind === 'time' && hit.startMin != null && hit.duration != null) {
        const offset = down.startY - hit.y;
        const top = p.y - offset;
        const newStart = snap(((top - TIME_AREA_TOP) / ROW_H) * 60);
        const clampedStart = Math.min(newStart, 1440 - hit.duration);
        const newEnd = clampedStart + hit.duration;
        updateEvent(hit.ev.id, {
          date: toDateStr(targetDay),
          startTime: minutesToTime(clampedStart),
          endTime: minutesToTime(newEnd)
        });
        message.success('已调整事件时间');
      } else if (hit.kind === 'allday') {
        updateEvent(hit.ev.id, { date: toDateStr(targetDay) });
        message.success('已移动事件');
      }
      draw();
      return;
    }

    // 点击（非拖拽）
    if (hit) {
      selectEvent(hit.ev.id);
      if (isNarrow()) setDetailOpen(true);
    } else {
      const targetDay = colDayAt(p.x);
      if (targetDay && p.y >= TIME_AREA_TOP) {
        const min = snap(((p.y - TIME_AREA_TOP) / ROW_H) * 60);
        openCreate({
          date: toDateStr(targetDay),
          startTime: minutesToTime(min),
          endTime: minutesToTime(Math.min(min + 60, 1440)),
          allDay: false
        });
      }
    }
    draw();
  };

  const onLeave = () => {
    if (draggingRef.current) {
      draggingRef.current = false;
      dragPosRef.current = null;
      downRef.current = null;
      draw();
    }
  };

  return (
    <div className="canvas-wrap" style={{ overflowY: 'auto' }} ref={wrapRef}>
      <canvas
        ref={canvasRef}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={onUp}
        onMouseLeave={onLeave}
      />
    </div>
  );
}
