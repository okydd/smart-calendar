import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(customParseFormat);
dayjs.locale('zh-cn');

const WEEK_CN = ['日', '一', '二', '三', '四', '五', '六'];

export { dayjs, WEEK_CN };
export type { Dayjs };

/** 格式化为 YYYY-MM-DD */
export const toDateStr = (d: Dayjs): string => d.format('YYYY-MM-DD');

/** 解析 YYYY-MM-DD */
export const parseDateStr = (s: string): Dayjs => dayjs(s, 'YYYY-MM-DD', true);

/** 当前周的开始（周一） */
export const startOfWeek = (d: Dayjs): Dayjs => d.weekday(0);

/** 当前月的开始（1 号） */
export const startOfMonth = (d: Dayjs): Dayjs => d.date(1);

/** 给定日期所处日历网格的起始日（用于月视图：包含上个月的填充周） */
export const monthGridStart = (d: Dayjs): Dayjs => {
  const first = startOfMonth(d);
  // 以周日为每周第一天
  return first.subtract(first.day(), 'day');
};

/** 生成月视图 6 行 × 7 列 = 42 天的日期数组 */
export const monthGridDays = (d: Dayjs): Dayjs[] => {
  const start = monthGridStart(d);
  return Array.from({ length: 42 }, (_, i) => start.add(i, 'day'));
};

/** 生成周视图 7 天日期数组（周一起始） */
export const weekDays = (d: Dayjs): Dayjs[] => {
  const start = startOfWeek(d);
  return Array.from({ length: 7 }, (_, i) => start.add(i, 'day'));
};

/** 周 X（中文） */
export const weekdayCN = (d: Dayjs): string => `周${WEEK_CN[d.day()]}`;

/** 导出图片用的日期列文案：MM月DD日 周X */
export const exportDateLabel = (d: Dayjs): string => `${d.format('MM')}月${d.format('DD')}日 ${weekdayCN(d)}`;

/** 时间范围文案，全天显示“全天” */
export const timeRangeLabel = (e: { allDay: boolean; startTime: string; endTime: string }): string => {
  if (e.allDay) return '全天';
  if (!e.startTime) return '全天';
  return e.endTime ? `${e.startTime} - ${e.endTime}` : e.startTime;
};

/** 将 HH:mm 转为当天分钟数 */
export const timeToMinutes = (t: string): number => {
  if (!t) return 0;
  const [h, m] = t.split(':').map(Number);
  return h * 60 + (m || 0);
};

/** 将分钟数格式化为 HH:mm */
export const minutesToTime = (mins: number): string => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

/** 生成唯一 ID */
export const genId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
};

/** 当前时间戳 YYYY-MM-DD HH:mm:ss */
export const nowStamp = (): string => dayjs().format('YYYY-MM-DD HH:mm:ss');
