<p align="center">
  <img src="public/calendar.svg" alt="Interactive Wall Calendar — cherry blossom hero" width="280" />
</p>

<h1 align="center">Interactive Wall Calendar</h1>

<p align="center">
  A production-grade <strong>Next.js 14</strong> App Router application that recreates the tactile feel of a physical wall calendar — complete with a hand-crafted cherry-blossom hero illustration, a responsive monthly grid, intuitive date-range selection, and browser-persisted notes.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.2.25-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.6.3-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.17-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-Private-red" alt="License" />
</p>

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Screenshots](#screenshots)
4. [Tech Stack](#tech-stack)
5. [Project Structure](#project-structure)
6. [Architecture & Component Hierarchy](#architecture--component-hierarchy)
7. [Detailed File Reference](#detailed-file-reference)
8. [Getting Started](#getting-started)
9. [Available Scripts](#available-scripts)
10. [Configuration Files](#configuration-files)
11. [Styling & Theming](#styling--theming)
12. [State Management & Data Flow](#state-management--data-flow)
13. [Notes Persistence](#notes-persistence)
14. [Date Utilities API](#date-utilities-api)
15. [Type Definitions](#type-definitions)
16. [Accessibility](#accessibility)
17. [Responsive Design](#responsive-design)
18. [Browser Support](#browser-support)
19. [Deployment](#deployment)
20. [Contributing](#contributing)
21. [Troubleshooting](#troubleshooting)
22. [License](#license)

---

## Overview

**Interactive Wall Calendar** is a single-page web application designed to mimic the experience of a beautifully printed wall calendar. The left panel showcases a custom cherry-blossom SVG landscape illustration, while the right panel contains a fully functional calendar grid with month navigation, click-based date-range selection, and a dual-tab notes system (Monthly Memo + Date Notes). All notes are automatically saved to and restored from the browser's `localStorage`.

---

## Features

### Calendar Grid
- **Accurate month rendering** — dynamically calculates the correct number of weeks per month, including leading/trailing days from adjacent months.
- **Month navigation** — circular previous / next buttons shift the view by one month in either direction.
- **Today indicator** — a small red dot appears beneath today's date number.
- **Weekend highlighting** — Saturday and Sunday numbers are rendered in red for quick visual scanning.
- **Adjacent-month dimming** — days outside the current month are shown in a lighter shade to maintain visual hierarchy.

### Date-Range Selection
- **Two-click selection** — first click sets the start date; second click sets the end date. Clicking again resets.
- **Auto-normalization** — if the end date precedes the start date, the range is automatically swapped.
- **Visual feedback** — the start and end dates receive a blue pill highlight; intermediate dates are shaded with a light blue background.
- **Deselection** — clicking the same date twice clears the selection.

### Notes System
- **Dual tabs** — toggle between *Monthly Memo* (general notes) and *Date Notes* (range-scoped notes).
- **Rich note cards** — saved notes are rendered as cards with delete buttons and date-range labels (for range notes).
- **Draft textarea** — auto-sized textarea with contextual placeholder text.
- **Validation** — the Save button is disabled when the draft is empty or (for range notes) no date range is selected.
- **Counter** — a live note count badge shows how many notes exist in the active tab.
- **Clear selection** — a "Clear" link lets users deselect the date range from within the notes panel.

### Data Persistence
- **localStorage** — notes are serialized to JSON and stored under the key `interactive-wall-calendar-notes`.
- **Runtime type-guard** — data loaded from storage is validated field-by-field with `isCalendarNote()` to prevent corruption from external edits.
- **Sample notes** — on first visit (or after clearing storage), two sample notes are generated: one general and one range note spanning the next two days.

### Design & UX
- **Serif + sans-serif typography** — month names use *DM Serif Display*; body text uses *Inter*.
- **Cherry-blossom hero illustration** — a custom SVG featuring misty mountains, layered hills, a winding stream, a full cherry-blossom tree with floating petals, and a warm springtime palette.
- **Two-column card layout** — on large screens the hero image sits on the left (`2fr`) and the calendar + notes sit on the right (`3fr`); on small screens the layout stacks vertically.
- **Smooth transitions** — buttons and interactive elements use Tailwind `transition` for hover/focus feedback.

---

## Screenshots

> Run the application locally to see the full interactive experience.

| Desktop (two-column) | Mobile (stacked) |
|---|---|
| Hero on left, calendar + notes on right | Hero on top, calendar + notes below |

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | [Next.js](https://nextjs.org/) (App Router) | 14.2.25 |
| **UI Library** | [React](https://react.dev/) | 18.3.1 |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | 5.6.3 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | 3.4.17 |
| **PostCSS** | [PostCSS](https://postcss.org/) + Autoprefixer | 8.4.49 / 10.4.20 |
| **Linting** | [ESLint](https://eslint.org/) + next/core-web-vitals | 8.57.1 |
| **Fonts** | Google Fonts — Inter, DM Serif Display | — |
| **Package Manager** | npm | — |
| **Node Types** | @types/node | 22.10.2 |

---

## Project Structure

```text
interactive-wall-calendar/
├── app/                            # Next.js App Router directory
│   ├── globals.css                 # Global CSS — Tailwind directives, base resets
│   ├── layout.tsx                  # Root layout — fonts, metadata, <html>/<body>
│   └── page.tsx                    # Home page — renders <InteractiveWallCalendar />
│
├── components/                     # React components
│   ├── InteractiveWallCalendar.tsx  # Root client component — state, persistence, layout
│   ├── HeroPanel.tsx               # Left-panel hero image wrapper
│   ├── calendar/
│   │   ├── Calendar.tsx            # Month header, weekday row, day grid
│   │   └── DayCell.tsx             # Individual day button with selection styles
│   └── notes/
│       └── NotesPanel.tsx          # Tabbed notes UI — textarea, cards, actions
│
├── lib/                            # Shared utility functions
│   └── date.ts                     # Date math, formatting, range logic
│
├── public/                         # Static assets served at /
│   └── hero-calendar.svg           # Cherry-blossom landscape illustration (~376 KB)
│
├── types/                          # TypeScript type definitions
│   └── calendar.ts                 # DateRange, CalendarDay, CalendarNote, NoteKind
│
├── .eslintrc.json                  # ESLint config — extends next/core-web-vitals
├── .gitignore                      # Git ignore rules
├── next-env.d.ts                   # Next.js TypeScript environment declarations
├── next.config.mjs                 # Next.js config — unoptimized images
├── package.json                    # Project metadata, scripts, dependencies
├── package-lock.json               # Deterministic dependency tree
├── postcss.config.js               # PostCSS plugins — tailwindcss, autoprefixer
├── tailwind.config.ts              # Tailwind theme — custom font families
├── tsconfig.json                   # TypeScript compiler options
└── README.md                       # This file
```

---

## Architecture & Component Hierarchy

```text
RootLayout (app/layout.tsx)  [Server Component]
 └─ HomePage (app/page.tsx)  [Server Component]
     └─ InteractiveWallCalendar  [Client Component — 'use client']
         ├─ HeroPanel             [Server Component — Next.js <Image>]
         ├─ Calendar              [Server Component]
         │   └─ DayCell × N       [Server Component — <button>]
         └─ NotesPanel            [Server Component]
```

### Data flow

```
InteractiveWallCalendar
  │
  ├── viewDate (Date)             ──► Calendar ──► DayCell
  ├── selectedRange (DateRange)   ──► Calendar ──► DayCell
  │                               ──► NotesPanel
  ├── notes (CalendarNote[])      ──► NotesPanel
  ├── draft (string)              ──► NotesPanel
  ├── noteKind (NoteKind)         ──► NotesPanel
  │
  └── Callbacks (lifted state)
        onDaySelect ◄── Calendar ◄── DayCell
        onDraftChange ◄── NotesPanel
        onKindChange ◄── NotesPanel
        onSave ◄── NotesPanel
        onDelete ◄── NotesPanel
        onClearSelection ◄── NotesPanel
```

All state lives in `InteractiveWallCalendar` and flows down via props. Child components are purely presentational — they receive data and fire callbacks.

---

## Detailed File Reference

### `app/layout.tsx`
- **Purpose:** Root layout for the entire application.
- **Fonts loaded:** `Inter` (sans-serif, variable `--font-inter`) and `DM Serif Display` (serif, variable `--font-display`) via `next/font/google`.
- **Metadata:** Sets the HTML `<title>` to *"Interactive Wall Calendar"* and the meta description.
- **Body classes:** Applies font CSS variables and enables `antialiased` rendering.

### `app/page.tsx`
- **Purpose:** The single route (`/`) that renders the calendar.
- **Exports:** Default server component that mounts `<InteractiveWallCalendar />`.

### `app/globals.css`
- **Purpose:** Tailwind directives and minimal global resets.
- **Key rules:**
  - `color-scheme: light` — forces light mode.
  - `body` background: `#f3f4f6` (Tailwind `gray-100`).
  - Form elements inherit font from parent.
  - `::selection` uses a soft blue highlight.

### `components/InteractiveWallCalendar.tsx`
- **Directive:** `'use client'` — enables React hooks.
- **State:**
  - `viewDate` — first day of the currently displayed month.
  - `selectedRange` — `{ start, end }` date keys or `null`.
  - `notes` — array of `CalendarNote` objects.
  - `draft` — current textarea content.
  - `noteKind` — active tab (`'general'` or `'range'`).
  - `isLoaded` — guard to prevent writing to localStorage before hydration.
- **Effects:**
  1. **Load effect** — reads localStorage on mount, validates with `isCalendarNote()`, falls back to sample notes.
  2. **Persist effect** — writes notes to localStorage whenever they change (after initial load).
- **Helper functions:**
  - `createSampleNotes(today)` — generates one general + one range note.
  - `createNoteId()` — uses `crypto.randomUUID()` with a `Date.now()` fallback.
  - `isCalendarNote(value)` — runtime type guard for deserialized data.
  - `normalizeNotes(notes)` — sorts notes newest-first by `createdAt`.
- **Render:** Two-column grid inside a `max-w-5xl` white card with rounded corners and shadow.

### `components/HeroPanel.tsx`
- **Purpose:** Renders the cherry-blossom SVG hero image using Next.js `<Image>`.
- **Props:** None.
- **Sizing:** `min-h-[300px]` on small screens; fills parent height on large screens. `object-cover` ensures the image fills the container without distortion.

### `components/calendar/Calendar.tsx`
- **Props:** `viewDate`, `selectedRange`, `onPreviousMonth`, `onNextMonth`, `onDaySelect`.
- **Sections:**
  1. **Header** — serif month name + year, circular nav buttons.
  2. **Weekday row** — 7-column grid with abbreviated day names (`Sun`–`Sat`).
  3. **Day grid** — 7-column grid of `<DayCell>` buttons with range logic pre-computed.

### `components/calendar/DayCell.tsx`
- **Props:** `day` (CalendarDay), `isRangeStart`, `isRangeEnd`, `isInRange`, `hasPendingStart`, `onSelect`.
- **Visual logic:**
  - **Text color:** white for selection edges, red for weekends, gray for current/adjacent months, blue for in-range.
  - **Background:** blue for edges, light blue for in-range, transparent otherwise.
  - **Today dot:** red dot absolutely positioned below the number (hidden when selected).
- **Accessibility:** `aria-pressed`, `aria-current="date"`, descriptive `aria-label`.

### `components/notes/NotesPanel.tsx`
- **Props:** `draft`, `noteKind`, `selectedRange`, `notes`, `onDraftChange`, `onKindChange`, `onSave`, `onDelete`, `onClearSelection`.
- **Sections:**
  1. **Header** — document icon SVG + "Notes" title.
  2. **Tab bar** — pill-style toggle between *Monthly Memo* and *Date Notes*.
  3. **Empty state** — italic message shown when range tab is active but no range is selected.
  4. **Editor** — range label with clear button, textarea, note count, save button.
  5. **Note list** — filtered cards with date labels and delete buttons.

### `lib/date.ts`
- Pure functions — no side effects, no React dependency.
- Exports: `WEEK_DAYS`, `getMonthLabel`, `getRangeLabel`, `formatDisplayDate`, `formatStorageMonth`, `shiftMonth`, `toDateKey`, `getMonthDays`, `isWithinRange`, `isRangeStart`, `isRangeEnd`, `normalizeRange`, `getNextRange`.
- See [Date Utilities API](#date-utilities-api) for full signatures.

### `types/calendar.ts`
- `DateRange` — `{ start: string | null; end: string | null }`
- `CalendarDay` — `{ dateKey, dayNumber, isCurrentMonth, isToday, isWeekend }`
- `NoteKind` — `'general' | 'range'`
- `CalendarNote` — `{ id, kind, text, createdAt, startDate, endDate }`

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.17.0
- **npm** >= 9 (ships with Node 18+)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/rhittik12/calender.git
cd calender

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

### Open in browser

```
http://localhost:3000
```

The dev server supports hot-module replacement — edits to components, styles, and utilities are reflected instantly.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js development server on port 3000 with HMR |
| `npm run build` | Create an optimized production build in `.next/` |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint with `next/core-web-vitals` rules |

---

## Configuration Files

### `next.config.mjs`
```js
const nextConfig = {
  images: {
    unoptimized: true,   // Serve the SVG directly without Next.js image optimization
  },
};
```

### `tailwind.config.ts`
- **Content paths:** `app/`, `components/`, `lib/` — ensures Tailwind tree-shakes unused classes.
- **Custom fonts:**
  - `font-sans` → Inter via CSS variable `--font-inter`.
  - `font-display` → DM Serif Display via CSS variable `--font-display`.

### `tsconfig.json`
- **Target:** ES2017.
- **Module resolution:** Bundler (recommended for Next.js 14+).
- **Strict mode:** Enabled.
- **Path alias:** `@/*` maps to the project root.
- **Incremental compilation:** Enabled for faster rebuilds.

### `postcss.config.js`
- Plugins: `tailwindcss` + `autoprefixer`.

### `.eslintrc.json`
- Extends `next/core-web-vitals` — includes React, import, and accessibility rules.

---

## Styling & Theming

### Color Palette

| Token | Hex / Class | Usage |
|---|---|---|
| Background | `#f3f4f6` / `gray-100` | Page background |
| Card | `#ffffff` / `white` | Main calendar card |
| Primary text | `gray-800` | Day numbers, headings |
| Secondary text | `gray-400` / `gray-500` | Weekday names, labels, placeholders |
| Weekend | `red-400` | Saturday/Sunday day numbers |
| Today dot | `red-400` | Small dot below today's number |
| Selection edge | `blue-500` | Start/end date pill |
| Selection fill | `blue-50` | In-range day background |
| Year accent | `amber-700/70` | Year number in calendar header |
| Save button | `gray-800` | Dark button with white text |
| Tab active | `white` with `shadow-sm` | Active tab in notes panel |
| Tab inactive | `gray-50` | Tab bar background |

### Typography

| Usage | Font Family | Weight | Size |
|---|---|---|---|
| Month name | DM Serif Display (`font-display`) | 400 | `text-4xl` |
| Body / UI | Inter (`font-sans`) | 400–600 | `text-sm` to `text-lg` |
| Weekday labels | Inter | 600 | `text-[0.7rem]` uppercase |

### Spacing & Layout

- **Main card:** `max-w-5xl`, `rounded-2xl`, `shadow-xl`.
- **Grid:** `grid-cols-1` → `lg:grid-cols-[2fr_3fr]`.
- **Right panel padding:** `p-6` → `sm:p-8` → `lg:p-10`.
- **Day grid:** `grid-cols-7` with 1px gray borders.
- **Notes section:** `mt-8` from the calendar grid.

---

## State Management & Data Flow

All application state is co-located in the `InteractiveWallCalendar` client component:

```
┌─────────────────────────────────────────────────┐
│          InteractiveWallCalendar (state)         │
│                                                 │
│  viewDate ──────────────► Calendar              │
│  selectedRange ─────────► Calendar + NotesPanel │
│  notes ─────────────────► NotesPanel            │
│  draft ─────────────────► NotesPanel            │
│  noteKind ──────────────► NotesPanel            │
│                                                 │
│  ◄── onDaySelect          (Calendar/DayCell)    │
│  ◄── onPreviousMonth      (Calendar)            │
│  ◄── onNextMonth          (Calendar)            │
│  ◄── onDraftChange        (NotesPanel)          │
│  ◄── onKindChange         (NotesPanel)          │
│  ◄── onSave               (NotesPanel)          │
│  ◄── onDelete             (NotesPanel)          │
│  ◄── onClearSelection     (NotesPanel)          │
└─────────────────────────────────────────────────┘
```

No external state libraries (Redux, Zustand, etc.) are used. The pattern is classic **lifted state** with unidirectional data flow.

---

## Notes Persistence

### Storage Key

```
interactive-wall-calendar-notes
```

### Lifecycle

1. **Mount** — `useEffect` reads `localStorage`, parses JSON, validates every element with `isCalendarNote()`.
2. **Fallback** — if storage is empty, corrupt, or absent, `createSampleNotes()` generates defaults.
3. **Sync** — a second `useEffect` writes the `notes` array to localStorage on every change (guarded by `isLoaded` to avoid overwriting on hydration).
4. **Ordering** — notes are always sorted newest-first via `normalizeNotes()`.

### Type Guard

```typescript
function isCalendarNote(value: unknown): value is CalendarNote {
  // Checks: object with id (string), kind ('general'|'range'),
  // text (string), createdAt (string),
  // startDate (string|null), endDate (string|null)
}
```

This prevents the application from crashing if localStorage is externally modified.

---

## Date Utilities API

All functions are exported from `lib/date.ts`:

| Function | Signature | Description |
|---|---|---|
| `WEEK_DAYS` | `string[]` | `['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']` |
| `getMonthLabel` | `(date: Date) => string` | e.g. `"January 2025"` via `Intl.DateTimeFormat` |
| `getRangeLabel` | `(range: DateRange) => string` | Human-readable range description |
| `formatDisplayDate` | `(dateKey: string) => string` | e.g. `"Jan 5, 2025"` |
| `formatStorageMonth` | `(date: Date) => string` | e.g. `"2025-01"` |
| `shiftMonth` | `(date: Date, direction: number) => Date` | Returns a new Date offset by N months |
| `toDateKey` | `(date: Date) => string` | e.g. `"2025-01-05"` — zero-padded ISO-style |
| `getMonthDays` | `(viewDate: Date) => CalendarDay[]` | Full grid (5 or 6 weeks) with metadata |
| `isWithinRange` | `(dateKey: string, range: DateRange) => boolean` | Exclusive of endpoints |
| `isRangeStart` | `(dateKey: string, range: DateRange) => boolean` | Matches start |
| `isRangeEnd` | `(dateKey: string, range: DateRange) => boolean` | Matches end |
| `normalizeRange` | `(start: string, end: string) => DateRange` | Swaps if `start > end` |
| `getNextRange` | `(currentRange: DateRange, clickedDate: string) => DateRange` | State machine for click-based selection |

---

## Type Definitions

Defined in `types/calendar.ts`:

```typescript
type DateRange = {
  start: string | null;
  end: string | null;
};

type CalendarDay = {
  dateKey: string;      // "YYYY-MM-DD"
  dayNumber: number;    // 1–31
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
};

type NoteKind = 'general' | 'range';

type CalendarNote = {
  id: string;           // UUID or fallback
  kind: NoteKind;
  text: string;
  createdAt: string;    // ISO 8601
  startDate: string | null;
  endDate: string | null;
};
```

---

## Accessibility

- **Semantic HTML:** `<main>`, `<h1>`, `<h2>`, `<button>`, `<textarea>`.
- **ARIA attributes:**
  - `aria-label` on every day button (e.g. `"Select 2025-04-07"`).
  - `aria-pressed` on selected/in-range days.
  - `aria-current="date"` on today's cell.
  - `aria-label` on navigation buttons (`"Previous month"`, `"Next month"`).
- **Keyboard support:** All interactive elements are native `<button>` or `<textarea>` — fully keyboard-navigable and screen-reader-friendly.
- **Color contrast:** Text colors meet WCAG AA contrast ratios against their backgrounds.
- **Disabled states:** Day cells outside the current month are `disabled`; the Save button is `disabled` when conditions are unmet.

---

## Responsive Design

| Breakpoint | Layout |
|---|---|
| `< 1024px` (default) | Single column — hero image stacks above calendar and notes |
| `>= 1024px` (`lg:`) | Two-column grid — `2fr` hero | `3fr` content |

Additional responsive tokens:
- **Page padding:** `p-4` → `sm:p-6` → `lg:p-8`.
- **Content padding:** `p-6` → `sm:p-8` → `lg:p-10`.
- **Hero min-height:** `min-h-[300px]` on mobile; fills parent on desktop.

---

## Browser Support

| Browser | Supported |
|---|---|
| Chrome / Edge (latest) | Yes |
| Firefox (latest) | Yes |
| Safari 15.4+ | Yes |
| Mobile Safari / Chrome | Yes |
| IE 11 | No |

> `crypto.randomUUID()` is used with a `Date.now()` + `Math.random()` fallback for older browsers.

---

## Deployment

### Vercel (recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Next.js on Vercel requires zero configuration. The `images.unoptimized: true` setting in `next.config.mjs` ensures the SVG hero is served directly.

### Netlify

```bash
npm run build
# Deploy the .next directory using the @netlify/plugin-nextjs adapter
```

### Static Export

If a fully static site is preferred:

```js
// next.config.mjs
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
};
```

Then run `npm run build` — the output will be in the `out/` directory, deployable to any static host.

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m "Add your feature"`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a Pull Request.

Please ensure:
- All code passes `npm run lint`.
- TypeScript strict mode has no errors (`npm run build`).
- New components follow the existing pattern (typed props, pure presentation, callbacks for state changes).

---

## Troubleshooting

| Issue | Solution |
|---|---|
| **`npm run dev` fails** | Ensure Node.js >= 18.17.0. Delete `node_modules` and `package-lock.json`, then run `npm install`. |
| **Styles not loading** | Verify `globals.css` imports Tailwind directives. Run `npm run dev` to trigger PostCSS. |
| **Notes disappear** | Notes are stored in `localStorage`. Check the key `interactive-wall-calendar-notes` in DevTools → Application → Local Storage. |
| **SVG not rendering** | The hero image is at `public/hero-calendar.svg`. Ensure the file exists and `images.unoptimized` is `true` in `next.config.mjs`. |
| **TypeScript path errors** | Confirm `tsconfig.json` has `"@/*": ["./*"]` under `paths` and `"baseUrl": "."`. |
| **Fonts not loading** | `next/font/google` requires an internet connection on first build to download font files. |

---

## License

This project is **private**. All rights reserved.

---

<p align="center">
  Built with Next.js, React, TypeScript, and Tailwind CSS.
</p>
