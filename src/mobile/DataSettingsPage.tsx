import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { App, Modal } from 'antd';
import {
  InfoCircleOutlined,
  DeleteOutlined,
  SafetyCertificateOutlined,
  MailOutlined,
  CopyOutlined
} from '@ant-design/icons';
import { Row } from './SettingRows';
import SubTopbar from './SubTopbar';
import { useCalendar } from '../context/CalendarContext';
import { useSync } from '../context/SyncContext';
import { dayjs } from '../utils/date';
import {
  emailConfigured,
  sendEmail,
  APK_FOOTER_TEXT
} from '../utils/notify';
import { exportDataToEmail } from '../utils/exportData';
import { copyText } from '../utils/clipboard';
import { APK_DOWNLOAD_URL, APK_RELEASE_PAGE, WEB_APP_URL } from '../constants';

export default function DataSettingsPage() {
  const { message, modal } = App.useApp();
  const navigate = useNavigate();
  const { events, duplicateCount, dedupeNow } = useCalendar();
  const { userId, email } = useSync();

  const [backupOpen, setBackupOpen] = useState(false);

  const activeCount = events.filter((e) => !e.deleted).length;

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

  const copyAll = async (text: string, tip: string) => {
    const ok = await copyText(text);
    ok ? message.success(tip) : message.warning('复制失败，请长按手动复制');
  };

  /** 把「灾难恢复卡片」发送到邮箱，作为线下留存 */
  const mailRecoveryCard = async () => {
    if (!emailConfigured()) {
      message.warning('请先在「消息通知」里配置接收邮箱');
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
      `当前数据量：${activeCount} 条事件`,
      `生成时间：${dayjs().format('YYYY-MM-DD HH:mm')}`
    ].join('\n');
    setBusy('正在发送恢复信息…');
    const r = await sendEmail('智能日历 · 恢复信息卡（请长期保存）', body);
    setBusy('');
    r.ok ? message.success('恢复信息卡已发送到邮箱') : message.error(r.msg || '发送失败');
  };

  const [busy, setBusy] = useState('');

  const back = () => navigate('/settings');

  return (
    <div className="sub-page">
      <SubTopbar title="数据" onBack={back} />

      <div className="sub-page-body">
        <div className="set-group">
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

        <div className="sub-page-gap" />
      </div>

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
              <button onClick={() => copyAll(APK_DOWNLOAD_URL, 'APK 下载地址已复制')}>
                <CopyOutlined />
              </button>
            </div>
            <div className="backup-item">
              <span className="backup-k">发布页（历史版本）</span>
              <span className="backup-v">{APK_RELEASE_PAGE}</span>
              <button onClick={() => copyAll(APK_RELEASE_PAGE, '发布页地址已复制')}>
                <CopyOutlined />
              </button>
            </div>
            <div className="backup-item">
              <span className="backup-k">电脑 / 浏览器网页版</span>
              <span className="backup-v">{WEB_APP_URL}</span>
              <button onClick={() => copyAll(WEB_APP_URL, '网页版地址已复制')}>
                <CopyOutlined />
              </button>
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
              <button onClick={() => navigate('/settings')}>{userId ? '查看' : '去登录'}</button>
            </div>
            <div className="backup-item">
              <span className="backup-k">备份二 · 本机文件</span>
              <span className="backup-v">导出完整 JSON 到手机/电脑</span>
              <button onClick={downloadFullBackup}>立即导出</button>
            </div>
            <div className="backup-item">
              <span className="backup-k">备份三 · 邮箱</span>
              <span className="backup-v">把清单与下载链接发到邮箱</span>
              <button
                onClick={() =>
                  void exportDataToEmail({
                    events,
                    start: dayjs('2000-01-01'),
                    end: dayjs().add(100, 'year'),
                    userId,
                    message,
                    onNeedConfig: () => message.warning('请先在「消息通知」里配置接收邮箱')
                  })
                }
              >
                发送
              </button>
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

          <button className="notify-save" onClick={() => void mailRecoveryCard()}>
            <MailOutlined /> 把上面这些信息发到我的邮箱长期保存
          </button>
        </div>
      </Modal>

      {busy && (
        <div className="set-busy">
          <span>{busy}</span>
        </div>
      )}
    </div>
  );
}
