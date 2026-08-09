import { Capacitor } from '@capacitor/core';
import { registerPlugin } from '@capacitor/core';

type BadgePlugin = {
  setBadge: (opts: { count: number }) => Promise<void>;
};

const NativeBadge = registerPlugin<BadgePlugin>('BadgePlugin');

/**
 * 在原生安卓 APK 中设置启动器图标右上角的数字角标（类似 QQ 未读消息数）。
 * 通过 Capacitor 自定义原生插件 Badge -> ShortcutBadger 实现，可适配
 * 小米/华为/OPPO/vivo/三星等主流国产启动器。非原生平台（网页/PWA）静默忽略。
 */
export async function setNativeBadge(count: number): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  const n = Math.max(0, Math.floor(count || 0));
  try {
    await NativeBadge.setBadge({ count: n });
  } catch {
    /* 原生插件不可用或当前启动器不支持角标，忽略 */
  }
}
