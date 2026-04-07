# Interactive Wall Calendar

A production-style Next.js App Router project that recreates the feel of a physical wall calendar with a prominent hero image, responsive monthly grid, date-range selection, and browser-persisted notes.

## Features

- Physical wall calendar inspired layout with decorative binding
- Prominent hero artwork with editorial month presentation
- Current month grid with correct weekday alignment
- Previous and next month navigation
- Current day highlighting
- Start and end date range selection with in-between highlighting
- General notes and selected-range notes
- `localStorage` persistence with sample starter notes
- Responsive design for desktop and mobile
- Tailwind CSS styling with glassmorphism-inspired panels and subtle motion
- Weekend emphasis for faster scanning

## Project Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  InteractiveWallCalendar.tsx
  HeroPanel.tsx
  calendar/
    Calendar.tsx
    DayCell.tsx
  notes/
    NotesPanel.tsx
lib/
  date.ts
public/
  hero-calendar.svg
types/
  calendar.ts
.eslintrc.json
next-env.d.ts
next.config.mjs
package.json
postcss.config.js
tailwind.config.ts
tsconfig.json
README.md
```

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open your browser:

```text
http://localhost:3000
```

## Notes Persistence

The app stores notes in your browser under the `interactive-wall-calendar-notes` key. Clearing local storage will reset the sample notes.
