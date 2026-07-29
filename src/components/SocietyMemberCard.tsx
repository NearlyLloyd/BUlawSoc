type SocietyMemberCardProps = {
  name: string
  position: string
  description: string
  headshotUrl: string
}

export function SocietyMemberCard({
  name,
  position,
  description,
  headshotUrl,
}: SocietyMemberCardProps) {
  return (
    <article className="society-member-card">
      <img
        className="society-member-card__headshot"
        src={headshotUrl}
        alt={`${name} headshot`}
        loading="lazy"
      />
      <div className="society-member-card__body">
        <h3>{name}</h3>
        <p className="society-member-card__position">{position}</p>
        <p className="society-member-card__description">{description}</p>
      </div>
    </article>
  )
}
