import React, { useContext, useEffect, useRef, useState } from "react"
import "./UpdateProgressModal.css"
import { GoalsContext } from "../../goalsContext.jsx"

export default function UpdateProgressModal({ onClose }) {
  const { selected, updateProgress } = useContext(GoalsContext)
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  const ref = useRef(null)

  useEffect(() => {
    if (!selected) return
    const el = ref.current && ref.current.querySelector("input,button")
    if (el) el.focus()
    function onKey(e) { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [selected, onClose])

  if (!selected) return null

  function submit(e) {
    e.preventDefault()
    updateProgress(selected.id, Number(amount), date)
    onClose()
  }

  return (
    <div className="up-modal-overlay">
      <div className="up-modal" ref={ref} role="dialog" aria-modal="true">
        <h3>Update Progress</h3>
        <form onSubmit={submit}>
          <label>Goal
            <input value={selected.name} readOnly />
          </label>
          <label>Quantity Added
            <input value={amount} onChange={(e)=>setAmount(e.target.value)} />
          </label>
          <label>Date
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
          </label>
          <div className="up-actions">
            <button type="button" className="btn-muted" onClick={onClose}>Cancel</button>
            <button className="btn-primary" type="submit">Update Progress</button>
          </div>
        </form>
      </div>
    </div>
  )
}
