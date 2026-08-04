import { Laptop, Landmark, Car, Cross, Flame } from "lucide-react"

const ICONS = { Laptop, Landmark, Car, Cross, Flame }

export default function SectorCard({ sector, style }) {
  const Icon = ICONS[sector.icon] ?? Laptop
  return (
    <article className={`sector-card sector-card--${sector.tone} card-appear`} style={style}>
      <span className="sector-card__icon">
        <Icon size={26} />
      </span>
      <h4 className="sector-card__label">{sector.label}</h4>
      <span className="sector-card__status">{sector.status}</span>
      <p className="sector-card__note">{sector.note}</p>
    </article>
  )
}
