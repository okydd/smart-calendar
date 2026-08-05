import type { CalendarEvent } from '../types';
import { parseDateStr, timeRangeLabel, weekdayCN, dayjs } from './date';

/** 通知相关设置（保存在本机 localStorage） */
const KEY = 'calendarNotify';

/** UTF-8 字符串转 base64（用于邮件附件） */
function toBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  bytes.forEach((b) => {
    bin += String.fromCharCode(b);
  });
  return btoa(bin);
}
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
  /** 钉钉机器人 Webhook 完整地址（含 access_token） */
  dingtalkWebhook: string;
  /** 钉钉机器人「加签」密钥（安全设置选了「加签」时必填） */
  dingtalkSecret: string;
  /** 是否开启每日定时发送（到邮箱） */
  autoSend: boolean;
  /** 每日发送时间 HH:mm（默认 04:00） */
  autoSendTime: string;
}

const DEFAULT: NotifySettings = {
  emailTarget: '',
  emailjsServiceId: '',
  emailjsTemplateId: '',
  emailjsPublicKey: '',
  wechatSendKey: '',
  dingtalkWebhook: '',
  dingtalkSecret: '',
  autoSend: false,
  autoSendTime: '04:00'
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

export function dingtalkConfigured(s: NotifySettings = getNotifySettings()): boolean {
  return !!(s.dingtalkWebhook && s.dingtalkWebhook.includes('access_token='));
}

/** 生成简洁事件文本：含选取时间范围与导出时间说明，每行「日期 时间 标题」 */
export function buildConciseText(
  events: CalendarEvent[],
  opts: { rangeStart: string; rangeEnd: string; exportTime: string }
): string {
  const lines = events
    .filter((e) => !e.deleted)
    .sort((a, b) => (a.date < b.date ? -1 : 1))
    .map((e) => {
      const d = parseDateStr(e.date);
      const date = d.isValid() ? `${d.month() + 1}月${d.date()}日` : e.date;
      return `${date} ${timeRangeLabel(e)} ${e.title}`;
    });
  const header = [
    '【日历事件清单】',
    `选取时间范围：${opts.rangeStart} 至 ${opts.rangeEnd}`,
    `导出数据时间：${opts.exportTime}`,
    `事件总数：${lines.length} 条`
  ].join('\n');
  return header + '\n' + (lines.join('\n') || '（无事件）');
}

/**
 * 生成「完整版」纯文本报告：含每条事件的标题、日期、时间、备注、图片数量，
 * 用于作为邮件正文（保证备注文字一定送达，不依赖附件/HTML 渲染）。
 */
export function buildFullText(
  events: CalendarEvent[],
  opts: { rangeStart: string; rangeEnd: string; exportTime: string }
): string {
  const list = events
    .filter((e) => !e.deleted)
    .sort((a, b) => (a.date < b.date ? -1 : 1));
  const items = list
    .map((e, i) => {
      const d = parseDateStr(e.date);
      const date = d.isValid()
        ? `${d.year()}年${d.month() + 1}月${d.date()}日 ${weekdayCN(d)}`
        : e.date;
      const lines = [
        `${i + 1}. ${e.title}${e.important ? '【重要】' : ''}${e.done ? '【已完成】' : ''}`,
        `   时间：${date} ｜ ${timeRangeLabel(e)}`,
        e.description ? `   备注：${e.description}` : '',
        e.images && e.images.length ? `   图片：${e.images.length} 张` : ''
      ];
      return lines.filter(Boolean).join('\n');
    })
    .join('\n');
  return [
    '【日历事件清单（完整版）】',
    `选取时间范围：${opts.rangeStart} 至 ${opts.rangeEnd}`,
    `导出数据时间：${opts.exportTime}`,
    `事件总数：${list.length} 条`,
    '',
    items || '（无事件）'
  ].join('\n');
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * 生成「完整版」事件报告（HTML 文件）：含每条事件的标题、日期、时间、备注与图片，
 * 用于作为邮件附件发送，便于在邮箱中直接查看排版与图片。
 */
export function buildFullHtml(
  events: CalendarEvent[],
  opts: { rangeStart: string; rangeEnd: string; exportTime: string }
): string {
  const list = events
    .filter((e) => !e.deleted)
    .sort((a, b) => (a.date < b.date ? -1 : 1));
  const items = list
    .map((e) => {
      const d = parseDateStr(e.date);
      const date = d.isValid() ? `${d.year()}年${d.month() + 1}月${d.date()}日 ${weekdayCN(d)}` : e.date;
      const time = timeRangeLabel(e);
      const imgs = e.images && e.images.length
        ? `<div class="imgs">${e.images
            .map((src) => `<img src="${src}" alt="事件图片" />`)
            .join('')}</div>`
        : '';
      const tags =
        (e.important ? '<span class="tag imp">重要</span>' : '') +
        (e.done ? '<span class="tag done">已完成</span>' : '');
      return `<div class="ev">
  <div class="t">${escapeHtml(e.title)}${tags}</div>
  <div class="m">📅 ${date} ｜ 🕒 ${time}</div>
  ${e.description ? `<div class="d"><b>备注：</b>${escapeHtml(e.description)}</div>` : ''}
  ${imgs}
</div>`;
    })
    .join('\n');
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>智能日历事件清单（完整版）</title>
<style>
  body { font-family: -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif; background: #f3f4f8; color: #1c1c1e; padding: 18px; margin: 0; }
  .head { background: linear-gradient(135deg,#3b7cff,#5e60ff); color:#fff; border-radius:14px; padding:14px 18px; }
  .head h1 { margin:0 0 6px; font-size:18px; }
  .head p { margin:2px 0; font-size:12px; opacity:.9; }
  .ev { background:#fff; border-radius:12px; padding:12px 14px; margin:10px 0; box-shadow:0 3px 12px rgba(60,55,110,.06); }
  .ev .t { font-size:15px; font-weight:700; }
  .ev .m { font-size:13px; color:#6b6b80; margin-top:4px; }
  .ev .d { font-size:13px; color:#333; margin-top:6px; line-height:1.6; white-space:pre-wrap; }
  .ev .imgs { display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; }
  .ev .imgs img { max-width:140px; max-height:140px; border-radius:8px; object-fit:cover; border:1px solid #eee; }
  .tag { display:inline-block; font-size:11px; font-weight:600; padding:1px 7px; border-radius:6px; margin-left:6px; }
  .tag.imp { background:#ffe9e8; color:#ff3b30; }
  .tag.done { background:#e9f9ef; color:#34c759; }
  .foot { text-align:center; color:#9aa0b4; font-size:12px; margin-top:14px; }
</style>
</head>
<body>
  <div class="head">
    <h1>智能日历 · 事件清单（完整版）</h1>
    <p>选取时间范围：${escapeHtml(opts.rangeStart)} 至 ${escapeHtml(opts.rangeEnd)}</p>
    <p>导出时间：${escapeHtml(opts.exportTime)} ｜ 共 ${list.length} 条事件</p>
  </div>
  ${items || '<p class="foot">（无事件）</p>'}
  <p class="foot">由「智能日历」自动生成</p>
</body>
</html>`;
}

/** 每日定时发送使用的简洁正文（不强调范围，仅说明日期） */
export function buildDailyText(events: CalendarEvent[]): string {
  const lines = events
    .filter((e) => !e.deleted)
    .sort((a, b) => (a.date < b.date ? -1 : 1))
    .map((e) => {
      const d = parseDateStr(e.date);
      const date = d.isValid() ? `${d.month() + 1}月${d.date()}日` : e.date;
      return `${date} ${timeRangeLabel(e)} ${e.title}`;
    });
  const today = dayjs().format('YYYY年M月D日');
  return [
    `【智能日历 · 每日数据】`,
    `日期：${today}`,
    `事件总数：${lines.length} 条`,
    '',
    lines.join('\n') || '（无事件）'
  ].join('\n');
}

/** 发送每日数据到邮箱（简洁正文 + 完整版 HTML 附件） */
export async function sendDailyDigest(events: CalendarEvent[]): Promise<{ ok: boolean; msg: string }> {
  const today = dayjs().format('YYYY年M月D日');
  const text = buildDailyText(events);
  const html = buildFullHtml(events, {
    rangeStart: today,
    rangeEnd: today,
    exportTime: dayjs().format('YYYY年M月D日 HH:mm')
  });
  return sendEmail('智能日历 每日数据', text, {
    name: `Calendar_Daily_${dayjs().format('YYYYMMDD')}.html`,
    data: toBase64(html),
    mimeType: 'text/html'
  });
}

/** 邮件附件（base64，不含 data: 前缀） */
export interface EmailAttachment {
  name: string;
  data: string;
  mimeType: string;
}

/**
 * 通过 EmailJS 发送邮件（无需后端，浏览器直发）。
 * - 支持多个收件邮箱（逗号 / 换行分隔）；
 * - 可选 html 正文（完整版，含排版与内联图片，需模板用 {{{html}}} 渲染）；
 * - 可选附件（如 .json 备份）：付费计划生效；免费计划自动降级为仅正文发送。
 */
export async function sendEmail(
  subject: string,
  body: string,
  opts?: { attachment?: EmailAttachment; html?: string }
): Promise<{ ok: boolean; msg: string }> {
  const s = getNotifySettings();
  if (!emailConfigured(s)) return { ok: false, msg: '未配置邮箱，仅本地操作' };
  const targets = s.emailTarget
    .split(/[,\n]/)
    .map((x) => x.trim())
    .filter(Boolean);
  if (targets.length === 0) return { ok: false, msg: '未配置接收邮箱' };

  const payload = (att?: EmailAttachment) =>
    JSON.stringify({
      service_id: s.emailjsServiceId,
      template_id: s.emailjsTemplateId,
      user_id: s.emailjsPublicKey,
      template_params: {
        to_email: targets.join(','),
        subject,
        title: subject,
        message: body,
        ...(opts?.html ? { html: opts.html } : {}),
        ...(att
          ? { attachments: [{ name: att.name, data: att.data, mimeType: att.mimeType }] }
          : {})
      }
    });

  try {
    if (opts?.attachment) {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload(opts.attachment)
      });
      if (res.ok) return { ok: true, msg: '已发送到邮箱（含附件）' };
      // 免费计划不支持附件，降级重试（仅正文 / html）
    }
    const res2 = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload()
    });
    if (res2.ok) return { ok: true, msg: '已发送到邮箱' };
    const t = await res2.text();
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

/** 通过钉钉机器人推送（Webhook，支持「加签」安全设置） */
export async function sendDingtalk(
  title: string,
  text: string
): Promise<{ ok: boolean; msg: string }> {
  const s = getNotifySettings();
  if (!dingtalkConfigured(s)) return { ok: false, msg: '未配置钉钉推送' };
  try {
    let url = s.dingtalkWebhook;
    const secret = s.dingtalkSecret?.trim();
    if (secret) {
      const timestamp = Date.now();
      const stringToSign = `${timestamp}\n${secret}`;
      const enc = new TextEncoder().encode(stringToSign);
      const key = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );
      const sigBuf = await crypto.subtle.sign('HMAC', key, enc);
      const sig = btoa(String.fromCharCode(...new Uint8Array(sigBuf)));
      const q = `&timestamp=${timestamp}&sign=${encodeURIComponent(sig)}`;
      url += url.includes('?') ? q : `?${q.replace(/^&/, '')}`;
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        msgtype: 'text',
        text: { content: `${title}\n${text}` }
      })
    });
    const j = (await res.json().catch(() => ({}))) as { errcode?: number; errmsg?: string };
    if (j && j.errcode === 0) return { ok: true, msg: '钉钉提醒已发送' };
    return { ok: false, msg: '钉钉推送失败：' + (j?.errmsg ?? '未知错误') };
  } catch (e) {
    return { ok: false, msg: '钉钉推送失败：' + ((e as Error)?.message ?? '') };
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
 * 检查所有事件的到期提醒：遍历每个事件的多个提前提醒偏移，当「事件开始时间 - 提前量」已到达、
 * 且未超出事件后 2 小时窗口、且本次未曾推送过时，通过微信推送。需在应用打开期间运行。
 */
export async function checkDueReminders(events: CalendarEvent[]): Promise<void> {
  if (!wechatConfigured() && !dingtalkConfigured()) return;
  const now = dayjs();
  const sent = getSent();
  for (const e of events) {
    if (e.deleted || e.done || !e.reminder || e.reminder.length === 0) continue;
    const d = parseDateStr(e.date);
    if (!d.isValid()) continue;
    let start = d.hour(9).minute(0);
    if (!e.allDay && e.startTime) {
      const [h, m] = e.startTime.split(':').map(Number);
      start = d.hour(h).minute(m);
    }
    const time = e.allDay ? '全天' : e.startTime;
    for (const r of e.reminder) {
      const remindAt =
        r.unit === 'day'
          ? start.subtract(r.value, 'day')
          : r.unit === 'hour'
          ? start.subtract(r.value, 'hour')
          : start.subtract(r.value, 'minute');
      if (now.isBefore(remindAt)) continue;
      if (now.isAfter(start.add(2, 'hour'))) continue; // 已超过事件时间，不再提醒
      const sig = `${e.id}:${r.unit}:${r.value}`;
      if (sent.has(sig)) continue;
      const desp = `时间：${d.month() + 1}月${d.date()}日 ${time}\n${
        e.description ? '备注：' + e.description : ''
      }`;
      const tasks: Promise<{ ok: boolean; msg: string }>[] = [];
      if (wechatConfigured()) tasks.push(sendWechat(`事件提醒：${e.title}`, desp));
      if (dingtalkConfigured()) tasks.push(sendDingtalk(`事件提醒：${e.title}`, desp));
      await Promise.all(tasks);
      addSent(sig);
    }
  }
}
