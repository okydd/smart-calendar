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

/** Canvas 绘制用的主题色板（亮/暗两套），供月/周/日视图读取 */
export interface CanvasTheme {
  cellBg: string;
  weekendBg: string;
  cellBorder: string;
  todayBorder: string;
  headerWeekend: string;
  headerNormal: string;
  dateOther: string;
  dateNormal: string;
  eventText: string;
  moreText: string;
  dragBg: string;
  dragText: string;
  danger: string;
  axisText: string;
}

export function getCanvasTheme(mode: 'light' | 'dark'): CanvasTheme {
  if (mode === 'dark') {
    return {
      cellBg: '#15171d',
      weekendBg: '#1a1d27',
      cellBorder: '#262a33',
      todayBorder: '#5b8cff',
      headerWeekend: '#8b83d6',
      headerNormal: '#8b90a3',
      dateOther: '#555555',
      dateNormal: '#e8eaf0',
      eventText: '#c8ccd6',
      moreText: '#6b7280',
      dragBg: '#2a2e38',
      dragText: '#e8eaf0',
      danger: '#ff6b6b',
      axisText: '#8b90a3'
    };
  }
  return {
    cellBg: '#ffffff',
    weekendBg: '#f9f9f9',
    cellBorder: '#f0f0f0',
    todayBorder: '#3b7cff',
    headerWeekend: '#b0a8ff',
    headerNormal: '#999999',
    dateOther: '#cccccc',
    dateNormal: '#333333',
    eventText: '#555555',
    moreText: '#aaaaaa',
    dragBg: '#ffffff',
    dragText: '#333333',
    danger: '#ff3b30',
    axisText: '#999999'
  };
}

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

/**
 * 当前版本安卓 APK 的公开下载地址。
 * 托管在 GitHub Releases（按 tag=apk 固定地址，更新 APK 时覆盖同名资源即可，
 * URL 保持不变，邮件里始终指向「最新版本」）。
 */
export const APK_DOWNLOAD_URL =
  'https://github.com/okydd/smart-calendar/releases/download/apk/smart-calendar.apk';

/** 电脑 / 手机浏览器访问的网页版地址（与 APP 数据完全同步） */
export const WEB_APP_URL = 'https://okydd.github.io/smart-calendar/';

/** APK 发布页（可查看历史版本 / 手动下载） */
export const APK_RELEASE_PAGE = 'https://github.com/okydd/smart-calendar/releases/tag/apk';

/**
 * 一键回退令牌（可选）。
 * 留空时，「版本历史」页的「回退」按钮仅做提示（需开发者用 scripts/rollback.mjs 执行），
 * 不会把任何密钥写进前端。若填入一个仅含 `actions:write` 或 `contents:write` 权限的
 * 细粒度 PAT，则可在 APP 内直接触发回退。公开仓库下请勿填入高权限令牌。
 */
export const ROLLBACK_PAT = '';
