import { getClient } from '../sync/client';
import { hostImages } from './imageHost';
import type { CalendarEvent } from '../types';

/** 数据分享桶（公开可读，已登录可写） */
export const SHARE_BUCKET = 'event-shares';

export interface ShareMeta {
  rangeStart: string;
  rangeEnd: string;
  exportTime: string;
}

export interface ShareResult {
  /** 分享 ID（也是访问路径的一部分） */
  id: string;
  /** 原始 JSON 的公开下载地址 */
  url: string;
  /** 在线查看页面地址（部署在 GitHub Pages 的日历应用内） */
  viewerUrl: string;
}

export interface ShareOutcome {
  ok: boolean;
  result?: ShareResult;
  /** 失败时的可读原因 */
  error?: string;
}

/**
 * 把一批事件的完整数据（含图片）打包成 JSON，上传到 Supabase 公开桶，
 * 返回可公网访问的链接。需已登录；未登录 / 未配置 / 失败均返回 {ok:false, error:...}。
 *
 * 上传前会把事件里的 dataURL 图片托管为云端 URL，保证在线查看与邮件都能正常显示图片。
 * 图片逐张串行上传，避免并发触发 HTTP/2 协议错误。
 */
export async function createShare(
  events: CalendarEvent[],
  meta: ShareMeta
): Promise<ShareOutcome> {
  const client = getClient();
  if (!client) return { ok: false, error: '未配置云同步，请先到「云同步」中设置 Supabase' };
  try {
    const { data: userData } = await client.auth.getUser();
    if (!userData.user) return { ok: false, error: '请先登录云同步账号再分享数据' };

    // 托管图片：串行处理每个事件的图片，避免并发 HTTP/2 连接风暴
    const prepared: CalendarEvent[] = [];
    for (const e of events) {
      const imgs = e.images && e.images.length ? await hostImages(e.images) : e.images;
      prepared.push({ ...e, images: imgs ?? e.images });
    }

    const payload = {
      app: 'smart-calendar',
      version: 1,
      createdAt: new Date().toISOString(),
      rangeStart: meta.rangeStart,
      rangeEnd: meta.rangeEnd,
      exportTime: meta.exportTime,
      count: prepared.length,
      events: prepared
    };

    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36);
    const path = `${id}.json`;

    const { data, error } = await client.storage
      .from(SHARE_BUCKET)
      .upload(path, JSON.stringify(payload), {
        contentType: 'application/json',
        upsert: true,
        cacheControl: '0'
      });
    if (error) return { ok: false, error: '分享数据上传失败：' + (error.message || '') };
    if (!data) return { ok: false, error: '分享数据上传失败：服务端未返回文件信息' };

    const { data: urlData } = client.storage.from(SHARE_BUCKET).getPublicUrl(data.path);
    const url = urlData.publicUrl || '';
    // 在线查看页（HashRouter：#/share/:id）；同源部署，跨设备也能打开
    const origin = typeof location !== 'undefined' ? location.origin : 'https://okydd.github.io';
    const base = typeof location !== 'undefined' ? location.pathname : '/smart-calendar/';
    const viewerUrl = `${origin}${base}#/share/${id}`;
    return { ok: true, result: { id, url, viewerUrl } };
  } catch (e) {
    return { ok: false, error: '分享数据上传失败：' + ((e as Error)?.message ?? '网络异常') };
  }
}

/** 读取一份分享数据（供在线查看页使用）。无需登录（桶公开读）。 */
export async function readShare(id: string): Promise<any | null> {
  const client = getClient();
  if (!client) return null;
  try {
    const { data, error } = await client.storage.from(SHARE_BUCKET).download(`${id}.json`);
    if (error || !data) return null;
    const text = await data.text();
    return JSON.parse(text);
  } catch {
    return null;
  }
}
