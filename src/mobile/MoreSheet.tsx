import { useEffect, useRef, useState } from 'react';
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
  DingtalkOutlined,
  SaveOutlined,
  SearchOutlined,
  BellOutlined,
  NotificationOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useCalendar } from '../context/CalendarContext';
import { useSync } from '../context/SyncContext';
import { sanitizeImported } from '../utils/storage';
import { dayjs } from '../utils/date';
import {
  getNotifySettings,
  saveNotifySettings,
  dingtalkConfigured,
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
  const { events, importEvents, search, setSearch } = useCalendar();
  const { status, email, lastSyncAt, configured, userId, syncNotifySettings, notifySettingsVersion } = useSync();
  /** 搜索框本地输入值：仅在点「搜索」或回车时，才写入全局 search 触发筛选 */
  const [searchInput, setSearchInput] = useState(search);
  const [exportOpen, setExportOpen] = useState(false);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, 'month'));
  const [notifyOpen, setNotifyOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [ns, setNs] = useState<NotifySettings>(() => getNotifySettings());

  /** 登录后云端通知设置拉取并覆盖本地时，重新读入本组件 state */
  useEffect(() => {
    setNs(getNotifySettings());
  }, [notifySettingsVersion]);

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

    // 自动发送到邮箱：仅发送简要说明，JSON 文件（尤其含图片 base64 时）容易超过 EmailJS 50KB 变量限制，故不再作为附件
    const body = [
      '【智能日历 · 数据备份】',
      `选取时间范围：${rangeStart} 至 ${rangeEnd}`,
      `导出数据时间：${exportTime}`,
      `事件总数：${events.length} 条`,
      '',
      `JSON 文件：${fileName} 已下载到本地（可直接在「更多功能 → 导入JSON」中恢复）。`
    ].join('\n');
    const r = await sendEmail('智能日历 数据备份', body);
    if (r.ok) message.success('备份说明已发送到邮箱');
    else if (r.msg !== '未配置邮箱，仅本地操作') message.info(r.msg);
  };

  const handleCopyEvents = async () => {
    const list = rangedEvents();
    const text = buildConciseText(list, { rangeStart, rangeEnd, exportTime });
    try {
      await navigator.clipboard.writeText(text);
      message.success(`已复制 ${list.length} 条事件清单`);
    } catch {
      message.warning('复制失败');
    }
    // 邮件仅发送简洁清单正文；完整版 HTML / 附件含图片 base64，极易超过 EmailJS 50KB 变量限制，导致 413/50KB 报错。
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

  const saveNotify = async () => {
    saveNotifySettings(ns);
    if (userId) {
      const ok = await syncNotifySettings(ns);
      message.success(ok ? '通知设置已保存并同步到云端' : '已保存到本机，云端同步失败');
    } else {
      message.success('通知设置已保存到本机');
    }
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
          body: {
            padding: '0 16px 28px',
            maxHeight: '86vh',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch'
          },
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
              value={searchInput}
              placeholder="输入标题或备注关键词…"
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setSearch(searchInput.trim());
              }}
            />
            {searchInput && (
              <button
                className="clr"
                onClick={() => {
                  setSearchInput('');
                  setSearch('');
                }}
                aria-label="清除"
              >
                <CloseOutlined />
              </button>
            )}
            <button
              className="sheet-search-btn"
              onClick={() => {
                setSearch(searchInput.trim());
                onClose();
              }}
            >
              搜索
            </button>
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
          <div className="sheet-actions-row">
            <div className="btn-wrap">
              <button
                className={`sheet-btn-v2${notifyOpen ? ' primary' : ''}`}
                onClick={() => setNotifyOpen((v) => !v)}
              >
                <BellOutlined className="ico" />
                通知设置
              </button>
            </div>
            <div className="btn-wrap">
              <button
                className="sheet-btn-v2"
                onClick={() => {
                  onClose();
                  onOpenSync();
                }}
              >
                <CloudSyncOutlined className="ico" />
                云同步
              </button>
            </div>
            <div className="btn-wrap">
              <button className="sheet-btn-v2" onClick={showInstallGuide}>
                <MobileOutlined className="ico" />
                安装到桌面
              </button>
            </div>
          </div>

          {notifyOpen && (
            <div className="notify-form">
              <div className={`notify-cloud-hint${userId ? ' on' : ''}`}>
                {userId ? (
                  <>
                    <CloudSyncOutlined /> 已登录，设置自动同步到云端，登录同一账号的设备互通
                  </>
                ) : (
                  <>
                    <NotificationOutlined /> 未登录，设置仅保存在本机（在「云同步」中登录后自动同步）
                  </>
                )}
              </div>
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
                  <ClockCircleOutlined />
                  <span>每日定时发送</span>
                </div>
                <label>每天定时把全部事件发送到上面的「接收邮箱」（需先配置 EmailJS）</label>
                <div className="auto-send-row">
                  <span className="auto-send-label">开启每日发送</span>
                  <button
                    type="button"
                    className={`switch-mini${ns.autoSend ? ' on' : ''}`}
                    onClick={() => setNs({ ...ns, autoSend: !ns.autoSend })}
                    aria-label="开启每日发送"
                  >
                    <span className="knob" />
                  </button>
                  <span className="auto-send-time-label">发送时间</span>
                  <input
                    type="time"
                    className="auto-send-time"
                    value={ns.autoSendTime}
                    onChange={(e) => setNs({ ...ns, autoSendTime: e.target.value || '04:00' })}
                  />
                </div>
                <div className="notify-tip">
                  默认每天 04:00 发送。应用需处于打开状态才会触发；若打开时已过了发送时间且今日尚未发送，会立即补发。
                </div>
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

              <div className="notify-panel">
                <div className="notify-panel-head">
                  <DingtalkOutlined />
                  <span>钉钉推送</span>
                </div>
                <label>钉钉机器人 Webhook 地址（含 access_token=...）</label>
                <input
                  value={ns.dingtalkWebhook}
                  placeholder="https://oapi.dingtalk.com/robot/send?access_token=xxx"
                  onChange={(e) => setNs({ ...ns, dingtalkWebhook: e.target.value })}
                />
                <label>加签密钥（安全设置选了「加签」时填写）</label>
                <input
                  value={ns.dingtalkSecret}
                  placeholder="SECxxxxxxxx"
                  onChange={(e) => setNs({ ...ns, dingtalkSecret: e.target.value })}
                />
              </div>

              <div className="notify-tip">
                事件提前提醒同时推送到微信与钉钉（已配置才发送）；导出/复制数据通过邮件发送。
                由于 EmailJS 免费计划单封请求变量上限 50KB，复制/导出邮件仅发送简洁正文，不再附带含图片 base64 的 HTML 附件。
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
            <div className="export-range-pickers">
              <div className="export-range-col">
                <label>开始日期</label>
                <DatePicker
                  value={startDate}
                  onChange={(v) => v && setStartDate(v)}
                  format="YYYY/MM/DD"
                  placeholder="开始日期"
                  suffixIcon={null}
                  allowClear={false}
                />
              </div>
              <div className="export-range-col">
                <label>结束日期</label>
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
          </div>

          <div className="sheet-actions-row">
            <div className="btn-wrap">
              <button className="sheet-btn-v2 primary" onClick={() => setExportOpen(true)}>
                <PictureOutlined className="ico" />
                导出图片
              </button>
            </div>
            <div className="btn-wrap">
              <button className="sheet-btn-v2 success" onClick={handleCopyEvents}>
                <CopyOutlined className="ico" />
                复制事件
              </button>
            </div>
          </div>
          <div className="sheet-actions-row">
            <div className="btn-wrap">
              <button className="sheet-btn-v2" onClick={handleExportJSON}>
                <DownloadOutlined className="ico" />
                导出JSON
              </button>
            </div>
            <div className="btn-wrap">
              <button className="sheet-btn-v2" onClick={() => fileRef.current?.click()}>
                <UploadOutlined className="ico" />
                导入JSON
              </button>
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
