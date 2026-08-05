import type { SupabaseClient } from '@supabase/supabase-js';
import type { NotifySettings } from '../utils/notify';

/**
 * 通知设置云端同步：独立于日历事件的「每用户一份」配置表 user_notify_settings。
 * 登录同一账号后，任意设备保存设置都会 upsert 到云端；其它设备登录时自动拉取覆盖本地，
 * 实现跨设备一致，无需重复配置。
 */

const TABLE = 'user_notify_settings';

interface Row {
  user_id: string;
  email_target: string;
  emailjs_service_id: string;
  emailjs_template_id: string;
  emailjs_public_key: string;
  wechat_send_key: string;
  auto_send: boolean;
  auto_send_time: string;
  updated_at?: string;
}

export function settingsToRow(s: NotifySettings, userId: string): Row {
  return {
    user_id: userId,
    email_target: s.emailTarget ?? '',
    emailjs_service_id: s.emailjsServiceId ?? '',
    emailjs_template_id: s.emailjsTemplateId ?? '',
    emailjs_public_key: s.emailjsPublicKey ?? '',
    wechat_send_key: s.wechatSendKey ?? '',
    auto_send: !!s.autoSend,
    auto_send_time: s.autoSendTime ?? '04:00'
  };
}

function rowToSettings(r: Row): NotifySettings {
  return {
    emailTarget: r.email_target ?? '',
    emailjsServiceId: r.emailjs_service_id ?? '',
    emailjsTemplateId: r.emailjs_template_id ?? '',
    emailjsPublicKey: r.emailjs_public_key ?? '',
    wechatSendKey: r.wechat_send_key ?? '',
    autoSend: !!r.auto_send,
    autoSendTime: r.auto_send_time ?? '04:00'
  };
}

/** 从云端读取该用户的通知设置；无记录或出错时返回 null */
export async function fetchCloudNotify(
  supabase: SupabaseClient,
  userId: string
): Promise<NotifySettings | null> {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    if (error) {
      console.warn('[notify-sync] 读取云端通知设置失败:', error.message);
      return null;
    }
    return data ? rowToSettings(data as Row) : null;
  } catch (e) {
    console.warn('[notify-sync] 读取云端通知设置异常:', (e as Error)?.message);
    return null;
  }
}

/** 把一份通知设置 upsert 到云端，返回是否成功 */
export async function pushCloudNotify(
  supabase: SupabaseClient,
  userId: string,
  s: NotifySettings
): Promise<boolean> {
  try {
    const row = { ...settingsToRow(s, userId), updated_at: new Date().toISOString() };
    const { error } = await supabase.from(TABLE).upsert(row, { onConflict: 'user_id' });
    if (error) {
      console.warn('[notify-sync] 推送云端通知设置失败:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('[notify-sync] 推送云端通知设置异常:', (e as Error)?.message);
    return false;
  }
}
