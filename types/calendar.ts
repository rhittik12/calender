export type DateRange = {
  start: string | null;
  end: string | null;
};

export type CalendarDay = {
  dateKey: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
};

export type NoteKind = 'general' | 'range';

export type CalendarNote = {
  id: string;
  kind: NoteKind;
  text: string;
  createdAt: string;
  startDate: string | null;
  endDate: string | null;
};
