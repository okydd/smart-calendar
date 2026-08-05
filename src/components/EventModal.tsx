import { useEffect, useRef, useState } from 'react';
import { Input, App, Modal } from 'antd';
import { DeleteOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useCalendar } from '../context/CalendarContext';
import { useUI } from '../context/UIContext';
import { IMPORTANT_COLOR, PRESET_REMINDERS } from '../constants';
import type { CalendarEvent, ReminderOffset } from '../types';
import WheelPicker, { WheelColumn } from './WheelPicker';

const { TextArea } = Input;
const MAX_IMAGES = 10;

const YEARS = Array.from({ length: 16 }, (_, i) => 2020 + i);
const HOURS = Array.from({ length: 24 }, (_, i) => ({ label: `${i}时`, value: i }));
const MINUTES = Array.from({ length: 60 }, (_, i) => ({
  label: `${String(i).padStart(2, '0')}分`,
  value: i
}));

function daysInMonth(y: number, m: number): number {
  return new Date(y, m, 0).getDate();
}
function dateColumns(y: number, m: number): WheelColumn[] {
  const d = daysInMonth(y, m);
  return [
    { values: YEARS.map((y) => ({ label: `${y}年`, value: y })) },
    { values: Array.from({ length: 12 }, (_, i) => ({ label: `${i + 1}月`, value: i + 1 })) },
    { values: Array.from({ length: d }, (_, i) => ({ label: `${i + 1}日`, value: i + 1 })) }
  ];
}
const timeColumns = (): WheelColumn[] => [{ values: HOURS }, { values: MINUTES }];

interface InitialEvent {
  id?: string;
  title?: string;
  date?: string;
  allDay?: boolean;
  startTime?: string;
  description?: string;
  important?: boolean;
  images?: string[];
  reminder?: CalendarEvent['reminder'];
}

type PresetReminder = (typeof PRESET_REMINDERS)[number];

