import type { ReactNode } from 'react';

/** 判断当前运行环境，用于给出针对性的「安装到桌面」指引 */
export function detectPlatform(): 'ios' | 'android' | 'wechat' | 'desktop' | 'other' {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent;
  const isWechat = /MicroMessenger/i.test(ua);
  const isIOS =
    /iPhone|iPad|iPod/i.test(ua) ||
    (navigator.platform === 'MacIntel' && (navigator as any).maxTouchPoints > 1);
  const isAndroid = /Android/i.test(ua);
  if (isWechat) return 'wechat';
  if (isIOS) return 'ios';
  if (isAndroid) return 'android';
  if (/Windows|Macintosh|Linux x86/i.test(ua)) return 'desktop';
  return 'other';
}

/** iOS 安装流程图示：Safari 分享 → 添加到主屏幕 → 桌面图标 */
function IosVisual(): ReactNode {
  return (
    <svg viewBox="0 0 300 96" width="100%" style={{ maxWidth: 300, margin: '4px 0 8px' }}>
      {/* ① Safari */}
      <rect x="6" y="14" width="60" height="68" rx="12" fill="#fff" stroke="#d2d2da" strokeWidth="2" />
      <rect x="14" y="22" width="44" height="40" rx="4" fill="#f2f4f8" />
      <circle cx="36" cy="64" r="9" fill="none" stroke="#3b7cff" strokeWidth="2.4" />
      <path d="M36 60 v8 M32.5 63.5 l3.5 -3.5 l3.5 3.5" stroke="#3b7cff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="36" y="90" textAnchor="middle" fontSize="9" fill="#555">① Safari</text>

      {/* 箭头 */}
      <path d="M70 48 h16" stroke="#bbb" strokeWidth="2" markerEnd="url(#ar)" />
      <defs>
        <marker id="ar" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 z" fill="#bbb" />
        </marker>
      </defs>

      {/* ② 添加到主屏幕 */}
      <rect x="92" y="14" width="64" height="68" rx="12" fill="#fff" stroke="#d2d2da" strokeWidth="2" />
      <rect x="100" y="22" width="48" height="40" rx="4" fill="#f7f8fb" />
      <circle cx="124" cy="40" r="8" fill="none" stroke="#34c759" strokeWidth="2.4" />
      <path d="M124 36 v8 M120 40 h8" stroke="#34c759" strokeWidth="2.4" strokeLinecap="round" />
      <text x="124" y="90" textAnchor="middle" fontSize="9" fill="#555">② 添加到主屏幕</text>

      {/* 箭头 */}
      <path d="M158 48 h16" stroke="#bbb" strokeWidth="2" markerEnd="url(#ar)" />

      {/* ③ 桌面图标 */}
      <rect x="184" y="14" width="60" height="68" rx="12" fill="#f4f5f8" stroke="#d2d2da" strokeWidth="2" />
      <rect x="204" y="26" width="20" height="20" rx="5" fill="#3b7cff" />
      <path d="M208 36 h12 M214 30 v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <text x="214" y="90" textAnchor="middle" fontSize="9" fill="#555">③ 桌面图标</text>
    </svg>
  );
}

/** 安装指引内容（按平台定制） */
export function InstallGuide(): ReactNode {
  const p = detectPlatform();
  if (p === 'ios') {
    return (
      <div style={{ fontSize: 13, lineHeight: 1.9 }}>
        <p style={{ margin: '0 0 4px' }}>
          iOS 系统出于限制，<b>不支持一键安装</b>，必须用 Safari 手动添加到主屏幕：
        </p>
        <IosVisual />
        <ol style={{ margin: 0, paddingLeft: 18 }}>
          <li>
            用 <b>Safari</b> 打开本页面（微信/QQ 内打开请先点右上角「··· → 在浏览器打开」）。
          </li>
          <li>
            点底部中间的 <b>分享</b> 按钮（方框带向上箭头 ￪）。
          </li>
          <li>
            向上滑动，点「<b>添加到主屏幕</b>」→「添加」。
          </li>
        </ol>
        <p style={{ margin: '8px 0 0', color: '#8e8e93' }}>
          之后桌面上会出现独立图标，点开即全屏运行，断网也能用。
        </p>
      </div>
    );
  }
  if (p === 'wechat') {
    return (
      <div style={{ fontSize: 13, lineHeight: 1.9 }}>
        <p style={{ margin: '0 0 8px' }}>当前在微信内置浏览器，无法直接安装。请先打开系统浏览器：</p>
        <ol style={{ margin: 0, paddingLeft: 18 }}>
          <li>
            点右上角「<b>···</b>」→「<b>在浏览器打开</b>」（Safari / Chrome）。
          </li>
          <li>
            在系统浏览器中打开后，点「更多功能 → 安装到桌面」即可安装。
          </li>
        </ol>
      </div>
    );
  }
  if (p === 'android') {
    return (
      <div style={{ fontSize: 13, lineHeight: 1.9 }}>
        <p style={{ margin: '0 0 8px' }}>请按以下步骤安装：</p>
        <ol style={{ margin: 0, paddingLeft: 18 }}>
          <li>
            确保用 <b>Chrome / Edge</b> 打开（微信内打开请先「在浏览器打开」）。
          </li>
          <li>
            点浏览器右上角菜单 →「<b>安装应用 / 添加到主屏幕</b>」。
          </li>
          <li>若页面已弹出「安装到桌面」按钮，直接点它即可。</li>
        </ol>
      </div>
    );
  }
  return (
    <div style={{ fontSize: 13, lineHeight: 1.9 }}>
      <p style={{ margin: '0 0 8px' }}>请按以下方式安装：</p>
      <ol style={{ margin: 0, paddingLeft: 18 }}>
        <li>
          <b>安卓：</b>用 Chrome 打开，点菜单 →「安装应用 / 添加到主屏幕」。
        </li>
        <li>
          <b>iPhone：</b>用 Safari 打开，点分享 →「添加到主屏幕」（见上方图示）。
        </li>
        <li>
          <b>电脑：</b>Chrome / Edge 地址栏右侧的「安装」图标。
        </li>
      </ol>
      <p style={{ margin: '8px 0 0', color: '#8e8e93' }}>
        安装后生成独立图标，全屏运行，断网也能用。
      </p>
    </div>
  );
}
