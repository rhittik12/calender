import type { ChangeEvent } from 'react';
import { CalendarNote, DateRange, NoteKind } from '@/types/calendar';
import { formatDisplayDate } from '@/lib/date';

type NotesPanelProps = {
  draft: string;
  noteKind: NoteKind;
  selectedRange: DateRange;
  notes: CalendarNote[];
  onDraftChange: (value: string) => void;
  onKindChange: (kind: NoteKind) => void;
  onSave: () => void;
  onDelete: (id: string) => void;
  onClearSelection: () => void;
};

export function NotesPanel({
  draft,
  noteKind,
  selectedRange,
  notes,
  onDraftChange,
  onKindChange,
  onSave,
  onDelete,
  onClearSelection,
}: NotesPanelProps) {
  const hasCompleteRange = Boolean(selectedRange.start && selectedRange.end);

  const filteredNotes = notes.filter((note: CalendarNote) => {
    if (noteKind === 'general') return note.kind === 'general';
    return note.kind === 'range';
  });

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center gap-2">
        <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h2 className="text-lg font-bold text-gray-800">Notes</h2>
      </div>

      <div className="flex rounded-lg bg-gray-50 p-1 mb-8">
        <button
          type="button"
          onClick={() => onKindChange('general')}
          className={`flex-1 rounded-md px-6 py-2.5 text-sm font-medium transition ${
            noteKind === 'general'
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Monthly Memo
        </button>
        <button
          type="button"
          onClick={() => onKindChange('range')}
          className={`flex-1 rounded-md px-6 py-2.5 text-sm font-medium transition ${
            noteKind === 'range'
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Date Notes
        </button>
      </div>

      {noteKind === 'range' && !hasCompleteRange ? (
        <div className="mt-8 text-center text-sm italic text-gray-400">
          Select a date range on the calendar to add notes
        </div>
      ) : (
        <div className="mt-4">
          {noteKind === 'range' && (
            <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
              <span>
                Range: {formatDisplayDate(selectedRange.start ?? '')} &ndash;{' '}
                {formatDisplayDate(selectedRange.end ?? '')}
              </span>
              <button
                type="button"
                onClick={onClearSelection}
                className="text-red-400 transition hover:text-red-500"
              >
                Clear
              </button>
            </div>
          )}

          <textarea
            value={draft}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onDraftChange(event.target.value)}
            rows={5}
            placeholder={
              noteKind === 'range'
                ? 'Write a note for the selected dates...'
                : 'Write your notes for this month...'
            }
            className="w-full resize-y rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-gray-300 focus:bg-white"
          />

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
            </span>
            <button
              type="button"
              onClick={onSave}
              disabled={!draft.trim() || (noteKind === 'range' && !hasCompleteRange)}
              className="rounded-lg bg-gray-800 px-4 py-2 text-xs font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {filteredNotes.length > 0 && (
        <div className="mt-4 space-y-2">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="flex items-start justify-between rounded-lg border border-gray-100 bg-white p-3 text-sm"
            >
              <div className="flex-1">
                {note.kind === 'range' && note.startDate && note.endDate && (
                  <p className="mb-1 text-xs text-gray-400">
                    {formatDisplayDate(note.startDate)} &ndash; {formatDisplayDate(note.endDate)}
                  </p>
                )}
                <p className="text-gray-700">{note.text}</p>
              </div>
              <button
                type="button"
                onClick={() => onDelete(note.id)}
                className="ml-3 text-xs text-gray-300 transition hover:text-red-400"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
