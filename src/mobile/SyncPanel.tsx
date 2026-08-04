import { useState } from 'react';
import { Modal, Input, Button, App, Collapse, Tag, Typography } from 'antd';
import {
  CloudSyncOutlined,
  CloudServerOutlined,
  LoginOutlined,
  LogoutOutlined,
  SyncOutlined,
  CheckCircleFilled,
  ExclamationCircleFilled,
  DisconnectOutlined
} from '@ant-design/icons';
import { useSync } from '../context/SyncContext';
import { dayjs } from '../utils/date';

const SQL_SNIPPET = `-- 在 Supabase → SQL Editor 中粘贴执行（一次即可）
create table if not exists public.calendar_events (
  id          text        not null,
  user_id     uuid        not null references auth.users(id) on delete cascade,
  title       text        not null default '',
  date        text        not null default '',
  start_time  text        not null default '',
  end_time    text        not null default '',
  all_day     boolean     not null default false,
  description text        not null default '',
  tag         text        not null default 'purple',
  done        boolean     not null default false,
  deleted     boolean     not null default false,
  updated_at  timestamptz not null default now(),
  primary key (user_id, id)
);

alter table public.calendar_events enable row level security;

create policy "read own"   on public.calendar_events
  for select using (auth.uid() = user_id);
create policy "insert own" on public.calendar_events
  for insert with check (auth.uid() = user_id);
create policy "update own" on public.calendar_events
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "delete own" on public.calendar_events
  for delete using (auth.uid() = user_id);`;

