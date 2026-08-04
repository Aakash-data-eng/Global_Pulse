import { useContext, useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Plus } from "lucide-react"
import { GoalsContext } from "./goalsContext.jsx"
import EmptyGoals from "./components/EmptyGoals/EmptyGoals.jsx"
import GoalPerformance from "./components/GoalPerformance/GoalPerformance.jsx"
import GoalFormModal from "./components/GoalFormModal/GoalFormModal.jsx"
import UpdateProgressModal from "./components/UpdateProgressModal/UpdateProgressModal.jsx"
import DeleteConfirmation from "./components/DeleteConfirmation/DeleteConfirmation.jsx"
import "./Goals.css"

export default function Goals() {
  const { goals, createGoal, selectGoalById } = useContext(GoalsContext)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [showCreate, setShowCreate] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    if (searchParams.get("new") === "1") setShowCreate(true)
  }, [searchParams])

  useEffect(() => {
    const goalQ = searchParams.get("g")
    if (goalQ) {
      const g = goals.find((x) => x.id === goalQ)
      if (g) selectGoalById(g.id)
    }
  }, [searchParams, goals, selectGoalById])

  if (!goals || goals.length === 0) {
    return (
      <div className="goals-page">
        <EmptyGoals onCreate={() => setShowCreate(true)} />
        {showCreate && (
          <GoalFormModal onClose={() => setShowCreate(false)} onCreate={(data) => { createGoal(data); setShowCreate(false); navigate(`/dashboard/goals?g=${data.id}`) }} />
        )}
      </div>
    )
  }

  return (
    <div className="goals-page">
      <GoalPerformance onOpenUpdate={() => setShowUpdate(true)} onOpenDelete={() => setShowDelete(true)} />

      {showUpdate && <UpdateProgressModal onClose={() => setShowUpdate(false)} />}
      {showDelete && <DeleteConfirmation onClose={() => setShowDelete(false)} />}
      {showCreate && <GoalFormModal onClose={() => setShowCreate(false)} onCreate={(data) => { createGoal(data); setShowCreate(false); navigate(`/dashboard/goals?g=${data.id}`) }} />}
    </div>
  )
}