export default function EventModal() {
  const { eventModal, closeEventModal } = useUI();
  const { addEvent, updateEvent, deleteEvent } = useCalendar();
  const { message } = App.useApp();
  const [images, setImages] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const { open, mode, initial } = eventModal;
  const base = (initial ?? {}) as InitialEvent;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [importance, setImportance] = useState<'normal' | 'important'>('normal');
  const [allDay, setAllDay] = useState(true);
  const [dateValues, setDateValues] = useState<[number, number, number]>([2026, 8, 5]);
  const [timeValues, setTimeValues] = useState<[number, number]>([9, 0]);
  const [remindOffsets, setRemindOffsets] = useState<ReminderOffset[]>([]);
  const [customValue, setCustomValue] = useState(1);
  const [customUnit, setCustomUnit] = useState<'day' | 'hour' | 'minute'>('day');

  useEffect(() => {
    if (!open) return;
    setTitle(base.title ?? '');
    setDescription(base.description ?? '');
    setImportance(base.important ? 'important' : 'normal');
    setImages(Array.isArray(base.images) ? base.images.slice(0, MAX_IMAGES) : []);
    const d = base.date ? dayjs(base.date, 'YYYY-MM-DD') : dayjs();
    setDateValues([d.year(), d.month() + 1, d.date()]);
    const ad = !base.startTime;
    setAllDay(ad);
    if (!ad && base.startTime) {
      const [h, m] = base.startTime.split(':').map(Number);
      setTimeValues([h, m]);
    } else setTimeValues([9, 0]);
    setRemindOffsets(
      base.reminder && base.reminder.length ? base.reminder.map((r) => ({ ...r })) : []
    );
    setCustomValue(1);
    setCustomUnit('day');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initial]);

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (!files.length) return;
    const room = MAX_IMAGES - images.length;
    const slice = files.slice(0, room);
    Promise.all(
      slice.map(
        (f) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.readAsDataURL(f);
          })
      )
    ).then((dataUrls) => setImages((prev) => [...prev, ...dataUrls].slice(0, MAX_IMAGES)));
  };
  const removeImg = (i: number) => setImages((prev) => prev.filter((_, idx) => idx !== i));

  const onDateChange = (vals: number[]) => {
    let [y, m, day] = vals as [number, number, number];
    const max = daysInMonth(y, m);
    if (day > max) day = max;
    setDateValues([y, m, day]);
  };

  const isActive = (p: PresetReminder) =>
    remindOffsets.some((o) => o.unit === p.unit && o.value === p.value);
  const togglePreset = (p: PresetReminder) => {
    if (isActive(p))
      setRemindOffsets(remindOffsets.filter((o) => !(o.unit === p.unit && o.value === p.value)));
    else setRemindOffsets([...remindOffsets, { unit: p.unit, value: p.value }]);
  };
  const addCustom = () => {
    if (customValue <= 0) return;
    const off: ReminderOffset = { unit: customUnit, value: customValue };
    if (!remindOffsets.some((o) => o.unit === off.unit && o.value === off.value))
      setRemindOffsets([...remindOffsets, off]);
  };
  const removeOffset = (o: ReminderOffset) =>
    setRemindOffsets(remindOffsets.filter((x) => !(x.unit === o.unit && x.value === o.value)));

  const handleOk = () => {
    if (!title.trim()) {
      message.warning('请输入事件标题');
      return;
    }
    const [y, m, day] = dateValues;
    const date = dayjs(`${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
    const payload: Omit<CalendarEvent, 'id'> = {
      title: title.trim(),
      date: date.format('YYYY-MM-DD'),
      allDay,
      startTime: allDay
        ? ''
        : `${String(timeValues[0]).padStart(2, '0')}:${String(timeValues[1]).padStart(2, '0')}`,
      endTime: '',
      description: description.trim(),
      tag: 'purple',
      important: importance === 'important',
      images,
      reminder: remindOffsets
    };
    if (mode === 'edit' && base.id) updateEvent(base.id, payload);
    else addEvent(payload);
    closeEventModal();
  };

  /** 删除需二次确认 */
  const handleDelete = () => {
    if (!(mode === 'edit' && base.id)) return;
    Modal.confirm({
      title: '确认删除该事件？',
      content: `「${base.title ?? title}」删除后将从所有设备移除，确定删除吗？`,
      okText: '删除',
      okButtonProps: { danger: true },
      cancelText: '取消',
      onOk: () => {
        deleteEvent(base.id as string);
        closeEventModal();
      }
    });
  };

  if (!open) return null;

  return (
    <div className="ev-overlay" onClick={closeEventModal}>
      <div className="ev-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ev-head">
          <span className="ev-title">{mode === 'edit' ? '编辑事件' : '新建事件'}</span>
          <button className="ev-close" onClick={closeEventModal} aria-label="关闭">
            <CloseOutlined />
          </button>
        </div>

        <div className="ev-body">
          <div className="ev-field">
            <label className="ev-label">事件标题</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例如：团队周会"
              maxLength={50}
            />
          </div>

          <div className="ev-field">
            <label className="ev-label">日期</label>
            <WheelPicker
              columns={dateColumns(dateValues[0], dateValues[1])}
              selected={dateValues}
              onChange={onDateChange}
            />
          </div>

          <div className="ev-field">
            <div className="remind-head-row">
              <label className="ev-label" style={{ marginBottom: 0 }}>
                时间
              </label>
              <button
                type="button"
                className={`switch-mini${allDay ? ' on' : ''}`}
                onClick={() => setAllDay((v) => !v)}
                aria-label="全天"
              >
                <span className="knob" />
              </button>
              <span className="ev-all-day-tip">{allDay ? '全天' : '指定时间'}</span>
            </div>
            {!allDay && (
              <WheelPicker
                columns={timeColumns()}
                selected={timeValues}
                onChange={(v) => setTimeValues(v as [number, number])}
              />
            )}
          </div>

          <div className="imp-block">
            <div className="imp-label">事件级别</div>
            <div className="imp-btns">
              <button
                type="button"
                className={`imp-btn${importance === 'normal' ? ' active' : ''}`}
                onClick={() => setImportance('normal')}
              >
                普通事件
              </button>
              <button
                type="button"
                className={`imp-btn danger${importance === 'important' ? ' active' : ''}`}
                onClick={() => setImportance('important')}
                style={
                  importance === 'important'
                    ? { borderColor: IMPORTANT_COLOR, color: '#fff', background: IMPORTANT_COLOR }
                    : undefined
                }
              >
                重要事件
              </button>
            </div>
          </div>

          <div className="remind-block">
            <div className="imp-label">提前提醒（可多选，通过微信推送）</div>
            <div className="remind-presets">
              {PRESET_REMINDERS.map((p) => (
                <button
                  key={`${p.unit}-${p.value}`}
                  type="button"
                  className={`tag-chip-select${isActive(p) ? ' active' : ''}`}
                  onClick={() => togglePreset(p)}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div className="remind-custom">
              <span>自定义：提前</span>
              <input
                type="number"
                min={1}
                max={365}
                value={customValue}
                onChange={(e) => setCustomValue(Math.max(1, Number(e.target.value) || 1))}
                className="remind-num"
              />
              <div className="remind-unit">
                <button
                  type="button"
                  className={`ru-btn${customUnit === 'day' ? ' active' : ''}`}
                  onClick={() => setCustomUnit('day')}
                >
                  天
                </button>
                <button
                  type="button"
                  className={`ru-btn${customUnit === 'hour' ? ' active' : ''}`}
                  onClick={() => setCustomUnit('hour')}
                >
                  小时
                </button>
                <button
                  type="button"
                  className={`ru-btn${customUnit === 'minute' ? ' active' : ''}`}
                  onClick={() => setCustomUnit('minute')}
                >
                  分钟
                </button>
              </div>
              <button type="button" className="remind-add" onClick={addCustom}>
                添加
              </button>
            </div>
            {remindOffsets.length > 0 && (
              <div className="remind-selected">
                {remindOffsets.map((o, i) => (
                  <span key={i} className="remind-chip" onClick={() => removeOffset(o)}>
                    提前 {o.value} {o.unit === 'day' ? '天' : o.unit === 'hour' ? '小时' : '分钟'}{' '}
                    <span className="x">×</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="ev-field">
            <label className="ev-label">描述</label>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="补充说明（可选，最多 200 字）"
              maxLength={200}
              showCount
            />
          </div>

          <div className="img-upload-block">
            <div className="img-upload-head">
              <span>图片（最多 {MAX_IMAGES} 张）</span>
              <span className="img-count">
                {images.length}/{MAX_IMAGES}
              </span>
            </div>
            <div className="img-thumbs">
              {images.map((src, i) => (
                <div className="img-thumb" key={i}>
                  <img src={src} alt="" />
                  <button
                    type="button"
                    className="img-del"
                    onClick={() => removeImg(i)}
                    aria-label="删除图片"
                  >
                    ×
                  </button>
                </div>
              ))}
              {images.length < MAX_IMAGES && (
                <button
                  type="button"
                  className="img-add"
                  onClick={() => fileRef.current?.click()}
                  aria-label="添加图片"
                >
                  <PlusOutlined />
                </button>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleImgChange}
            />
          </div>
        </div>

        <div className="ev-foot">
          {mode === 'edit' && (
            <button className="ev-del" onClick={handleDelete}>
              <DeleteOutlined /> 删除
            </button>
          )}
          <button className="ev-cancel" onClick={closeEventModal}>
            取消
          </button>
          <button className="ev-save" onClick={handleOk}>
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
