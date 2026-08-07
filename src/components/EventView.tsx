import { Modal } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import ImageViewer from './ImageViewer';
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
  const { deleteEvent, toggleDone, filteredEvents } = useCalendar();
  const e = eventView.event;
  if (!eventView.open || !e) return null;
  // 从实时数据取最新状态，保证「未完成/已完成」切换即时生效
  const live = filteredEvents.find((x) => x.id === e.id);
  const done = live ? live.done : e.done;

  const d = parseDateStr(e.date);
  const dateText = d.isValid() ? `${d.month() + 1}月${d.date()}日 ${weekdayCN(d)}` : e.date;
  const timeText = timeRangeLabel(e);
  const hasNote = !!(e.description && e.description.trim());
  const hasImg = !!(e.images && e.images.length > 0);

  const handleDelete = () => {
    Modal.confirm({
      title: '确认删除该事件？',
      content: `「${e.title}」删除后本地保留 90 天可恢复，确定删除吗？`,
      okText: '删除',
      okButtonProps: { danger: true },
      cancelText: '取消',
      centered: true,
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
          {/* 主卡片：标题 + 标签 + 日期/时间/提醒 */}
          <div className="evv-card evv-main">
            <div className="evv-title-row">
              <span className={`evv-title${done ? ' done' : ''}`}>{e.title}</span>
              {e.important && (
                <span className="imp-flag" style={{ background: '#ffe9e8', color: IMPORTANT_COLOR }}>
                  重要
                </span>
              )}
              {done && <span className="evv-done-tag">已完成</span>}
            </div>
            <div className="evv-meta2">
              <div className="evv-meta-item">
                <span className="evv-ico">📅</span>
                <span>{dateText}</span>
              </div>
              <div className="evv-meta-item">
                <span className="evv-ico">🕒</span>
                <span>{timeText}</span>
              </div>
            </div>
          </div>

          {/* 备注卡片 */}
          {hasNote && (
            <div className="evv-card">
              <div className="evv-card-label">备注</div>
              <div className="evv-desc">{e.description}</div>
            </div>
          )}

          {/* 图片卡片 */}
          {hasImg && (
            <div className="evv-card">
              <div className="evv-card-label">图片（{e.images!.length}）</div>
              <ImageViewer images={e.images!} />
            </div>
          )}

          {/* 完成状态：小切换，不占整行 */}
          <div className="evv-status-row">
            <span className="evv-status-label">完成状态</span>
            <div className="evv-toggle">
              <button
                type="button"
                className={`opt${!done ? ' active' : ''}`}
                onClick={() => {
                  if (done) toggleDone(e.id);
                }}
              >
                未完成
              </button>
              <button
                type="button"
                className={`opt done${done ? ' active' : ''}`}
                onClick={() => {
                  if (!done) toggleDone(e.id);
                }}
              >
                已完成
              </button>
            </div>
          </div>
        </div>

        <div className="ev-foot ev-foot-stack">
          <div className="ev-foot-row">
            <button
              className="ev-btn-new"
              onClick={() => {
                openCreate({ date: e.date });
                closeEventView();
              }}
            >
              新建
            </button>
            <button
              className="ev-btn-edit"
              onClick={() => {
                openEdit(e);
                closeEventView();
              }}
            >
              编辑
            </button>
          </div>
          <div className="ev-foot-row">
            <button className="ev-btn-gray" onClick={handleDelete}>
              删除
            </button>
            <button className="ev-btn-gray" onClick={closeEventView}>
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
