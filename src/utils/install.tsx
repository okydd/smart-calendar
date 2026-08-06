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

/** 安装指引内容（按平台定制） */
export function InstallGuide(): ReactNode {
  const p = detectPlatform();
  if (p === 'ios') {
    return (
      <div style={{ fontSize: 13, lineHeight: 1.9 }}>
        <p style={{ margin: '0 0 8px' }}>
          iOS 暂不支持一键安装，请用 <b>Safari</b> 浏览器打开本页面后操作：
        </p>
        <ol style={{ margin: 0, paddingLeft: 18 }}>
          <li>
            点击底部中间的 <b>分享</b> 按钮（方框带向上箭头）。
          </li>
          <li>
            向上滑动，点「<b>添加到主屏幕</b>」。
          </li>
          <li>
            点「添加」，即可在桌面生成独立图标，全屏运行。
          </li>
        </ol>
        <p style={{ margin: '8px 0 0', color: '#8e8e93' }}>
          用微信 / QQ 内置浏览器打开无法安装，请改用 Safari。
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
          <b>iPhone：</b>用 Safari 打开，点分享 →「添加到主屏幕」。
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
