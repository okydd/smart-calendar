import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { App, Spin } from 'antd';
import WheelDatePicker from '../components/WheelDatePicker';
import { Row } from './SettingRows';
import NotifySettingsModal from './NotifySettingsModal';
import {
  PictureOutlined,
  ExportOutlined,
  CloseOutlined,
  SearchOutlined,
  RightOutlined,
  UserOutlined,
  CloudDownloadOutlined,
  InfoCircleOutlined,
  AndroidOutlined,
  DesktopOutlined,
  CheckCircleFilled,
  DatabaseOutlined,
  BellOutlined,
  HistoryOutlined,
  BulbOutlined
} from '@ant-design/icons';
import { useCalendar } from '../context/CalendarContext';
import { useSync } from '../context/SyncContext';
import { dayjs } from '../utils/date';
import { getNotifySettings, type NotifySettings } from '../utils/notify';
import { copyText } from '../utils/clipboard';
import { exportDataToEmail } from '../utils/exportData';
import { CURRENT_VERSION, SEMVER, formatVersion, formatSemver, checkLatestVersion, applyLatestVersion } from '../utils/version';
import { APK_DOWNLOAD_URL, WEB_APP_URL } from '../constants';
import { useTheme, type ThemeMode } from '../utils/theme';
import ExportModal from '../components/ExportModal';

export default function SettingsPage({ onOpenSync }: { onOpenSync: () => void }) {
  const { message, modal } = App.useApp();
  const navigate = useNavigate();
  const { events, search, setSearch } = useCalendar();
  const { status, email, lastSyncAt, configured, userId, notifySettingsVersion } = useSync();
  const themeMode = useTheme();
  const THEME_LABELS: Record<ThemeMode, string> = { light: '浅色', dark: '深色', auto: '自动' };

  const [searchInput, setSearchInput] = useState(search);
  const [exportOpen, setExportOpen] = useState(false);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, 'month'));
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [busy, setBusy] = useState('');

  const [ns, setNs] = useState<NotifySettings>(() => getNotifySettings());
  useEffect(() => {
    setNs(getNotifySettings());
  }, [notifySettingsVersion]);

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
  const handleExportData = async () => {
    setBusy('正在打包并发送…');
    try {
      await exportDataToEmail({
        events,
        start: startDate,
        end: endDate,
        userId,
        message,
        onNeedConfig: () => setNotifyOpen(true)
      });
    } finally {
      setBusy('');
    }
  };

  const copyAll = async (text: string, tip: string) => {
    const ok = await copyText(text);
    ok ? message.success(tip) : message.warning('复制失败，请长按手动复制');
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

      {/* 外观偏好 */}
      <div className="set-group">
        <div className="set-group-title">外观</div>
        <Row
          icon={<BulbOutlined style={{ color: '#7048e8' }} />}
          label="主题外观"
          desc="深色模式更护眼，自动跟随系统"
          right={
            <div className="theme-seg" onClick={(e) => e.stopPropagation()}>
              {(['light', 'dark', 'auto'] as ThemeMode[]).map((m) => (
                <button
                  type="button"
                  key={m}
                  className={`theme-seg-item${themeMode.mode === m ? ' active' : ''}`}
                  onClick={() => themeMode.setMode(m)}
                >
                  {THEME_LABELS[m]}
                </button>
              ))}
            </div>
          }
        />
      </div>

      {/* 导出 */}
      <div className="set-actions">
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
          value={formatSemver(SEMVER)}
        />
        <Row
          icon={<HistoryOutlined style={{ color: '#7048e8' }} />}
          label="版本历史"
          desc="查看各版本改动，可一键回退"
          onClick={() => navigate('/settings/versions')}
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

      {/* 数据 / 提醒：点击进入二级页面（微信风格） */}
      <div className="set-group">
        <Row
          icon={<DatabaseOutlined style={{ color: '#3b7cff' }} />}
          label="数据"
          desc="事件总数、清理重复、备份与恢复"
          onClick={() => navigate('/settings/data')}
        />
        <Row
          icon={<BellOutlined style={{ color: '#ff9f0a' }} />}
          label="提醒"
          desc="强提醒、消息通知通道"
          onClick={() => navigate('/settings/reminder')}
        />
      </div>

      {/* 消息通知设置（可复用弹窗） */}
      <NotifySettingsModal
        open={notifyOpen}
        onClose={() => setNotifyOpen(false)}
        ns={ns}
        setNs={setNs}
        userId={userId}
      />

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
