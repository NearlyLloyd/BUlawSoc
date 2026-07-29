const benefits = [
  'Weekly mooting and negotiation practice sessions',
  'CV clinics and interview coaching with legal professionals',
  'Priority access to networking evenings and law firm events',
]

export function JoiningPage() {
  return (
    <main className="page-shell">
      <p className="page-eyebrow">Joining</p>
      <h1>Membership for 2026-27</h1>
      <p>Join our legal community and start building your professional profile.</p>

      <ul className="page-list">
        {benefits.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <a className="page-cta" target="_blank" rel="noopener noreferrer" href="https://campus.hellorubric.com/?tab=memberships&s=12878">
        Become a member
      </a>
    </main>
  )
}
