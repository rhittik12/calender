import { getMonthDays, isRangeEnd, isRangeStart, isWithinRange, WEEK_DAYS } from '@/lib/date';
import { DateRange } from '@/types/calendar';
import { DayCell } from './DayCell';

type CalendarProps = {
  viewDate: Date;
  selectedRange: DateRange;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onDaySelect: (dateKey: string) => void;
};

export function Calendar({
  viewDate,
  selectedRange,
  onPreviousMonth,
  onNextMonth,
  onDaySelect,
}: CalendarProps) {
  const days = getMonthDays(viewDate);
  const monthName = viewDate.toLocaleString('en-US', { month: 'long' });
  const year = viewDate.getFullYear();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-4xl leading-tight">
          <span className="text-gray-900">{monthName}</span>{' '}
          <span className="text-amber-700/70">{year}</span>
        </h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPreviousMonth}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-sm text-gray-500 transition hover:bg-gray-100"
            aria-label="Previous month"
          >
            &lsaquo;
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-sm text-gray-500 transition hover:bg-gray-100"
            aria-label="Next month"
          >
            &rsaquo;
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-gray-200">
        {WEEK_DAYS.map((weekDay) => (
          <div
            key={weekDay}
            className="py-2 text-center text-[0.7rem] font-semibold uppercase tracking-wider text-gray-400"
          >
            {weekDay}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 border-l border-t border-gray-100">
        {days.map((day) => {
          const rangeStart = isRangeStart(day.dateKey, selectedRange);
          const rangeEnd = isRangeEnd(day.dateKey, selectedRange);
          const inRange = isWithinRange(day.dateKey, selectedRange);
          const pendingStart = selectedRange.start === day.dateKey && !selectedRange.end;

          return (
            <DayCell
              key={day.dateKey}
              day={day}
              isRangeStart={rangeStart}
              isRangeEnd={rangeEnd}
              isInRange={inRange}
              hasPendingStart={pendingStart}
              onSelect={onDaySelect}
            />
          );
        })}
      </div>
    </div>
  );
}
