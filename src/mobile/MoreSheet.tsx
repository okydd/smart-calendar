import { useRef, useState } from 'react';
import { Drawer, App, Modal, DatePicker } from 'antd';
import {
  PictureOutlined,
  DownloadOutlined,
  UploadOutlined,
  CopyOutlined,
  MobileOutlined,
  CloudSyncOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { useCalendar } from '../context/CalendarContext';
import { useSync } from '../context/SyncContext';
import { TAG_COLORS, TAG_ORDER } from '../constants';
import { sanitizeImported } from '../utils/storage';
import { dayjs } from '../utils/date';
import ExportModal from '../components/ExportModal';

export default function MoreSheet({
  open,
  onClose,
  onOpenSync,
  installable,
  onInstall
}: {
  open: boolean;
  onClose: () => void;
  onOpenSync: () => void;
  installable: boolean;
  onInstall: () => void;
}) {
  const { message, modal } = App.useApp();
  const { events, activeTags, toggleTag, clearTags, importEvents } = useCalendar();
  const { status, email, lastSyncAt, configured } = useSync();
  const [exportOpen, setExportOpen] = useState(false);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, 'month'));
  const fileRef = useRef<HTMLInputElement>(null);

  const syncLabel = !configured
    ? '未开启 · 点此设置'
    : !email
      ? '未登录 · 点此登录'
      : status === 'syncing'
        ? '同步中…'
        : status === 'error'
          ? '同步失败 · 点此查看'
          : status === 'offline'
            ? '离线，联网后自动同步'
            : lastSyncAt
              ? `已同步 ${dayjs(lastSyncAt).format('MM-DD HH:mm')}`
              : '已登录';

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(events, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Calendar_Backup_${dayjs().format('YYYYMMDD_HHmmss')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    message.success(`已导出 ${events.length} 条事件`);
  };

  const handleCopyEvents = async () => {
    const lines = events
      .filter((e) => !e.deleted)
      .sort((a, b) => (a.date < b.date ? -1 : 1))
      .map((e) => {
        const tag = TAG_COLORS[e.tag].label;
        const time = e.allDay || !e.startTime ? '全天' : e.startTime;
        return `${e.date} ${time} ${e.title} [${tag}]`;
      });
    const text = lines.join('\n') || '暂无事件';
    try {
      await navigator.clipboard.writeText(text);
      message.success('事件列表已复制到剪贴板');
    } catch {
      message.error('复制失败，请手动复制');
    }
  };

  const handleImportFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const list = sanitizeImported(parsed);
        importEvents(list);
        message.success(`已导入 ${list.length} 条事件`);
        onClose();
      } catch (err) {
        message.error(`导入失败：${(err as Error).message}`);
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <Drawer
        placement="bottom"
        open={open}
        onClose={onClose}
        height="auto"
        closable={false}
        styles={{
          body: { padding: '20px 16px 28px' },
          content: { borderRadius: '20px 20px 0 0' }
        }}
      >
        <div className="sheet-title">
          <span>更多功能</span>
          <button className="sheet-close" onClick={onClose} aria-label="关闭">
            <CloseOutlined />
          </button>
        </div>

        <div className="sheet-section">
          <h4>按标签筛选</h4>
          <div className="tag-filters">
            {TAG_ORDER.map((t) => {
              const active = activeTags.includes(t);
              return (
                <button
                  key={t}
                  className={`tag-pill${active ? ' active' : ''}`}
                  onClick={() => toggleTag(t)}
                >
                  <span
                    className="tag-pill-dot"
                    style={{ background: TAG_COLORS[t].color }}
                  />
                  {TAG_COLORS[t].label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="sheet-section">
          <h4>数据与导出</h4>
          <div className="export-range">
            <div className="export-range-label">选择时间范围</div>
            <div className="export-range-pickers">
              <DatePicker
                value={startDate}
                onChange={(v) => v && setStartDate(v)}
                format="YYYY/MM/DD"
                placeholder="开始日期"
                suffixIcon={null}
                allowClear={false}
              />
              <DatePicker
                value={endDate}
                onChange={(v) => v && setEndDate(v)}
                format="YYYY/MM/DD"
                placeholder="结束日期"
                suffixIcon={null}
                allowClear={false}
              />
            </div>
          </div>

          <div className="sheet-actions-row">
            <button className="sheet-btn-v2 primary" onClick={() => setExportOpen(true)}>
              <PictureOutlined className="ico" />
              导出图片
            </button>
            <button className="sheet-btn-v2 success" onClick={handleCopyEvents}>
              <CopyOutlined className="ico" />
              复制事件
            </button>
          </div>
          <div className="sheet-actions-row">
            <button className="sheet-btn-v2" onClick={handleExportJSON}>
              <DownloadOutlined className="ico" />
              导出JSON
            </button>
            <button className="sheet-btn-v2" onClick={() => fileRef.current?.click()}>
              <UploadOutlined className="ico" />
              导入JSON
            </button>
          </div>
        </div>

        <div className="sheet-section">
          <h4>云同步</h4>
          <button
            className={`sync-entry${email && status !== 'error' ? ' on' : ''}`}
            onClick={() => {
              onClose();
              onOpenSync();
            }}
          >
            <CloudSyncOutlined className="sync-ico" />
            <span className="sync-text">
              <b>云同步</b>
              <small>{syncLabel}</small>
            </span>
            <span className="sync-arrow">›</span>
          </button>
        </div>

        <button
          className="install-hint-btn"
          onClick={() => {
            if (installable) {
              onInstall();
            } else {
              Modal.info({
                title: '安装到手机桌面',
                content: (
                  <div style={{ fontSize: 13, lineHeight: 1.9 }}>
                    <b>安卓 / 鸿蒙：</b>用浏览器打开本网址，点右上角菜单 →「添加到主屏幕 / 安装应用」。
                    <br />
                    <b>iPhone：</b>用 Safari 打开本网址，点底部分享按钮 →「添加到主屏幕」。
                    <br />
                    安装后会生成独立图标，全屏运行，断网也能使用。
                  </div>
                ),
                okText: '知道了'
              });
            }
          }}
        >
          <MobileOutlined />
          安装到桌面
        </button>

        <div className="install-tip">
          共 <b>{events.length}</b> 条事件，保存在本机，建议定期导出JSON备份。
          {email && <> 已开启云同步，登录同一账号自动互通。</>}
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          style={{ display: 'none' }}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleImportFile(f);
            e.target.value = '';
          }}
        />
      </Drawer>

      <ExportModal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        initialStart={startDate}
        initialEnd={endDate}
      />
    </>
  );
}
