import { useState } from "react"
import { Outlet } from "react-router-dom"

import Navbar from "../Navbar/Navbar.jsx"
import Sidebar from "../Sidebar/Sidebar.jsx"
import { GoalsProvider } from "../Goals/goalsContext.jsx"
import StarField from "../../../components/StarField/StarField.jsx"

import "./DashboardLayout.css"

/**
 * Persistent shell. Navbar + Sidebar never unmount; only <Outlet/> changes.
 * The sidebar reports its hover/expanded state so the content area can
 * smoothly shift right without any jump.
 */
export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className={`shell${sidebarOpen ? " shell--sidebar-open" : ""}`}>
      <StarField count={80} />

      <Navbar />

      <GoalsProvider>
        <Sidebar onHoverChange={setSidebarOpen} />

        <main className="shell__content" id="main-content">
          <div className="shell__content-inner">
            <Outlet />
          </div>
        </main>
      </GoalsProvider>
    </div>
  )
}
