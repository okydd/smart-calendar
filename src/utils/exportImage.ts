import type { CalendarEvent } from '../types';
import { TAG_COLORS, THEME } from '../constants';
import {
  dayjs,
  exportDateLabel,
  nowStamp,
  parseDateStr,
  timeRangeLabel
} from './date';
import { roundRect } from './canvas';

const FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export interface ExportImageOptions {
  /** 范围标题，如“2026年08月事件汇总” */
  title: string;
}

/**
 * 将事件列表生成为 750px 宽渐变长图并触发下载。
 * 视觉规范见设计文档：标题区 / 阴影白卡表格 / 交替行色 / 页脚导出时间。
 */
export function exportEventsToImage(
  events: CalendarEvent[],
  opts: ExportImageOptions
): void {
  const W = 750;
  const padX = 40;
  const titleH = 220;
  const cardTop = titleH + 30;
  const headerH = 80;
  const rowH = 88;
  const footerH = 80;
  const cardW = W - padX * 2;
  const cardRadius = 16;
  const n = events.length;
  const cardH = headerH + rowH * n + footerH;
  const H = cardTop + cardH + 60; // 底部留白 + 阴影余量

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  ctx.textBaseline = 'middle';

  // 1) 整体背景渐变
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, THEME.gradientStart);
  bg.addColorStop(1, THEME.gradientEnd);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // 2) 标题区：日历图标 + 标题 + 副标题
  drawTitleArea(ctx, W, titleH, opts.title);

  // 3) 阴影白卡
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.08)';
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 10;
  roundRect(ctx, padX, cardTop, cardW, cardH, cardRadius);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.restore();

  // 裁剪到卡片内绘制表格
  ctx.save();
  roundRect(ctx, padX, cardTop, cardW, cardH, cardRadius);
  ctx.clip();

  // 4) 表头渐变
  const headerGrad = ctx.createLinearGradient(padX, 0, padX + cardW, 0);
  headerGrad.addColorStop(0, THEME.headerGradientStart);
  headerGrad.addColorStop(1, THEME.headerGradientEnd);
  ctx.fillStyle = headerGrad;
  ctx.fillRect(padX, cardTop, cardW, headerH);

  const colXs = {
    date: padX + 24,
    name: padX + Math.round(cardW * 0.34),
    time: padX + cardW - 24
  };

  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 30px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.fillText('日期', colXs.date, cardTop + headerH / 2);
  ctx.fillText('事件名称', colXs.name, cardTop + headerH / 2);
  ctx.textAlign = 'right';
  ctx.fillText('时间', colXs.time, cardTop + headerH / 2);

  // 5) 数据行（交替行色）
  events.forEach((e, idx) => {
    const rowY = cardTop + headerH + idx * rowH;
    if (idx % 2 === 1) {
      ctx.fillStyle = THEME.rowAlt;
      ctx.fillRect(padX, rowY, cardW, rowH);
    }
    // 日期列左侧色条，增强可读性
    ctx.fillStyle = TAG_COLORS[e.tag]?.color ?? THEME.todayBorder;
    ctx.fillRect(padX + 6, rowY + rowH / 2 - 14, 5, 28);

    const cy = rowY + rowH / 2;
    ctx.fillStyle = THEME.textDark;
    ctx.font = `26px ${FONT}`;
    ctx.textAlign = 'left';
    ctx.fillText(exportDateLabel(parseDateStr(e.date)), colXs.date + 16, cy);
    ctx.fillText(truncate(ctx, e.title, colXs.name, colXs.time - 24), colXs.name, cy);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#666666';
    ctx.fillText(timeRangeLabel(e), colXs.time, cy);
  });

  // 6) 页脚导出时间
  const footerY = cardTop + cardH - footerH;
  ctx.fillStyle = '#999999';
  ctx.font = `22px ${FONT}`;
  ctx.textAlign = 'right';
  ctx.fillText(`导出时间：${nowStamp()}`, padX + cardW - 24, footerY + footerH / 2);
  ctx.restore();

  // 7) 触发下载
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = `Calendar_Export_${dayjs().format('YYYYMMDD_HHmmss')}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/** 绘制标题区：徽标图标 + 主标题 + 英文副标题 */
function drawTitleArea(
  ctx: CanvasRenderingContext2D,
  W: number,
  titleH: number,
  title: string
): void {
  const cx = W / 2;
  drawCalendarIcon(ctx, cx, 72, 64, THEME.iconBlue);

  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.font = `bold 40px ${FONT}`;
  ctx.fillText(title, cx, 150);
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.font = `24px ${FONT}`;
  ctx.fillText('Events Overview', cx, 192);
}

/** 线条风格日历图标 */
function drawCalendarIcon(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  color: string
): void {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 4;
  const w = size;
  const h = size * 1.05;
  const x = cx - w / 2;
  const y = cy - h / 2;

  // 外框
  roundRect(ctx, x, y, w, h, 8);
  ctx.stroke();
  // 顶部装订环
  ctx.beginPath();
  ctx.moveTo(x + w * 0.26, y + 2);
  ctx.lineTo(x + w * 0.26, y - 12);
  ctx.moveTo(x + w * 0.74, y + 2);
  ctx.lineTo(x + w * 0.74, y - 12);
  ctx.stroke();
  // 顶部横条
  ctx.beginPath();
  ctx.moveTo(x, y + h * 0.3);
  ctx.lineTo(x + w, y + h * 0.3);
  ctx.stroke();
  // 内部 2x2 圆点
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 2; c++) {
      ctx.beginPath();
      ctx.arc(x + w * 0.32 + c * w * 0.36, y + h * 0.5 + r * h * 0.22, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

/** 按可用宽度截断文本 */
function truncate(
  ctx: CanvasRenderingContext2D,
  text: string,
  startX: number,
  maxX: number
): string {
  const maxW = maxX - startX;
  if (ctx.measureText(text).width <= maxW) return text;
  let t = text;
  while (t.length > 1 && ctx.measureText(`${t}…`).width > maxW) {
    t = t.slice(0, -1);
  }
  return `${t}…`;
}
