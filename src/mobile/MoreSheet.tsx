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
  SaveOutlined,
  SearchOutlined,
  BellOutlined
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

/** UTF-8 字符串转 base64（用于邮件附件） */
function toBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  bytes.forEach((b) => {
    bin += String.fromCharCode(b);
  });
  return btoa(bin);
}

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
  const { events, importEvents, search, setSearch } = useCalendar();
  const { status, email, lastSyncAt, configured } = useSync();
  const [exportOpen, setExportOpen] = useState(false);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, 'month'));
  const [notifyOpen, setNotifyOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [ns, setNs] = useState<NotifySettings>(() => getNotifySettings());

  const syncLabel = !configured
    ? '未开启'
    : !email
      ? '未登录'
      : status === 'syncing'
        ? '同步中…'
        : status === 'error'
          ? '同步失败'
          : status === 'offline'
            ? '离线'
            : lastSyncAt
              ? `已同步 ${dayjs(lastSyncAt).format('MM-DD HH:mm')}`
              : '已登录';

  const rangeStart = startDate.format('YYYY年M月D日');
  const rangeEnd = endDate.format('YYYY年M月D日');
  const rangeText = `${startDate.format('YYYY/MM/DD')} - ${endDate.format('YYYY/MM/DD')}`;
  const exportTime = dayjs().format('YYYY年M月D日 HH:mm');

  /** 取所选范围内的事件 */
  const rangedEvents = () =>
    events.filter((e) => {
      if (e.deleted) return false;
      const d = dayjs(e.date);
      return (
        d.isValid() && !d.isBefore(startDate, 'day') && !d.isAfter(endDate, 'day')
      );
    });

  const handleExportJSON = async () => {
    const json = JSON.stringify(events, null, 2);
    const fileName = `Calendar_Backup_${dayjs().format('YYYYMMDD_HHmmss')}.json`;
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    message.success(`已导出 ${events.length} 条事件`);

    // 自动发送到邮箱：优先以 .json 附件形式（EmailJS 需模板启用附件）
    const body = [
      '【智能日历 · 数据备份】',
      `选取时间范围：${rangeStart} 至 ${rangeEnd}`,
      `导出数据时间：${exportTime}`,
      `事件总数：${events.length} 条`,
      '',
      `附件文件：${fileName}（可直接下载后在「更多功能 → 导入JSON」中恢复）`
    ].join('\n');
    const r = await sendEmail('智能日历 数据备份', body, {
      name: fileName,
      data: toBase64(json),
      mimeType: 'application/json'
    });
    if (r.ok) message.success(r.msg);
    else if (r.msg !== '未配置邮箱，仅本地操作') message.info(r.msg);
  };

  const handleCopyEvents = async () => {
    const list = rangedEvents();
    const text = buildConciseText(list, { rangeStart, rangeEnd, exportTime });
    try {
      await navigator.clipboard.writeText(text);
      message.success(`已复制 ${list.length} 条事件清单`);
    } catch {
      message.warning('复制失败，已尝试发送到邮箱');
    }
    const r = await sendEmail('智能日历 事件清单', text);
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

  const showInstallGuide = () => {
    if (installable) {
      onInstall();
      return;
    }
    Modal.info({
      title: '安装到桌面',
      content: (
        <div style={{ fontSize: 13, lineHeight: 1.9 }}>
          <b>安卓 / 鸿蒙：</b>用浏览器打开本网址，点右上角菜单 →「添加到主屏幕 / 安装应用」。
          <br />
          <b>iPhone：</b>用 Safari 打开本网址，点底部分享按钮 →「添加到主屏幕」。
          <br />
          <b>电脑：</b>Chrome / Edge 地址栏右侧的「安装」图标。
          <br />
          安装后会生成独立图标，全屏运行，断网也能使用。
        </div>
      ),
      okText: '知道了'
    });
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
          <h4>搜索事件</h4>
          <div className="sheet-search">
            <SearchOutlined className="ico" />
            <input
              value={search}
              placeholder="输入标题或备注关键词…"
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="clr" onClick={() => setSearch('')} aria-label="清除">
                <CloseOutlined />
              </button>
            )}
          </div>
          {search && (
            <div className="btn-note">
              已按「{search}」筛选，关闭本面板后可在日历与清单中查看结果
            </div>
          )}
        </div>

        {/* 需求4：通知设置 / 云同步 / 安装到桌面 三按钮共占一行 */}
        <div className="sheet-section">
          <h4>设置</h4>
          <div className="tri-row">
            <button
              className={`tri-btn${notifyOpen ? ' active' : ''}`}
              onClick={() => setNotifyOpen((v) => !v)}
            >
              <BellOutlined className="ico" />
              <span className="t">通知设置</span>
              <span className="s">
                {emailConfigured(ns) || wechatConfigured(ns) ? '已配置' : '未配置'}
              </span>
            </button>
            <button
              className={`tri-btn${email && status !== 'error' ? ' on' : ''}`}
              onClick={() => {
                onClose();
                onOpenSync();
              }}
            >
              <CloudSyncOutlined className="ico" />
              <span className="t">云同步</span>
              <span className="s">{syncLabel}</span>
            </button>
            <button className="tri-btn" onClick={showInstallGuide}>
              <MobileOutlined className="ico" />
              <span className="t">安装到桌面</span>
              <span className="s">{installable ? '可安装' : '查看方法'}</span>
            </button>
          </div>

          {notifyOpen && (
            <div className="notify-form">
              <div className="notify-panel">
                <div className="notify-panel-head">
                  <MailOutlined />
                  <span>邮件通知</span>
                </div>
                <label>接收邮箱（可填多个，用英文逗号分隔）</label>
                <textarea
                  rows={2}
                  value={ns.emailTarget}
                  placeholder="me@gmail.com, 123456@qq.com"
                  onChange={(e) => setNs({ ...ns, emailTarget: e.target.value })}
                />
                <label>EmailJS 服务 ID</label>
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
              </div>

              <div className="notify-panel">
                <div className="notify-panel-head">
                  <WechatOutlined />
                  <span>微信推送</span>
                </div>
                <label>ServerChan SendKey（方糖）</label>
                <input
                  value={ns.wechatSendKey}
                  placeholder="SCTxxxxx"
                  onChange={(e) => setNs({ ...ns, wechatSendKey: e.target.value })}
                />
              </div>

              <div className="notify-tip">
                事件提前提醒通过微信推送；导出/复制数据通过邮件发送。备份 JSON 会以
                <b> .json 附件</b>形式发送（需 EmailJS 模板开启附件；若不支持则自动改为正文发送）。
              </div>
              <button className="notify-save" onClick={saveNotify}>
                <SaveOutlined /> 保存通知设置
              </button>
            </div>
          )}
        </div>

        <div className="sheet-section">
          <h4>数据与导出</h4>
          <div className="export-range">
            <div className="export-range-label">选择时间范围（用于导出图片 / 复制事件）</div>
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
              <div className="btn-note">
                把所选范围（{rangeText}）的事件生成长图，可保存或分享
              </div>
            </div>
            <div className="btn-wrap">
              <button className="sheet-btn-v2 success" onClick={handleCopyEvents}>
                <CopyOutlined className="ico" />
                复制事件
              </button>
              <div className="btn-note">
                复制所选范围的简洁清单（含时间范围与导出时间说明），并发送到邮箱
              </div>
            </div>
          </div>
          <div className="sheet-actions-row">
            <div className="btn-wrap">
              <button className="sheet-btn-v2" onClick={handleExportJSON}>
                <DownloadOutlined className="ico" />
                导出JSON
              </button>
              <div className="btn-note">
                下载全部事件备份（共 {events.length} 条），并以 .json 附件发送到邮箱
              </div>
            </div>
            <div className="btn-wrap">
              <button className="sheet-btn-v2" onClick={() => fileRef.current?.click()}>
                <UploadOutlined className="ico" />
                导入JSON
              </button>
              <div className="btn-note">从备份文件（含邮件附件）恢复事件数据</div>
            </div>
          </div>
        </div>

        <div className="install-tip">
          共 <b>{events.length}</b> 条事件，保存在本机，建议定期导出JSON备份。
          {email && <> 已开启云同步，登录同一账号自动互通。</>}
        </div>

        {/* 需求9：电脑端也有明确的返回按钮 */}
        <button className="sheet-back-btn" onClick={onClose}>
          返回日历
        </button>

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
