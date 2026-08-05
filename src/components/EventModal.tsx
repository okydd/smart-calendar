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

/**
 * 把图片压缩到合适尺寸并转 dataURL，显著减小 localStorage / 云同步体积。
 * 这是「手机端不丢图」的关键之一：原图动辄数百 KB～数 MB，极易撑爆移动端
 * 约 5MB 的 localStorage 配额导致保存静默失败；压缩后单张通常 < 150KB。
 */
function compressImage(file: File, maxDim = 1280, quality = 0.72): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onerror = () => resolve('');
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => resolve('');
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const scale = Math.min(maxDim / width, maxDim / height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve('');
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const isPng = (file.type || '').toLowerCase() === 'image/png';
        try {
          resolve(canvas.toDataURL(isPng ? 'image/png' : 'image/jpeg', quality));
        } catch {
          resolve('');
        }
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

const YEARS = Array.from({ length: 16 }, (_, i) => 2020 + i);
const HOURS = Array.from({ length: 24 }, (_, i) => ({ label: `${i}时`, value: i }));
const MINUTES = Array.from({ length: 12 }, (_, i) => {
  const v = i * 5;
  return { label: `${String(v).padStart(2, '0')}分`, value: v };
});

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

  /** 日期/时间滚轮弹窗的临时草稿值 */
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [draftDateValues, setDraftDateValues] = useState<[number, number, number]>(dateValues);
  const [draftTimeValues, setDraftTimeValues] = useState<[number, number]>(timeValues);
  const [draftAllDay, setDraftAllDay] = useState(allDay);

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
      // 分钟对齐到 5 的倍数（滚轮仅支持 5 分钟间隔）
      setTimeValues([h, Math.min(55, Math.max(0, Math.round(m / 5) * 5))]);
    } else setTimeValues([9, 0]);
    setRemindOffsets(
      base.reminder && base.reminder.length ? base.reminder.map((r) => ({ ...r })) : []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initial]);

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (!files.length) return;
    const room = MAX_IMAGES - images.length;
    if (files.length > room) {
      message.warning(`最多添加 ${MAX_IMAGES} 张图片，已为您保留前 ${room} 张`);
    }
    const slice = files.slice(0, Math.max(0, room));
    if (slice.length === 0) return;
    Promise.all(slice.map((f) => compressImage(f)))
      .then((dataUrls) =>
        setImages((prev) => [...prev, ...dataUrls.filter(Boolean)].slice(0, MAX_IMAGES))
      );
  };
  const removeImg = (i: number) => setImages((prev) => prev.filter((_, idx) => idx !== i));

  const onDateChange = (vals: number[]) => {
    let [y, m, day] = vals as [number, number, number];
    const max = daysInMonth(y, m);
    if (day > max) day = max;
    setDateValues([y, m, day]);
  };

  const onDraftDateChange = (vals: number[]) => {
    let [y, m, day] = vals as [number, number, number];
    const max = daysInMonth(y, m);
    if (day > max) day = max;
    setDraftDateValues([y, m, day]);
  };

  const resetDraftToToday = () => {
    const now = dayjs();
    setDraftDateValues([now.year(), now.month() + 1, now.date()]);
  };

  const isActive = (p: PresetReminder) =>
    remindOffsets.some((o) => o.unit === p.unit && o.value === p.value);
  const togglePreset = (p: PresetReminder) => {
    if (isActive(p))
      setRemindOffsets(remindOffsets.filter((o) => !(o.unit === p.unit && o.value === p.value)));
    else setRemindOffsets([...remindOffsets, { unit: p.unit, value: p.value }]);
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
              maxLength={20}
            />
          </div>

          <div className="ev-field">
            <label className="ev-label">日期与时间</label>
            <div className="ev-datetime-row">
              <button
                type="button"
                className="ev-datetime-card"
                onClick={() => {
                  setDraftDateValues(dateValues);
                  setDatePickerOpen(true);
                }}
              >
                <span className="ev-dt-label">日期</span>
                <span className="ev-dt-value">
                  {`${dateValues[0]}/${String(dateValues[1]).padStart(2, '0')}/${String(dateValues[2]).padStart(2, '0')}`}
                </span>
              </button>
              <button
                type="button"
                className={`ev-datetime-card${allDay ? ' muted' : ''}`}
                onClick={() => {
                  const m = Math.min(55, Math.max(0, Math.round(timeValues[1] / 5) * 5));
                  setDraftTimeValues([timeValues[0], m]);
                  setDraftAllDay(allDay);
                  setTimePickerOpen(true);
                }}
              >
                <span className="ev-dt-label">时间</span>
                <span className="ev-dt-value">
                  {allDay ? '不选' : `${String(timeValues[0]).padStart(2, '0')}:${String(timeValues[1]).padStart(2, '0')}`}
                </span>
              </button>
            </div>
          </div>

          <div className="imp-block">
            <div className="imp-label ev-section-title">事件级别</div>
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
            <div className="imp-label ev-section-title">消息通知</div>
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
          </div>

          <div className="ev-field">
            <label className="ev-label ev-section-title">描述</label>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoSize={{ minRows: 1, maxRows: 10 }}
              placeholder="补充说明（可选，最多 200 字）"
              maxLength={200}
            />
          </div>

          <div className="img-upload-block">
            <div className="img-upload-head">
              <span className="ev-section-title">图片（最多 {MAX_IMAGES} 张）</span>
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

      {/* 日期选择弹窗（居中） */}
      {datePickerOpen && (
        <div
          className="ev-picker-overlay"
          onClick={(e) => {
            e.stopPropagation();
            setDatePickerOpen(false);
          }}
        >
          <div className="ev-picker-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ev-picker-body">
              <WheelPicker
                columns={dateColumns(draftDateValues[0], draftDateValues[1])}
                selected={draftDateValues}
                onChange={onDraftDateChange}
              />
            </div>
            <div className="ev-picker-foot three">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setDatePickerOpen(false);
                }}
              >
                取消
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  resetDraftToToday();
                }}
              >
                清除
              </button>
              <button
                type="button"
                className="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  setDateValues(draftDateValues);
                  setDatePickerOpen(false);
                }}
              >
                设置
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 时间选择弹窗（底部抽屉） */}
      {timePickerOpen && (
        <div
          className="ev-picker-overlay ev-time-overlay"
          onClick={(e) => {
            e.stopPropagation();
            setTimePickerOpen(false);
          }}
        >
          <div className="ev-time-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="ev-time-head">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setTimePickerOpen(false);
                }}
              >
                取消
              </button>
              <span className="ev-time-title">选择时间</span>
              <button
                type="button"
                className="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  setTimeValues(draftTimeValues);
                  setAllDay(draftAllDay);
                  setTimePickerOpen(false);
                }}
              >
                确定
              </button>
            </div>
            <div className="ev-time-tabs">
              <button
                type="button"
                className={draftAllDay ? 'active' : ''}
                onClick={(e) => {
                  e.stopPropagation();
                  setDraftAllDay(true);
                }}
              >
                不选择时间
              </button>
              <button
                type="button"
                className={!draftAllDay ? 'active' : ''}
                onClick={(e) => {
                  e.stopPropagation();
                  setDraftAllDay(false);
                }}
              >
                选择时间
              </button>
            </div>
            <div className={`ev-time-wheels${draftAllDay ? ' disabled' : ''}`}>
              <WheelPicker
                columns={timeColumns()}
                selected={draftTimeValues}
                onChange={(v) => {
                  setDraftAllDay(false);
                  setDraftTimeValues(v as [number, number]);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
