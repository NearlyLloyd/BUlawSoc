const events = [
  {
    date: '12 OCT',
    title: 'Autumn Networking Reception',
    detail: 'Meet local chambers, firms, and legal aid organisations.',
  },
  {
    date: '22 OCT',
    title: 'Advocacy Skills Workshop',
    detail: 'Practical submissions training and courtroom speaking drills.',
  },
  {
    date: '06 NOV',
    title: 'Women in Law Panel',
    detail: 'A candid panel on leadership, access, and career pathways.',
  },
]

export function EventsPage() {
  return (
    <main className="page-shell">
      <p className="page-eyebrow">Events</p>
      <h1>What is coming up</h1>

      <div className="events-grid">
        {events.map((event) => (
          <article className="event-card" key={event.title}>
            <p className="event-card__date">{event.date}</p>
            <h2>{event.title}</h2>
            <p>{event.detail}</p>
          </article>
        ))}
      </div>
    </main>
  )
}
