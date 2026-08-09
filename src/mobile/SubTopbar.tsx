import { LeftOutlined } from '@ant-design/icons';

/**
 * 子页面顶部栏（微信设置风格）：
 * - 渐变背景，与主 topbar 视觉一致
 * - 左侧返回箭头，点击返回上一级
 * - 居中标题
 * 采用 position: sticky 固定，跟随 .app-content 滚动而常驻顶部。
 */
export default function SubTopbar({
  title,
  onBack,
  right
}: {
  title: string;
  onBack: () => void;
  right?: React.ReactNode;
}) {
  return (
    <header className="sub-topbar">
      <button className="sub-back" onClick={onBack} aria-label="返回">
        <LeftOutlined />
      </button>
      <div className="sub-title">{title}</div>
      {right && <div className="sub-right">{right}</div>}
    </header>
  );
}
