import { useEffect, useMemo, useRef, useState } from 'react';
import { Modal, message } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
  DownOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { useCalendar } from '../context/CalendarContext';
import { dayjs, weekdayCN } from '../utils/date';
import type { CalendarEvent } from '../types';
import Fab from '../components/Fab';

function fmtDate(dateStr: string): string {
  const d = dayjs(dateStr);
  if (!d.isValid()) return dateStr || '未设置';
  return `${d.month() + 1}月${d.date()}日`;
}

/**
 * 思考题页（独立新类型，不进日历/提醒）：
 * 左侧平铺日期锚点（点日期滚动定位），所有思考题按日期倒序连续平铺，列表项不显示操作按钮；
 * 点卡片弹出详情，详情里才有 标注完毕 / 修改 / 删除。搜索统一收到「设置」页，本页不再提供搜索。
 * 完成状态用卡片淡绿色边框表示（仅已完成时显示）。新建用右下角可拖动的绿色 FAB。
 */
export default function QuestionsPage() {
  const {
    allEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    toggleDone,
    focusQuestionId,
    setFocusQuestionId
  } = useCalendar();

  const questions = useMemo(
    () => allEvents.filter((e) => e.kind === 'question' && !e.deleted),
    [allEvents]
  );

  // 左侧日期锚点（取所有题目的日期，倒序，近的在前）
  const dateKeys = useMemo(() => {
    const set = new Set<string>();
    for (const q of questions) if (q.date) set.add(q.date);
    return [...set].sort((a, b) => b.localeCompare(a));
  }, [questions]);

  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [noteOpen, setNoteOpen] = useState(false);
  const [editing, setEditing] = useState<null | { mode: 'create' | 'edit'; q: Partial<CalendarEvent> }>(
    null
  );

  const listRef = useRef<HTMLDivElement>(null);
  const dateRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // 按日期倒序展示
  const sorted = useMemo(
    () => [...questions].sort((a, b) => (b.date || '').localeCompare(a.date || '')),
    [questions]
  );

  const selected = questions.find((q) => q.id === detailId) || null;

  // 设置页搜索思考题后跳转而来：自动打开对应详情并消费意图
  useEffect(() => {
    if (focusQuestionId) {
      setDetailId(focusQuestionId);
      setNoteOpen(false);
      setFocusQuestionId(null);
    }
  }, [focusQuestionId, setFocusQuestionId]);

  // 打开新详情时，备注默认收起
  useEffect(() => {
    setNoteOpen(false);
  }, [detailId]);

  // 默认高亮最新日期
  useEffect(() => {
    if (dateKeys.length && !activeDate) setActiveDate(dateKeys[0]);
  }, [dateKeys]); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToDate = (dk: string) => {
    setActiveDate(dk);
    const el = dateRefs.current[dk];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openCreate = () =>
    setEditing({
      mode: 'create',
      q: { date: dayjs().format('YYYY-MM-DD'), title: '', description: '', done: false }
    });
  const openEdit = (q: CalendarEvent) => setEditing({ mode: 'edit', q: { ...q } });

  const saveModal = () => {
    if (!editing) return;
    const q = editing.q;
    if (!q.title?.trim()) {
      message.warning('请填写题目');
      return;
    }
    const base = {
      title: q.title.trim(),
      date: q.date || dayjs().format('YYYY-MM-DD'),
      startTime: '',
      endTime: '',
      allDay: true,
      description: q.description || '',
      tag: 'blue' as const,
      kind: 'question' as const,
      done: !!q.done
    };
    if (editing.mode === 'create') {
      addEvent(base);
    } else if (q.id) {
      updateEvent(q.id, base);
    }
    setEditing(null);
  };

  const onDelete = (q: CalendarEvent) => {
    Modal.confirm({
      title: '删除该思考题？',
      content: q.title,
      okText: '删除',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk: () => {
        deleteEvent(q.id);
        if (detailId === q.id) setDetailId(null);
      }
    });
  };

  const onToggle = (q: CalendarEvent) => toggleDone(q.id);

  return (
    <div className="page questions-page">
      {/* 左侧：平铺日期锚点 */}
      <div className="q-dates">
        {dateKeys.length === 0 ? (
          <div className="q-dates-empty">暂无</div>
        ) : (
          dateKeys.map((dk) => {
            const d = dayjs(dk);
            const isActive = dk === activeDate;
            return (
              <button
                key={dk}
                className={`q-date-chip${isActive ? ' active' : ''}`}
                onClick={() => scrollToDate(dk)}
              >
                <span className="q-day">{d.isValid() ? d.date() : '?'}</span>
                <span className="q-wk">{d.isValid() ? weekdayCN(d) : ''}</span>
              </button>
            );
          })
        )}
      </div>

      {/* 右侧：连续列表（搜索已集中到「设置」） */}
      <div className="q-main">
        <div className="q-list" ref={listRef}>
          {sorted.length === 0 ? (
            <div className="q-list-empty">
              <FileTextOutlined className="q-empty-ico" />
              <p>暂无思考题，点击右下角「+」新建</p>
            </div>
          ) : (
            sorted.map((q) => (
              <div
                key={q.id}
                ref={(el) => {
                  dateRefs.current[q.date] = el;
                }}
                className={`q-card${q.done ? ' done' : ''}`}
                onClick={() => setDetailId(q.id)}
              >
                <div className="q-card-top">
                  <span className="q-card-date">{fmtDate(q.date)}</span>
                  {q.done && <span className="q-card-done-tag">已完成</span>}
                </div>
                <div className="q-card-title">{q.title}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 右下角可拖动的绿色新建 FAB */}
      <Fab color="green" onClick={openCreate} />

      {/* 详情弹层：操作按钮在此出现 */}
      <Modal
        open={!!selected}
        title={null}
        onCancel={() => setDetailId(null)}
        footer={null}
        destroyOnClose
        centered
        className="q-detail-modal"
      >
        {selected && (
          <div className="q-detail">
            <div className="q-detail-title">{selected.title}</div>
            <div className="q-detail-meta">
              <CalendarOutlined /> {fmtDate(selected.date)}
            </div>

            {selected.description && (
              <div className="q-detail-note">
                <button
                  type="button"
                  className="q-note-toggle"
                  onClick={() => setNoteOpen((v) => !v)}
                >
                  <span className="q-note-label">备注</span>
                  <span className="q-note-caret">
                    {noteOpen ? '收起' : '展开'}
                    <DownOutlined className={`q-caret-ico${noteOpen ? ' up' : ''}`} />
                  </span>
                </button>
                {noteOpen && (
                  <div className="q-detail-note-body">{selected.description}</div>
                )}
              </div>
            )}

            <div className="q-actions">
              <div className="q-row">
                <div className="q-status-block">
                  <div className="evv-toggle">
                    <button
                      type="button"
                      className={`opt${!selected.done ? ' active' : ''}`}
                      onClick={() => {
                        if (selected.done) onToggle(selected);
                      }}
                    >
                      未完成
                    </button>
                    <button
                      type="button"
                      className={`opt done${selected.done ? ' active' : ''}`}
                      onClick={() => {
                        if (!selected.done) onToggle(selected);
                      }}
                    >
                      已完成
                    </button>
                  </div>
                </div>
                <button className="q-btn edit" onClick={() => openEdit(selected)}>
                  <EditOutlined /> 编辑
                </button>
              </div>
              <div className="q-row">
                <button className="q-btn danger" onClick={() => onDelete(selected)}>
                  <DeleteOutlined /> 删除
                </button>
                <button className="q-btn cancel" onClick={() => setDetailId(null)}>
                  取消
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* 新建 / 修改 弹窗 */}
      <Modal
        open={!!editing}
        title={editing?.mode === 'edit' ? '修改思考题' : '新建思考题'}
        onCancel={() => setEditing(null)}
        onOk={saveModal}
        okText="保存"
        cancelText="取消"
        destroyOnClose
      >
        {editing && (
          <div className="q-form">
            <label>题目</label>
            <input
              className="q-input"
              value={editing.q?.title || ''}
              onChange={(e) =>
                setEditing({ ...editing, q: { ...editing.q!, title: e.target.value } })
              }
              placeholder="输入题目"
            />
            <label>议题日期</label>
            <input
              type="date"
              className="q-input"
              value={editing.q?.date || ''}
              onChange={(e) =>
                setEditing({ ...editing, q: { ...editing.q!, date: e.target.value } })
              }
            />
            <label>思考内容</label>
            <textarea
              className="q-input q-textarea"
              value={editing.q?.description || ''}
              onChange={(e) =>
                setEditing({ ...editing, q: { ...editing.q!, description: e.target.value } })
              }
              placeholder="记录你的思考……"
            />
            <label className="q-check">
              <input
                type="checkbox"
                checked={!!editing.q?.done}
                onChange={(e) =>
                  setEditing({ ...editing, q: { ...editing.q!, done: e.target.checked } })
                }
              />
              思考完毕
            </label>
          </div>
        )}
      </Modal>
    </div>
  );
}
