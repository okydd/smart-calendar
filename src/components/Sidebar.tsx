import { useRef, useState } from 'react';
import { Button, App, Divider } from 'antd';
import {
  PlusOutlined,
  DownloadOutlined,
  UploadOutlined,
  PictureOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useCalendar } from '../context/CalendarContext';
import { useUI } from '../context/UIContext';
import { sanitizeImported } from '../utils/storage';
import ExportModal from './ExportModal';

export default function Sidebar() {
  const { message } = App.useApp();
  const { events, importEvents } = useCalendar();
  const { openCreate } = useUI();
  const fileRef = useRef<HTMLInputElement>(null);
  const [exportOpen, setExportOpen] = useState(false);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      const valid = sanitizeImported(data);
      if (!valid.length) {
        message.warning('未找到有效事件');
      } else {
        importEvents(valid);
        message.success(`已导入 ${valid.length} 个事件`);
      }
    } catch {
      message.error('导入失败：JSON 格式不正确');
    } finally {
      e.target.value = '';
    }
  };

  const onExportJson = () => {
    const blob = new Blob([JSON.stringify(events, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Calendar_Backup_${dayjs().format('YYYYMMDD_HHmmss')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    message.success('已导出 JSON 备份');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {/* 品牌 */}
      <div className="side-brand">
        <div className="side-logo">📅</div>
        <div className="side-brand-name">智能日历</div>
      </div>

      {/* 新建事件 */}
      <div className="side-section">
        <Button
          className="btn-gradient"
          icon={<PlusOutlined />}
          block
          size="large"
          onClick={() => openCreate()}
        >
          新建事件
        </Button>
      </div>

      <Divider style={{ margin: '4px 0' }} />

      <div className="side-divider" />

      {/* 统计 */}
      <div className="side-section">
        <div className="side-stat">
          共 {events.length} 个事件
        </div>
      </div>

      <div className="side-divider" />

      {/* 数据操作 */}
      <div className="side-section">
        <div className="side-section-title">数据与导出</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Button
            icon={<PictureOutlined />}
            block
            onClick={() => setExportOpen(true)}
          >
            导出为图片
          </Button>
          <Button icon={<DownloadOutlined />} block onClick={onExportJson}>
            导出 JSON
          </Button>
          <Button
            icon={<UploadOutlined />}
            block
            onClick={() => fileRef.current?.click()}
          >
            导入 JSON
          </Button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          style={{ display: 'none' }}
          onChange={onFileChange}
        />
      </div>

      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} />
    </div>
  );
}
