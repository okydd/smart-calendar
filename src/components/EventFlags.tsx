import type { CalendarEvent } from '../types';

/**
 * 事件名称行最右侧的「注 / 图」色块标注。
 * - 有备注：蓝色色块「注」
 * - 有图片：紫色色块「图」
 * 日历提醒行与办事清单共用，确保两端效果一致。
 */
export default function EventFlags({ e }: { e: CalendarEvent }) {
  const hasNote = !!(e.description && e.description.trim());
  const hasImg = !!(e.images && e.images.length > 0);
  if (!hasNote && !hasImg) return null;
  return (
    <span className="ev-flags-mini">
      {hasNote && (
        <span className="ev-chip ev-chip-note" title="有备注">
          注
        </span>
      )}
      {hasImg && (
        <span className="ev-chip ev-chip-img" title="有图片">
          图
        </span>
      )}
    </span>
  );
}
