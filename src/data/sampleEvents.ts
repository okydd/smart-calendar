import { dayjs, type Dayjs } from '../utils/date';
import type { CalendarEvent } from '../types';

/** 找到当月第一个指定星期几（day(): 0=周日 … 6=周六） */
function firstWeekdayInMonth(monthStart: Dayjs, target: number): Dayjs {
  let d = monthStart;
  let guard = 0;
  while (d.day() !== target && guard < 7) {
    d = d.add(1, 'day');
    guard++;
  }
  return d;
}

/**
 * 示例事件使用「固定 ID」而不是随机 ID。
 *
 * 原因：若用随机 ID，一旦本机 localStorage 被清空（例如 APK 从 localhost 换成
 * okydd.github.io 域名后 storage 隔离），会重新生成一批 ID 不同但内容完全相同的
 * 示例事件；随后与云端合并时 mergeEvents 以 id 为主键做 LWW，无法识别它们是同一条，
 * 于是「月提醒」里出现两条一模一样的数据。固定 ID 后无论生成多少次都会被自动去重。
 */
export const SAMPLE_EVENT_IDS = [
  'sample-weekly-meeting',
  'sample-fitness',
  'sample-doctor',
  'sample-review',
  'sample-birthday',
  'sample-reading'
] as const;

/** 判断某个 ID 是否属于内置示例事件 */
export function isSampleEventId(id: string): boolean {
  return (SAMPLE_EVENT_IDS as readonly string[]).includes(id);
}

/**
 * 生成本月示例事件，便于首次打开即有内容。
 * 包含：团队周会、健身训练、医生预约、项目评审、生日聚会、读书分享会。
 */
export function generateSampleEvents(ref: Dayjs = dayjs()): CalendarEvent[] {
  const monthStart = ref.date(1).startOf('day');
  const y = monthStart.year();
  const m = monthStart.month();
  const daysInMonth = monthStart.daysInMonth();
  const at = (day: number) =>
    dayjs()
      .year(y)
      .month(m)
      .date(Math.min(day, daysInMonth))
      .startOf('day');

  const monday = firstWeekdayInMonth(monthStart, 1);
  const wednesday = firstWeekdayInMonth(monthStart, 3);

  return [
    {
      id: 'sample-weekly-meeting',
      title: '团队周会',
      date: monday.format('YYYY-MM-DD'),
      startTime: '14:00',
      endTime: '15:00',
      allDay: false,
      description: '同步本周项目进展、风险与下周排期。',
      tag: 'purple'
    },
    {
      id: 'sample-fitness',
      title: '健身训练',
      date: wednesday.format('YYYY-MM-DD'),
      startTime: '19:00',
      endTime: '20:00',
      allDay: false,
      description: '每周三固定力量训练，记得带毛巾。',
      tag: 'green'
    },
    {
      id: 'sample-doctor',
      title: '医生预约',
      date: at(12).format('YYYY-MM-DD'),
      startTime: '10:00',
      endTime: '10:30',
      allDay: false,
      description: '年度体检复查，提前 15 分钟到。',
      tag: 'red'
    },
    {
      id: 'sample-review',
      title: '项目评审',
      date: at(18).format('YYYY-MM-DD'),
      startTime: '16:00',
      endTime: '17:00',
      allDay: false,
      description: 'V2.0 版本设计评审，准备演示稿。',
      tag: 'orange'
    },
    {
      id: 'sample-birthday',
      title: '生日聚会',
      date: at(8).format('YYYY-MM-DD'),
      startTime: '',
      endTime: '',
      allDay: true,
      description: '好友生日聚餐，地点稍后通知。',
      tag: 'pink'
    },
    {
      id: 'sample-reading',
      title: '读书分享会',
      date: at(22).format('YYYY-MM-DD'),
      startTime: '15:00',
      endTime: '16:00',
      allDay: false,
      description: '共读《深入理解计算机系统》第 3 章。',
      tag: 'blue'
    }
  ];
}
