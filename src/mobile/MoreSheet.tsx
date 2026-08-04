import { useRef, useState } from 'react';
import { Drawer, App, Modal } from 'antd';
import {
  PictureOutlined,
  DownloadOutlined,
  UploadOutlined,
  ReloadOutlined,
  MobileOutlined,
  CloudSyncOutlined
} from '@ant-design/icons';
import { useCalendar } from '../context/CalendarContext';
import { useSync } from '../context/SyncContext';
import { TAG_COLORS, TAG_ORDER } from '../constants';
import { sanitizeImported } from '../utils/storage';
import { dayjs } from '../utils/date';
import ExportModal from '../components/ExportModal';

/**
 * 移动端「更多」底部面板：标签筛选、导出长图、JSON 备份、安装说明。
 */
export default function MoreSheet({
  open,
  onClose,
  onOpenSync
}: {
  open: boolean;
  onClose: () => void;
  onOpenSync: () => void;
}) {
  const { message, modal } = App.useApp();
  const { events, activeTags, toggleTag, clearTags, importEvents, resetSample } =
    useCalendar();
  const { status, email, lastSyncAt, configured } = useSync();
  const [exportOpen, setExportOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  /** 云同步区块的副标题文案 */
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

  const handleReset = () => {
    modal.confirm({
      title: '恢复示例数据？',
      content: '当前所有事件将被替换为示例事件，此操作不可撤销。',
      okText: '确认恢复',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk: () => {
        resetSample();
        message.success('已恢复示例数据');
        onClose();
      }
    });
  };

  return (
    <>
      <Drawer
        placement="bottom"
        open={open}
        onClose={onClose}
        height="auto"
        title="更多功能"
        styles={{ body: { paddingBottom: 28 } }}
      >
        <div className="sheet-section">
          <h4>数据同步</h4>
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

        <div className="sheet-section">
          <h4>按标签筛选</h4>
          <div className="tag-filters">
            {TAG_ORDER.map((t) => {
              const active = activeTags.includes(t);
              return (
                <button
                  key={t}
                  className={`tag-btn${active ? ' active' : ''}`}
                  style={active ? { background: TAG_COLORS[t].color } : undefined}
                  onClick={() => toggleTag(t)}
                >
                  {!active && (
                    <span
                      className="swatch"
                      style={{ background: TAG_COLORS[t].color }}
                    />
                  )}
                  {TAG_COLORS[t].label}
                </button>
              );
            })}
            {activeTags.length > 0 && (
              <button className="tag-btn" onClick={clearTags}>
                清除筛选
              </button>
            )}
          </div>
        </div>

        <div className="sheet-section">
          <h4>数据与导出</h4>
          <div className="sheet-actions">
            <button
              className="sheet-btn primary"
              onClick={() => setExportOpen(true)}
            >
              <PictureOutlined className="ico" />
              导出为长图
            </button>
            <button className="sheet-btn" onClick={handleExportJSON}>
              <DownloadOutlined className="ico" />
              导出 JSON 备份
            </button>
            <button className="sheet-btn" onClick={() => fileRef.current?.click()}>
              <UploadOutlined className="ico" />
              导入 JSON
            </button>
            <button className="sheet-btn" onClick={handleReset}>
              <ReloadOutlined className="ico" />
              恢复示例数据
            </button>
            <button
              className="sheet-btn"
              onClick={() =>
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
                })
              }
            >
              <MobileOutlined className="ico" />
              安装到桌面
            </button>
          </div>
        </div>

        <div className="install-tip">
          共 <b>{events.length}</b> 条事件。
          {email ? (
            <>
              已开启云同步，数据保存在你自己的 Supabase 数据库中，手机与电脑登录同一账号自动互通。
            </>
          ) : (
            <>
              目前仅保存在本机浏览器中，换设备或清理浏览器数据会丢失。建议开启
              <b>云同步</b>，或定期用「导出 JSON 备份」保存一份。
            </>
          )}
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

      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} />
    </>
  );
}
