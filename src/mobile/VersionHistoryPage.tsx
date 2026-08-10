import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { App } from 'antd';
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
    modal.confirm({
      title: `确认回退到 ${version}？`,
      content: '回退后站点将立即还原为该版本，稍后刷新页面即可生效。当前版本仍可再次回退回来。',
      okText: '确认回退',
      cancelText: '取消',
      onOk: async () => {
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
      }
    });
  };

  return (
    <div className="sub-page">
      <SubTopbar title="版本历史" onBack={() => navigate(-1)} />
      <div className="sub-page-body ver-history">
        <p className="ver-tip">
          每个版本带有唯一编号（V主.次）与改动摘要。发现当前版本不佳时，可一键回退到上一个版本。
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
    </div>
  );
}
