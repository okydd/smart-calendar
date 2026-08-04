import { useMemo, useState } from 'react';
import { Modal, Radio, DatePicker, Button, App, Empty } from 'antd';
import { useCalendar } from '../context/CalendarContext';
import {
  dayjs,
  startOfMonth,
  startOfWeek,
  parseDateStr,
  timeToMinutes,
  type Dayjs
} from '../utils/date';
import { exportEventsToImage } from '../utils/exportImage';
import type { ExportRange } from '../types';

const { RangePicker } = DatePicker;

export default function ExportModal({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { message } = App.useApp();
  const { filteredEvents, currentDate } = useCalendar();
  const [rangeType, setRangeType] = useState<ExportRange>('month');
  const [custom, setCustom] = useState<[Dayjs, Dayjs] | null>(null);
  const [loading, setLoading] = useState(false);

  const { start, end } = useMemo(() => {
    if (rangeType === 'week') {
      const s = startOfWeek(currentDate);
      return { start: s, end: s.add(6, 'day') };
    }
    if (rangeType === 'month') {
      const s = startOfMonth(currentDate);
      return { start: s, end: s.endOf('month') };
    }
    if (custom) return { start: custom[0], end: custom[1] };
    return { start: currentDate, end: currentDate };
  }, [rangeType, custom, currentDate]);

  const rangeEvents = useMemo(() => {
    return filteredEvents
      .filter((e) => {
        const d = parseDateStr(e.date);
        return !d.isBefore(start, 'day') && !d.isAfter(end, 'day');
      })
      .sort((a, b) => {
        const da = parseDateStr(a.date);
        const db = parseDateStr(b.date);
        if (!da.isSame(db, 'day')) return da.isBefore(db) ? -1 : 1;
        return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
      });
  }, [filteredEvents, start, end]);

  const title = useMemo(() => {
    if (rangeType === 'month') {
      return `${start.year()}年${String(start.month() + 1).padStart(2, '0')}月事件汇总`;
    }
    if (rangeType === 'week') {
      return `${start.year()}年 第${start.week()}周事件汇总`;
    }
    return `${start.format('YYYY.MM.DD')} - ${end.format('YYYY.MM.DD')} 事件汇总`;
  }, [rangeType, start, end]);

  const handleExport = () => {
    if (!rangeEvents.length) {
      message.warning('所选范围内没有事件');
      return;
    }
    setLoading(true);
    // 让按钮先进入 loading 态，再做同步绘制
    setTimeout(() => {
      try {
        exportEventsToImage(rangeEvents, { title });
        message.success(`已生成 ${rangeEvents.length} 个事件的图片`);
      } catch {
        message.error('图片生成失败');
      } finally {
        setLoading(false);
      }
    }, 30);
  };

  return (
    <Modal
      title="导出为图片"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          取消
        </Button>,
        <Button
          key="ok"
          className="btn-gradient"
          type="primary"
          loading={loading}
          disabled={!rangeEvents.length}
          onClick={handleExport}
        >
          生成并下载
        </Button>
      ]}
    >
      <div style={{ marginBottom: 16 }}>
        <Radio.Group
          value={rangeType}
          onChange={(e) => setRangeType(e.target.value)}
          optionType="button"
          buttonStyle="solid"
          style={{ marginBottom: 14 }}
        >
          <Radio.Button value="week">本周</Radio.Button>
          <Radio.Button value="month">本月</Radio.Button>
          <Radio.Button value="custom">自定义</Radio.Button>
        </Radio.Group>

        {rangeType === 'custom' && (
          <RangePicker
            style={{ width: '100%' }}
            value={custom}
            onChange={(v) => setCustom(v as [Dayjs, Dayjs] | null)}
          />
        )}
      </div>

      <div
        style={{
          background: '#fafafa',
          borderRadius: 10,
          padding: 14,
          fontSize: 13,
          color: '#666'
        }}
      >
        <div>
          范围：
          <b style={{ color: '#6d5dfc' }}>
            {start.format('YYYY-MM-DD')} ~ {end.format('YYYY-MM-DD')}
          </b>
        </div>
        <div style={{ marginTop: 6 }}>
          标题：<b>{title}</b>
        </div>
        <div style={{ marginTop: 6 }}>
          包含事件：<b style={{ color: '#6d5dfc' }}>{rangeEvents.length}</b> 个
        </div>
      </div>

      {!rangeEvents.length && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="该范围内暂无事件"
          style={{ marginTop: 12 }}
        />
      )}
    </Modal>
  );
}
