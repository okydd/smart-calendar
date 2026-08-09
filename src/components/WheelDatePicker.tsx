import { useState } from 'react';
import { dayjs, type Dayjs } from '../utils/date';
import WheelPicker, { WheelColumn } from './WheelPicker';

const YEARS = Array.from({ length: 16 }, (_, i) => 2020 + i);

function daysInMonth(y: number, m: number): number {
  return new Date(y, m, 0).getDate();
}

function dateColumns(y: number, m: number): WheelColumn[] {
  const d = daysInMonth(y, m);
  return [
    { values: YEARS.map((yy) => ({ label: `${yy}年`, value: yy })) },
    { values: Array.from({ length: 12 }, (_, i) => ({ label: `${i + 1}月`, value: i + 1 })) },
    { values: Array.from({ length: d }, (_, i) => ({ label: `${i + 1}日`, value: i + 1 })) }
  ];
}

interface Props {
  label: string;
  value: Dayjs;
  onChange: (d: Dayjs) => void;
}

/** 设置页导出日期选择：复用新建事件里的上下齿轮滚轮 */
export default function WheelDatePicker({ label, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<[number, number, number]>([
    value.year(),
    value.month() + 1,
    value.date()
  ]);

  const openPicker = () => {
    setDraft([value.year(), value.month() + 1, value.date()]);
    setOpen(true);
  };

  const onDraftChange = (vals: number[]) => {
    let [y, m, d] = vals as [number, number, number];
    const max = daysInMonth(y, m);
    if (d > max) d = max;
    setDraft([y, m, d]);
  };

  const confirm = () => {
    const y = draft[0];
    const m = String(draft[1]).padStart(2, '0');
    const d = String(draft[2]).padStart(2, '0');
    onChange(dayjs(`${y}-${m}-${d}`));
    setOpen(false);
  };

  return (
    <div className="set-range-col">
      <label>{label}</label>
      <button type="button" className="wheel-date-trigger" onClick={openPicker}>
        {value.format('YYYY/MM/DD')}
      </button>

      {open && (
        <div
          className="ev-picker-overlay"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
        >
          <div className="ev-picker-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ev-picker-body">
              <WheelPicker
                columns={dateColumns(draft[0], draft[1])}
                selected={draft}
                onChange={onDraftChange}
              />
            </div>
            <div className="ev-picker-foot three">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                }}
              >
                取消
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const t = dayjs();
                  setDraft([t.year(), t.month() + 1, t.date()]);
                }}
              >
                今天
              </button>
              <button
                type="button"
                className="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  confirm();
                }}
              >
                设置
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
