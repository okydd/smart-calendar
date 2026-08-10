import { Dayjs } from 'dayjs';
import type { MessageInstance } from 'antd/es/message/interface';
import type { CalendarEvent } from '../types';
import { dayjs } from './date';
import {
  buildConciseText,
  buildFullText,
  buildFullEmailHtml,
  emailConfigured,
  sendEmail,
  APK_FOOTER_TEXT
} from './notify';
import { createShare } from './share';
import { copyText } from './clipboard';
import { SHARE_ACCESS_PASSWORD } from '../constants';

/**
 * 把指定日期范围内的事件清单发到邮箱（复用「导出数据」逻辑），供设置页与数据详情页共用。
 * - events: 全部事件
 * - start/end: 导出日期范围
 * - onNeedConfig: 当未配置邮箱时回调（通常由调用方打开「消息通知」弹窗）
 */
export async function exportDataToEmail(opts: {
  events: CalendarEvent[];
  start: Dayjs;
  end: Dayjs;
  userId?: string | null;
  message: MessageInstance;
  onNeedConfig: () => void;
}): Promise<void> {
  const { events, start, end, userId, message, onNeedConfig } = opts;
  const list = events.filter((e) => {
    if (e.deleted) return false;
    const d = dayjs(e.date);
    return d.isValid() && !d.isBefore(start, 'day') && !d.isAfter(end, 'day');
  });
  if (!list.length) {
    message.warning('所选日期范围内没有事件');
    return;
  }
  if (!emailConfigured()) {
    message.warning('请先在「消息通知」里配置接收邮箱与 EmailJS 参数');
    onNeedConfig();
    return;
  }
  const rangeStart = start.format('YYYY年M月D日');
  const rangeEnd = end.format('YYYY年M月D日');
  const exportTime = dayjs().format('YYYY年M月D日 HH:mm');

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
          `🔒 以下分享内容均需访问密码：${SHARE_ACCESS_PASSWORD}`,
          '',
          '📎 完整事件在线查看（含下载 JSON）：',
          share.viewerUrl,
          '（在密码保护页面内点击「下载JSON」即可获取完整数据）'
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
}
