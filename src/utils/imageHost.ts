import { getClient } from '../sync/client';

/** 事件图片托管桶（公开可读，已登录可写） */
export const IMG_BUCKET = 'event-images';

function isDataUrl(s: string): boolean {
  return typeof s === 'string' && s.startsWith('data:');
}
function isHttpUrl(s: string): boolean {
  return typeof s === 'string' && (s.startsWith('http://') || s.startsWith('https://'));
}

/** dataURL -> Blob（用于上传到 Supabase Storage） */
function dataUrlToBlob(dataUrl: string): Blob | null {
  try {
    const [meta, b64] = dataUrl.split(',');
    const mime = (meta.match(/data:(.*?);base64/) || [])[1] || 'image/jpeg';
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return new Blob([arr], { type: mime });
  } catch {
    return null;
  }
}

/**
 * 把单张图片托管到 Supabase Storage，返回可公网访问的 URL。
 * - 已是 http(s) URL：原样返回；
 * - dataURL 且已登录 Supabase：上传并返回公开 URL；
 * - 未登录 / 未配置 / 任何失败：回退返回原始 dataURL（本地照常可用）。
 */
export async function hostImage(src: string): Promise<string> {
  if (!src || isHttpUrl(src) || !isDataUrl(src)) return src;
  const client = getClient();
  if (!client) return src;
  try {
    const { data: userData } = await client.auth.getUser();
    if (!userData.user) return src;
    const blob = dataUrlToBlob(src);
    if (!blob) return src;
    const ext = blob.type === 'image/png' ? 'png' : 'jpg';
    const rand = Math.random().toString(36).slice(2, 8);
    const path = `${userData.user.id}/${Date.now()}-${rand}.${ext}`;
    const { data, error } = await client.storage
      .from(IMG_BUCKET)
      .upload(path, blob, {
        contentType: blob.type,
        upsert: false,
        cacheControl: '31536000'
      });
    if (error || !data) return src;
    const { data: urlData } = client.storage.from(IMG_BUCKET).getPublicUrl(data.path);
    return urlData.publicUrl || src;
  } catch {
    return src;
  }
}

/** 批量托管（保持顺序），逐张失败不影响其它 */
export async function hostImages(srcs: string[]): Promise<string[]> {
  return Promise.all((srcs || []).map((s) => hostImage(s)));
}
