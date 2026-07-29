import { SocietyMemberCard } from '../components/SocietyMemberCard'

import cyriloHeadshot from '../assets/headshots/cyrilo.png'
import nackanHeadshot from '../assets/headshots/nacken.jpg'

const societyMembers = [
  {
    name: 'Näckan Flanagan',
    position: 'President',
    headshotUrl:
      nackanHeadshot,
    description:
      'Leads society strategy and partnerships while coordinating mooting and networking priorities for the year.',
  },
  {
    name: 'Cyrilo Slotwiner',
    position: 'Vice President/Finance',
    headshotUrl:
      cyriloHeadshot,
    description:
      'Supports event planning and member engagement, with a focus on mentoring first-year students entering legal studies.',
  }
]

export function SocietyPage() {
  return (
    <main className="page-shell">
      <p className="page-eyebrow">The Society</p>
      <h1>Built for future advocates</h1>
      <p>
        Brighton University Law Society is a student-led community focused on
        advocacy, professional growth, and equitable access to legal careers.
      </p>
      <p>
        Our committee works with alumni, barristers, solicitors, and legal
        charities to give members practical experience and meaningful guidance.
      </p>

      <section className="society-members">
        <h2>Meet the committee</h2>
        <div className="society-members__grid">
          {societyMembers.map((member) => (
            <SocietyMemberCard
              key={member.name}
              name={member.name}
              position={member.position}
              headshotUrl={member.headshotUrl}
              description={member.description}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
