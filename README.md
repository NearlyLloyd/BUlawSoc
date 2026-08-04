# BU Law Society Website (Development in progress)

React + TypeScript + Vite website for Brighton University Law Society.

## Tech stack

- React 19
- TypeScript
- Vite
- React Router
- ESLint

## Getting started

Requirements:

- Node.js 20+ recommended
- npm

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run lint checks:

```bash
npm run lint
```

## Project structure

```text
public/
  content/
    events.json
    newsletters.json
src/
  components/
    SiteLayout.tsx
    SocietyMemberCard.tsx
  pages/
    HomePage.tsx
    SocietyPage.tsx
    JoiningPage.tsx
    NewsletterPage.tsx
    EventsPage.tsx
    ContactPage.tsx
  App.tsx
```

## Routes

The router is configured in `src/App.tsx`.

- `/` -> Home
- `/society` -> The Society
- `/joining` -> Joining
- `/newsletter` -> Newsletter viewer
- `/events` -> Events
- `/contact` -> Contact
- `*` -> Redirects to `/`

## Content updates (non-developers)

Website content is loaded from JSON files in `public/content`:

- `public/content/events.json`
- `public/content/newsletters.json`

These files can be updated without changing React code.

For detailed editor-friendly instructions, see `public/content/README.md`.

## Events data format

Each event entry uses:

```json
{
  "date": "12 OCT",
  "title": "Autumn Networking Reception",
  "detail": "Meet local chambers, firms, and legal aid organisations.",
  "location": "Mithras House, Room 2.14"
}
```

`location` is optional.

## Newsletter data format

Each newsletter entry uses:

```json
{
  "date": "July 2026",
  "title": "Summer Careers Briefing",
  "summary": "Internship updates, legal clinic opportunities, and exam support information.",
  "fileUrl": "/newsletters/july-2026.pdf"
}
```

`fileUrl` is optional.

Notes:

- Newsletters are grouped automatically by Season + Year using the `date` value.
- For in-site previews, use direct PDF URLs or paths under `public` (for example `/newsletters/july-2026.pdf`).
- The viewer appends PDF hash options to hide toolbar/navigation panes when possible.

## Deployment notes

- Static assets in `public` are served from the site root.
- Relative content fetches (`/content/events.json`, `/content/newsletters.json`) are used by the app.
- Ensure newsletter PDF files referenced by `fileUrl` are publicly accessible.

