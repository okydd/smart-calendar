import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { App, Modal, Spin } from 'antd';
import WheelDatePicker from '../components/WheelDatePicker';
import {
  PictureOutlined,
  ExportOutlined,
  CloudSyncOutlined,
  CloseOutlined,
  MailOutlined,
  WechatOutlined,
  DingtalkOutlined,
  SaveOutlined,
  SearchOutlined,
  BellOutlined,
  NotificationOutlined,
  RightOutlined,
  UserOutlined,
  CloudDownloadOutlined,
  SafetyCertificateOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
  AndroidOutlined,
  DesktopOutlined,
  CheckCircleFilled,
  ThunderboltOutlined,
  SoundOutlined
} from '@ant-design/icons';
import { useCalendar } from '../context/CalendarContext';
import { useSync } from '../context/SyncContext';
import { dayjs } from '../utils/date';
import {
  getNotifySettings,
  saveNotifySettings,
  dingtalkConfigured,
  wechatConfigured,
  emailConfigured,
  sendEmail,
  sendWechat,
  sendDingtalk,
  buildConciseText,
  buildFullText,
  buildFullEmailHtml,
  APK_FOOTER_TEXT,
  type NotifySettings
} from '../utils/notify';
import {
  getStrongRemindPrefs,
  saveStrongRemindPrefs,
  getNotifyPermission,
  requestNotifyPermission,
  syncScheduledReminders,
  countScheduled,
  testReminder,
  unlockAudio,
  isNativeApp,
  collectUpcomingReminders,
  type StrongRemindPrefs,
  type PermState
} from '../utils/localNotify';
import { createShare } from '../utils/share';
import { copyText } from '../utils/clipboard';
import { CURRENT_VERSION, formatVersion, checkLatestVersion, applyLatestVersion } from '../utils/version';
import { APK_DOWNLOAD_URL, APK_RELEASE_PAGE, WEB_APP_URL } from '../constants';
import ExportModal from '../components/ExportModal';

/* ------------------------------------------------------------------ */
/* 通用列表行（微信设置风格）                                            */
/* ------------------------------------------------------------------ */

function Row({
  icon,
  label,
  desc,
  value,
  badge,
  onClick,
  danger,
  right
}: {
  icon?: React.ReactNode;
  label: string;
  desc?: React.ReactNode;
  value?: React.ReactNode;
  badge?: number;
  onClick?: () => void;
  danger?: boolean;
  right?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={`set-row${danger ? ' danger' : ''}${onClick ? '' : ' static'}`}
      onClick={onClick}
      disabled={!onClick}
    >
      {icon && <span className="set-row-ico">{icon}</span>}
      <span className="set-row-main">
        <span className="set-row-label">
          {label}
          {!!badge && badge > 0 && <em className="set-row-badge">{badge}</em>}
        </span>
        {desc && <span className="set-row-desc">{desc}</span>}
      </span>
      {value !== undefined && <span className="set-row-value">{value}</span>}
      {right ?? (onClick ? <RightOutlined className="set-row-arrow" /> : null)}
    </button>
  );
}

