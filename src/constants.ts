import type { TagColor } from './types';

/** localStorage 存储键名 */
export const STORAGE_KEY = 'calendarEvents';

/** 主题色板（与规格文档一致） */
export const THEME = {
  primaryGradient: 'linear-gradient(135deg, #6d5dfc, #3a2ca8)',
  gradientStart: '#8a7cff',
  gradientEnd: '#6d5dfc',
  headerGradientStart: '#6d5dfc',
  headerGradientEnd: '#8a7cff',
  success: '#81c784',
  warning: '#ffb74d',
  danger: '#e57373',
  iconBlue: '#4fc3f7',
  sidebarBg: '#fafafa',
  sidebarBorder: '#e8e8e8',
  weekendBg: '#f9f9f9',
  todayBorder: '#6d5dfc',
  cellBorder: '#f0f0f0',
  rowAlt: '#f8f9fa',
  textDark: '#333333'
} as const;

/** 标签颜色映射：标签 -> { 中文名, 色值 } */
export const TAG_COLORS: Record<TagColor, { label: string; color: string }> = {
  purple: { label: '工作', color: '#6d5dfc' },
  green: { label: '生活', color: '#81c784' },
  orange: { label: '提醒', color: '#ffb74d' },
  red: { label: '重要', color: '#e57373' },
  blue: { label: '学习', color: '#4fc3f7' },
  pink: { label: '社交', color: '#f06292' }
};

/** 标签顺序（用于筛选按钮组渲染） */
export const TAG_ORDER: TagColor[] = ['purple', 'green', 'orange', 'red', 'blue', 'pink'];
