import { Sparkles, Check } from "lucide-react"

import PageHeader from "../../../components/PageHeader/PageHeader.jsx"
import "../../../styles/page.css"
import "./Upgrade.css"

const PLANS = [
  {
    id: "free",
    name: "Starter",
    price: "₹0",
    period: "/mo",
    features: ["Live indices", "5 watchlist stocks", "Basic company cards", "Community access"],
    cta: "Current plan",
    active: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹799",
    period: "/mo",
    features: ["Everything in Starter", "All 50 constituents", "Advanced charts & signals", "Goal & expense tracking", "Priority alerts"],
    cta: "Upgrade to Pro",
    active: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: "₹1,999",
    period: "/mo",
    features: ["Everything in Pro", "AI market predictions", "Dedicated advisor", "API access"],
    cta: "Go Elite",
    active: false,
  },
]

export default function Upgrade() {
  return (
    <div className="gp-page">
      <PageHeader icon={Sparkles} title="Upgrade to Pro" subtitle="Unlock the full power of GlobalPulse." />

      <div className="gp-grid gp-grid--3">
        {PLANS.map((p, i) => (
          <article
            key={p.id}
            className={`gp-card plan${p.active ? " plan--featured" : ""}`}
            style={{ animationDelay: `${i * 90}ms` }}
          >
            {p.active && <span className="plan__badge">Most popular</span>}
            <h3 className="plan__name">{p.name}</h3>
            <div className="plan__price">
              <span className="gp-mono">{p.price}</span>
              <span className="plan__period">{p.period}</span>
            </div>
            <ul className="plan__features">
              {p.features.map((f) => (
                <li key={f}>
                  <Check size={16} /> {f}
                </li>
              ))}
            </ul>
            <button className={`gp-btn${p.active ? "" : " gp-btn--ghost"} plan__cta`}>{p.cta}</button>
          </article>
        ))}
      </div>
    </div>
  )
}
