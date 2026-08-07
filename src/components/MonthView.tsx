import { useCallback, useEffect, useRef } from 'react';
import { App } from 'antd';
import { useCalendar } from '../context/CalendarContext';
import { useUI } from '../context/UIContext';
import { dayjs, monthGridDays, toDateStr } from '../utils/date';
import { TAG_COLORS, THEME } from '../constants';
import { setupHiDPICanvas, roundRect } from '../utils/canvas';
import type { CalendarEvent } from '../types';

const FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const WEEK_HEADER = 38;

interface CellHit {
  day: string;
  x: number;
  y: number;
  w: number;
  h: number;
}
interface EventHit {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  ev: CalendarEvent;
}
interface Down {
  hitEvent?: CalendarEvent;
  fromDay: string | null;
  x: number;
  y: number;
}

const isNarrow = () => typeof window !== 'undefined' && window.innerWidth <= 1100;

export default function MonthView() {
  const { filteredEvents, currentDate, selectedEventId, selectEvent, updateEvent } =
    useCalendar();
  const { openCreate, setDetailOpen } = useUI();
  const { message } = App.useApp();

  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const hitRef = useRef<{ cells: CellHit[]; events: EventHit[] }>({ cells: [], events: [] });
  const downRef = useRef<Down | null>(null);
  const draggingRef = useRef(false);
  const dragPosRef = useRef<{ x: number; y: number } | null>(null);

  const getPos = (e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };
  const cellAt = (p: { x: number; y: number }) =>
    hitRef.current.cells.find(
      (c) => p.x >= c.x && p.x < c.x + c.w && p.y >= c.y && p.y < c.y + c.h
    );
  const eventAt = (p: { x: number; y: number }) =>
    hitRef.current.events.find(
      (c) => p.x >= c.x && p.x < c.x + c.w && p.y >= c.y && p.y < c.y + c.h
    )?.ev;

  const draw = useCallback(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    if (w <= 0 || h <= 0) return;
    if (sizeRef.current.w !== w || sizeRef.current.h !== h) {
      setupHiDPICanvas(canvas, w, h);
      sizeRef.current = { w, h };
    }
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, w, h);

    const cells: CellHit[] = [];
    const events: EventHit[] = [];
    const today = dayjs();
    const days = monthGridDays(currentDate);
    const colW = w / 7;
    const gridH = h - WEEK_HEADER;
    const rowH = gridH / 6;

    // 星期标题
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    const wk = ['日', '一', '二', '三', '四', '五', '六'];
    for (let c = 0; c < 7; c++) {
      ctx.fillStyle = c === 0 || c === 6 ? '#b0a8ff' : '#999';
      ctx.font = `13px ${FONT}`;
      ctx.fillText(wk[c], c * colW + colW / 2, WEEK_HEADER / 2);
    }

    days.forEach((day, i) => {
      const col = i % 7;
      const row = Math.floor(i / 7);
      const x = col * colW;
      const y = WEEK_HEADER + row * rowH;
      const isWeekend = col === 0 || col === 6;
      const isOther = day.month() !== currentDate.month();
      const isToday = day.isSame(today, 'day');

      ctx.fillStyle = isWeekend ? THEME.weekendBg : '#ffffff';
      ctx.fillRect(x, y, colW, rowH);
      ctx.strokeStyle = '#f0f0f0';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 0.5, y + 0.5, colW - 1, rowH - 1);
      cells.push({ day: toDateStr(day), x, y, w: colW, h: rowH });

      if (isToday) {
        ctx.strokeStyle = THEME.todayBorder;
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 1, y + 1, colW - 2, rowH - 2);
      }

      // 日期数字
      ctx.textAlign = 'left';
      ctx.font = isToday ? `bold 14px ${FONT}` : `13px ${FONT}`;
      ctx.fillStyle = isOther ? '#ccc' : isToday ? THEME.todayBorder : '#333';
      const dStr = String(day.date());
      ctx.fillText(dStr, x + 8, y + 14);
      if (isToday) {
        ctx.fillStyle = THEME.todayBorder;
        ctx.beginPath();
        ctx.arc(x + 12 + ctx.measureText(dStr).width + 8, y + 14, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // 事件概要
      const dayEvents = filteredEvents
        .filter((e) => e.date === toDateStr(day))
        .sort((a, b) => (a.allDay === b.allDay ? 0 : a.allDay ? -1 : 1));
      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, colW, rowH);
      ctx.clip();
      let ly = y + 26;
      const maxLines = Math.max(1, Math.floor((rowH - 30) / 19));
      dayEvents.slice(0, maxLines).forEach((ev) => {
        const isSel = ev.id === selectedEventId;
        const color = TAG_COLORS[ev.tag].color;
        const dragging = draggingRef.current && downRef.current?.hitEvent?.id === ev.id;
        ctx.globalAlpha = dragging ? 0.3 : 1;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x + 12, ly + 7, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = isSel ? THEME.todayBorder : '#555';
        ctx.font = `14px ${FONT}`;
        const title = ev.title.length > 7 ? `${ev.title.slice(0, 7)}…` : ev.title;
        ctx.fillText(title, x + 22, ly + 7);
        ctx.globalAlpha = 1;
        events.push({ id: ev.id, x: x + 4, y: ly - 2, w: colW - 8, h: 18, ev });
        ly += 19;
      });
      if (dayEvents.length > maxLines) {
        ctx.fillStyle = '#aaa';
        ctx.font = `11px ${FONT}`;
        ctx.fillText(`+${dayEvents.length - maxLines}`, x + 22, ly + 4);
      }
      ctx.restore();
    });

    // 拖拽跟随块
    if (draggingRef.current && dragPosRef.current && downRef.current?.hitEvent) {
      const ev = downRef.current.hitEvent;
      const color = TAG_COLORS[ev.tag].color;
      const px = dragPosRef.current.x;
      const py = dragPosRef.current.y;
      ctx.globalAlpha = 0.95;
      roundRect(ctx, px - 12, py - 13, 130, 26, 6);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#333';
      ctx.font = `14px ${FONT}`;
      ctx.textAlign = 'left';
      const t = ev.title.length > 9 ? `${ev.title.slice(0, 9)}…` : ev.title;
      ctx.fillText(t, px + 10, py);
      ctx.globalAlpha = 1;
    }

    hitRef.current = { cells, events };
  }, [filteredEvents, currentDate, selectedEventId]);

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

  const onDown = (e: React.MouseEvent) => {
    const p = getPos(e);
    const ev = eventAt(p);
    const cell = cellAt(p);
    downRef.current = { hitEvent: ev, fromDay: cell?.day ?? null, x: p.x, y: p.y };
    if (ev) canvasRef.current!.style.cursor = 'grabbing';
  };

  const onMove = (e: React.MouseEvent) => {
    const p = getPos(e);
    const down = downRef.current;
    if (!down) {
      canvasRef.current!.style.cursor = eventAt(p) ? 'pointer' : 'default';
      return;
    }
    if (down.hitEvent && !draggingRef.current) {
      if (Math.hypot(p.x - down.x, p.y - down.y) > 5) draggingRef.current = true;
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
    const cell = cellAt(p);
    if (draggingRef.current && down.hitEvent) {
      draggingRef.current = false;
      dragPosRef.current = null;
      if (cell && cell.day !== down.fromDay) {
        updateEvent(down.hitEvent.id, { date: cell.day });
        message.success('已移动事件');
      }
      draw();
      return;
    }
    if (down.hitEvent) {
      selectEvent(down.hitEvent.id);
      if (isNarrow()) setDetailOpen(true);
    } else if (cell) {
      openCreate({ date: cell.day });
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
    <div className="canvas-wrap" ref={wrapRef}>
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
