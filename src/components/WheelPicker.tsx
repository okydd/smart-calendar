import { useEffect, useRef } from 'react';

export interface WheelColumn {
  values: { label: string; value: number }[];
}

interface Props {
  columns: WheelColumn[];
  selected: number[];
  onChange: (values: number[]) => void;
  itemHeight?: number;
}

/** 内联滚轮选择器（齿轮样式），避免原生 DatePicker 弹层超出屏幕 */
export default function WheelPicker({ columns, selected, onChange, itemHeight = 36 }: Props) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  /** 用户正在手动滚动的列，避免程序回弹造成抖动 */
  const scrollingRef = useRef<Record<number, number>>({});

  useEffect(() => {
    columns.forEach((col, ci) => {
      if (scrollingRef.current[ci]) return;
      const el = refs.current[ci];
      if (!el) return;
      const idx = col.values.findIndex((v) => v.value === selected[ci]);
      if (idx >= 0) {
        const target = idx * itemHeight;
        if (Math.abs(el.scrollTop - target) > 1) el.scrollTop = target;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, columns, itemHeight]);

  const handleScroll = (ci: number) => {
    const el = refs.current[ci];
    if (!el) return;
    window.clearTimeout(scrollingRef.current[ci]);
    scrollingRef.current[ci] = window.setTimeout(() => {
      delete scrollingRef.current[ci];
    }, 260);
    const idx = Math.max(
      0,
      Math.min(columns[ci].values.length - 1, Math.round(el.scrollTop / itemHeight))
    );
    const value = columns[ci].values[idx]?.value;
    if (value !== undefined && value !== selected[ci]) {
      const nv = [...selected];
      nv[ci] = value;
      onChangeRef.current(nv);
    }
  };

  return (
    <div className="wheel-picker">
      {columns.map((col, ci) => (
        <div className="wheel-col" key={ci}>
          <div
            className="wheel-scroll"
            ref={(el) => {
              refs.current[ci] = el;
            }}
            style={{ height: itemHeight * 5 }}
            onScroll={() => handleScroll(ci)}
          >
            <div style={{ height: itemHeight * 2 }} />
            {col.values.map((v, vi) => (
              <div
                key={vi}
                className={`wheel-item${selected[ci] === v.value ? ' active' : ''}`}
                style={{ height: itemHeight, lineHeight: `${itemHeight}px` }}
                onClick={() => {
                  const el = refs.current[ci];
                  if (el) el.scrollTo({ top: vi * itemHeight, behavior: 'smooth' });
                  const nv = [...selected];
                  nv[ci] = v.value;
                  onChangeRef.current(nv);
                }}
              >
                {v.label}
              </div>
            ))}
            <div style={{ height: itemHeight * 2 }} />
          </div>
          <div
            className="wheel-hl"
            style={{ height: itemHeight, top: itemHeight * 2 }}
          />
        </div>
      ))}
    </div>
  );
}
