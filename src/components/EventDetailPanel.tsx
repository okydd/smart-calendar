import { Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, CalendarOutlined, ClockCircleOutlined, FileTextOutlined, FileImageOutlined } from '@ant-design/icons';
import { useCalendar } from '../context/CalendarContext';
import { useUI } from '../context/UIContext';
import { parseDateStr, weekdayCN, timeRangeLabel } from '../utils/date';
import ImageViewer from './ImageViewer';

export default function EventDetailPanel() {
  const { selectedEvent, deleteEvent } = useCalendar();
  const { openEdit } = useUI();

  if (!selectedEvent) {
    return (
      <div className="detail-empty">
        <div className="big">📌</div>
        <div>点击任意事件查看详情</div>
        <div style={{ fontSize: 12 }}>或在空白处点击以快速新建</div>
      </div>
    );
  }

  const e = selectedEvent;
  const d = parseDateStr(e.date);

  return (
    <div>
      <div className="detail-head">
        <h3>事件详情</h3>
      </div>

      <div className="detail-body">
        <div className="detail-row">
          <div className="detail-label">标题</div>
          <div className="detail-value" style={{ fontSize: 14, fontWeight: 700 }}>
            {e.title}
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-label">
            <CalendarOutlined /> 日期
          </div>
          <div className="detail-value">
            {d.format('YYYY年M月D日')} {weekdayCN(d)}
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-label">
            <ClockCircleOutlined /> 时间
          </div>
          <div className="detail-value">
            {e.allDay ? '全天' : timeRangeLabel(e)}
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-label">
            <FileTextOutlined /> 描述
          </div>
          <div className="detail-value">
            {e.description ? e.description : <span style={{ color: '#bbb' }}>无</span>}
          </div>
        </div>

        {e.images && e.images.length > 0 && (
          <div className="detail-row detail-row-imgs">
            <div className="detail-label">
              <FileImageOutlined /> 图片（{e.images.length}）
            </div>
            <ImageViewer images={e.images} gridClassName="detail-imgs" thumbClassName="detail-img" />
          </div>
        )}

        <div className="detail-actions">
          <Button
            type="primary"
            className="btn-gradient"
            icon={<EditOutlined />}
            onClick={() => openEdit(e)}
          >
            编辑
          </Button>
        <Popconfirm
          title="删除该事件？"
          description="此操作不可撤销"
          okText="删除"
          cancelText="取消"
          okButtonProps={{ className: 'btn-white-border danger-text' }}
          cancelButtonProps={{ className: 'btn-white-border' }}
          onConfirm={() => deleteEvent(e.id)}
        >
          <Button type="default" className="btn-white-border danger-text" icon={<DeleteOutlined />}>
            删除
          </Button>
        </Popconfirm>
        </div>
      </div>
    </div>
  );
}
