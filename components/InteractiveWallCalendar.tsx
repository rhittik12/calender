'use client';

import { useEffect, useState } from 'react';
import { Calendar } from '@/components/calendar/Calendar';
import { HeroPanel } from '@/components/HeroPanel';
import { NotesPanel } from '@/components/notes/NotesPanel';
import { getNextRange, shiftMonth, toDateKey } from '@/lib/date';
import { CalendarNote, DateRange, NoteKind } from '@/types/calendar';

const STORAGE_KEY = 'interactive-wall-calendar-notes';

function createSampleNotes(today: Date): CalendarNote[] {
  const start = toDateKey(today);
  const end = toDateKey(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2));

  return [
    {
      id: 'sample-general-note',
      kind: 'general',
      text: 'Sample note: review priorities for the month and highlight important milestones.',
      createdAt: new Date().toISOString(),
      startDate: null,
      endDate: null,
    },
    {
      id: 'sample-range-note',
      kind: 'range',
      text: 'Sample range note: prepare travel checklist and confirm bookings for this window.',
      createdAt: new Date().toISOString(),
      startDate: start,
      endDate: end,
    },
  ];
}

function createNoteId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function isCalendarNote(value: unknown): value is CalendarNote {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    (candidate.kind === 'general' || candidate.kind === 'range') &&
    typeof candidate.text === 'string' &&
    typeof candidate.createdAt === 'string' &&
    (candidate.startDate === null || typeof candidate.startDate === 'string') &&
    (candidate.endDate === null || typeof candidate.endDate === 'string')
  );
}

function normalizeNotes(notes: CalendarNote[]) {
  return [...notes].sort((firstNote, secondNote) => {
    const firstTimestamp = new Date(firstNote.createdAt).getTime();
    const secondTimestamp = new Date(secondNote.createdAt).getTime();

    return secondTimestamp - firstTimestamp;
  });
}

export function InteractiveWallCalendar() {
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedRange, setSelectedRange] = useState<DateRange>({ start: null, end: null });
  const [notes, setNotes] = useState<CalendarNote[]>([]);
  const [draft, setDraft] = useState('');
  const [noteKind, setNoteKind] = useState<NoteKind>('general');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);

      if (raw) {
        const parsed = JSON.parse(raw) as unknown;

        if (Array.isArray(parsed) && parsed.every(isCalendarNote)) {
          setNotes(normalizeNotes(parsed));
        } else {
          setNotes(createSampleNotes(new Date()));
        }
      } else {
        setNotes(createSampleNotes(new Date()));
      }
    } catch {
      setNotes(createSampleNotes(new Date()));
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [isLoaded, notes]);



  const handleDaySelect = (dateKey: string) => {
    setSelectedRange((currentRange: DateRange) => getNextRange(currentRange, dateKey));
  };

  const handleSaveNote = () => {
    const text = draft.trim();

    if (!text) {
      return;
    }

    if (noteKind === 'range' && !(selectedRange.start && selectedRange.end)) {
      return;
    }

    const note: CalendarNote = {
      id: createNoteId(),
      kind: noteKind,
      text,
      createdAt: new Date().toISOString(),
      startDate: noteKind === 'range' ? selectedRange.start : null,
      endDate: noteKind === 'range' ? selectedRange.end : null,
    };

    setNotes((currentNotes: CalendarNote[]) => normalizeNotes([note, ...currentNotes]));
    setDraft('');
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
          <div className="overflow-hidden">
            <HeroPanel />
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <Calendar
              viewDate={viewDate}
              selectedRange={selectedRange}
              onPreviousMonth={() => setViewDate((current: Date) => shiftMonth(current, -1))}
              onNextMonth={() => setViewDate((current: Date) => shiftMonth(current, 1))}
              onDaySelect={handleDaySelect}
            />

            <NotesPanel
              draft={draft}
              noteKind={noteKind}
              selectedRange={selectedRange}
              notes={notes}
              onDraftChange={setDraft}
              onKindChange={setNoteKind}
              onSave={handleSaveNote}
              onDelete={(id) =>
                setNotes((currentNotes: CalendarNote[]) => currentNotes.filter((note: CalendarNote) => note.id !== id))
              }
              onClearSelection={() => setSelectedRange({ start: null, end: null })}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
