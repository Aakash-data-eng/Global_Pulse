import { Globe, TrendingUp, TrendingDown, Activity } from "lucide-react"

import PageHeader from "../../../components/PageHeader/PageHeader.jsx"
import Sparkline from "../../../components/Sparkline/Sparkline.jsx"

import { indexSparklines } from "../../../data/marketData.js"
import "../../../styles/page.css"

const MARKETS = [
  { id: "nifty", name: "Nifty 50", region: "India", value: "22,053.45", change: "+0.75%", up: true, series: indexSparklines.nifty },
  { id: "sensex", name: "Sensex", region: "India", value: "72,503.12", change: "+0.80%", up: true, series: indexSparklines.sensex },
  { id: "nasdaq", name: "Nasdaq", region: "US", value: "18,680.12", change: "+1.10%", up: true, series: indexSparklines.nasdaq },
  { id: "usdinr", name: "USD / INR", region: "FX", value: "83.24", change: "-0.12%", up: false, series: indexSparklines.usdinr },
]

export default function MarketAnalysis() {
  return (
    <div className="gp-page">
      <PageHeader icon={Globe} title="Market Analysis" subtitle="Global indices, currencies and cross-market signals." />

      <div className="gp-grid gp-grid--2">
        {MARKETS.map((m, i) => (
          <article key={m.id} className="gp-card gp-card--hover" style={{ animationDelay: `${i * 80}ms` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h3 className="gp-card__title">{m.name}</h3>
                <p className="gp-card__meta">{m.region}</p>
              </div>
              <span className={m.up ? "gp-pos" : "gp-neg"} style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
                {m.up ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {m.change}
              </span>
            </div>
            <div className="gp-stat gp-mono">{m.value}</div>
            <div style={{ marginTop: 14 }}>
              <Sparkline points={m.series} color={m.up ? "var(--green)" : "var(--red)"} area height={80} />
            </div>
          </article>
        ))}
      </div>

      <div className="gp-card" style={{ marginTop: 20, animationDelay: "360ms" }}>
        <h3 className="gp-card__title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Activity size={18} /> Market Breadth
        </h3>
        <p className="gp-card__meta" style={{ marginTop: 8 }}>
          Advancing stocks are outpacing decliners across large caps, while mid caps show mild consolidation.
        </p>
      </div>
    </div>
  )
}
