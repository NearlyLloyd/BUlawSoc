# Content updates (no coding needed)

The website reads events and newsletter entries from these files:

- `public/content/events.json`
- `public/content/newsletters.json`

## How to add an event

1. Open `events.json`.
2. Copy an existing event object.
3. Paste it before the closing `]` and update the text.
4. Make sure each event object is separated by a comma.

Event format:

```json
{
  "date": "12 OCT",
  "title": "Event title",
  "detail": "Short event description",
  "location": "Optional location"
}
```

## How to add a newsletter

1. Open `newsletters.json`.
2. Copy an existing newsletter object.
3. Paste it before the closing `]` and update the text.
4. Make sure each newsletter object is separated by a comma.

Newsletter format:

```json
{
  "date": "July 2026",
  "title": "Newsletter title",
  "summary": "One short summary sentence",
  "fileUrl": "https://link-to-pdf-or-webpage"
}
```

If you only want text and no link, remove the `fileUrl` line.

Notes:

- Newsletters are grouped automatically by Season + Year based on `date`.
- Example date values: `July 2026`, `October 2026`, `January 2027`.
- For best in-site PDF preview, use a direct `.pdf` URL or a local file path in `public`, for example: `/newsletters/july-2026.pdf`.
