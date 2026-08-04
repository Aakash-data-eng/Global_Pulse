import { User, Mail, MapPin, Calendar, TrendingUp } from "lucide-react"

import PageHeader from "../../../components/PageHeader/PageHeader.jsx"
import "../../../styles/page.css"
import "./Profile.css"

const STATS = [
  { label: "Portfolio value", value: "₹12.4L" },
  { label: "Total return", value: "+18.2%" },
  { label: "Active goals", value: "4" },
  { label: "Watchlist", value: "12" },
]

export default function Profile() {
  return (
    <div className="gp-page">
      <PageHeader icon={User} title="Profile" subtitle="Your GlobalPulse identity and activity." />

      <section className="gp-card profile-hero">
        <div className="profile-avatar" aria-hidden="true">AK</div>
        <div className="profile-hero__info">
          <h2 className="profile-name">Arjun Kapoor</h2>
          <p className="profile-role">Pro Investor · Member since 2021</p>
          <div className="profile-meta">
            <span><Mail size={15} /> arjun.k@globalpulse.io</span>
            <span><MapPin size={15} /> Mumbai, India</span>
            <span><Calendar size={15} /> Joined Mar 2021</span>
          </div>
        </div>
        <button className="gp-btn">Edit profile</button>
      </section>

      <div className="gp-grid gp-grid--4">
        {STATS.map((s, i) => (
          <div key={s.label} className="gp-card profile-stat" style={{ animationDelay: `${i * 70}ms` }}>
            <span className="profile-stat__label">{s.label}</span>
            <span className="profile-stat__value gp-mono">{s.value}</span>
          </div>
        ))}
      </div>

      <section className="gp-card">
        <h3 className="gp-card__title">Recent activity</h3>
        <ul className="profile-activity">
          <li><TrendingUp size={16} /> Bought 10 shares of RELIANCE.NS · 2h ago</li>
          <li><TrendingUp size={16} /> Added goal &quot;Retirement Fund&quot; · 1d ago</li>
          <li><TrendingUp size={16} /> Upgraded watchlist to 12 stocks · 3d ago</li>
        </ul>
      </section>
    </div>
  )
}
