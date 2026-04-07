import { CalendarDay, DateRange } from '@/types/calendar';

export const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function getMonthLabel(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function getRangeLabel(range: DateRange) {
  if (!range.start && !range.end) {
    return 'No date range selected';
  }

  if (range.start && !range.end) {
    return `${formatDisplayDate(range.start)} selected as start date`;
  }

  if (range.start && range.end) {
    return `${formatDisplayDate(range.start)} - ${formatDisplayDate(range.end)}`;
  }

  return 'No date range selected';
}

export function formatDisplayDate(dateKey: string) {
  const [year, month, day] = dateKey.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatStorageMonth(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function shiftMonth(date: Date, direction: number) {
  return new Date(date.getFullYear(), date.getMonth() + direction, 1);
}

export function toDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}`;
}

export function getMonthDays(viewDate: Date): CalendarDay[] {
  const startOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const endOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);
  const startOffset = startOfMonth.getDay();
  const totalDays = endOfMonth.getDate();
  const days: CalendarDay[] = [];
  const todayKey = toDateKey(new Date());

  const totalCells = Math.ceil((startOffset + totalDays) / 7) * 7;

  for (let index = 0; index < totalCells; index += 1) {
    const dayNumber = index - startOffset + 1;
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), dayNumber);
    const dateKey = toDateKey(date);
    const isCurrentMonth = dayNumber > 0 && dayNumber <= totalDays;

    days.push({
      dateKey,
      dayNumber: date.getDate(),
      isCurrentMonth,
      isToday: dateKey === todayKey,
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
    });
  }

  return days;
}

export function isWithinRange(dateKey: string, range: DateRange) {
  if (!range.start || !range.end) {
    return false;
  }

  return dateKey > range.start && dateKey < range.end;
}

export function isRangeStart(dateKey: string, range: DateRange) {
  return range.start === dateKey;
}

export function isRangeEnd(dateKey: string, range: DateRange) {
  return range.end === dateKey;
}

export function normalizeRange(start: string, end: string): DateRange {
  if (start <= end) {
    return { start, end };
  }

  return { start: end, end: start };
}

export function getNextRange(currentRange: DateRange, clickedDate: string): DateRange {
  if (!currentRange.start && !currentRange.end) {
    return { start: clickedDate, end: null };
  }

  if (currentRange.start && !currentRange.end) {
    if (currentRange.start === clickedDate) {
      return { start: null, end: null };
    }

    return normalizeRange(currentRange.start, clickedDate);
  }

  return { start: clickedDate, end: null };
}
