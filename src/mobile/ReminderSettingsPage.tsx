import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { App } from 'antd';
import {
  ThunderboltOutlined,
  SoundOutlined,
  BellOutlined,
  NotificationOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import { Row, Switch, MobileVibrateIcon } from './SettingRows';
import SubTopbar from './SubTopbar';
import NotifySettingsModal from './NotifySettingsModal';
import { useCalendar } from '../context/CalendarContext';
import { useSync } from '../context/SyncContext';
import { dayjs } from '../utils/date';
import {
  getNotifySettings,
  emailConfigured,
  wechatConfigured,
  dingtalkConfigured,
  type NotifySettings
} from '../utils/notify';
import {
  getStrongRemindPrefs,
  saveStrongRemindPrefs,
  type StrongRemindPrefs
} from '../utils/remindPrefs';
import type { PermState } from '../utils/localNotify';

export default function ReminderSettingsPage() {
  const { message, modal } = App.useApp();
  const navigate = useNavigate();
  const { events } = useCalendar();
  const { userId, notifySettingsVersion } = useSync();

  const [ns, setNs] = useState<NotifySettings>(() => getNotifySettings());
  const [notifyOpen, setNotifyOpen] = useState(false);
  useEffect(() => {
    setNs(getNotifySettings());
  }, [notifySettingsVersion]);

  /* ---------------- 强提醒 ---------------- */
  const [prefs, setPrefs] = useState<StrongRemindPrefs>(() => getStrongRemindPrefs());
  const [perm, setPerm] = useState<PermState>('prompt');
  const [scheduled, setScheduled] = useState(0);

  // 把依赖 Capacitor 的本地通知模块隔离为「按需动态加载」，避免其首屏求值
  // 在部分运行环境（如安卓 WebView）导致整页白屏。加载完成前相关函数安全降级。
  const lnRef = useRef<typeof import('../utils/localNotify') | null>(null);
  const [lnReady, setLnReady] = useState(false);
  useEffect(() => {
    let alive = true;
    import('../utils/localNotify')
      .then((m) => {
        if (alive) {
          lnRef.current = m;
          setLnReady(true);
        }
      })
      .catch(() => {
        /* 加载失败不影响其余功能 */
      });
    return () => {
      alive = false;
    };
  }, []);

  const refreshRemindState = useCallback(async () => {
    setPerm(await (lnRef.current?.getNotifyPermission() ?? 'unsupported'));
    setScheduled(await (lnRef.current?.countScheduled() ?? 0));
  }, []);

  useEffect(() => {
    void refreshRemindState();
  }, [refreshRemindState]);

  const updatePrefs = async (patch: Partial<StrongRemindPrefs>) => {
    const next = { ...prefs, ...patch };
    setPrefs(next);
    saveStrongRemindPrefs(next);
    lnRef.current?.unlockAudio();
    if (next.enabled && perm !== 'granted') {
      const p = await (lnRef.current?.requestNotifyPermission() ?? 'unsupported');
      setPerm(p);
      if (p !== 'granted') {
        message.warning(
          p === 'denied'
            ? '系统通知权限被拒绝，请到「手机设置 → 应用 → 智能日历 → 通知」中手动允许'
            : '未获得通知权限，弹窗提醒可能不生效'
        );
      }
    }
    const n = await (lnRef.current?.syncScheduledReminders(events) ?? 0);
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
    void (lnRef.current?.syncScheduledReminders(events) ?? Promise.resolve(0)).then((n) => {
      if (n) setScheduled(n);
    });
  }, [events]);

  const upcomingCount = useMemo(
    () => (lnRef.current?.collectUpcomingReminders(events) ?? []).length,
    [events, lnReady]
  );
  const permLabel =
    perm === 'granted' ? '已授权' : perm === 'denied' ? '已拒绝' : perm === 'prompt' ? '待授权' : '不支持';

  const back = () => navigate('/settings');

  return (
    <div className="sub-page">
      <SubTopbar title="提醒" onBack={back} />

      <div className="sub-page-body">
        <div className="set-group">
          <Row
            icon={<ThunderboltOutlined style={{ color: '#ff9f0a' }} />}
            label="强提醒"
            desc={
              prefs.enabled
                ? lnRef.current?.isNativeApp()
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
                    const p = await (lnRef.current?.requestNotifyPermission() ?? 'unsupported');
                    setPerm(p);
                    if (p === 'granted') {
                      const n = await (lnRef.current?.syncScheduledReminders(events) ?? 0);
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
                  lnRef.current?.unlockAudio();
                  await lnRef.current?.testReminder();
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

        <div className="sub-page-gap" />
      </div>

      <NotifySettingsModal
        open={notifyOpen}
        onClose={() => setNotifyOpen(false)}
        ns={ns}
        setNs={setNs}
        userId={userId}
      />
    </div>
  );
}
