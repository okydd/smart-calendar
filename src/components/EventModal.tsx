import { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, TimePicker, Select, Switch, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
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
  endTime?: dayjs.Dayjs;
  description?: string;
  tag: TagColor;
}

export default function EventModal() {
  const { eventModal, closeEventModal, openEdit } = useUI();
  const { addEvent, updateEvent, deleteEvent } = useCalendar();
  const [form] = Form.useForm<FormValues>();

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
      endTime: base.endTime ? dayjs(base.endTime as string, 'HH:mm') : undefined,
      description: (base.description as string) ?? '',
      tag: (base.tag as TagColor) ?? 'purple'
    });
  }, [open, initial, form]);

  const handleOk = async () => {
    const v = await form.validateFields();
    const dateStr = v.date.format('YYYY-MM-DD');
    const payload: Omit<CalendarEvent, 'id'> = {
      title: v.title.trim(),
      date: dateStr,
      allDay: v.allDay,
      startTime: v.allDay ? '' : v.startTime?.format('HH:mm') ?? '',
      endTime: v.allDay ? '' : v.endTime?.format('HH:mm') ?? '',
      description: v.description?.trim() ?? '',
      tag: v.tag
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

  const tagOptions = TAG_ORDER.map((t) => ({
    value: t,
    label: (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: TAG_COLORS[t].color,
            display: 'inline-block'
          }}
        />
        {TAG_COLORS[t].label}
      </span>
    )
  }));

  const isAllDay = Form.useWatch('allDay', form);

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
      <Form form={form} layout="vertical" initialValues={{ tag: 'purple', allDay: false }}>
        <Form.Item
          name="title"
          label="事件标题"
          rules={[{ required: true, message: '请输入事件标题' }]}
        >
          <Input placeholder="例如：团队周会" maxLength={50} />
        </Form.Item>

        <Form.Item name="date" label="日期" rules={[{ required: true }]}>
          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item name="allDay" label="全天事件" valuePropName="checked">
          <Switch />
        </Form.Item>

        {!isAllDay && (
          <div style={{ display: 'flex', gap: 12 }}>
            <Form.Item name="startTime" label="开始时间" style={{ flex: 1 }}>
              <TimePicker style={{ width: '100%' }} format="HH:mm" minuteStep={5} />
            </Form.Item>
            <Form.Item name="endTime" label="结束时间" style={{ flex: 1 }}>
              <TimePicker style={{ width: '100%' }} format="HH:mm" minuteStep={5} />
            </Form.Item>
          </div>
        )}

        <Form.Item name="tag" label="标签 / 颜色分类">
          <Select options={tagOptions} />
        </Form.Item>

        <Form.Item name="description" label="描述">
          <TextArea rows={3} placeholder="补充说明（可选）" maxLength={200} showCount />
        </Form.Item>
      </Form>
    </Modal>
  );
}
