import { getClient } from '../sync/client';

/** 事件图片托管桶（公开可读，已登录可写） */
export const IMG_BUCKET = 'event-images';

const UPLOAD_RETRIES = 3;
const UPLOAD_RETRY_DELAY = 800;

function isDataUrl(s: string): boolean {
  return typeof s === 'string' && s.startsWith('data:');
}
function isHttpUrl(s: string): boolean {
  return typeof s === 'string' && (s.startsWith('http://') || s.startsWith('https://'));
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** 判断存储上传错误是否属于可重试的网络层错误 */
function isRetryableStorageError(e: unknown): boolean {
  const msg = String((e as Error)?.message ?? '');
  return (
    msg.includes('CONNECTION_CLOSED') ||
    msg.includes('CONNECTION_REFUSED') ||
    msg.includes('CONNECTION_RESET') ||
    msg.includes('ERR_HTTP2') ||
    msg.includes('HTTP2') ||
    msg.includes('ECONNRESET') ||
    msg.includes('ECONNREFUSED') ||
    msg.includes('ETIMEDOUT') ||
    msg.includes('NetworkError') ||
    msg.includes('network') ||
    msg.includes('timeout') ||
    msg.includes('abort') ||
    (e as Error)?.name === 'TypeError' ||
    (e as Error)?.name === 'AbortError'
  );
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
 *
 * 内部带 3 次重试，可缓解 HTTP/2 连接抖动导致的临时失败。
 */
export async function hostImage(src: string): Promise<string> {
  if (!src || isHttpUrl(src) || !isDataUrl(src)) return src;
  const client = getClient();
  if (!client) return src;

  let userId: string | undefined;
  try {
    const { data: userData } = await client.auth.getUser();
    if (!userData.user) return src;
    userId = userData.user.id;
  } catch {
    return src;
  }

  const blob = dataUrlToBlob(src);
  if (!blob) return src;

  const ext = blob.type === 'image/png' ? 'png' : 'jpg';
  const rand = Math.random().toString(36).slice(2, 8);
  const path = `${userId}/${Date.now()}-${rand}.${ext}`;

  let lastErr: unknown = null;
  for (let i = 0; i < UPLOAD_RETRIES; i++) {
    try {
      const { data, error } = await client.storage
        .from(IMG_BUCKET)
        .upload(path, blob, {
          contentType: blob.type,
          upsert: false,
          cacheControl: '31536000'
        });
      if (error) throw error;
      if (!data) throw new Error('upload returned no data');
      const { data: urlData } = client.storage.from(IMG_BUCKET).getPublicUrl(data.path);
      return urlData.publicUrl || src;
    } catch (e) {
      lastErr = e;
      if (!isRetryableStorageError(e)) {
        // 非网络错误（如 403、413、格式错误）不再重试，直接回退
        break;
      }
      if (i < UPLOAD_RETRIES - 1) await sleep(UPLOAD_RETRY_DELAY * (i + 1));
    }
  }

  console.error('[imageHost] upload failed after retries, fallback to dataURL:', lastErr);
  return src;
}

/**
 * 批量托管（保持顺序），逐张串行上传。
 * 避免同时打开多条 HTTP/2 连接触发 ERR_HTTP2_PROTOCOL_ERROR；
 * 单张失败不影响其它，仍返回原 dataURL。
 */
export async function hostImages(srcs: string[]): Promise<string[]> {
  const out: string[] = [];
  for (const s of srcs || []) {
    out.push(await hostImage(s));
  }
  return out;
}
