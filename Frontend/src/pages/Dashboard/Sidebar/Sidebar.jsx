import { useState, useContext } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Globe,
  GraduationCap,
  Wallet,
  Target,
  TrendingUp,
  Settings,
  LogOut,
  ChevronDown,
  Plus,
  Sparkles,
} from "lucide-react"

import "./Sidebar.css"

const MAIN_LINKS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/dashboard/market-analysis", label: "Market Analysis", icon: Globe },
  { to: "/dashboard/learning-hub", label: "Learning Hub", icon: GraduationCap },
  { to: "/dashboard/expense-tracker", label: "Expense Tracker", icon: Wallet },
  { to: "/dashboard/investments", label: "Investments", icon: TrendingUp },
]

import { GoalsContext } from "../Goals/goalsContext.jsx"

function GoalsList() {
  const { goals, selectGoalById } = useContext(GoalsContext)
  if (!goals || goals.length === 0) return null
  return goals.map((g) => (
    <li key={g.id}>
      <NavLink to={`/dashboard/goals?g=${g.id}`} className="sidebar__sublink" onClick={() => selectGoalById(g.id)}>
        <span className="sidebar__subdot" />
        <span className="sidebar__label">{g.name}</span>
      </NavLink>
    </li>
  ))
}

/**
 * Premium SaaS sidebar.
 * - Collapsed to 80px showing only icons.
 * - Expands to 260px on hover (icons + labels), reporting state to the layout.
 * - Active item: blue glow, white icon, left indicator bar.
 * - Goals has a smooth expandable submenu.
 */
export default function Sidebar({ onHoverChange }) {
  const [goalsOpen, setGoalsOpen] = useState(false)
  const location = useLocation()
  const goalsActive = location.pathname.startsWith("/dashboard/goals")

  return (
    <aside
      className="sidebar"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => {
        onHoverChange(false)
        setGoalsOpen(false)
      }}
    >
      <div className="sidebar__top">
  <nav className="sidebar__nav" aria-label="Primary">
        <ul className="sidebar__list">
          {MAIN_LINKS.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink to={to} end={end} className={({ isActive }) => `sidebar__link${isActive ? " is-active" : ""}`}>
                <span className="sidebar__indicator" />
                <span className="sidebar__icon">
                  <Icon size={22} strokeWidth={2} />
                </span>
                <span className="sidebar__label">{label}</span>
              </NavLink>
            </li>
          ))}

          {/* Goals with expandable submenu */}
          <li>
            <button
              className={`sidebar__link sidebar__link--btn${goalsActive ? " is-active" : ""}`}
              onClick={() => setGoalsOpen((o) => !o)}
              aria-expanded={goalsOpen}
            >
              <span className="sidebar__indicator" />
              <span className="sidebar__icon">
                <Target size={22} strokeWidth={2} />
              </span>
              <span className="sidebar__label">Goals</span>
              <ChevronDown size={16} className={`sidebar__caret${goalsOpen ? " is-open" : ""}`} />
            </button>

            <div className={`sidebar__submenu${goalsOpen ? " is-open" : ""}`}>
              <ul className="sidebar__sublist">
                {/* Dynamically render goals from context */}
                <GoalsList />
                <li>
                  <NavLink to="/dashboard/goals?new=1" className="sidebar__sublink sidebar__sublink--add">
                    <Plus size={16} />
                    <span className="sidebar__label">Add Goal</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
        {/* </nav> */}
</div>    
      <div className="sidebar__footer">
        <NavLink to="/dashboard/upgrade" className="sidebar__upgrade">
          <span className="sidebar__icon">
            <Sparkles size={20} />
          </span>
          <span className="sidebar__label">Upgrade to Pro</span>
        </NavLink>

        <NavLink to="/dashboard/settings" className={({ isActive }) => `sidebar__link${isActive ? " is-active" : ""}`}>
          <span className="sidebar__indicator" />
          <span className="sidebar__icon">
            <Settings size={22} />
          </span>
          <span className="sidebar__label">Settings</span>
        </NavLink>

        <NavLink to="/login" className="sidebar__link">
          <span className="sidebar__indicator" />
          <span className="sidebar__icon">
            <LogOut size={22} />
          </span>
          <span className="sidebar__label">Logout</span>
        </NavLink>
      </div>
    </aside>
  )
}
