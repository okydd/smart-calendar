// 日历事件数据模型与全局类型定义

/** 预定义标签颜色分类 */
export type TagColor = 'purple' | 'green' | 'orange' | 'red' | 'blue' | 'pink';

/** 视图模式 */
export type ViewMode = 'month' | 'week' | 'day';

/** 单个日历事件 */
export interface CalendarEvent {
  /** 唯一 ID */
  id: string;
  /** 事件标题（必填） */
  title: string;
  /** 事件日期 YYYY-MM-DD */
  date: string;
  /** 开始时间 HH:mm，全天事件为空 */
  startTime: string;
  /** 结束时间 HH:mm */
  endTime: string;
  /** 是否全天事件 */
  allDay: boolean;
  /** 事件描述（可选） */
  description?: string;
  /** 标签/颜色分类 */
  tag: TagColor;
  /** 是否标记为重点/重要事件（重要事件在提醒列表显示彩色左边框） */
  important?: boolean;
  /** 关联图片（dataURL 数组，最多 10 张） */
  images?: string[];
  /** 提前提醒设置（null 表示不提醒）；通过微信推送 */
  reminder?: { unit: 'day' | 'hour'; value: number } | null;
  /** 是否已完成（办事清单勾选状态） */
  done?: boolean;
  /** 最后修改时间（ISO 字符串），云同步冲突判定依据 */
  updatedAt?: string;
  /** 软删除墓碑标记：true 表示已删除，仅用于同步传播，界面不展示 */
  deleted?: boolean;
}

/** 云同步状态 */
export type SyncStatus =
  | 'disabled' // 未配置 Supabase
  | 'signedOut' // 已配置但未登录
  | 'idle' // 已登录，空闲
  | 'syncing' // 同步中
  | 'error' // 同步出错
  | 'offline'; // 网络不可用

/** 导出图片的日期范围选项 */
export type ExportRange = 'week' | 'month' | 'custom';
