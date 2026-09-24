import { useEffect, useState } from 'react'

type EventItem = {
  date: string
  title: string
  detail: string
  location?: string
}

type EventsContent = {
  events?: EventItem[]
}

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}content/events.json`)

        if (!response.ok) {
          throw new Error('Could not load events content.')
        }

        const data: unknown = await response.json()

        const parsedEvents = Array.isArray(data)
          ? (data as EventItem[])
          : (data as EventsContent).events

        if (!Array.isArray(parsedEvents)) {
          throw new Error('Events content is in an invalid format.')
        }

        setEvents(parsedEvents)
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : 'An unknown error occurred while loading events.',
        )
      } finally {
        setIsLoading(false)
      }
    }

    void loadEvents()
  }, [])

  return (
    <main className="page-shell">
      <p className="page-eyebrow">Events</p>
      <h1>What is coming up</h1>

      {isLoading && <p>Loading events...</p>}
      {error && <p>{error}</p>}

      {!isLoading && !error && events.length === 0 && (
        <p>No events published yet.</p>
      )}

      <div className="events-grid">
        {events.map((event) => (
          <article className="event-card" key={event.title} id={slugifyTitle(event.title)}>
            <p className="content-meta-date">{event.date}</p>
            <h2>{event.title}</h2>
            <p>{event.detail}</p>
            {event.location && <p className="event-card__location">{event.location}</p>}
          </article>
        ))}
      </div>
    </main>
  )
}
