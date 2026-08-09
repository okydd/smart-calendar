import type { CalendarEvent } from '../types';
import { dayjs } from './date';
import { getNotifySettings, emailConfigured, sendEmail, buildFullText, buildAutoExportEmailHtml } from './notify';

/**
 * 每日自动推送：每天 05:00 定时把「上个月1号 至 今天」的事件清单
 * 静默发送到已配置的邮箱（含事件详情 + JSON 下载按钮 + 3 个常规链接）。
 * 全程后台完成，不在页面暴露任何按钮 / 提示 / 通知。
 *
 * 触发策略（前端可达的最优方案）：
 *   1. 真正的每日定时：APP 运行期间，会在每一个 05:00 准时触发一次推送；
 *   2. 兜底补发：若某天 05:00 时 APP 未运行（被系统回收 / 用户未打开），
 *      则在当天「首次打开 APP 后」补发一次，避免漏发；
 *   3. 回到前台 / 重新可见时再补查一次，应对系统对后台定时器的节流。
 *
 * 触发条件（全部满足才发送）：
 *   1. 已登录云同步账号（userId 存在）；
 *   2. 已配置邮箱（EmailJS service/template/publicKey + 接收邮箱）；
 *   3. 当前时间 >= 05:00；
 *   4. 今天尚未发送过（localStorage 记录日期去重，避免重复）。
 *
 * 说明：纯前端无法保证「APP 完全关闭时」也在 05:00 准时发出，
 * 此时由上面的「兜底补发」在用户当天首次打开时补上。
 */

/** 每天定时推送的时刻（小时，24 小时制） */
export const PUSH_HOUR = 5;
const LAST_SENT_KEY = 'autoExportLastSent';
/** 打开 APP 后的兜底延迟（毫秒），等待云同步把最新事件拉进本地后再发 */
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
    if (now.hour() < PUSH_HOUR) return; // 仅 5 点后
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
    return !!userId && emailConfigured(s) && now.hour() >= PUSH_HOUR && localStorage.getItem(LAST_SENT_KEY) !== today;
  } catch {
    return false;
  }
}

/** 计算距离下一个 PUSH_HOUR:00 的毫秒数（若此刻已过点位，则取下一天） */
function msUntilNextPush(): number {
  const now = dayjs();
  let next = now.hour(PUSH_HOUR).minute(0).second(0).millisecond(0);
  if (!next.isAfter(now)) next = next.add(1, 'day');
  return Math.max(0, next.valueOf() - now.valueOf());
}

/**
 * 在 Shell 中调用：注册真正的每日 05:00 定时推送，并保留打开APP后的兜底补发。
 * 返回值：清理函数。
 */
export function startAutoExportScheduler(getEvents: () => CalendarEvent[], userId?: string | null): () => void {
  let initialTimer: ReturnType<typeof setTimeout> | null = null;
  let dailyTimer: ReturnType<typeof setTimeout> | null = null;

  const run = () => {
    if (canAutoExport(userId)) maybeAutoExport(getEvents(), userId);
  };

  // 1) 打开 APP 后的兜底：若已过了今天的 PUSH_HOUR 且今天未发，延迟一小段后补发
  initialTimer = setTimeout(run, INITIAL_DELAY);

  // 2) 真正的每日定时：到点触发，触发后再排下一天的同一时刻，形成每天循环
  const scheduleNextPush = () => {
    dailyTimer = setTimeout(() => {
      run();
      scheduleNextPush();
    }, msUntilNextPush());
  };
  scheduleNextPush();

  // 3) 回到前台 / 重新可见时再补查（应对系统对后台定时器的节流）
  const onVisible = () => {
    if (document.visibilityState === 'visible') run();
  };
  const onFocus = () => run();
  document.addEventListener('visibilitychange', onVisible);
  window.addEventListener('focus', onFocus);

  return () => {
    if (initialTimer) clearTimeout(initialTimer);
    if (dailyTimer) clearTimeout(dailyTimer);
    document.removeEventListener('visibilitychange', onVisible);
    window.removeEventListener('focus', onFocus);
  };
}
