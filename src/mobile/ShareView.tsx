import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, Empty, Button, message } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined, CalendarOutlined } from '@ant-design/icons';
import { readShare } from '../utils/share';
import { parseDateStr, timeRangeLabel, weekdayCN, dayjs } from '../utils/date';
import type { CalendarEvent } from '../types';

interface SharePayload {
  createdAt?: string;
  rangeStart?: string;
  rangeEnd?: string;
  exportTime?: string;
  count?: number;
  events?: CalendarEvent[];
}

export default function ShareView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<SharePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { message: msgApi } = message;

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!id) {
        if (alive) {
          setError('链接缺少分享 ID');
          setLoading(false);
        }
        return;
      }
      const res = await readShare(id);
      if (!alive) return;
      if (!res) {
        setError('未找到该分享数据，可能链接已失效或尚未生成');
        setLoading(false);
        return;
      }
      setData(res);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  const events = useMemo(
    () => (data?.events || []).filter((e: CalendarEvent) => !e.deleted),
    [data]
  );

  const downloadJson = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Calendar_Share_${dayjs().format('YYYYMMDD_HHmmss')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    msgApi.success('已下载 JSON');
  };

  if (loading) {
    return (
      <div className="share-loading">
        <Spin />
        <div className="share-loading-text">正在加载分享数据…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="share-page">
        <div className="share-topbar">
          <button className="share-back" onClick={() => navigate('/calendar')}>
            <ArrowLeftOutlined /> 返回日历
          </button>
        </div>
        <div className="share-error">
          <Empty description={error} />
        </div>
      </div>
    );
  }

  return (
    <div className="share-page">
      <div className="share-topbar">
        <button className="share-back" onClick={() => navigate('/calendar')}>
          <ArrowLeftOutlined /> 返回日历
        </button>
        <Button type="primary" size="small" icon={<DownloadOutlined />} onClick={downloadJson}>
          下载JSON
        </Button>
      </div>

      <div className="share-head">
        <div className="share-head-title">
          <CalendarOutlined /> 智能日历 · 数据分享
        </div>
        <div className="share-meta">
          {data?.rangeStart && data?.rangeEnd && (
            <span>范围：{data.rangeStart} 至 {data.rangeEnd}</span>
          )}
          {data?.exportTime && <span>导出：{data.exportTime}</span>}
          <span>共 {events.length} 条事件</span>
        </div>
      </div>

      <div className="share-list">
        {events.map((e) => {
          const d = parseDateStr(e.date);
          const dateLabel = d.isValid()
            ? `${d.year()}年${d.month() + 1}月${d.date()}日 ${weekdayCN(d)}`
            : e.date;
          return (
            <div className="share-card" key={e.id}>
              <div className="share-card-title">
                {e.title}
                {e.important && <span className="share-tag imp">重要</span>}
                {e.done && <span className="share-tag done">已完成</span>}
              </div>
              <div className="share-card-meta">📅 {dateLabel} ｜ 🕒 {timeRangeLabel(e)}</div>
              {e.description && <div className="share-card-desc">{e.description}</div>}
              {e.images && e.images.length > 0 && (
                <div className="share-card-imgs">
                  {e.images.map((src, i) => (
                    <img key={i} src={src} alt="事件图片" loading="lazy" />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="share-foot">
        本页面由「智能日历」生成 · 数据保存在日历的云端，链接可分享给任何人查看
      </div>
    </div>
  );
}
