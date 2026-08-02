import { useEffect, useMemo, useState } from 'react'

type NewsletterItem = {
  date: string
  title: string
  summary: string
  fileUrl?: string
}

type NewsletterEntry = NewsletterItem & {
  id: number
  groupLabel: string
}

type NewsletterGroup = {
  label: string
  items: NewsletterEntry[]
}

const monthToSeason: Record<string, string> = {
  jan: 'Winter',
  feb: 'Winter',
  mar: 'Spring',
  apr: 'Spring',
  may: 'Spring',
  jun: 'Summer',
  jul: 'Summer',
  aug: 'Summer',
  sep: 'Autumn',
  oct: 'Autumn',
  nov: 'Autumn',
  dec: 'Winter',
}

function getSeasonYearLabel(date: string): string {
  const yearMatch = date.match(/\b(19|20)\d{2}\b/)
  const year = yearMatch?.[0]

  const lowerDate = date.toLowerCase()
  const monthKey = Object.keys(monthToSeason).find((key) => lowerDate.includes(key))
  const season = monthKey ? monthToSeason[monthKey] : 'Unspecified Season'

  if (year) {
    return `${season} ${year}`
  }

  return 'Unspecified Date'
}

function normalizePdfUrl(fileUrl?: string): string | null {
  if (!fileUrl) {
    return null
  }

  const trimmed = fileUrl.trim()

  if (!trimmed) {
    return null
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return encodeURI(trimmed)
  }

  if (trimmed.startsWith('/')) {
    return encodeURI(trimmed)
  }

  return encodeURI(`/${trimmed}`)
}

