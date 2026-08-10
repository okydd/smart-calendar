import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { App, Modal, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import SubTopbar from './SubTopbar';
import { getVersionHistory, applyLatestVersion, type VersionChangeType } from '../utils/version';
import { triggerRollback } from '../utils/rollback';
import { ROLLBACK_PAT, APK_RELEASE_PAGE } from '../constants';

const TYPE_LABEL: Record<VersionChangeType, string> = {
  feature: '新功能',
  fix: '修复',
  ui: '体验',
  perf: '性能',
  other: '其他'
};

export default function VersionHistoryPage() {
  const navigate = useNavigate();
  const { message, modal } = App.useApp();
  const items = getVersionHistory();
  const [busy, setBusy] = useState('');
  // 回退前的账号登录密码确认（本地确认即可，不联网校验）
  const [rollbackTarget, setRollbackTarget] = useState<string | null>(null);
  const [pwd, setPwd] = useState('');
  const [pwdErr, setPwdErr] = useState('');

  const onRollback = (version: string) => {
    if (!ROLLBACK_PAT) {
      modal.confirm({
        title: `回退到 ${version}`,
        content: '当前未配置回退令牌，无法直接在线回退。可前往发布页查看历史版本，或联系开发者执行回退。',
        okText: '前往发布页',
        cancelText: '取消',
        onOk: () => {
          window.open(APK_RELEASE_PAGE, '_blank');
        }
      });
      return;
    }
    setPwd('');
    setPwdErr('');
    setRollbackTarget(version);
  };

  const doRollback = async () => {
    if (!pwd.trim()) {
      setPwdErr('请输入账号登录密码以确认操作');
      return;
    }
    const version = rollbackTarget;
    setRollbackTarget(null);
    if (!version) return;
    setBusy(version);
    const r = await triggerRollback(version);
    setBusy('');
    if (r.ok) {
      message.success(r.msg);
      // 清 SW 缓存并刷新，加载回退后的版本
      setTimeout(() => applyLatestVersion(), 800);
    } else {
      message.error(r.msg);
    }
  };

  return (
    <div className="sub-page">
      <SubTopbar title="版本历史" onBack={() => navigate(-1)} />
      <div className="sub-page-body ver-history">
        <p className="ver-tip">
          每个版本带有唯一编号（V主.次）与改动摘要。可一键回退或前进到任意已保留快照的版本；回退前需输入账号登录密码确认。
        </p>
        {items.map(({ entry, current, canRollback }) => (
          <div className={'ver-item' + (current ? ' is-current' : '')} key={entry.version}>
            <div className="ver-item-head">
              <span className="ver-badge">{entry.version}</span>
              <span className={'ver-type ver-type-' + entry.type}>{TYPE_LABEL[entry.type]}</span>
              <span className="ver-date">{entry.date}</span>
              {current && <span className="ver-current-tag">当前</span>}
            </div>
            <div className="ver-title">{entry.title}</div>
            <div className="ver-summary">{entry.summary}</div>
            {canRollback ? (
              <button
                className="ver-rollback-btn"
                disabled={!!busy}
                onClick={() => onRollback(entry.version)}
              >
                {busy === entry.version ? '回退中…' : '回退到此版本'}
              </button>
            ) : (
              <div className="ver-rollback-disabled">
                {current ? '正在使用此版本' : '历史版本（未保留回退快照）'}
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal
        open={!!rollbackTarget}
        title={rollbackTarget ? `确认回退到 ${rollbackTarget}` : '确认回退'}
        okText="确认回退"
        cancelText="取消"
        onOk={doRollback}
        onCancel={() => setRollbackTarget(null)}
        okButtonProps={{ disabled: !pwd.trim() }}
      >
        <p style={{ marginBottom: 8, color: '#555' }}>
          此操作会立即把站点还原为该版本，当前版本仍可再次回退回来。请输入账号登录密码以确认操作：
        </p>
        <Input.Password
          prefix={<LockOutlined style={{ color: '#bbb' }} />}
          placeholder="账号登录密码"
          value={pwd}
          onChange={(e) => {
            setPwd(e.target.value);
            setPwdErr('');
          }}
          onPressEnter={doRollback}
          status={pwdErr ? 'error' : undefined}
          autoFocus
        />
        {pwdErr && (
          <div style={{ color: '#fa5252', fontSize: 12, marginTop: 6 }}>{pwdErr}</div>
        )}
      </Modal>
    </div>
  );
}
