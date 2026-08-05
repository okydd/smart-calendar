import { useEffect, useRef, useState } from 'react';
import { Form, Input, DatePicker, TimePicker, App } from 'antd';
import { DeleteOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useCalendar } from '../context/CalendarContext';
import { useUI } from '../context/UIContext';
import { IMPORTANT_COLOR } from '../constants';
import type { CalendarEvent } from '../types';

const { TextArea } = Input;
const MAX_IMAGES = 10;

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

export default function EventModal() {
  const { eventModal, closeEventModal } = useUI();
  const { addEvent, updateEvent, deleteEvent } = useCalendar();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [images, setImages] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const { open, mode, initial } = eventModal;
  const base = (initial ?? {}) as InitialEvent;

  const [importance, setImportance] = useState<'normal' | 'important'>('normal');
  const [remindOn, setRemindOn] = useState(false);
  const [remindValue, setRemindValue] = useState(1);
  const [remindUnit, setRemindUnit] = useState<'day' | 'hour'>('day');

  // 打开时填充表单
  useEffect(() => {
    if (!open) return;
    form.setFieldsValue({
      title: base.title ?? '',
      date: base.date ? dayjs(base.date, 'YYYY-MM-DD') : dayjs(),
      startTime: base.startTime ? dayjs(base.startTime, 'HH:mm') : undefined,
      description: base.description ?? ''
    });
    setImages(Array.isArray(base.images) ? base.images.slice(0, MAX_IMAGES) : []);
    setImportance(base.important ? 'important' : 'normal');
    if (base.reminder) {
      setRemindOn(true);
      setRemindValue(base.reminder.value);
      setRemindUnit(base.reminder.unit);
    } else {
      setRemindOn(false);
      setRemindValue(1);
      setRemindUnit('day');
    }
    // 仅依赖 open / initial
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initial]);

  const startTime = Form.useWatch('startTime', form);

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

  const handleOk = async () => {
    let v: any;
    try {
      v = await form.validateFields();
    } catch {
      message.warning('请填写完整信息');
      return;
    }
    // 时间留空 → 自动作为全天事件
    const allDay = !v.startTime;
    const payload: Omit<CalendarEvent, 'id'> = {
      title: v.title.trim(),
      date: v.date.format('YYYY-MM-DD'),
      allDay,
      startTime: allDay ? '' : v.startTime.format('HH:mm'),
      endTime: '', // 预留字段，暂不使用
      description: v.description?.trim() ?? '',
      tag: 'purple',
      important: importance === 'important',
      images,
      reminder: remindOn && remindValue > 0 ? { unit: remindUnit, value: remindValue } : null
    };
    if (mode === 'edit' && base.id) {
      updateEvent(base.id, payload);
    } else {
      addEvent(payload);
    }
    closeEventModal();
  };

  const handleDelete = () => {
    if (mode === 'edit' && base.id) deleteEvent(base.id);
    closeEventModal();
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
          <Form form={form} layout="vertical">
            <Form.Item
              name="title"
              label="事件标题"
              rules={[{ required: true, message: '请输入事件标题' }]}
            >
              <Input placeholder="例如：团队周会" maxLength={50} />
            </Form.Item>

            <div className="form-row-2">
              <Form.Item name="date" label="日期" rules={[{ required: true }]}>
                <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
              </Form.Item>
              <Form.Item name="startTime" label="时间（留空=全天）">
                <TimePicker style={{ width: '100%' }} format="HH:mm" minuteStep={5} placeholder="全天" />
              </Form.Item>
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
                  style={importance === 'important' ? { borderColor: IMPORTANT_COLOR, color: '#fff', background: IMPORTANT_COLOR } : undefined}
                >
                  重要事件
                </button>
              </div>
            </div>

            <div className="remind-block">
              <div className="remind-head-row">
                <span className="remind-label2">提前提醒</span>
                <button
                  type="button"
                  className={`switch-mini${remindOn ? ' on' : ''}`}
                  onClick={() => setRemindOn((v) => !v)}
                  aria-label="开启提醒"
                >
                  <span className="knob" />
                </button>
              </div>
              {remindOn && (
                <div className="remind-set">
                  <span>提前</span>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={remindValue}
                    onChange={(e) => setRemindValue(Math.max(1, Number(e.target.value) || 1))}
                    className="remind-num"
                  />
                  <div className="remind-unit">
                    <button
                      type="button"
                      className={`ru-btn${remindUnit === 'day' ? ' active' : ''}`}
                      onClick={() => setRemindUnit('day')}
                    >
                      天
                    </button>
                    <button
                      type="button"
                      className={`ru-btn${remindUnit === 'hour' ? ' active' : ''}`}
                      onClick={() => setRemindUnit('hour')}
                    >
                      小时
                    </button>
                  </div>
                  <span className="remind-via">通过微信提醒</span>
                </div>
              )}
            </div>

            <Form.Item name="description" label="描述">
              <TextArea rows={2} placeholder="补充说明（可选，最多 200 字）" maxLength={200} showCount />
            </Form.Item>

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
          </Form>
        </div>

        <div className="ev-foot">
          {mode === 'edit' && (
            <button className="ev-del" onClick={handleDelete}>
              <DeleteOutlined />
              删除
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
