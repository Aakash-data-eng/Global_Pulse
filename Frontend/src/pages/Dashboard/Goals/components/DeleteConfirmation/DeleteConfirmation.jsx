import React, { useContext, useEffect, useRef } from "react"
import "./DeleteConfirmation.css"
import { GoalsContext } from "../../goalsContext.jsx"

export default function DeleteConfirmation({ onClose }) {
  const { selected, deleteGoal } = useContext(GoalsContext)
  const ref = useRef(null)
  useEffect(()=>{
    function onKey(e){ if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", onKey)
    return ()=>document.removeEventListener("keydown", onKey)
  },[onClose])

  if (!selected) return null

  function confirm() {
    deleteGoal(selected.id)
    onClose()
  }

  return (
    <div className="dc-overlay">
      <div className="dc-box" role="dialog" aria-modal="true" ref={ref}>
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete <strong>{selected.name}</strong>?</p>
        <div className="dc-actions">
          <button className="btn-muted" onClick={onClose}>Cancel</button>
          <button className="btn-danger" onClick={confirm}>Delete Goal</button>
        </div>
      </div>
    </div>
  )
}
