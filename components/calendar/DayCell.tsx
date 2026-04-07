import { CalendarDay } from '@/types/calendar';

type DayCellProps = {
  day: CalendarDay;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  hasPendingStart: boolean;
  onSelect: (dateKey: string) => void;
};

export function DayCell({
  day,
  isRangeStart,
  isRangeEnd,
  isInRange,
  hasPendingStart,
  onSelect,
}: DayCellProps) {
  const isEdge = isRangeStart || isRangeEnd || hasPendingStart;
  const isSelectable = day.isCurrentMonth;

  let textColor = 'text-gray-800';
  if (!day.isCurrentMonth) {
    textColor = 'text-gray-300';
  } else if (isEdge) {
    textColor = 'text-white';
  } else if (isInRange) {
    textColor = 'text-blue-900';
  } else if (day.isWeekend) {
    textColor = 'text-red-400';
  }

  let bgClass = '';
  if (isEdge) {
    bgClass = 'bg-blue-500';
  } else if (isInRange) {
    bgClass = 'bg-blue-50';
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (isSelectable) onSelect(day.dateKey);
      }}
      disabled={!isSelectable}
      className={[
        'relative flex flex-col items-center justify-center border-b border-r border-gray-100 py-3 text-sm transition-colors',
        textColor,
        bgClass,
        isSelectable ? 'cursor-pointer hover:bg-gray-50' : 'cursor-default',
      ].join(' ')}
      aria-pressed={isEdge || isInRange}
      aria-current={day.isToday ? 'date' : undefined}
      aria-label={`Select ${day.dateKey}`}
    >
      <span className="font-medium">{day.dayNumber}</span>
      {day.isToday && !isEdge && (
        <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-red-400" />
      )}
    </button>
  );
}