function buildPdfPreviewUrl(fileUrl: string): string {
  let parsedUrl: URL

  try {
    parsedUrl = new URL(fileUrl, window.location.origin)
  } catch {
    return fileUrl
  }

  if (!parsedUrl.pathname.toLowerCase().endsWith('.pdf')) {
    return fileUrl
  }

  const existingHash = parsedUrl.hash.replace(/^#/, '')
  const hasToolbarSetting = /(^|&)toolbar=/.test(existingHash)
  const hasNavPanesSetting = /(^|&)navpanes=/.test(existingHash)

  const hashParts = existingHash ? [existingHash] : []

  if (!hasToolbarSetting) {
    hashParts.push('toolbar=0')
  }

  if (!hasNavPanesSetting) {
    hashParts.push('navpanes=0')
  }

  parsedUrl.hash = hashParts.join('&')

  // Keep same-origin URLs relative so they work in all deployment paths.
  if (parsedUrl.origin === window.location.origin) {
    return `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`
  }

  return parsedUrl.toString()
}

export function NewsletterPage() {
  const [newsletters, setNewsletters] = useState<NewsletterEntry[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [collapsedByGroup, setCollapsedByGroup] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const groups = useMemo<NewsletterGroup[]>(() => {
    const byLabel = new Map<string, NewsletterEntry[]>()

    newsletters.forEach((item) => {
      const groupLabel = item.groupLabel

      if (!byLabel.has(groupLabel)) {
        byLabel.set(groupLabel, [])
      }

      byLabel.get(groupLabel)?.push(item)
    })

    return Array.from(byLabel.entries()).map(([label, items]) => ({
      label,
      items,
    }))
  }, [newsletters])

  const selectedNewsletter = newsletters[selectedIndex]
  const selectedFileUrl = normalizePdfUrl(selectedNewsletter?.fileUrl)
  const selectedPreviewUrl = selectedFileUrl ? buildPdfPreviewUrl(selectedFileUrl) : null

  useEffect(() => {
    async function loadNewsletters() {
      try {
        const response = await fetch('/content/newsletters.json')

        if (!response.ok) {
          throw new Error('Could not load newsletter content.')
        }

        const data: unknown = await response.json()

        if (!Array.isArray(data)) {
          throw new Error('Newsletter content is in an invalid format.')
        }

        const loadedNewsletters = (data as NewsletterItem[]).map((item, index) => ({
          ...item,
          id: index,
          groupLabel: getSeasonYearLabel(item.date),
        }))
        setNewsletters(loadedNewsletters)
        setSelectedIndex(0)

        const initialCollapsedState: Record<string, boolean> = {}
        loadedNewsletters.forEach((item, index) => {
          const groupLabel = item.groupLabel

          if (!(groupLabel in initialCollapsedState)) {
            initialCollapsedState[groupLabel] = index !== 0
          }
        })

        setCollapsedByGroup(initialCollapsedState)
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : 'An unknown error occurred while loading newsletters.',
        )
      } finally {
        setIsLoading(false)
      }
    }

    void loadNewsletters()
  }, [])

  function toggleGroup(label: string) {
    setCollapsedByGroup((current) => ({
      ...current,
      [label]: !current[label],
    }))
  }

  function openNewsletterByIndex(index: number) {
    setSelectedIndex(index)

    const groupLabel = newsletters[index].groupLabel
    setCollapsedByGroup((current) => ({
      ...current,
      [groupLabel]: false,
    }))
  }

  function goToPreviousNewsletter() {
    if (selectedIndex > 0) {
      openNewsletterByIndex(selectedIndex - 1)
    }
  }

  function goToNextNewsletter() {
    if (selectedIndex < newsletters.length - 1) {
      openNewsletterByIndex(selectedIndex + 1)
    }
  }

  return (
    <main className="page-shell">
      <p className="page-eyebrow">Newsletter</p>
      <h1>Latest society updates</h1>
      <p className="content-admin-note">
        Update newsletters by editing <strong>public/content/newsletters.json</strong>. Use
        direct PDF links (or public folder paths) for in-site preview.
      </p>

      {isLoading && <p>Loading newsletters...</p>}
      {error && <p>{error}</p>}

      {!isLoading && !error && newsletters.length === 0 && (
        <p>No newsletters published yet.</p>
      )}

      {!isLoading && !error && newsletters.length > 0 && (
        <section className="newsletter-layout" aria-label="Newsletter viewer">
          <aside className="newsletter-nav" aria-label="Newsletter navigation">
            {groups.map((group) => {
              const isCollapsed = collapsedByGroup[group.label] ?? false

              return (
                <section className="newsletter-group" key={group.label}>
                  <button
                    type="button"
                    className="newsletter-group__toggle"
                    onClick={() => toggleGroup(group.label)}
                    aria-expanded={!isCollapsed}
                  >
                    <span>{group.label}</span>
                    <span aria-hidden="true">{isCollapsed ? '▸' : '▾'}</span>
                  </button>

                  {!isCollapsed && (
                    <ul className="newsletter-group__list">
                      {group.items.map((item) => {
                        const itemIndex = item.id
                        const isActive = itemIndex === selectedIndex

                        return (
                          <li key={`${item.date}-${item.title}`}>
                            <button
                              type="button"
                              className={
                                isActive
                                  ? 'newsletter-item-button is-active'
                                  : 'newsletter-item-button'
                              }
                              onClick={() => openNewsletterByIndex(itemIndex)}
                            >
                              <strong>{item.title}</strong>
                              <span>{item.date}</span>
                            </button>
                          </li>
                        )}
                      )}
                    </ul>
                  )}
                </section>
              )
            })}
          </aside>

          <article className="newsletter-viewer">
            <header className="newsletter-viewer__header">
              <div>
                <p className="event-card__date">{selectedNewsletter.date}</p>
                <h2>{selectedNewsletter.title}</h2>
                <p>{selectedNewsletter.summary}</p>
              </div>

              <div className="newsletter-arrows" aria-label="Quick newsletter navigation">
                <button
                  type="button"
                  onClick={goToPreviousNewsletter}
                  disabled={selectedIndex === 0}
                  aria-label="Previous newsletter"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={goToNextNewsletter}
                  disabled={selectedIndex === newsletters.length - 1}
                  aria-label="Next newsletter"
                >
                  →
                </button>
              </div>
            </header>

            {selectedFileUrl ? (
              <>
                <iframe
                  key={selectedPreviewUrl}
                  className="newsletter-viewer__frame"
                  src={selectedPreviewUrl ?? selectedFileUrl}
                  title={`${selectedNewsletter.title} PDF preview`}
                />
                <p className="newsletter-viewer__fallback">
                  If the PDF cannot be previewed here, open it in a new tab.
                  <a href={selectedFileUrl} target="_blank" rel="noreferrer">
                    Open PDF
                  </a>
                </p>
              </>
            ) : (
              <p>No PDF link has been added for this newsletter yet.</p>
            )}
          </article>
        </section>
      )}
    </main>
  )
}
