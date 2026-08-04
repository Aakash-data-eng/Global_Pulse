import React, { createContext, useCallback, useEffect, useMemo, useState } from "react"
import { v4 as uuidv4 } from "uuid"

export const GoalsContext = createContext(null)

const STORAGE_KEY = "gp_goals_v1"

export function GoalsProvider({ children }) {
  const [goals, setGoals] = useState([])
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setGoals(JSON.parse(raw))
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(goals)) } catch (e) {}
  }, [goals])

  const createGoal = useCallback((payload) => {
    const id = payload.id || uuidv4()
    const newGoal = {
      id,
      name: payload.name,
      notes: payload.notes || "",
      asset: payload.asset,
      unit: payload.unit,
      target: Number(payload.target) || 0,
      startDate: payload.startDate,
      endDate: payload.endDate,
      progress: 0,
      history: [],
      milestones: [],
      createdAt: Date.now(),
    }
    setGoals((g) => [newGoal, ...g])
    setSelectedId(id)
    return newGoal
  }, [])

  const updateProgress = useCallback((id, amount, date) => {
    setGoals((g) => g.map((x) => {
      if (x.id !== id) return x
      const added = Number(amount) || 0
      const newProgress = Math.min(x.progress + added, x.target)
    const historyItem = {
  id: uuidv4(),
  amount: added,
  total: newProgress,
  date: date || new Date().toISOString(),
};
      return { ...x, progress: newProgress, history: [...x.history, historyItem] }
    }))
  }, [])

  const deleteGoal = useCallback((id) => {
    setGoals((g) => g.filter((x) => x.id !== id))
    setSelectedId((cur) => (cur === id ? null : cur))
  }, [])

  const selectGoalById = useCallback((id) => setSelectedId(id), [])

  const selected = useMemo(() => goals.find((g) => g.id === selectedId) || null, [goals, selectedId])

  return (
    <GoalsContext.Provider value={{ goals, createGoal, updateProgress, deleteGoal, selected, selectGoalById }}>
      {children}
    </GoalsContext.Provider>
  )
}
