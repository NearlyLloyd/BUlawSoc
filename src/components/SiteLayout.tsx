import { NavLink, Outlet } from 'react-router-dom'
import bulsLogo from '../assets/buls-logo.png'

const utilityLinks = ['Find Us', 'News', 'Shop', 'Member Login']

const mainLinks = [
  { label: 'Home', to: '/' },
  { label: 'The Society', to: '/society' },
  { label: 'Joining', to: '/joining' },
  { label: 'Scholarships', to: '/scholarships' },
  { label: 'Education', to: '/education' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
]

export function SiteLayout() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="brand-panel" aria-label="BU Law Society">
          <div className="brand-panel__identity">
            <img
              className="brand-panel__logo"
              src={bulsLogo}
              alt="BU Law Society crest"
            />
            <div className="brand-panel__text">
              <p className="brand-panel__crest">Brighton University</p>
              <p className="brand-panel__name">Law Society</p>
            </div>
          </div>
        </div>

        <div className="nav-stack">
          <nav className="utility-nav" aria-label="Utility navigation">
            {utilityLinks.map((item) => (
              <a href="#" key={item}>
                {item}
              </a>
            ))}
          </nav>

          <nav className="main-nav" aria-label="Main navigation">
            {mainLinks.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? 'main-nav__link is-active' : 'main-nav__link'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <Outlet />

      <footer className="site-footer">
        <p>Brighton University Law Society</p>
        <p>Email: bulawsoc@brighton.ac.uk</p>
      </footer>
    </div>
  )
}
