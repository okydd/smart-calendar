import { useEffect, useMemo, useState } from 'react';
import { Modal, message } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  DownOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useCalendar } from '../context/CalendarContext';
import { dayjs, weekdayCN } from '../utils/date';
import type { CalendarEvent } from '../types';

interface DateNode {
  dateKey: string;
  dateLabel: string;
  items: CalendarEvent[];
}
interface MonthNode {
  monthKey: string;
  monthLabel: string;
  dates: DateNode[];
}

function fmtDate(dateStr: string): string {
  const d = dayjs(dateStr);
  if (!d.isValid()) return dateStr || '未设置';
  return `${d.month() + 1}月${d.date()}日 ${weekdayCN(d)}`;
}

/**
 * 思考题页（独立新类型，不进日历/提醒）：
 * 左侧日期目录结构（按月 → 日两级可折叠，点题目选中），右侧显示题目详情，
 * 提供 增加 / 修改 / 删除 / 状态标注（思考完毕） 功能。
 */
export default function QuestionsPage() {
  const { allEvents, addEvent, updateEvent, deleteEvent, toggleDone } = useCalendar();

  const questions = useMemo(
    () => allEvents.filter((e) => e.kind === 'question' && !e.deleted),
    [allEvents]
  );

  // 按月 → 日 两级目录，按日期倒序（近的在前）
  const groups = useMemo<MonthNode[]>(() => {
    const byDate = new Map<string, CalendarEvent[]>();
    for (const q of questions) {
      const key = q.date || '0000-00-00';
      if (!byDate.has(key)) byDate.set(key, []);
      byDate.get(key)!.push(q);
    }
    const dateKeys = [...byDate.keys()].sort((a, b) => b.localeCompare(a));
    const monthMap = new Map<string, MonthNode>();
    for (const dk of dateKeys) {
      const [y, m] = dk.split('-');
      const monthKey = `${y}-${m}`;
      if (!monthMap.has(monthKey)) {
        monthMap.set(monthKey, { monthKey, monthLabel: `${y}年${Number(m)}月`, dates: [] });
      }
      const d = dayjs(dk);
      monthMap.get(monthKey)!.dates.push({
        dateKey: dk,
        dateLabel: d.isValid() ? `${d.month() + 1}月${d.date()}日 ${weekdayCN(d)}` : dk,
        items: byDate.get(dk)!.sort((a, b) => a.title.localeCompare(b.title))
      });
    }
    return [...monthMap.values()].sort((a, b) => b.monthKey.localeCompare(a.monthKey));
  }, [questions]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expMonths, setExpMonths] = useState<Set<string>>(new Set());
  const [expDates, setExpDates] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState<null | { mode: 'create' | 'edit'; q: Partial<CalendarEvent> }>(
    null
  );

  // 默认展开最新月份，避免目录全收起
  useEffect(() => {
    if (groups.length && expMonths.size === 0) setExpMonths(new Set([groups[0].monthKey]));
  }, [groups]); // eslint-disable-line react-hooks/exhaustive-deps

  const selected = questions.find((q) => q.id === selectedId) || null;

  const toggleMonth = (k: string) =>
    setExpMonths((prev) => {
      const n = new Set(prev);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });
  const toggleDate = (k: string) =>
    setExpDates((prev) => {
      const n = new Set(prev);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });
  const selectQ = (q: CalendarEvent) => {
    setSelectedId(q.id);
    setExpMonths((prev) => new Set(prev).add(q.date.slice(0, 7)));
    setExpDates((prev) => new Set(prev).add(q.date));
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
        if (selectedId === q.id) setSelectedId(null);
      }
    });
  };

  const onToggle = (q: CalendarEvent) => toggleDone(q.id);

  return (
    <div className="page questions-page">
      {/* 左侧：日期目录结构 */}
      <div className="q-tree">
        <div className="q-tree-head">
          <span className="q-tree-title">思考题</span>
          <button className="q-add-btn" onClick={openCreate}>
            <PlusOutlined /> 增加
          </button>
        </div>
        <div className="q-tree-scroll">
          {groups.length === 0 ? (
            <div className="q-empty">暂无思考题，点击「增加」新建</div>
          ) : (
            groups.map((month) => (
              <div className="q-month" key={month.monthKey}>
                <div className="q-month-head" onClick={() => toggleMonth(month.monthKey)}>
                  <DownOutlined className={expMonths.has(month.monthKey) ? '' : 'flip'} />
                  <span className="q-month-label">{month.monthLabel}</span>
                  <span className="q-count">
                    {month.dates.reduce((s, d) => s + d.items.length, 0)}
                  </span>
                </div>
                {expMonths.has(month.monthKey) &&
                  month.dates.map((d) => (
                    <div className="q-date" key={d.dateKey}>
                      <div className="q-date-head" onClick={() => toggleDate(d.dateKey)}>
                        <DownOutlined className={expDates.has(d.dateKey) ? '' : 'flip'} />
                        <span className="q-date-label">{d.dateLabel}</span>
                        <span className="q-count">{d.items.length}</span>
                      </div>
                      {expDates.has(d.dateKey) &&
                        d.items.map((q) => (
                          <div
                            className={`q-item${q.id === selectedId ? ' active' : ''}${
                              q.done ? ' done' : ''
                            }`}
                            key={q.id}
                            onClick={() => selectQ(q)}
                          >
                            <span className="q-item-title">{q.title}</span>
                            {q.done && <CheckOutlined className="q-done-ico" />}
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            ))
          )}
        </div>
      </div>

      {/* 右侧：题目详情 */}
      <div className="q-detail">
        {selected ? (
          <>
            <div className="q-detail-head">
              <span className="q-detail-title">{selected.title}</span>
              <span className={`q-status${selected.done ? ' done' : ''}`}>
                {selected.done ? '已思考完毕' : '思考中'}
              </span>
            </div>
            <div className="q-detail-meta">议题日期：{fmtDate(selected.date)}</div>
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
          </>
        ) : (
          <div className="q-detail-empty">
            <ClockCircleOutlined className="q-empty-ico" />
            <p>选择左侧题目查看详情</p>
            <p className="sub">或点击左上「增加」新建思考题</p>
          </div>
        )}
      </div>

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
