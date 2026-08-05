import type { CalendarEvent } from '../types';
import { TAG_COLORS, THEME } from '../constants';
import {
  dayjs,
  exportDateLabel,
  nowStamp,
  parseDateStr,
  timeRangeLabel,
  weekdayCN
} from './date';
import { roundRect } from './canvas';

const FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export interface ExportImageOptions {
  /** 范围标题 */
  title?: string;
  /** 预览 subtitle，如 "2026-08-05 至 2026-09-05" */
  subtitle?: string;
  /** 总事件数 */
  total?: number;
}

const W = 750;
const PAD_X = 40;
const TITLE_H = 230;
const CARD_TOP = TITLE_H + 30;
const HEADER_H = 80;
const ROW_H = 92;
const FOOTER_H = 80;

function buildCanvas(events: CalendarEvent[], opts: ExportImageOptions) {
  const cardRadius = 20;
  const n = events.length;
  const cardW = W - PAD_X * 2;
  const cardH = HEADER_H + ROW_H * n + FOOTER_H;
  const H = CARD_TOP + cardH + 70;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  ctx.textBaseline = 'middle';

  // 1) 整体背景渐变（紫到蓝）
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#9b51e0');
  bg.addColorStop(1, '#6d5dfc');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // 2) 标题区
  drawTitleArea(ctx, opts, events.length);

  // 3) 阴影白卡
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.12)';
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 10;
  roundRect(ctx, PAD_X, CARD_TOP, cardW, cardH, cardRadius);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.restore();

  // 裁剪到卡片内
  ctx.save();
  roundRect(ctx, PAD_X, CARD_TOP, cardW, cardH, cardRadius);
  ctx.clip();

  // 4) 表头渐变
  const headerGrad = ctx.createLinearGradient(PAD_X, 0, PAD_X + cardW, 0);
  headerGrad.addColorStop(0, THEME.headerGradientStart);
  headerGrad.addColorStop(1, THEME.headerGradientEnd);
  ctx.fillStyle = headerGrad;
  ctx.fillRect(PAD_X, CARD_TOP, cardW, HEADER_H);

  const colDateX = PAD_X + 30;
  const colTimeX = PAD_X + Math.round(cardW * 0.36);
  const colEventX = PAD_X + Math.round(cardW * 0.52);

  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 28px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.fillText('日期', colDateX, CARD_TOP + HEADER_H / 2);
  ctx.fillText('时间', colTimeX, CARD_TOP + HEADER_H / 2);
  ctx.fillText('事件', colEventX, CARD_TOP + HEADER_H / 2);

  // 5) 数据行
  events.forEach((e, idx) => {
    const rowY = CARD_TOP + HEADER_H + idx * ROW_H;
    if (idx % 2 === 1) {
      ctx.fillStyle = '#f8f9ff';
      ctx.fillRect(PAD_X, rowY, cardW, ROW_H);
    }
    // 左侧色条
    ctx.fillStyle = TAG_COLORS[e.tag]?.color ?? THEME.todayBorder;
    ctx.fillRect(PAD_X + 8, rowY + ROW_H / 2 - 16, 5, 32);

    const cy = rowY + ROW_H / 2;
    const d = parseDateStr(e.date);

    ctx.fillStyle = THEME.textDark;
    ctx.font = `26px ${FONT}`;
    ctx.textAlign = 'left';
    ctx.fillText(exportDateLabel(d), colDateX + 16, cy);

    ctx.fillStyle = '#3b7cff';
    ctx.fillText(timeRangeLabel(e), colTimeX, cy);

    ctx.fillStyle = THEME.textDark;
    const title = truncate(ctx, e.title, colEventX, PAD_X + cardW - 24);
    ctx.fillText(title, colEventX, cy);
  });

  // 6) 页脚导出时间
  const footerY = CARD_TOP + cardH - FOOTER_H;
  ctx.fillStyle = '#9aa0b4';
  ctx.font = `22px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText(`导出时间：${nowStamp()}`, W / 2, footerY + FOOTER_H / 2);
  ctx.restore();

  return { canvas, H };
}

/** 绘制标题区：日历图标 + 主标题 + 副标题 + 事件数 */
function drawTitleArea(
  ctx: CanvasRenderingContext2D,
  opts: ExportImageOptions,
  count: number
): void {
  const cx = W / 2;
  const today = dayjs();

  // 左侧日历图标
  drawCalendarIcon(ctx, PAD_X + 80, 90, 80, '#ffffff');

  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 38px ${FONT}`;
  ctx.fillText(opts.title || '日历事件提醒', PAD_X + 150, 82);

  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.font = `24px ${FONT}`;
  ctx.fillText(
    opts.subtitle || `${today.format('YYYY-MM-DD')} 至 ${today.add(1, 'month').format('YYYY-MM-DD')}`,
    PAD_X + 150,
    122
  );

  // 右侧事件数胶囊
  const pillText = `共 ${opts.total ?? count} 个事件`;
  ctx.font = `22px ${FONT}`;
  const pillW = ctx.measureText(pillText).width + 32;
  const pillX = W - PAD_X - pillW;
  const pillY = 70;
  const pillH = 42;
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  roundRect(ctx, pillX, pillY, pillW, pillH, 21);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText(pillText, pillX + pillW / 2, pillY + pillH / 2 + 1);
}

/** 日历图标 */
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
  const h = size * 1.08;
  const x = cx - w / 2;
  const y = cy - h / 2;

  roundRect(ctx, x, y, w, h, 10);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + w * 0.26, y + 2);
  ctx.lineTo(x + w * 0.26, y - 14);
  ctx.moveTo(x + w * 0.74, y + 2);
  ctx.lineTo(x + w * 0.74, y - 14);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x, y + h * 0.32);
  ctx.lineTo(x + w, y + h * 0.32);
  ctx.stroke();

  const today = dayjs();
  ctx.textAlign = 'center';
  ctx.fillStyle = color;
  ctx.font = `bold ${Math.round(size * 0.26)}px ${FONT}`;
  ctx.fillText(`${today.month() + 1}月`, cx, y + h * 0.22);
  ctx.font = `bold ${Math.round(size * 0.36)}px ${FONT}`;
  ctx.fillText(String(today.date()).padStart(2, '0'), cx, y + h * 0.58);
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

/** 生成导出图片的 DataURL（用于预览） */
export function renderExportImage(
  events: CalendarEvent[],
  opts: ExportImageOptions = {}
): string {
  const { canvas } = buildCanvas(events, opts);
  return canvas.toDataURL('image/png');
}

/** 将事件列表生成为图片并触发下载 */
export function exportEventsToImage(
  events: CalendarEvent[],
  opts: ExportImageOptions = {}
): void {
  const { canvas } = buildCanvas(events, opts);
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = `Calendar_Export_${dayjs().format('YYYYMMDD_HHmmss')}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
