import { useEffect, useRef, useState } from 'react';
import { Modal, Form, Input, DatePicker, TimePicker, Switch, Button } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useCalendar } from '../context/CalendarContext';
import { useUI } from '../context/UIContext';
import { TAG_COLORS, TAG_ORDER } from '../constants';
import type { CalendarEvent, TagColor } from '../types';

const { TextArea } = Input;

interface FormValues {
  title: string;
  date: dayjs.Dayjs;
  allDay: boolean;
  startTime?: dayjs.Dayjs;
  description?: string;
  tag: TagColor | '';
  important?: boolean;
}

const MAX_IMAGES = 10;

export default function EventModal() {
  const { eventModal, closeEventModal } = useUI();
  const { addEvent, updateEvent, deleteEvent } = useCalendar();
  const [form] = Form.useForm<FormValues>();
  const [images, setImages] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const { open, mode, initial } = eventModal;

  // 打开时根据 initial 填充表单
  useEffect(() => {
    if (!open) return;
    const base = initial ?? {};
    form.setFieldsValue({
      title: (base.title as string) ?? '',
      date: base.date ? dayjs(base.date as string, 'YYYY-MM-DD') : dayjs(),
      allDay: Boolean(base.allDay),
      startTime: base.startTime ? dayjs(base.startTime as string, 'HH:mm') : undefined,
      description: (base.description as string) ?? '',
      tag: (base.tag as TagColor) ?? '',
      important: Boolean(base.important)
    });
    setImages(Array.isArray(base.images) ? base.images.slice(0, MAX_IMAGES) : []);
  }, [open, initial, form]);

  const selectedTag = (form.getFieldValue('tag') as TagColor | '') ?? '';
  const isAllDay = Form.useWatch('allDay', form);

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
    const v = await form.validateFields();
    const payload: Omit<CalendarEvent, 'id'> = {
      title: v.title.trim(),
      date: v.date.format('YYYY-MM-DD'),
      allDay: v.allDay,
      startTime: v.allDay ? '' : v.startTime?.format('HH:mm') ?? '',
      endTime: '',
      description: v.description?.trim() ?? '',
      tag: (v.tag || 'purple') as TagColor,
      important: Boolean(v.important),
      images
    };
    if (mode === 'edit' && initial && 'id' in initial && initial.id) {
      updateEvent(initial.id, payload);
    } else {
      addEvent(payload);
    }
    closeEventModal();
  };

  const handleDelete = () => {
    if (mode === 'edit' && initial && 'id' in initial && initial.id) {
      deleteEvent(initial.id);
    }
    closeEventModal();
  };

  return (
    <Modal
      title={mode === 'edit' ? '编辑事件' : '新建事件'}
      open={open}
      onOk={handleOk}
      onCancel={closeEventModal}
      okText="保存"
      cancelText="取消"
      maskClosable={false}
      destroyOnClose
      className="modal-pop"
      width={480}
      footer={[
        mode === 'edit' ? (
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={handleDelete}
            key="delete"
            style={{ float: 'left' }}
          >
            删除
          </Button>
        ) : (
          <span key="del-placeholder" style={{ float: 'left' }} />
        ),
        <Button onClick={closeEventModal} key="cancel">
          取消
        </Button>,
        <Button className="btn-gradient" type="primary" onClick={handleOk} key="save">
          保存
        </Button>
      ]}
    >
      <Form form={form} layout="vertical" initialValues={{ tag: '', allDay: false, important: false }}>
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
          {!isAllDay && (
            <Form.Item name="startTime" label="时间">
              <TimePicker style={{ width: '100%' }} format="HH:mm" minuteStep={5} />
            </Form.Item>
          )}
        </div>

        <Form.Item name="allDay" label="全天事件" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item name="important" label="重要事件（提醒中显示彩色左边框）" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item name="tag" label="标签 / 颜色分类（可不选）">
          <div className="tag-chips">
            {TAG_ORDER.map((t) => {
              const active = selectedTag === t;
              const color = TAG_COLORS[t].color;
              return (
                <button
                  type="button"
                  key={t}
                  className={`tag-chip-select${active ? ' active' : ''}`}
                  style={
                    active
                      ? { background: color, borderColor: color, color: '#fff' }
                      : { borderColor: color, color }
                  }
                  onClick={() => form.setFieldValue('tag', active ? '' : t)}
                >
                  <span
                    className="tag-chip-dot"
                    style={{ background: active ? '#fff' : color }}
                  />
                  {TAG_COLORS[t].label}
                </button>
              );
            })}
          </div>
        </Form.Item>

        <Form.Item name="description" label="描述">
          <TextArea rows={3} placeholder="补充说明（可选）" maxLength={200} showCount />
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
    </Modal>
  );
}