/** 云同步设置面板 */
export default function SyncPanel({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { message, modal } = App.useApp();
  const {
    status,
    email,
    lastSyncAt,
    error,
    configured,
    configLocked,
    configUrl,
    saveConfig,
    removeConfig,
    signIn,
    signUp,
    signOut,
    sendReset,
    syncNow
  } = useSync();

  const [url, setUrl] = useState(configUrl);
  const [anonKey, setAnonKey] = useState('');
  const [mail, setMail] = useState('');
  const [pwd, setPwd] = useState('');
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [busy, setBusy] = useState(false);

  const signedIn = Boolean(email);

  const handleSaveConfig = () => {
    const err = saveConfig(url, anonKey);
    if (err) {
      message.error(err);
      return;
    }
    message.success('连接参数已保存，接下来注册或登录账号');
    setAnonKey('');
  };

  const handleAuth = async () => {
    if (!mail.trim() || !pwd) {
      message.warning('请填写邮箱和密码');
      return;
    }
    setBusy(true);
    const err = mode === 'signIn' ? await signIn(mail, pwd) : await signUp(mail, pwd);
    setBusy(false);
    if (err === '__NEED_CONFIRM__') {
      modal.info({
        title: '请先验证邮箱',
        content: `注册成功。我们已向 ${mail.trim()} 发送了一封验证邮件，请点击邮件中的链接完成验证，然后回来登录。`,
        okText: '知道了'
      });
      setMode('signIn');
      return;
    }
    if (err) {
      message.error(err);
      return;
    }
    message.success(mode === 'signIn' ? '登录成功，正在同步…' : '注册成功，正在同步…');
    setPwd('');
  };

  const handleForgot = async () => {
    if (!mail.trim()) {
      message.warning('请先填写邮箱地址');
      return;
    }
    const err = await sendReset(mail);
    if (err) message.error(err);
    else message.success('重置密码邮件已发送，请查收邮箱');
  };

  const handleSignOut = () => {
    modal.confirm({
      title: '退出登录？',
      content: '退出后本设备将停止同步，已同步到云端的数据不会丢失，本机数据也会保留。',
      okText: '退出登录',
      cancelText: '取消',
      onOk: async () => {
        await signOut();
        message.success('已退出登录');
      }
    });
  };

  const handleDisconnect = () => {
    modal.confirm({
      title: '断开云同步配置？',
      content: '将清除本机保存的连接参数并退出登录，应用回到纯本地模式。云端数据不受影响。',
      okText: '断开',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk: async () => {
        await signOut();
        removeConfig();
        message.success('已断开云同步');
      }
    });
  };

  const statusTag = () => {
    if (!configured) return <Tag color="default">未启用</Tag>;
    if (!signedIn) return <Tag color="orange">未登录</Tag>;
    if (status === 'syncing')
      return (
        <Tag icon={<SyncOutlined spin />} color="processing">
          同步中
        </Tag>
      );
    if (status === 'error') return <Tag color="error">同步失败</Tag>;
    if (status === 'offline') return <Tag color="default">离线</Tag>;
    return (
      <Tag icon={<CheckCircleFilled />} color="success">
        已同步
      </Tag>
    );
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={
        <span>
          <CloudSyncOutlined style={{ color: '#6d5dfc', marginRight: 8 }} />
          云同步
        </span>
      }
      width={520}
    >
      <div style={{ marginBottom: 14 }}>
        当前状态：{statusTag()}
        {signedIn && (
          <span style={{ marginLeft: 8, color: '#666', fontSize: 13 }}>{email}</span>
        )}
      </div>

      {error && (
        <div
          style={{
            background: '#fff2f0',
            border: '1px solid #ffccc7',
            borderRadius: 8,
            padding: '8px 12px',
            marginBottom: 14,
            fontSize: 13,
            color: '#cf1322'
          }}
        >
          <ExclamationCircleFilled style={{ marginRight: 6 }} />
          {error}
        </div>
      )}

      {/* ── 第一步：连接参数 ───────────────────────── */}
      {!configured && (
        <>
          <p style={{ fontSize: 13, color: '#666', lineHeight: 1.8 }}>
            填写你自己的 Supabase 项目参数后，手机和电脑登录同一个账号即可自动同步。
            数据存放在你自己的数据库里，我们不接触任何内容。
          </p>
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 12, color: '#888' }}>Project URL</label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://xxxxxxxx.supabase.co"
            />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, color: '#888' }}>anon public key</label>
            <Input.TextArea
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
          </div>
          <Button type="primary" block icon={<CloudServerOutlined />} onClick={handleSaveConfig}>
            保存连接参数
          </Button>

          <Collapse
            ghost
            style={{ marginTop: 12 }}
            items={[
              {
                key: 'how',
                label: <span style={{ fontSize: 13 }}>参数在哪里找？（点击展开）</span>,
                children: (
                  <div style={{ fontSize: 13, lineHeight: 2, color: '#555' }}>
                    <b>1.</b> 打开 supabase.com 用邮箱免费注册并新建一个项目（Region 选
                    Singapore 较快）。
                    <br />
                    <b>2.</b> 项目左下角 <b>Settings → API</b>，把 <b>Project URL</b> 和{' '}
                    <b>anon public</b> 两个值复制过来。
                    <br />
                    <b>3.</b> 左侧 <b>SQL Editor → New query</b>，粘贴下面这段建表语句并点
                    Run：
                    <Typography.Paragraph
                      copyable={{ text: SQL_SNIPPET }}
                      style={{
                        background: '#f6f7fb',
                        border: '1px solid #e8e8f0',
                        borderRadius: 8,
                        padding: 10,
                        fontSize: 11,
                        maxHeight: 180,
                        overflow: 'auto',
                        marginTop: 8,
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'Consolas, Monaco, monospace'
                      }}
                    >
                      {SQL_SNIPPET}
                    </Typography.Paragraph>
                  </div>
                )
              }
            ]}
          />
        </>
      )}

      {/* ── 第二步：登录 ─────────────────────────── */}
      {configured && !signedIn && (
        <>
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 12, color: '#888' }}>邮箱</label>
            <Input
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="username"
            />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, color: '#888' }}>密码（至少 6 位）</label>
            <Input.Password
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              onPressEnter={handleAuth}
              placeholder="请输入密码"
              autoComplete={mode === 'signIn' ? 'current-password' : 'new-password'}
            />
          </div>
          <Button
            type="primary"
            block
            loading={busy}
            icon={<LoginOutlined />}
            onClick={handleAuth}
          >
            {mode === 'signIn' ? '登录并开始同步' : '注册新账号'}
          </Button>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 10,
              fontSize: 13
            }}
          >
            <a onClick={() => setMode(mode === 'signIn' ? 'signUp' : 'signIn')}>
              {mode === 'signIn' ? '还没有账号？去注册' : '已有账号？去登录'}
            </a>
            <a onClick={handleForgot}>忘记密码</a>
          </div>
          {!configLocked && (
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <a style={{ fontSize: 12, color: '#999' }} onClick={handleDisconnect}>
                重新填写连接参数
              </a>
            </div>
          )}
        </>
      )}

      {/* ── 已登录 ───────────────────────────────── */}
      {configured && signedIn && (
        <>
          <div
            style={{
              background: '#f6f7fb',
              borderRadius: 10,
              padding: '12px 14px',
              fontSize: 13,
              lineHeight: 2,
              color: '#555',
              marginBottom: 14
            }}
          >
            <div>
              账号：<b>{email}</b>
            </div>
            <div>
              上次同步：
              {lastSyncAt ? dayjs(lastSyncAt).format('YYYY-MM-DD HH:mm:ss') : '尚未同步'}
            </div>
            <div style={{ color: '#888', fontSize: 12 }}>
              数据每分钟自动同步一次，修改后 1.5 秒内也会立即上传。
            </div>
          </div>
          <Button
            type="primary"
            block
            icon={<SyncOutlined spin={status === 'syncing'} />}
            loading={status === 'syncing'}
            onClick={() => void syncNow()}
            style={{ marginBottom: 10 }}
          >
            立即同步
          </Button>
          <Button block icon={<LogoutOutlined />} onClick={handleSignOut}>
            退出登录
          </Button>
          {!configLocked && (
            <Button
              block
              type="text"
              danger
              icon={<DisconnectOutlined />}
              style={{ marginTop: 6 }}
              onClick={handleDisconnect}
            >
              断开云同步
            </Button>
          )}
        </>
      )}
    </Modal>
  );
}
