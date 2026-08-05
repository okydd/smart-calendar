import type { TagColor, ReminderOffset } from './types';

/** localStorage 存储键名 */
export const STORAGE_KEY = 'calendarEvents';

/** 主题色板（新版蓝色主调） */
export const THEME = {
  primaryGradient: 'linear-gradient(135deg, #3b7cff, #5e60ff)',
  gradientStart: '#5e7fff',
  gradientEnd: '#3b7cff',
  headerGradientStart: '#5e60ff',
  headerGradientEnd: '#3b7cff',
  success: '#34c759',
  warning: '#ff9f0a',
  danger: '#ff3b30',
  iconBlue: '#4fc3f7',
  sidebarBg: '#fafafa',
  sidebarBorder: '#e8e8e8',
  weekendBg: '#f9f9f9',
  todayBorder: '#3b7cff',
  cellBorder: '#f0f0f0',
  rowAlt: '#f8f9fa',
  textDark: '#1c1c1e',
  textGray: '#8e8e93',
  bgGray: '#f2f3f8'
} as const;

/** 标签颜色映射：标签 -> { 中文名, 色值 } */
export const TAG_COLORS: Record<TagColor, { label: string; color: string }> = {
  purple: { label: '工作', color: '#7c4dff' },
  green: { label: '生活', color: '#34c759' },
  orange: { label: '提醒', color: '#ff9f0a' },
  red: { label: '重要', color: '#ff3b30' },
  blue: { label: '学习', color: '#3b7cff' },
  pink: { label: '社交', color: '#ff2d78' }
};

/** 标签顺序（用于筛选按钮组渲染） */
export const TAG_ORDER: TagColor[] = ['purple', 'green', 'orange', 'red', 'blue', 'pink'];

/** 重要事件左边框 / 标记色 */
export const IMPORTANT_COLOR = '#ff3b30';
/** 普通事件左边框色（灰色） */
export const NORMAL_BORDER = '#e5e5ea';

/** 提前提醒常用预设（标签可多选） */
export const PRESET_REMINDERS: { label: string; unit: ReminderOffset['unit']; value: number }[] = [
  { label: '14天', unit: 'day', value: 14 },
  { label: '7天', unit: 'day', value: 7 },
  { label: '3天', unit: 'day', value: 3 },
  { label: '2天', unit: 'day', value: 2 },
  { label: '1天', unit: 'day', value: 1 },
  { label: '2小时', unit: 'hour', value: 2 },
  { label: '1小时', unit: 'hour', value: 1 },
  { label: '30分钟', unit: 'minute', value: 30 },
  { label: '15分钟', unit: 'minute', value: 15 }
];
