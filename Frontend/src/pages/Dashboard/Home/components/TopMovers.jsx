export default function TopMovers({ movers, style }) {
  return (
    <aside className="movers card-appear" style={style} aria-label="Top movers in India">
      <header className="movers__head">
        <h3 className="movers__title">Top Movers (India)</h3>
        <button className="movers__viewall">VIEW ALL</button>
      </header>

      <ul className="movers__list">
        {movers.map((m) => (
          <li key={m.id} className="movers__row">
            <span className="movers__logo" aria-hidden="true">
              {m.name.charAt(0)}
            </span>
            <div className="movers__info">
              <span className="movers__name">{m.name}</span>
              <span className="movers__ticker gp-mono">{m.ticker}</span>
            </div>
            <div className="movers__right">
              <span className="movers__value gp-mono">{m.value}</span>
              <span className={`movers__change ${m.positive ? "gp-pos" : "gp-neg"}`}>{m.change}</span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}
