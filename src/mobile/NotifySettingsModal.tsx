import { App, Modal } from 'antd';
import {
  CloudSyncOutlined,
  NotificationOutlined,
  MailOutlined,
  WechatOutlined,
  DingtalkOutlined,
  SaveOutlined
} from '@ant-design/icons';
import { useSync } from '../context/SyncContext';
import {
  saveNotifySettings,
  dingtalkConfigured,
  wechatConfigured,
  sendWechat,
  sendDingtalk,
  type NotifySettings
} from '../utils/notify';

/**
 * 消息通知设置弹窗（可复用）：
 * - 邮件（EmailJS 服务 / 模板 / Public Key）
 * - 微信推送（ServerChan SendKey）
 * - 钉钉推送（Webhook + 加签密钥）
 * 状态由父组件以 ns / setNs 受控传入，保存时同步到云端（若已登录）。
 */
export default function NotifySettingsModal({
  open,
  onClose,
  ns,
  setNs,
  userId
}: {
  open: boolean;
  onClose: () => void;
  ns: NotifySettings;
  setNs: (v: NotifySettings) => void;
  userId?: string | null;
}) {
  const { message } = App.useApp();
  const { syncNotifySettings } = useSync();

  const saveNotify = async () => {
    saveNotifySettings(ns);
    if (userId) {
      const ok = await syncNotifySettings(ns);
      message.success(ok ? '通知设置已保存并同步到云端' : '已保存到本机，云端同步失败');
    } else {
      message.success('通知设置已保存到本机');
    }
    onClose();
  };

  const testWechat = async () => {
    if (!wechatConfigured(ns)) return message.warning('请先填写 ServerChan SendKey');
    const r = await sendWechat('智能日历 · 通道测试', '这是一条测试消息，说明「事件提前通知」已可推送到微信。');
    r.ok ? message.success(r.msg) : message.error(r.msg);
  };

  const testDingtalk = async () => {
    if (!dingtalkConfigured(ns)) return message.warning('请先填写钉钉机器人 Webhook');
    const r = await sendDingtalk('智能日历 · 通道测试', '这是一条测试消息，说明「事件提前通知」已可推送到钉钉。');
    r.ok ? message.success(r.msg) : message.error(r.msg);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
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
  );
}
