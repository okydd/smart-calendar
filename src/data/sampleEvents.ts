import { dayjs, genId, type Dayjs } from '../utils/date';
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
      id: genId(),
      title: '团队周会',
      date: monday.format('YYYY-MM-DD'),
      startTime: '14:00',
      endTime: '15:00',
      allDay: false,
      description: '同步本周项目进展、风险与下周排期。',
      tag: 'purple'
    },
    {
      id: genId(),
      title: '健身训练',
      date: wednesday.format('YYYY-MM-DD'),
      startTime: '19:00',
      endTime: '20:00',
      allDay: false,
      description: '每周三固定力量训练，记得带毛巾。',
      tag: 'green'
    },
    {
      id: genId(),
      title: '医生预约',
      date: at(12).format('YYYY-MM-DD'),
      startTime: '10:00',
      endTime: '10:30',
      allDay: false,
      description: '年度体检复查，提前 15 分钟到。',
      tag: 'red'
    },
    {
      id: genId(),
      title: '项目评审',
      date: at(18).format('YYYY-MM-DD'),
      startTime: '16:00',
      endTime: '17:00',
      allDay: false,
      description: 'V2.0 版本设计评审，准备演示稿。',
      tag: 'orange'
    },
    {
      id: genId(),
      title: '生日聚会',
      date: at(8).format('YYYY-MM-DD'),
      startTime: '',
      endTime: '',
      allDay: true,
      description: '好友生日聚餐，地点稍后通知。',
      tag: 'pink'
    },
    {
      id: genId(),
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
