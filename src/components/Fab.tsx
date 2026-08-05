import { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const POS_KEY = 'calendarFabPos';
const SIZE = 56;

interface Pos {
  x: number;
  y: number;
}

function loadPos(): Pos | null {
  try {
    const raw = localStorage.getItem(POS_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Pos;
    if (typeof p?.x === 'number' && typeof p?.y === 'number') return p;
  } catch {
    /* ignore */
  }
  return null;
}

/** 把坐标限制在可视区域内 */
function clamp(p: Pos): Pos {
  const maxX = Math.max(8, window.innerWidth - SIZE - 8);
  const maxY = Math.max(8, window.innerHeight - SIZE - 8);
  return {
    x: Math.min(Math.max(8, p.x), maxX),
    y: Math.min(Math.max(8, p.y), maxY)
  };
}

/**
 * 可拖动的悬浮「+」按钮：
 * - 单击 = 新建事件；
 * - 按住拖动可改变位置，位置记忆在本机；
 * - 双击按钮可恢复默认右下角位置。
 */
export default function Fab({ onClick }: { onClick: () => void }) {
  const [pos, setPos] = useState<Pos | null>(() => loadPos());
  const [dragging, setDragging] = useState(false);
  const stateRef = useRef({ moved: false, dx: 0, dy: 0, id: -1 });

  // 窗口尺寸变化时纠正越界
  useEffect(() => {
    const onResize = () => setPos((p) => (p ? clamp(p) : p));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    stateRef.current = {
      moved: false,
      dx: e.clientX - rect.left,
      dy: e.clientY - rect.top,
      id: e.pointerId
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (stateRef.current.id !== e.pointerId) return;
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    const next = clamp({
      x: e.clientX - stateRef.current.dx,
      y: e.clientY - stateRef.current.dy
    });
    const rect = e.currentTarget.getBoundingClientRect();
    if (
      !stateRef.current.moved &&
      Math.abs(next.x - rect.left) < 5 &&
      Math.abs(next.y - rect.top) < 5
    ) {
      return;
    }
    stateRef.current.moved = true;
    setDragging(true);
    setPos(next);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (stateRef.current.id !== e.pointerId) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    stateRef.current.id = -1;
    if (stateRef.current.moved) {
      setDragging(false);
      setPos((p) => {
        if (p) localStorage.setItem(POS_KEY, JSON.stringify(p));
        return p;
      });
      return;
    }
    setDragging(false);
    onClick();
  };

  const resetPos = () => {
    localStorage.removeItem(POS_KEY);
    setPos(null);
  };

  const style = pos
    ? { left: pos.x, top: pos.y, right: 'auto', bottom: 'auto' }
    : undefined;

  return (
    <button
      className={`fab${dragging ? ' dragging' : ''}`}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onDoubleClick={resetPos}
      aria-label="新建日程（可拖动）"
      title="点击新建 · 按住可拖动 · 双击复位"
    >
      <PlusOutlined />
    </button>
  );
}
