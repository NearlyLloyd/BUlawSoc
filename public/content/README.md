# Content updates (no coding needed)

Use the CMS admin panel:

- `https://nearlylloyd.github.io/BUlawSoc/admin/`

The CMS edits these files:

- `public/content/events.json`
- `public/content/newsletters.json`
- `public/content/committee.json`

It also uploads newsletter PDFs to:

- `public/newsletters/`

And committee headshots to:

- `public/content/committee/`

## If you edit JSON manually

### Events format

```json
{
  "events": [
    {
      "date": "12 OCT 2026",
      "title": "Event title",
      "detail": "Short event description",
      "location": "Optional location"
    }
  ]
}
```

### Newsletters format

```json
{
  "newsletters": [
    {
      "date": "July 2026",
      "title": "Newsletter title",
      "summary": "One short summary sentence",
      "fileUrl": "/newsletters/july-2026.pdf"
    }
  ]
}
```

### Committee format

```json
{
  "members": [
    {
      "name": "Full name",
      "role": "Committee role",
      "description": "Short bio",
      "image": "/content/committee/example.jpg"
    }
  ]
}
```

Notes:

- `location` is optional.
- `fileUrl` is optional.
- Newsletters are grouped automatically by Season + Year from the `date` field.
- For best in-site preview, `fileUrl` should point directly to a PDF.
