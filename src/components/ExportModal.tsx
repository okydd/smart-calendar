import { useMemo, useState, useEffect } from 'react';
import { Modal, Radio, DatePicker, App, Empty } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useCalendar } from '../context/CalendarContext';
import {
  dayjs,
  startOfMonth,
  startOfWeek,
  parseDateStr,
  timeToMinutes,
  type Dayjs
} from '../utils/date';
import { renderExportImage, exportEventsToImage } from '../utils/exportImage';
import type { ExportRange } from '../types';

const { RangePicker } = DatePicker;

interface ExportModalProps {
  open: boolean;
  onClose: () => void;
  initialStart?: Dayjs;
  initialEnd?: Dayjs;
}

export default function ExportModal({ open, onClose, initialStart, initialEnd }: ExportModalProps) {
  const { message } = App.useApp();
  const { filteredEvents, currentDate } = useCalendar();
  const [rangeType, setRangeType] = useState<ExportRange>(
    initialStart && initialEnd ? 'custom' : 'month'
  );
  const [custom, setCustom] = useState<[Dayjs, Dayjs] | null>(
    initialStart && initialEnd ? [initialStart, initialEnd] : null
  );
  const [dataUrl, setDataUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialStart && initialEnd) {
      setRangeType('custom');
      setCustom([initialStart, initialEnd]);
    }
  }, [initialStart, initialEnd]);

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
      return `${start.year()}年${String(start.month() + 1).padStart(2, '0')}月事件提醒`;
    }
    if (rangeType === 'week') {
      return `${start.year()}年第${start.week()}周事件提醒`;
    }
    return '日历事件提醒';
  }, [rangeType, start]);

  const subtitle = useMemo(
    () => `${start.format('YYYY-MM-DD')} 至 ${end.format('YYYY-MM-DD')}`,
    [start, end]
  );

  useEffect(() => {
    if (!open) return;
    if (!rangeEvents.length) {
      setDataUrl('');
      return;
    }
    // 延迟生成避免阻塞 UI
    const id = window.setTimeout(() => {
      try {
        setDataUrl(renderExportImage(rangeEvents, { title, subtitle, total: rangeEvents.length }));
      } catch {
        setDataUrl('');
      }
    }, 50);
    return () => window.clearTimeout(id);
  }, [open, rangeEvents, title, subtitle]);

  const handleSave = () => {
    if (!rangeEvents.length) {
      message.warning('所选范围内没有事件');
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      try {
        exportEventsToImage(rangeEvents, { title, subtitle, total: rangeEvents.length });
        message.success('图片已保存');
      } catch {
        message.error('保存失败');
      } finally {
        setLoading(false);
      }
    }, 30);
  };

  return (
    <Modal
      title="导出图片预览"
      open={open}
      onCancel={onClose}
      footer={null}
      width={420}
      centered
      styles={{ body: { padding: '0 16px 16px' } }}
    >
      <div className="export-preview-body">
        <div className="export-range-select">
          <Radio.Group
            value={rangeType}
            onChange={(e) => setRangeType(e.target.value)}
            optionType="button"
            buttonStyle="solid"
            size="small"
          >
            <Radio.Button value="week">本周</Radio.Button>
            <Radio.Button value="month">本月</Radio.Button>
            <Radio.Button value="custom">自定义</Radio.Button>
          </Radio.Group>

          {rangeType === 'custom' && (
            <RangePicker
              style={{ width: '100%', marginTop: 10 }}
              value={custom}
              onChange={(v) => setCustom(v as [Dayjs, Dayjs] | null)}
              allowClear={false}
            />
          )}
        </div>

        <div className="export-preview-card">
          {dataUrl ? (
            <img src={dataUrl} alt="导出预览" />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="该范围内暂无事件"
              style={{ padding: '40px 0' }}
            />
          )}
        </div>

        <div className="export-preview-actions">
          <button
            className="export-save-btn"
            onClick={handleSave}
            disabled={!rangeEvents.length || loading}
          >
            <DownloadOutlined />
            保存到相册
          </button>
          <button className="export-close-btn" onClick={onClose}>
            关闭
          </button>
        </div>
      </div>
    </Modal>
  );
}
