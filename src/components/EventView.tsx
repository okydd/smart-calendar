import { Modal } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { useUI } from '../context/UIContext';
import { useCalendar } from '../context/CalendarContext';
import { parseDateStr, weekdayCN, timeRangeLabel } from '../utils/date';
import { IMPORTANT_COLOR } from '../constants';
import type { CalendarEvent, ReminderOffset } from '../types';

const UNIT_CN: Record<ReminderOffset['unit'], string> = {
  day: '天',
  hour: '小时',
  minute: '分钟'
};

function reminderText(list?: ReminderOffset[]): string {
  if (!list || list.length === 0) return '不提醒';
  return list.map((r) => `提前 ${r.value} ${UNIT_CN[r.unit]}`).join('、');
}

export default function EventView() {
  const { eventView, openEdit, openCreate, closeEventView } = useUI();
  const { deleteEvent, toggleDone } = useCalendar();
  const e = eventView.event;
  if (!eventView.open || !e) return null;

  const d = parseDateStr(e.date);
  const dateText = d.isValid() ? `${d.month() + 1}月${d.date()}日 ${weekdayCN(d)}` : e.date;
  const timeText = timeRangeLabel(e);
  const hasExtra = !!(e.description || (e.images && e.images.length > 0));

  const handleDelete = () => {
    Modal.confirm({
      title: '确认删除该事件？',
      content: `「${e.title}」删除后本地保留 90 天可恢复，确定删除吗？`,
      okText: '删除',
      okButtonProps: { danger: true },
      cancelText: '取消',
      onOk: () => {
        deleteEvent(e.id);
        closeEventView();
      }
    });
  };

  return (
    <div className="ev-overlay" onClick={closeEventView}>
      <div className="ev-modal ev-view" onClick={(ev) => ev.stopPropagation()}>
        <div className="ev-head">
          <span className="ev-title">事件详情</span>
          <button className="ev-close" onClick={closeEventView} aria-label="关闭">
            <CloseOutlined />
          </button>
        </div>

        <div className="ev-body">
          <div className="evv-title-row">
            <span className={`evv-title${e.done ? ' done' : ''}`}>{e.title}</span>
            {e.important && (
              <span className="imp-flag" style={{ background: '#ffe9e8', color: IMPORTANT_COLOR }}>
                重要
              </span>
            )}
            {e.done && <span className="evv-done-tag">已完成</span>}
          </div>

          <div className="evv-meta">
            <div>
              <span className="evv-label">日期</span>
              {dateText}
            </div>
            <div>
              <span className="evv-label">时间</span>
              {timeText}
            </div>
            <div>
              <span className="evv-label">提醒</span>
              {reminderText(e.reminder)}
            </div>
          </div>

          {hasExtra && (
            <div className="evv-flags">
              {e.description ? <span className="evv-flag">📝 有备注</span> : null}
              {e.images && e.images.length > 0 ? (
                <span className="evv-flag">🖼 有图片 {e.images.length} 张</span>
              ) : null}
            </div>
          )}

          {e.description && (
            <div className="evv-block">
              <div className="evv-label">备注</div>
              <div className="evv-desc">{e.description}</div>
            </div>
          )}

          {e.images && e.images.length > 0 && (
            <div className="evv-block">
              <div className="evv-label">图片（{e.images.length}）</div>
              <div className="evv-imgs">
                {e.images.map((src, i) => (
                  <img key={i} src={src} alt="" className="evv-img" />
                ))}
              </div>
            </div>
          )}

          {!e.done && (
            <button className="evv-done-btn" onClick={() => toggleDone(e.id)}>
              <CheckOutlined /> 标记为已完成
            </button>
          )}
        </div>

        <div className="ev-foot">
          <button
            className="ev-cancel"
            onClick={() => {
              openCreate({ date: e.date });
              closeEventView();
            }}
          >
            新建
          </button>
          <button
            className="ev-cancel"
            onClick={() => {
              openEdit(e);
              closeEventView();
            }}
          >
            编辑
          </button>
          <button className="ev-del" onClick={handleDelete}>
            删除
          </button>
        </div>
      </div>
    </div>
  );
}
