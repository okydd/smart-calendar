import { RightOutlined } from '@ant-design/icons';

/* ------------------------------------------------------------------ */
/* 通用列表行（微信设置风格）                                            */
/* ------------------------------------------------------------------ */

export function Row({
  icon,
  label,
  desc,
  value,
  badge,
  onClick,
  danger,
  right
}: {
  icon?: React.ReactNode;
  label: string;
  desc?: React.ReactNode;
  value?: React.ReactNode;
  badge?: number;
  onClick?: () => void;
  danger?: boolean;
  right?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={`set-row${danger ? ' danger' : ''}${onClick ? '' : ' static'}`}
      onClick={onClick}
      disabled={!onClick}
    >
      {icon && <span className="set-row-ico">{icon}</span>}
      <span className="set-row-main">
        <span className="set-row-label">
          {label}
          {!!badge && badge > 0 && <em className="set-row-badge">{badge}</em>}
        </span>
        {desc && <span className="set-row-desc">{desc}</span>}
      </span>
      {value !== undefined && <span className="set-row-value">{value}</span>}
      {right ?? (onClick ? <RightOutlined className="set-row-arrow" /> : null)}
    </button>
  );
}

export function Switch({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <span
      role="switch"
      aria-checked={on}
      className={`switch-mini${on ? ' on' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!on);
      }}
    >
      <span className="knob" />
    </span>
  );
}

/** 振动图标（antd 无现成图标，用内联 SVG） */
export function MobileVibrateIcon() {
  return (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="#ff2d78" aria-hidden="true">
      <path d="M672 64H352c-52.9 0-96 43.1-96 96v704c0 52.9 43.1 96 96 96h320c52.9 0 96-43.1 96-96V160c0-52.9-43.1-96-96-96z m32 800c0 17.6-14.4 32-32 32H352c-17.6 0-32-14.4-32-32V160c0-17.6 14.4-32 32-32h320c17.6 0 32 14.4 32 32v704z" />
      <path d="M128 320a32 32 0 0 1 32 32v320a32 32 0 1 1-64 0V352a32 32 0 0 1 32-32zM896 320a32 32 0 0 1 32 32v320a32 32 0 1 1-64 0V352a32 32 0 0 1 32-32z" />
    </svg>
  );
}
