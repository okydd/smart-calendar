import { useRef, useState } from 'react';
import { Drawer, App, Modal, DatePicker } from 'antd';
import {
  PictureOutlined,
  DownloadOutlined,
  UploadOutlined,
  CopyOutlined,
  MobileOutlined,
  CloudSyncOutlined,
  CloseOutlined,
  MailOutlined,
  WechatOutlined,
  SaveOutlined
} from '@ant-design/icons';
import { useCalendar } from '../context/CalendarContext';
import { useSync } from '../context/SyncContext';
import { sanitizeImported } from '../utils/storage';
import { dayjs } from '../utils/date';
import {
  getNotifySettings,
  saveNotifySettings,
  emailConfigured,
  wechatConfigured,
  sendEmail,
  buildConciseText,
  type NotifySettings
} from '../utils/notify';
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
  const { message } = App.useApp();
  const { events, importEvents } = useCalendar();
  const { status, email, lastSyncAt, configured } = useSync();
  const [exportOpen, setExportOpen] = useState(false);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, 'month'));
  const [notifyOpen, setNotifyOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [ns, setNs] = useState<NotifySettings>(() => getNotifySettings());

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

  const rangeText = `${startDate.format('YYYY/MM/DD')} - ${endDate.format('YYYY/MM/DD')}`;
  const exportTime = dayjs().format('MM-DD HH:mm');

  const handleExportJSON = async () => {
    const json = JSON.stringify(events, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Calendar_Backup_${dayjs().format('YYYYMMDD_HHmmss')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    message.success(`已导出 ${events.length} 条事件`);
    // 自动发送到邮箱
    const r = await sendEmail('日历事件备份', `共 ${events.length} 条事件（导出时间 ${exportTime}）：\n\n${json}`);
    if (r.ok) message.success('备份已发送到邮箱');
    else if (r.msg !== '未配置邮箱，仅本地操作') message.info(r.msg);
  };

  const handleCopyEvents = async () => {
    const text = buildConciseText(events, `全部事件（导出时间 ${exportTime}）`);
    try {
      await navigator.clipboard.writeText(text);
      message.success('事件清单已复制到剪贴板');
    } catch {
      message.warning('复制失败，已尝试发送到邮箱');
    }
    const r = await sendEmail('日历事件清单', text);
    if (r.ok) message.success('清单已发送到邮箱');
    else if (r.msg !== '未配置邮箱，仅本地操作') message.info(r.msg);
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

  const saveNotify = () => {
    saveNotifySettings(ns);
    message.success('通知设置已保存');
    setNotifyOpen(false);
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
          <h4>数据与导出</h4>
          <div className="export-range">
            <div className="export-range-label">选择时间范围（用于导出图片 / 复制 / 备份）</div>
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
            <div className="export-meta">
              所选范围：{rangeText} ｜ 导出时间：{exportTime}
            </div>
          </div>

          <div className="sheet-actions-row">
            <div className="btn-wrap">
              <button className="sheet-btn-v2 primary" onClick={() => setExportOpen(true)}>
                <PictureOutlined className="ico" />
                导出图片
              </button>
              <div className="btn-note">把所选范围的事件生成长图，可保存或分享</div>
            </div>
            <div className="btn-wrap">
              <button className="sheet-btn-v2 success" onClick={handleCopyEvents}>
                <CopyOutlined className="ico" />
                复制事件
              </button>
              <div className="btn-note">复制简洁事件清单到剪贴板，并发送到邮箱</div>
            </div>
          </div>
          <div className="sheet-actions-row">
            <div className="btn-wrap">
              <button className="sheet-btn-v2" onClick={handleExportJSON}>
                <DownloadOutlined className="ico" />
                导出JSON
              </button>
              <div className="btn-note">下载全部事件备份文件，并发送到邮箱</div>
            </div>
            <div className="btn-wrap">
              <button className="sheet-btn-v2" onClick={() => fileRef.current?.click()}>
                <UploadOutlined className="ico" />
                导入JSON
              </button>
              <div className="btn-note">从备份文件恢复事件数据</div>
            </div>
          </div>
        </div>

        <div className="sheet-section">
          <h4>通知设置（邮件 / 微信提醒）</h4>
          <button
            className="notify-toggle"
            onClick={() => setNotifyOpen((v) => !v)}
          >
            <span>
              <MailOutlined /> 邮箱：{emailConfigured(ns) ? ns.emailTarget : '未配置'}
              {'　'}
              <WechatOutlined /> 微信：{wechatConfigured(ns) ? '已配置' : '未配置'}
            </span>
            <span className="chev">{notifyOpen ? '收起' : '展开'}</span>
          </button>
          {notifyOpen && (
            <div className="notify-form">
              <label>接收邮箱</label>
              <input
                type="email"
                value={ns.emailTarget}
                placeholder="例如 me@example.com"
                onChange={(e) => setNs({ ...ns, emailTarget: e.target.value })}
              />
              <label>EmailJS 服务 ID（邮件发送）</label>
              <input
                value={ns.emailjsServiceId}
                placeholder="service_xxx"
                onChange={(e) => setNs({ ...ns, emailjsServiceId: e.target.value })}
              />
              <label>EmailJS 模板 ID</label>
              <input
                value={ns.emailjsTemplateId}
                placeholder="template_xxx"
                onChange={(e) => setNs({ ...ns, emailjsTemplateId: e.target.value })}
              />
              <label>EmailJS Public Key</label>
              <input
                value={ns.emailjsPublicKey}
                placeholder="public_xxx"
                onChange={(e) => setNs({ ...ns, emailjsPublicKey: e.target.value })}
              />
              <label>微信推送 SendKey（ServerChan 方糖）</label>
              <input
                value={ns.wechatSendKey}
                placeholder="SCTxxxxx"
                onChange={(e) => setNs({ ...ns, wechatSendKey: e.target.value })}
              />
              <div className="notify-tip">
                事件提前提醒通过微信推送；导出/复制数据通过邮件发送。需自行注册
                EmailJS 与 ServerChan 后填入。
              </div>
              <button className="notify-save" onClick={saveNotify}>
                <SaveOutlined /> 保存通知设置
              </button>
            </div>
          )}
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
