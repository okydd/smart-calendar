import { useEffect, useMemo, useRef, useState } from 'react';
import { Modal, message } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { useCalendar } from '../context/CalendarContext';
import { dayjs, weekdayCN } from '../utils/date';
import type { CalendarEvent } from '../types';

function fmtDate(dateStr: string): string {
  const d = dayjs(dateStr);
  if (!d.isValid()) return dateStr || '未设置';
  return `${d.month() + 1}月${d.date()}日 ${weekdayCN(d)}`;
}

/**
 * 思考题页（独立新类型，不进日历/提醒）：
 * 方案B —— 左侧平铺日期锚点（点日期滚动定位），顶部「按日期 + 按关键词」双搜索，
 * 右侧所有思考题连续平铺，列表项不显示操作按钮；点卡片弹出详情，详情里才有
 * 标注完毕 / 修改 / 删除。完成状态用卡片右上角绿色小方块表示（仅已完成时显示）。
 */
export default function QuestionsPage() {
  const { allEvents, addEvent, updateEvent, deleteEvent, toggleDone } = useCalendar();

  const questions = useMemo(
    () => allEvents.filter((e) => e.kind === 'question' && !e.deleted),
    [allEvents]
  );

  // 顶部双搜索
  const [searchDate, setSearchDate] = useState(''); // YYYY-MM-DD
  const [keyword, setKeyword] = useState('');

  // 左侧日期锚点（取所有题目的日期，倒序，近的在前）
  const dateKeys = useMemo(() => {
    const set = new Set<string>();
    for (const q of questions) if (q.date) set.add(q.date);
    return [...set].sort((a, b) => b.localeCompare(a));
  }, [questions]);

  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [editing, setEditing] = useState<null | { mode: 'create' | 'edit'; q: Partial<CalendarEvent> }>(
    null
  );

  const listRef = useRef<HTMLDivElement>(null);
  const dateRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filtered = useMemo(() => {
    const kw = keyword.trim();
    return questions
      .filter((q) => !searchDate || (q.date || '').startsWith(searchDate))
      .filter(
        (q) =>
          !kw ||
          q.title.toLowerCase().includes(kw.toLowerCase()) ||
          (q.description || '').toLowerCase().includes(kw.toLowerCase())
      )
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }, [questions, searchDate, keyword]);

  const selected = questions.find((q) => q.id === detailId) || null;

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

      {/* 右侧：搜索 + 连续列表 */}
      <div className="q-main">
        <div className="q-main-head">
          <button className="q-add-btn" onClick={openCreate}>
            <PlusOutlined /> 增加
          </button>
        </div>

        <div className="q-search">
          <input
            type="date"
            className="q-search-date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            placeholder="按日期"
          />
          <input
            className="q-search-kw"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="按关键词搜索"
          />
          {(searchDate || keyword) && (
            <button
              className="q-search-clear"
              onClick={() => {
                setSearchDate('');
                setKeyword('');
              }}
            >
              清除
            </button>
          )}
        </div>

        <div className="q-list" ref={listRef}>
          {filtered.length === 0 ? (
            <div className="q-list-empty">
              <FileTextOutlined className="q-empty-ico" />
              <p>{questions.length === 0 ? '暂无思考题，点击「增加」新建' : '没有匹配的思考题'}</p>
            </div>
          ) : (
            filtered.map((q) => (
              <div
                key={q.id}
                ref={(el) => {
                  dateRefs.current[q.date] = el;
                }}
                className="q-card"
                onClick={() => setDetailId(q.id)}
              >
                <div className="q-card-top">
                  <span className="q-card-date">{fmtDate(q.date)}</span>
                  {q.done && <span className="q-dot done" />}
                </div>
                <div className="q-card-title">{q.title}</div>
                {q.description && <div className="q-card-desc">{q.description}</div>}
              </div>
            ))
          )}
        </div>
      </div>

      {/* 详情弹层：操作按钮在此出现 */}
      <Modal
        open={!!selected}
        title="思考题详情"
        onCancel={() => setDetailId(null)}
        footer={null}
        destroyOnClose
      >
        {selected && (
          <div className="q-detail">
            <div className="q-detail-meta">议题日期：{fmtDate(selected.date)}</div>
            <div className="q-detail-title">{selected.title}</div>
            <div className="q-detail-body">{selected.description || '（无内容）'}</div>
            <div className="q-actions">
              <button className="q-btn" onClick={() => onToggle(selected)}>
                <CheckOutlined /> {selected.done ? '取消标注' : '标注完毕'}
              </button>
              <button className="q-btn" onClick={() => openEdit(selected)}>
                <EditOutlined /> 修改
              </button>
              <button className="q-btn danger" onClick={() => onDelete(selected)}>
                <DeleteOutlined /> 删除
              </button>
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
