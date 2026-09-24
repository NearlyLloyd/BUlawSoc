import { useEffect, useState } from 'react'

import { SocietyMemberCard } from '../components/SocietyMemberCard'

type CommitteeMember = {
  name: string
  role: string
  description: string
  image: string
}

type CommitteeContent = {
  members?: CommitteeMember[]
}

export function SocietyPage() {
  const [members, setMembers] = useState<CommitteeMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCommittee() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}content/committee.json`)

        if (!response.ok) {
          throw new Error('Could not load committee content.')
        }

        const data: unknown = await response.json()

        const parsedMembers = Array.isArray(data)
          ? (data as CommitteeMember[])
          : (data as CommitteeContent).members

        if (!Array.isArray(parsedMembers)) {
          throw new Error('Committee content is in an invalid format.')
        }

        setMembers(parsedMembers)
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : 'An unknown error occurred while loading the committee.',
        )
      } finally {
        setIsLoading(false)
      }
    }

    void loadCommittee()
  }, [])

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

        {isLoading && <p>Loading committee...</p>}
        {error && <p>{error}</p>}
        {!isLoading && !error && members.length === 0 && (
          <p>No committee members published yet.</p>
        )}

        <div className="society-members__grid">
          {members.map((member) => (
            <SocietyMemberCard
              key={member.name}
              name={member.name}
              position={member.role}
              headshotUrl={`${import.meta.env.BASE_URL}${member.image.replace(/^\//, '')}`}
              description={member.description}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
