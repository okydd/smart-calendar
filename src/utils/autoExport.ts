import type { CalendarEvent } from '../types';
import { dayjs } from './date';
import { getNotifySettings, emailConfigured, sendEmail, buildFullText, buildAutoExportEmailHtml } from './notify';

/**
 * 每日自动推送：每天 5 点后首次打开 APP 时，把「上个月1号 至 今天」的事件清单
 * 静默发送到已配置的邮箱（含事件详情 + JSON 下载按钮 + 3 个常规链接）。
 * 全程后台完成，不在页面暴露任何按钮 / 提示 / 通知。
 *
 * 触发条件（全部满足才发送）：
 *   1. 已登录云同步账号（userId 存在）；
 *   2. 已配置邮箱（EmailJS service/template/publicKey + 接收邮箱）；
 *   3. 当前时间 >= 05:00；
 *   4. 今天尚未发送过（localStorage 记录日期去重，避免重复）。
 */

const LAST_SENT_KEY = 'autoExportLastSent';
/** 当日首次打开后的延迟（毫秒），等待云同步把最新事件拉进本地后再发，避免发空/发旧 */
const INITIAL_DELAY = 4000;

function dayRange(events: CalendarEvent[], start: string, end: string): CalendarEvent[] {
  return events.filter((e) => !e.deleted && e.date >= start && e.date <= end);
}

/** 在任意时刻调用都安全；内部用 lastSent 去重与静默失败。 */
export function maybeAutoExport(events: CalendarEvent[], userId?: string | null): void {
  try {
    const s = getNotifySettings();
    if (!userId || !emailConfigured(s)) return;
    const now = dayjs();
    if (now.hour() < 5) return; // 仅 5 点后
    const today = now.format('YYYY-MM-DD');
    if (localStorage.getItem(LAST_SENT_KEY) === today) return; // 今天已发
    const start = now.subtract(1, 'month').date(1).format('YYYY-MM-DD');
    const end = now.format('YYYY-MM-DD');
    const range = dayRange(events, start, end);
    const exportTime = now.format('YYYY-MM-DD HH:mm');
    const { html } = buildAutoExportEmailHtml(range, { rangeStart: start, rangeEnd: end, exportTime });
    const text = buildFullText(range, { rangeStart: start, rangeEnd: end, exportTime });
    sendEmail(`智能日历 · 每日数据推送（${today}）`, text, { html })
      .then((r) => {
        if (r.ok) localStorage.setItem(LAST_SENT_KEY, today);
      })
      .catch(() => {
        /* 静默失败，不影响使用 */
      });
  } catch {
    /* 静默失败 */
  }
}

/** 返回 true 表示当前满足「可发送」条件（用于调试/避免重复初始化），不触发发送 */
export function canAutoExport(userId?: string | null): boolean {
  try {
    const s = getNotifySettings();
    const now = dayjs();
    const today = now.format('YYYY-MM-DD');
    return !!userId && emailConfigured(s) && now.hour() >= 5 && localStorage.getItem(LAST_SENT_KEY) !== today;
  } catch {
    return false;
  }
}

/**
 * 在 Shell 中调用：打开 APP 即尝试（延迟一小段等云同步），之后回到前台/可见时再补查。
 * 返回值：清理函数。
 */
export function startAutoExportScheduler(getEvents: () => CalendarEvent[], userId?: string | null): () => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const run = () => {
    if (canAutoExport(userId)) maybeAutoExport(getEvents(), userId);
  };
  // 初次打开：延迟触发，等云同步把最新事件拉到本地
  timer = setTimeout(run, INITIAL_DELAY);
  const onVisible = () => {
    if (document.visibilityState === 'visible') run();
  };
  const onFocus = () => run();
  document.addEventListener('visibilitychange', onVisible);
  window.addEventListener('focus', onFocus);
  return () => {
    if (timer) clearTimeout(timer);
    document.removeEventListener('visibilitychange', onVisible);
    window.removeEventListener('focus', onFocus);
  };
}