function Switch({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <span
      role="switch"
      aria-checked={on}
      className={`switch-mini${on ? ' on' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!on);
      }}
    >
      <span className="knob" />
    </span>
  );
}

/* ------------------------------------------------------------------ */

export default function SettingsPage({ onOpenSync }: { onOpenSync: () => void }) {
  const { message, modal } = App.useApp();
  const { events, search, setSearch, duplicateCount, dedupeNow } = useCalendar();
  const {
    status,
    email,
    lastSyncAt,
    configured,
    userId,
    syncNotifySettings,
    notifySettingsVersion
  } = useSync();

  const [searchInput, setSearchInput] = useState(search);
  const [exportOpen, setExportOpen] = useState(false);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, 'month'));
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [backupOpen, setBackupOpen] = useState(false);
  const [busy, setBusy] = useState('');

  const [ns, setNs] = useState<NotifySettings>(() => getNotifySettings());
  useEffect(() => {
    setNs(getNotifySettings());
  }, [notifySettingsVersion]);

  /* ---------------- 强提醒 ---------------- */
  const [prefs, setPrefs] = useState<StrongRemindPrefs>(() => getStrongRemindPrefs());
  const [perm, setPerm] = useState<PermState>('prompt');
  const [scheduled, setScheduled] = useState(0);

  const refreshRemindState = useCallback(async () => {
    setPerm(await getNotifyPermission());
    setScheduled(await countScheduled());
  }, []);

  useEffect(() => {
    void refreshRemindState();
  }, [refreshRemindState]);

  const updatePrefs = async (patch: Partial<StrongRemindPrefs>) => {
    const next = { ...prefs, ...patch };
    setPrefs(next);
    saveStrongRemindPrefs(next);
    unlockAudio();
    if (next.enabled && perm !== 'granted') {
      const p = await requestNotifyPermission();
      setPerm(p);
      if (p !== 'granted') {
        message.warning(
          p === 'denied'
            ? '系统通知权限被拒绝，请到「手机设置 → 应用 → 智能日历 → 通知」中手动允许'
            : '未获得通知权限，弹窗提醒可能不生效'
        );
      }
    }
    const n = await syncScheduledReminders(events);
    if (next.enabled) setScheduled(n);
    else setScheduled(0);
  };

  /** 事件变化后重新排期系统通知（原生环境有效） */
  const eventsSigRef = useRef('');
  useEffect(() => {
    const sig = events
      .filter((e) => !e.deleted && !e.done && e.reminder?.length)
      .map((e) => `${e.id}:${e.date}:${e.startTime}:${(e.reminder || []).map((r) => r.unit + r.value).join(',')}`)
      .join('|');
    if (sig === eventsSigRef.current) return;
    eventsSigRef.current = sig;
    void syncScheduledReminders(events).then((n) => {
      if (n) setScheduled(n);
    });
  }, [events]);

  const upcomingCount = useMemo(() => collectUpcomingReminders(events).length, [events]);

  /* ---------------- 版本 ---------------- */
  const [verChecking, setVerChecking] = useState(false);
  const [latest, setLatest] = useState<string | null>(null);
  const [verMsg, setVerMsg] = useState('');
  const isLatest = !latest || latest === CURRENT_VERSION || CURRENT_VERSION === 'dev';

  const UPGRADE_STEPS = ['正在检查本地更新…', '正在清理旧版本缓存…', '正在加载最新页面…'];
  const sleep = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));
  const [upgrading, setUpgrading] = useState(false);
  const [upgradeStep, setUpgradeStep] = useState(0);

  /** 点击「立即升级」后分阶段展示进度，再真正执行升级（会触发页面刷新） */
  const doUpgrade = async () => {
    setUpgrading(true);
    setUpgradeStep(0);
    await sleep(450);
    setUpgradeStep(1);
    await sleep(450);
    setUpgradeStep(2);
    await sleep(400);
    await applyLatestVersion();
  };

  const doCheckVersion = async () => {
    setVerChecking(true);
    setVerMsg('');
    const info = await checkLatestVersion();
    setVerChecking(false);
    setLatest(info.latest);
    if (info.error) {
      setVerMsg(info.error);
      message.error(info.error);
      return;
    }
    if (info.isLatest) {
      setVerMsg('已是最新版本');
      message.success('当前已是最新版本');
    } else {
      setVerMsg(`发现新版本 ${formatVersion(info.latest)}`);
      modal.confirm({
        title: '发现新版本',
        content: (
          <div style={{ lineHeight: 1.8 }}>
            <div>当前版本：{formatVersion(CURRENT_VERSION)}</div>
            <div>最新版本：{formatVersion(info.latest)}</div>
            <div style={{ marginTop: 8, color: '#8e8e93' }}>
              点击「立即升级」会清理缓存并重新加载最新页面，数据不会丢失。
            </div>
          </div>
        ),
        okText: '立即升级',
        cancelText: '稍后',
        onOk: () => {
          void doUpgrade();
        }
      });
    }
  };

  const openApkDownload = () => {
    window.open(APK_DOWNLOAD_URL, '_blank', 'noopener');
    message.info('已打开安卓安装包下载链接');
  };

  /* ---------------- 数据导出 ---------------- */
  const rangeStart = startDate.format('YYYY年M月D日');
  const rangeEnd = endDate.format('YYYY年M月D日');
  const exportTime = dayjs().format('YYYY年M月D日 HH:mm');

  const rangedEvents = useCallback(
    () =>
      events.filter((e) => {
        if (e.deleted) return false;
        const d = dayjs(e.date);
        return d.isValid() && !d.isBefore(startDate, 'day') && !d.isAfter(endDate, 'day');
      }),
    [events, startDate, endDate]
  );

  /**
   * 「导出数据」：把简洁版事件清单发到邮箱，邮件里同时带
   *  ① 完整事件在线查看链接 ② 完整 JSON 下载链接。
   */
  const handleExportData = async () => {
    const list = rangedEvents();
    if (!list.length) {
      message.warning('所选日期范围内没有事件');
      return;
    }
    if (!emailConfigured()) {
      message.warning('请先在「消息通知」里配置接收邮箱与 EmailJS 参数');
      setNotifyOpen(true);
      return;
    }
    setBusy('正在打包并发送…');
    try {
      const concise = buildConciseText(list, { rangeStart, rangeEnd, exportTime });
      if (userId) {
        const outcome = await createShare(list, { rangeStart, rangeEnd, exportTime });
        if (outcome.ok && outcome.result) {
          const share = outcome.result;
          const body =
            [
              concise,
              '',
              '────────────',
              '📎 完整事件在线查看：',
              share.viewerUrl,
              '',
              '⬇️ 下载完整 JSON 数据：',
              share.url
            ].join('\n') + APK_FOOTER_TEXT;
          const r = await sendEmail('智能日历 数据导出', body);
          await copyText(share.viewerUrl);
          if (r.ok) {
            message.success(`已发送 ${list.length} 条事件到邮箱，在线查看链接已复制`);
          } else {
            message.error(r.msg || '邮件发送失败');
          }
          return;
        }
        message.error(outcome.error || '上传云端失败，无法生成在线链接');
        return;
      }
      // 未登录：无法生成在线链接，退化为完整正文
      const full = buildFullText(list, { rangeStart, rangeEnd, exportTime });
      const html = buildFullEmailHtml(list, { rangeStart, rangeEnd, exportTime });
      const r = await sendEmail('智能日历 数据导出', full, { html });
      if (r.ok) message.success('已把完整清单发送到邮箱（登录后可附带在线查看链接）');
      else message.error(r.msg || '邮件发送失败');
    } finally {
      setBusy('');
    }
  };

  /** 把全部数据下载为 JSON 文件（灾难恢复用的本机第二备份） */
  const downloadFullBackup = () => {
    const all = events.filter((e) => !e.deleted);
    const json = JSON.stringify(all, null, 2);
    const fileName = `Calendar_Backup_${dayjs().format('YYYYMMDD_HHmmss')}.json`;
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    message.success(`已下载 ${all.length} 条事件到本机（${fileName}）`);
  };

  /* ---------------- 通知渠道 ---------------- */
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

  const testWechat = async () => {
    if (!wechatConfigured()) return message.warning('请先填写 ServerChan SendKey');
    const r = await sendWechat('智能日历 · 通道测试', '这是一条测试消息，说明「事件提前通知」已可推送到微信。');
    r.ok ? message.success(r.msg) : message.error(r.msg);
  };

  const testDingtalk = async () => {
    if (!dingtalkConfigured()) return message.warning('请先填写钉钉机器人 Webhook');
    const r = await sendDingtalk('智能日历 · 通道测试', '这是一条测试消息，说明「事件提前通知」已可推送到钉钉。');
    r.ok ? message.success(r.msg) : message.error(r.msg);
  };

  /* ---------------- 账号 ---------------- */
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

  const handleDedupe = () => {
    if (duplicateCount === 0) {
      message.success('没有发现重复事件');
      return;
    }
    modal.confirm({
      title: `发现 ${duplicateCount} 条重复事件`,
      content: '重复判定依据：标题、日期、时间完全一致。清理后会保留信息最完整的一条，并同步到云端。',
      okText: '立即清理',
      cancelText: '取消',
      onOk: () => {
        const n = dedupeNow();
        message.success(n > 0 ? `已清理 ${n} 条重复事件` : '没有需要清理的事件');
      }
    });
  };

  const copyAll = async (text: string, tip: string) => {
    const ok = await copyText(text);
    ok ? message.success(tip) : message.warning('复制失败，请长按手动复制');
  };

  /** 把「灾难恢复卡片」发送到邮箱，作为线下留存 */
  const mailRecoveryCard = async () => {
    if (!emailConfigured()) {
      message.warning('请先在「消息通知」里配置接收邮箱');
      setNotifyOpen(true);
      return;
    }
    const body = [
      '【智能日历 · 恢复信息卡】请长期保存本邮件',
      '',
      '① 网页版（电脑 / 任意手机浏览器，数据与 APP 完全同步）：',
      WEB_APP_URL,
      '',
      '② 安卓 APP 安装包（固定地址，永远指向最新版）：',
      APK_DOWNLOAD_URL,
      '发布页（可看历史版本）：' + APK_RELEASE_PAGE,
      '',
      '③ 云端账号（数据存放位置）：',
      '登录邮箱：' + (email || '未登录'),
      '云服务：Supabase（数据表 calendar_events，按账号隔离）',
      '',
      '④ 恢复步骤：',
      '1) 打开上面①的网页版或重新安装②的 APP；',
      '2) 进入「设置 → 云同步」，用③的邮箱与密码登录；',
      '3) 登录后数据会自动从云端拉回，无需手动导入。',
      '4) 若云端也不可用，用最近一次「导出数据」邮件里的 JSON 下载链接，',
      '   或本机导出的 Calendar_Backup_*.json，通过「导入json」恢复。',
      '',
      `当前数据量：${events.filter((e) => !e.deleted).length} 条事件`,
      `生成时间：${dayjs().format('YYYY-MM-DD HH:mm')}`
    ].join('\n');
    setBusy('正在发送恢复信息…');
    const r = await sendEmail('智能日历 · 恢复信息卡（请长期保存）', body);
    setBusy('');
    r.ok ? message.success('恢复信息卡已发送到邮箱') : message.error(r.msg || '发送失败');
  };

  const activeCount = events.filter((e) => !e.deleted).length;
  const permLabel =
    perm === 'granted' ? '已授权' : perm === 'denied' ? '已拒绝' : perm === 'prompt' ? '待授权' : '不支持';

  return (
    <div className="settings-page">
      {/* 账号卡片 */}
      <button className="set-account" onClick={onOpenSync}>
        <span className="set-avatar">{email ? email[0].toUpperCase() : <UserOutlined />}</span>
        <span className="set-account-main">
          <span className="set-account-name">{email || '未登录'}</span>
          <span className="set-account-sub">
            {email ? `云同步 · ${syncLabel}` : '登录后数据自动云端备份，多设备互通'}
          </span>
        </span>
        <RightOutlined className="set-row-arrow" />
      </button>

      {/* 导出 */}
      <div className="set-actions">
        <div className="set-group-title">导出</div>
        <div className="set-range">
          <WheelDatePicker label="导出开始日期" value={startDate} onChange={setStartDate} />
          <WheelDatePicker label="导出结束日期" value={endDate} onChange={setEndDate} />
        </div>
        <div className="sheet-actions-row export-main-row">
          <div className="btn-wrap">
            <button className="sheet-btn-v2 primary" onClick={() => setExportOpen(true)}>
              <PictureOutlined className="ico" />
              导出图片
            </button>
          </div>
          <div className="btn-wrap">
            <button className="sheet-btn-v2 success" onClick={handleExportData}>
              <ExportOutlined className="ico" />
              导出数据
            </button>
          </div>
        </div>
      </div>

      {/* 关于 */}
      <div className="set-group">
        <div className="set-group-title">关于</div>
        <Row
          icon={<CloudDownloadOutlined style={{ color: '#3b7cff' }} />}
          label="版本升级"
          desc={verMsg || (isLatest ? '点击检查是否有新版本' : `发现新版本 ${formatVersion(latest)}`)}
          value={
            verChecking ? (
              <Spin size="small" />
            ) : isLatest && verMsg ? (
              <CheckCircleFilled style={{ color: '#34c759' }} />
            ) : undefined
          }
          onClick={doCheckVersion}
        />
        <Row
          icon={<InfoCircleOutlined style={{ color: '#8e8e93' }} />}
          label="当前版本"
          value={formatVersion(CURRENT_VERSION)}
        />
        <Row
          icon={<AndroidOutlined style={{ color: '#34c759' }} />}
          label="下载安卓安装包"
          desc="固定地址，永远指向最新版 APK"
          onClick={openApkDownload}
        />
        <Row
          icon={<DesktopOutlined style={{ color: '#5e60ff' }} />}
          label="电脑网页版地址"
          desc={WEB_APP_URL}
          onClick={() => copyAll(WEB_APP_URL, '网页版地址已复制')}
        />
      </div>

      {/* 数据 */}
      <div className="set-group">
        <div className="set-group-title">数据</div>
        <div className="set-search-row">
          <SearchOutlined className="ico" />
          <input
            value={searchInput}
            placeholder="搜索标题或备注关键词…"
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setSearch(searchInput.trim());
            }}
          />
          {searchInput && (
            <button className="clr" onClick={() => { setSearchInput(''); setSearch(''); }} aria-label="清除">
              <CloseOutlined />
            </button>
          )}
          <button className="set-search-btn" onClick={() => setSearch(searchInput.trim())}>
            搜索
          </button>
        </div>
        <Row
          icon={<InfoCircleOutlined style={{ color: '#8e8e93' }} />}
          label="事件总数"
          value={`${activeCount} 条`}
        />
        <Row
          icon={<DeleteOutlined style={{ color: duplicateCount ? '#ff3b30' : '#8e8e93' }} />}
          label="清理重复事件"
          desc="标题、日期、时间完全相同的事件"
          badge={duplicateCount}
          value={duplicateCount ? `${duplicateCount} 条` : '无重复'}
          onClick={handleDedupe}
        />
        <Row
          icon={<SafetyCertificateOutlined style={{ color: '#34c759' }} />}
          label="备份与灾难恢复"
          desc="网页地址、安装包、云端账号、双备份"
          onClick={() => setBackupOpen(true)}
        />
      </div>

      {/* 提醒 */}
      <div className="set-group">
        <div className="set-group-title">提醒</div>
        <Row
          icon={<ThunderboltOutlined style={{ color: '#ff9f0a' }} />}
          label="强提醒"
          desc={
            prefs.enabled
              ? isNativeApp()
                ? `系统弹窗 · 已排期 ${scheduled || upcomingCount} 条（通知权限：${permLabel}）`
                : `浏览器通知（权限：${permLabel}）`
              : '关闭后仅推送到微信/钉钉'
          }
          right={<Switch on={prefs.enabled} onChange={(v) => void updatePrefs({ enabled: v })} />}
        />
        {prefs.enabled && (
          <>
            <Row
              icon={<SoundOutlined style={{ color: '#5e60ff' }} />}
              label="响铃"
              right={<Switch on={prefs.sound} onChange={(v) => void updatePrefs({ sound: v })} />}
            />
            <Row
              icon={<MobileVibrateIcon />}
              label="振动"
              right={<Switch on={prefs.vibrate} onChange={(v) => void updatePrefs({ vibrate: v })} />}
            />
            {perm !== 'granted' && (
              <Row
                icon={<SafetyCertificateOutlined style={{ color: '#ff3b30' }} />}
                label="开启通知权限"
                desc="未授权时手机不会弹窗，请点此授权"
                onClick={async () => {
                  const p = await requestNotifyPermission();
                  setPerm(p);
                  if (p === 'granted') {
                    const n = await syncScheduledReminders(events);
                    setScheduled(n);
                    message.success('已开启通知权限');
                  } else {
                    message.warning('未获得权限，请到系统设置里手动允许通知');
                  }
                }}
              />
            )}
            <Row
              icon={<BellOutlined style={{ color: '#34c759' }} />}
              label="测试提醒效果"
              desc="立即弹窗 + 振动 + 响铃"
              onClick={async () => {
                unlockAudio();
                await testReminder();
                message.success('已触发测试提醒');
              }}
            />
          </>
        )}
        <Row
          icon={<NotificationOutlined style={{ color: '#3b7cff' }} />}
          label="消息通知"
          desc="邮件 / 微信 / 钉钉"
          value={
            [emailConfigured(ns) && '邮件', wechatConfigured(ns) && '微信', dingtalkConfigured(ns) && '钉钉']
              .filter(Boolean)
              .join(' · ') || '未配置'
          }
          onClick={() => setNotifyOpen(true)}
        />
      </div>

      {/* 消息通知设置 */}
      <Modal
        open={notifyOpen}
        onCancel={() => setNotifyOpen(false)}
        footer={null}
        title="消息通知"
        width={560}
        styles={{ body: { maxHeight: '70vh', overflowY: 'auto' } }}
      >
        <div className="notify-form">
          <div className={`notify-cloud-hint${userId ? ' on' : ''}`}>
            {userId ? (
              <>
                <CloudSyncOutlined /> 已登录，设置自动同步到云端，登录同一账号的设备互通
              </>
            ) : (
              <>
                <NotificationOutlined /> 未登录，设置仅保存在本机（登录后自动同步）
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
              <WechatOutlined />
              <span>微信推送</span>
            </div>
            <label>ServerChan SendKey（方糖）</label>
            <input
              value={ns.wechatSendKey}
              placeholder="SCTxxxxx"
              onChange={(e) => setNs({ ...ns, wechatSendKey: e.target.value })}
            />
            <button className="notify-test" onClick={testWechat}>
              发送测试消息
            </button>
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
            <button className="notify-test" onClick={testDingtalk}>
              发送测试消息
            </button>
          </div>

          <button className="notify-save" onClick={saveNotify}>
            <SaveOutlined /> 保存通知设置
          </button>
        </div>
      </Modal>

      {/* 备份与灾难恢复 */}
      <Modal
        open={backupOpen}
        onCancel={() => setBackupOpen(false)}
        footer={null}
        title="备份与灾难恢复"
        width={560}
        styles={{ body: { maxHeight: '72vh', overflowY: 'auto' } }}
      >
        <div className="backup-panel">
          <div className="backup-status">
            <div className={`backup-dot${userId ? ' on' : ''}`} />
            <div>
              <b>云端自动备份：{userId ? '已开启' : '未开启'}</b>
              <div className="backup-sub">
                {userId
                  ? `账号 ${email}，共 ${activeCount} 条事件实时同步到云端（Supabase）`
                  : '未登录，数据仅存在本机。强烈建议登录后启用云端备份'}
              </div>
            </div>
          </div>

          <div className="backup-block">
            <div className="backup-title">① 出故障时，去哪里重新拿到软件</div>
            <div className="backup-item">
              <span className="backup-k">安卓 APP 安装包</span>
              <span className="backup-v">{APK_DOWNLOAD_URL}</span>
              <button onClick={() => copyAll(APK_DOWNLOAD_URL, 'APK 下载地址已复制')}>复制</button>
            </div>
            <div className="backup-item">
              <span className="backup-k">发布页（历史版本）</span>
              <span className="backup-v">{APK_RELEASE_PAGE}</span>
              <button onClick={() => copyAll(APK_RELEASE_PAGE, '发布页地址已复制')}>复制</button>
            </div>
            <div className="backup-item">
              <span className="backup-k">电脑 / 浏览器网页版</span>
              <span className="backup-v">{WEB_APP_URL}</span>
              <button onClick={() => copyAll(WEB_APP_URL, '网页版地址已复制')}>复制</button>
            </div>
            <div className="backup-tip">
              网页版与 APP 使用同一套云端数据，登录同一账号即可看到完全一样的内容。
            </div>
          </div>

          <div className="backup-block">
            <div className="backup-title">② 数据双备份</div>
            <div className="backup-item">
              <span className="backup-k">备份一 · 云端</span>
              <span className="backup-v">{userId ? '实时自动，无需操作' : '未登录，未启用'}</span>
              <button onClick={onOpenSync}>{userId ? '查看' : '去登录'}</button>
            </div>
            <div className="backup-item">
              <span className="backup-k">备份二 · 本机文件</span>
              <span className="backup-v">导出完整 JSON 到手机/电脑</span>
              <button onClick={downloadFullBackup}>立即导出</button>
            </div>
            <div className="backup-item">
              <span className="backup-k">备份三 · 邮箱</span>
              <span className="backup-v">把清单与下载链接发到邮箱</span>
              <button onClick={handleExportData}>发送</button>
            </div>
          </div>

          <div className="backup-block">
            <div className="backup-title">③ 恢复步骤</div>
            <ol className="backup-steps">
              <li>重新安装 APP 或打开网页版；</li>
              <li>进入「设置 → 云同步」，用邮箱和密码登录；</li>
              <li>登录后数据自动从云端拉回，无需手动导入；</li>
              <li>若云端也不可用，用「导入json」载入本机或邮箱里的备份文件。</li>
            </ol>
          </div>

          <button className="notify-save" onClick={mailRecoveryCard}>
            <MailOutlined /> 把上面这些信息发到我的邮箱长期保存
          </button>
        </div>
      </Modal>

      <ExportModal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        initialStart={startDate}
        initialEnd={endDate}
      />

      {busy && (
        <div className="set-busy">
          <Spin /> <span>{busy}</span>
        </div>
      )}

      {upgrading && (
        <div className="upgrade-overlay">
          <div className="upgrade-card">
            <Spin size="large" />
            <div className="upgrade-title">正在升级到最新版本…</div>
            <div className="upgrade-step">{UPGRADE_STEPS[upgradeStep]}</div>
            <div className="upgrade-dots">
              {UPGRADE_STEPS.map((_, i) => (
                <span key={i} className={`dot${i <= upgradeStep ? ' on' : ''}`} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** 振动图标（antd 无现成图标，用内联 SVG） */
function MobileVibrateIcon() {
  return (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="#ff2d78" aria-hidden="true">
      <path d="M672 64H352c-52.9 0-96 43.1-96 96v704c0 52.9 43.1 96 96 96h320c52.9 0 96-43.1 96-96V160c0-52.9-43.1-96-96-96z m32 800c0 17.6-14.4 32-32 32H352c-17.6 0-32-14.4-32-32V160c0-17.6 14.4-32 32-32h320c17.6 0 32 14.4 32 32v704z" />
      <path d="M128 320a32 32 0 0 1 32 32v320a32 32 0 1 1-64 0V352a32 32 0 0 1 32-32zM896 320a32 32 0 0 1 32 32v320a32 32 0 1 1-64 0V352a32 32 0 0 1 32-32z" />
    </svg>
  );
}
