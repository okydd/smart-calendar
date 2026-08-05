import type { CalendarEvent } from '../types';
import { parseDateStr, timeRangeLabel, dayjs } from './date';

/** 通知相关设置（保存在本机 localStorage） */
const KEY = 'calendarNotify';
export interface NotifySettings {
  /** 接收邮件的邮箱 */
  emailTarget: string;
  /** EmailJS 服务 ID */
  emailjsServiceId: string;
  /** EmailJS 模板 ID */
  emailjsTemplateId: string;
  /** EmailJS Public Key */
  emailjsPublicKey: string;
  /** 微信推送 SendKey（ServerChan 方糖） */
  wechatSendKey: string;
}

const DEFAULT: NotifySettings = {
  emailTarget: '',
  emailjsServiceId: '',
  emailjsTemplateId: '',
  emailjsPublicKey: '',
  wechatSendKey: ''
};

export function getNotifySettings(): NotifySettings {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return DEFAULT;
}

export function saveNotifySettings(s: NotifySettings): void {
  localStorage.setItem(KEY, JSON.stringify(s));
}

export function emailConfigured(s: NotifySettings = getNotifySettings()): boolean {
  return !!(s.emailTarget && s.emailjsServiceId && s.emailjsTemplateId && s.emailjsPublicKey);
}

export function wechatConfigured(s: NotifySettings = getNotifySettings()): boolean {
  return !!s.wechatSendKey;
}

/** 生成简洁事件文本（与导出图片内容一致）：每行「日期 时间 标题」 */
export function buildConciseText(events: CalendarEvent[], rangeLabel: string): string {
  const lines = events
    .filter((e) => !e.deleted)
    .sort((a, b) => (a.date < b.date ? -1 : 1))
    .map((e) => {
      const d = parseDateStr(e.date);
      const date = d.isValid() ? `${d.month() + 1}月${d.date()}日` : e.date;
      return `${date} ${timeRangeLabel(e)} ${e.title}`;
    });
  return `【${rangeLabel}】事件清单（共 ${lines.length} 条）\n` + (lines.join('\n') || '（无事件）');
}

/** 通过 EmailJS 发送邮件（无需后端，浏览器直发） */
export async function sendEmail(
  subject: string,
  body: string
): Promise<{ ok: boolean; msg: string }> {
  const s = getNotifySettings();
  if (!emailConfigured(s)) return { ok: false, msg: '未配置邮箱，仅本地操作' };
  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: s.emailjsServiceId,
        template_id: s.emailjsTemplateId,
        user_id: s.emailjsPublicKey,
        template_params: {
          to_email: s.emailTarget,
          subject,
          title: subject,
          message: body
        }
      })
    });
    if (res.ok) return { ok: true, msg: '已发送到邮箱' };
    const t = await res.text();
    return { ok: false, msg: '邮件发送失败：' + t.slice(0, 80) };
  } catch (e) {
    return { ok: false, msg: '邮件发送失败：' + ((e as Error)?.message ?? '') };
  }
}

/** 通过 ServerChan（方糖）推送到微信 */
export async function sendWechat(
  title: string,
  desp: string
): Promise<{ ok: boolean; msg: string }> {
  const s = getNotifySettings();
  if (!wechatConfigured(s)) return { ok: false, msg: '未配置微信推送' };
  try {
    const url = `https://sctapi.ftqq.com/${s.wechatSendKey}.send?title=${encodeURIComponent(
      title
    )}&desp=${encodeURIComponent(desp)}`;
    const res = await fetch(url);
    const j = (await res.json().catch(() => ({}))) as { code?: number; message?: string };
    if (j && j.code === 0) return { ok: true, msg: '微信提醒已发送' };
    return { ok: false, msg: '微信推送失败：' + (j?.message ?? '未知错误') };
  } catch (e) {
    return { ok: false, msg: '微信推送失败：' + ((e as Error)?.message ?? '') };
  }
}

/** 到期提醒已发送记录（防重复推送） */
const SENT_KEY = 'calendarReminderSent';
function getSent(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(SENT_KEY) || '[]'));
  } catch {
    return new Set();
  }
}
function addSent(sig: string): void {
  const s = getSent();
  s.add(sig);
  localStorage.setItem(SENT_KEY, JSON.stringify([...s].slice(-500)));
}

/**
 * 检查所有事件的到期提醒：当「事件开始时间 - 提前量」已到达、且未超出事件后 2 小时窗口、
 * 且本次未曾推送过时，通过微信推送。需在应用打开期间运行（后台由保活任务兜底）。
 */
export async function checkDueReminders(events: CalendarEvent[]): Promise<void> {
  if (!wechatConfigured()) return;
  const now = dayjs();
  const sent = getSent();
  for (const e of events) {
    if (e.deleted || e.done || !e.reminder) continue;
    const d = parseDateStr(e.date);
    if (!d.isValid()) continue;
    let start = d.hour(9).minute(0);
    if (!e.allDay && e.startTime) {
      const [h, m] = e.startTime.split(':').map(Number);
      start = d.hour(h).minute(m);
    }
    let remindAt = start;
    if (e.reminder.unit === 'day') remindAt = start.subtract(e.reminder.value, 'day');
    else remindAt = start.subtract(e.reminder.value, 'hour');

    if (now.isBefore(remindAt)) continue;
    if (now.isAfter(start.add(2, 'hour'))) continue; // 已超过事件时间，不再提醒

    const sig = `${e.id}:${e.reminder.unit}:${e.reminder.value}`;
    if (sent.has(sig)) continue;

    const time = e.allDay ? '全天' : e.startTime;
    await sendWechat(
      `事件提醒：${e.title}`,
      `时间：${d.month() + 1}月${d.date()}日 ${time}\n${
        e.description ? '备注：' + e.description : ''
      }`
    );
    addSent(sig);
  }
}
