/**
 * 强提醒：手机弹窗通知 + 振动 + 铃声（对标 QQ / 微信的提醒体验）。
 *
 * 三层能力，按环境自动降级：
 *  1) 原生（安卓 APK）：@capacitor/local-notifications 预约「系统级」通知，
 *     即使 APP 已被关闭或后台被杀，到点仍会横幅弹窗 + 响铃 + 振动；
 *  2) 浏览器 / PWA：Web Notification（需授权），APP 打开或后台常驻时弹窗；
 *  3) 兜底：navigator.vibrate 振动 + WebAudio 合成铃声 + 应用内弹窗。
 */
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import type { CalendarEvent } from '../types';
import { parseDateStr, dayjs } from './date';

/** Android 通知渠道 ID：高优先级，带声音+振动，才会「横幅弹窗」 */
const CHANNEL_ID = 'calendar-reminders';

/** 强提醒开关（本机设置） */
const PREF_KEY = 'calendarStrongRemind';

export interface StrongRemindPrefs {
  /** 总开关 */
  enabled: boolean;
  /** 响铃 */
  sound: boolean;
  /** 振动 */
  vibrate: boolean;
}

const DEFAULT_PREFS: StrongRemindPrefs = { enabled: true, sound: true, vibrate: true };

export function getStrongRemindPrefs(): StrongRemindPrefs {
  try {
    const raw = localStorage.getItem(PREF_KEY);
    if (raw) return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return DEFAULT_PREFS;
}

export function saveStrongRemindPrefs(p: StrongRemindPrefs): void {
  try {
    localStorage.setItem(PREF_KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

/** 是否运行在原生安卓壳里 */
export function isNativeApp(): boolean {
  try {
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* 权限                                                                */
/* ------------------------------------------------------------------ */

export type PermState = 'granted' | 'denied' | 'prompt' | 'unsupported';

/** 查询当前通知权限状态 */
export async function getNotifyPermission(): Promise<PermState> {
  if (isNativeApp()) {
    try {
      const r = await LocalNotifications.checkPermissions();
      if (r.display === 'granted') return 'granted';
      if (r.display === 'denied') return 'denied';
      return 'prompt';
    } catch {
      return 'unsupported';
    }
  }
  if (typeof Notification === 'undefined') return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';
  return 'prompt';
}

/** 申请通知权限；原生环境同时创建高优先级通知渠道 */
export async function requestNotifyPermission(): Promise<PermState> {
  if (isNativeApp()) {
    try {
      const r = await LocalNotifications.requestPermissions();
      if (r.display === 'granted') {
        await ensureChannel();
        return 'granted';
      }
      return r.display === 'denied' ? 'denied' : 'prompt';
    } catch {
      return 'unsupported';
    }
  }
  if (typeof Notification === 'undefined') return 'unsupported';
  try {
    const p = await Notification.requestPermission();
    return p === 'granted' ? 'granted' : p === 'denied' ? 'denied' : 'prompt';
  } catch {
    return 'unsupported';
  }
}

let channelReady = false;
/** 创建 Android 高优先级通知渠道（importance 5 = 横幅弹窗 + 铃声 + 振动） */
async function ensureChannel(): Promise<void> {
  if (channelReady || !isNativeApp()) return;
  try {
    await LocalNotifications.createChannel({
      id: CHANNEL_ID,
      name: '事件提醒',
      description: '智能日历的事件到期提醒',
      importance: 5,
      visibility: 1,
      vibration: true,
      lights: true
    });
    channelReady = true;
  } catch {
    /* 部分设备/系统版本不支持渠道 API，忽略 */
  }
}

/* ------------------------------------------------------------------ */
/* 振动 + 铃声                                                          */
/* ------------------------------------------------------------------ */

/** 触发振动（Web Vibration API，安卓 WebView 支持） */
export function vibrateNow(): void {
  try {
    navigator.vibrate?.([500, 200, 500, 200, 700]);
  } catch {
    /* ignore */
  }
}

let audioCtx: AudioContext | null = null;

/** 预热音频上下文：必须在一次用户点击里调用，之后才能在后台自动播放铃声 */
export function unlockAudio(): void {
  try {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    if (!audioCtx) audioCtx = new Ctor();
    if (audioCtx.state === 'suspended') void audioCtx.resume();
  } catch {
    /* ignore */
  }
}

/** 用 WebAudio 合成「叮咚」提示音，无需外部音频文件 */
export function playRingtone(times = 3): void {
  try {
    unlockAudio();
    if (!audioCtx) return;
    const ctx = audioCtx;
    const notes = [880, 660];
    let t = ctx.currentTime;
    for (let i = 0; i < times; i++) {
      for (const f of notes) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = f;
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.35, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.32);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.35);
        t += 0.34;
      }
      t += 0.25;
    }
  } catch {
    /* ignore */
  }
}

/* ------------------------------------------------------------------ */
/* 立即弹窗                                                             */
/* ------------------------------------------------------------------ */

let seq = 1;

/** 立即弹出一条提醒（含振动/铃声），用于「APP 正在运行」时 */
export async function fireReminderNow(title: string, body: string): Promise<void> {
  const prefs = getStrongRemindPrefs();
  if (!prefs.enabled) return;

  if (prefs.vibrate) vibrateNow();
  if (prefs.sound) playRingtone();

  if (isNativeApp()) {
    try {
      await ensureChannel();
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Date.now() % 2147483600,
            title,
            body,
            channelId: CHANNEL_ID,
            smallIcon: 'ic_stat_icon_config_sample',
            schedule: { at: new Date(Date.now() + 300) },
            ongoing: false,
            autoCancel: true
          }
        ]
      });
      return;
    } catch {
      /* 落到 Web 通知 */
    }
  }

  try {
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      const opts: NotificationOptions & { vibrate?: number[]; renotify?: boolean } = {
        body,
        tag: `calendar-remind-${seq++}`,
        requireInteraction: true,
        vibrate: [500, 200, 500],
        renotify: true
      };
      const reg = await navigator.serviceWorker?.getRegistration?.();
      if (reg && 'showNotification' in reg) {
        await reg.showNotification(title, opts);
      } else {
        new Notification(title, opts);
      }
    }
  } catch {
    /* ignore */
  }
}

