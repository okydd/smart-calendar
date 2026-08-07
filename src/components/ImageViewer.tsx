import { useState, useRef, useEffect, useCallback } from 'react';
import { CloseOutlined } from '@ant-design/icons';

interface Props {
  /** 图片地址数组（dataURL 或 http URL） */
  images: string[];
  /** 缩略图网格容器 className（默认移动端三列网格） */
  gridClassName?: string;
  /** 缩略图 className */
  thumbClassName?: string;
}

/**
 * 图片查看器：缩略图网格 + 全屏灯箱。
 * 灯箱支持：左右切换按钮、键盘 ←/→、Esc 关闭、移动端左右滑动切换。
 */
export default function ImageViewer({
  images,
  gridClassName = 'evv-imgs',
  thumbClassName = 'evv-img'
}: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const touchY = useRef<number | null>(null);

  const count = images.length;

  const go = useCallback(
    (dir: number) => {
      setIndex((i) => (i + dir + count) % count);
    },
    [count]
  );

  // 键盘：←/→ 切换，Esc 关闭
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, go]);

  // 打开灯箱时锁定背景滚动
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // 移动端左右滑动切换
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    touchY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null || touchY.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    const dy = e.changedTouches[0].clientY - touchY.current;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1); // 左滑→下一张，右滑→上一张
    }
    touchX.current = null;
    touchY.current = null;
  };

  if (count === 0) return null;

  return (
    <>
      <div className={gridClassName}>
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            className={thumbClassName}
            alt={`图片 ${i + 1}`}
            loading="lazy"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          />
        ))}
      </div>

      {open && (
        <div className="img-lightbox" onClick={() => setOpen(false)}>
          <button
            className="img-lb-close"
            aria-label="关闭"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            <CloseOutlined />
          </button>

          {count > 1 && (
            <button
              className="img-lb-nav img-lb-prev"
              aria-label="上一张"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
            >
              ‹
            </button>
          )}

          <img
            key={index}
            className="img-lb-img"
            src={images[index]}
            alt={`图片 ${index + 1}`}
            draggable={false}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          />

          {count > 1 && (
            <button
              className="img-lb-nav img-lb-next"
              aria-label="下一张"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
            >
              ›
            </button>
          )}

          {count > 1 && (
            <div className="img-lb-count" onClick={(e) => e.stopPropagation()}>
              {index + 1} / {count}
            </div>
          )}
        </div>
      )}
    </>
  );
}
