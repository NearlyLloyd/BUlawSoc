import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

type EventItem = {
  date: string
  title: string
}

type NewsletterItem = {
  date: string
  title: string
}

type NewsUpdate = {
  id: string
  title: string
  href: string
  timestamp: number
}

const monthIndexByAbbrev: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
}

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseEventDateToTimestamp(dateLabel: string): number {
  const match = dateLabel.match(/^(\d{1,2})\s+([A-Za-z]{3})$/)

  if (!match) {
    return Number.NEGATIVE_INFINITY
  }

  const day = Number(match[1])
  const monthIndex = monthIndexByAbbrev[match[2].toLowerCase()]

  if (monthIndex === undefined) {
    return Number.NEGATIVE_INFINITY
  }

  const year = new Date().getFullYear()
  return new Date(year, monthIndex, day).getTime()
}

function parseMonthYearToTimestamp(dateLabel: string): number {
  const parsed = Date.parse(`1 ${dateLabel}`)
  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed
}

const heroBackgroundImages = [
  `${import.meta.env.BASE_URL}content/hero/learn-from-yesterday-1.jpg`,
  `${import.meta.env.BASE_URL}content/hero/learn-from-yesterday-2.jpg`,
  `${import.meta.env.BASE_URL}content/hero/learn-from-yesterday-3.jpg`,
]

const heroSlideIntervalMs = 10000

export function HomePage() {
  const [updates, setUpdates] = useState<NewsUpdate[]>([])
  const [activeHeroSlide, setActiveHeroSlide] = useState(0)

  useEffect(() => {
    async function loadUpdates() {
      try {
        const [eventsResponse, newslettersResponse] = await Promise.all([
          fetch(`${import.meta.env.BASE_URL}content/events.json`),
          fetch(`${import.meta.env.BASE_URL}content/newsletters.json`),
        ])

        if (!eventsResponse.ok || !newslettersResponse.ok) {
          throw new Error('Could not load latest updates.')
        }

        const [eventsData, newslettersData] = (await Promise.all([
          eventsResponse.json(),
          newslettersResponse.json(),
        ])) as [unknown, unknown]

        const eventUpdates = Array.isArray(eventsData)
          ? (eventsData as EventItem[]).map((item) => ({
              id: `event-${slugifyTitle(item.title)}`,
              title: item.title,
              href: `/events#${slugifyTitle(item.title)}`,
              timestamp: parseEventDateToTimestamp(item.date),
            }))
          : []

        const newsletterUpdates = Array.isArray(newslettersData)
          ? (newslettersData as NewsletterItem[]).map((item) => ({
              id: `newsletter-${slugifyTitle(item.title)}`,
              title: item.title,
              href: '/newsletter',
              timestamp: parseMonthYearToTimestamp(item.date),
            }))
          : []

        setUpdates([...eventUpdates, ...newsletterUpdates])
      } catch {
        setUpdates([])
      }
    }

    void loadUpdates()
  }, [])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setActiveHeroSlide((current) => (current + 1) % heroBackgroundImages.length)
    }, heroSlideIntervalMs)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [activeHeroSlide])

  const latestUpdates = useMemo(
    () => [...updates].sort((a, b) => b.timestamp - a.timestamp).slice(0, 3),
    [updates],
  )

  return (
    <main>
      <section className="home-hero">
        <div className="home-hero__slides" aria-hidden="true">
          {heroBackgroundImages.map((imageUrl, index) => (
            <div
              key={imageUrl}
              className={`home-hero__slide${index === activeHeroSlide ? ' is-active' : ''}`}
              style={{ backgroundImage: `url('${imageUrl}')` }}
            />
          ))}
        </div>

        <div className="home-hero__overlay" />

        <p className="home-hero__strap">We stand for your ambition</p>

        <div className="home-hero__content">
          <h1>Learn From Yesterday</h1>
          <p>
            If you have what it takes, Brighton University Law Society will help
            you achieve your calling.
          </p>

          <Link to="/joining" className="hero-button">
            Join us
          </Link>

          <div className="hero-dots" role="tablist" aria-label="Hero slideshow controls">
            {heroBackgroundImages.map((imageUrl, index) => (
              <button
                key={imageUrl}
                type="button"
                role="tab"
                className={`hero-dot${index === activeHeroSlide ? ' is-active' : ''}`}
                aria-label={`Show slide ${index + 1}`}
                aria-selected={index === activeHeroSlide}
                onClick={() => setActiveHeroSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="home-intro">
        <article>
          <h2>
            Brighton University Law Society supports students who want to train,
            network, and succeed in legal practice.
          </h2>
          <p>
            We connect classroom study with practical legal experience through
            competitions, skills workshops, and opportunities with partner firms.
          </p>
        </article>

        <aside className="news-panel">
          <h3>News</h3>
          <ul>
            {latestUpdates.length > 0 ? (
              latestUpdates.map((item) => (
                <li key={item.id}>
                  <Link to={item.href}>{item.title}</Link>
                </li>
              ))
            ) : (
              <li>No updates published yet.</li>
            )}
          </ul>
          <Link to="/events" className="news-panel__link">
            View all updates
          </Link>
        </aside>
      </section>
    </main>
  )
}
