/**
 * 复制文本到剪贴板：
 * - 优先使用 navigator.clipboard.writeText（需要安全上下文）；
 * - 在部分 Capacitor / WebView 环境下 clipboard 不可用或抛错，回退到
 *   隐藏 textarea + document.execCommand('copy')，保证复制可用。
 * 返回是否复制成功。
 */
export async function copyText(text: string): Promise<boolean> {
  // 1) 现代 API（仅安全上下文可用）
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* 落到兜底方案 */
  }
  // 2) 兜底：临时 textarea + execCommand
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-9999px';
    ta.style.left = '0';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}
