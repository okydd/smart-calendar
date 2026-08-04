import { useMemo } from 'react';
import { Button } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { useCalendar } from '../context/CalendarContext';
import { useUI } from '../context/UIContext';
import { dayjs, startOfWeek, weekdayCN } from '../utils/date';
import type { ViewMode } from '../types';

const VIEWS: { key: ViewMode; label: string }[] = [
  { key: 'month', label: '月' },
  { key: 'week', label: '周' },
  { key: 'day', label: '日' }
];

export default function CalendarHeader() {
  const { view, setView, currentDate, setCurrentDate } = useCalendar();
  const { setSidebarOpen } = useUI();

  const label = useMemo(() => {
    if (view === 'month') return `${currentDate.year()}年${currentDate.month() + 1}月`;
    if (view === 'day')
      return `${currentDate.format('YYYY年M月D日')} ${weekdayCN(currentDate)}`;
    const s = startOfWeek(currentDate);
    const e = s.add(6, 'day');
    return `${s.year()}年${s.month() + 1}月 ${s.date()}-${e.date()}日`;
  }, [view, currentDate]);

  const goPrev = () => {
    if (view === 'month') setCurrentDate(currentDate.subtract(1, 'month'));
    else if (view === 'week') setCurrentDate(currentDate.subtract(7, 'day'));
    else setCurrentDate(currentDate.subtract(1, 'day'));
  };
  const goNext = () => {
    if (view === 'month') setCurrentDate(currentDate.add(1, 'month'));
    else if (view === 'week') setCurrentDate(currentDate.add(7, 'day'));
    else setCurrentDate(currentDate.add(1, 'day'));
  };
  const goToday = () => setCurrentDate(dayjs());

  return (
    <div className="cal-header">
      <button className="hamburger" onClick={() => setSidebarOpen(true)} aria-label="菜单">
        <MenuOutlined />
      </button>

      <div className="cal-title-group">
        <span className="cal-title">智能日历</span>
        <span className="cal-subtitle">Smart Calendar</span>
      </div>

      <div className="cal-nav">
        <Button shape="circle" icon={<LeftOutlined />} onClick={goPrev} />
        <span className="cal-nav-label">{label}</span>
        <Button shape="circle" icon={<RightOutlined />} onClick={goNext} />
        <Button onClick={goToday} style={{ marginLeft: 6 }}>
          今天
        </Button>
      </div>

      <div className="view-switch">
        {VIEWS.map((v) => (
          <button
            key={v.key}
            className={view === v.key ? 'active' : ''}
            onClick={() => setView(v.key)}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}
