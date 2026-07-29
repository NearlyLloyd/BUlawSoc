import { Link } from 'react-router-dom'

const newsItems = [
  'Mooting sign-ups open for the autumn term',
  'Freshers legal careers evening announced',
  'Student mentorship applications now live',
]

export function HomePage() {
  return (
    <main>
      <section className="home-hero">
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

          <div className="hero-dots" aria-hidden="true">
            <span className="is-active" />
            <span />
            <span />
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
            {newsItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link to="/events" className="news-panel__link">
            View all updates
          </Link>
        </aside>
      </section>
    </main>
  )
}