/* ------------------------------------------------------------------ */
/* 预约（关键：APP 关闭也能响）                                          */
/* ------------------------------------------------------------------ */

/** 由字符串生成稳定的 32 位正整数 ID，供通知去重/取消使用 */
function hashId(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return Math.abs(h) % 2000000000 || 1;
}

export interface PendingReminder {
  id: number;
  at: Date;
  title: string;
  body: string;
}

/** 计算未来 N 天内所有待触发的提醒（同一事件的多个提前量各算一条） */
export function collectUpcomingReminders(
  events: CalendarEvent[],
  days = 60
): PendingReminder[] {
  const now = dayjs();
  const limit = now.add(days, 'day');
  const list: PendingReminder[] = [];

  for (const e of events) {
    if (e.deleted || e.done || !e.reminder?.length) continue;
    const d = parseDateStr(e.date);
    if (!d.isValid()) continue;
    let start = d.hour(9).minute(0).second(0);
    if (!e.allDay && e.startTime) {
      const [h, m] = e.startTime.split(':').map(Number);
      if (Number.isFinite(h)) start = d.hour(h).minute(m || 0).second(0);
    }
    const timeLabel = e.allDay ? '全天' : e.startTime || '';

    for (const r of e.reminder) {
      const at =
        r.unit === 'day'
          ? start.subtract(r.value, 'day')
          : r.unit === 'hour'
          ? start.subtract(r.value, 'hour')
          : start.subtract(r.value, 'minute');
      if (!at.isAfter(now)) continue; // 已过时间交给运行期检查
      if (at.isAfter(limit)) continue;

      const unitCN = r.unit === 'day' ? '天' : r.unit === 'hour' ? '小时' : '分钟';
      const body =
        `${d.format('M月D日')} ${timeLabel}（还有 ${r.value}${unitCN}）` +
        (e.description ? `\n${e.description.slice(0, 60)}` : '');
      list.push({
        id: hashId(`${e.id}:${r.unit}:${r.value}`),
        at: at.toDate(),
        title: `⏰ ${e.title}`,
        body
      });
    }
  }

  list.sort((a, b) => a.at.getTime() - b.at.getTime());
  return list;
}

/**
 * 把未来的提醒同步到系统级预约通知。
 * 每次数据变化后调用：先取消旧的，再按最新事件重新排期。
 * 安卓单应用可排期数量有限，这里最多取最近 60 条。
 */
export async function syncScheduledReminders(events: CalendarEvent[]): Promise<number> {
  if (!isNativeApp()) return 0;
  if (!getStrongRemindPrefs().enabled) {
    await cancelAllScheduled();
    return 0;
  }
  try {
    const perm = await LocalNotifications.checkPermissions();
    if (perm.display !== 'granted') return 0;
    await ensureChannel();
    await cancelAllScheduled();

    const upcoming = collectUpcomingReminders(events).slice(0, 60);
    if (!upcoming.length) return 0;

    await LocalNotifications.schedule({
      notifications: upcoming.map((n) => ({
        id: n.id,
        title: n.title,
        body: n.body,
        channelId: CHANNEL_ID,
        schedule: { at: n.at, allowWhileIdle: true },
        autoCancel: true
      }))
    });
    return upcoming.length;
  } catch (e) {
    console.warn('预约提醒失败', e);
    return 0;
  }
}

/** 取消所有已排期的本地通知 */
export async function cancelAllScheduled(): Promise<void> {
  if (!isNativeApp()) return;
  try {
    const pending = await LocalNotifications.getPending();
    if (pending.notifications.length) {
      await LocalNotifications.cancel({ notifications: pending.notifications });
    }
  } catch {
    /* ignore */
  }
}

/** 当前已排期的通知条数（设置页展示用） */
export async function countScheduled(): Promise<number> {
  if (!isNativeApp()) return 0;
  try {
    const pending = await LocalNotifications.getPending();
    return pending.notifications.length;
  } catch {
    return 0;
  }
}

/** 发一条测试提醒，让用户直观确认弹窗/振动/铃声是否生效 */
export async function testReminder(): Promise<void> {
  await fireReminderNow('⏰ 智能日历测试提醒', '这就是事件到期时的提醒效果：弹窗 + 振动 + 铃声');
}
