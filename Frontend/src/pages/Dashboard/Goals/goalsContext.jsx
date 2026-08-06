import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const GoalsContext = createContext(null);

const STORAGE_KEY = "gp_goals_v1";

export function GoalsProvider({ children }) {
  const [goals, setGoals] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // Load goals on mount and deduplicate any legacy duplicates
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const unique = [];
          const seenKeys = new Set();
          for (const item of parsed) {
            const key = item.id || `${item.name}-${item.asset}-${item.target}`;
            if (!seenKeys.has(key)) {
              seenKeys.add(key);
              unique.push(item);
            }
          }
          setGoals(unique);
          if (unique.length > 0) {
            setSelectedId(unique[0].id);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Sync goals to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    } catch (e) {
      console.error(e);
    }
  }, [goals]);

  // Create a new goal
  const createGoal = useCallback((payload) => {
    const id = payload.id || uuidv4();
    const newGoal = {
      id,
      name: payload.name,
      notes: payload.notes || "",
      asset: payload.asset || "finance",
      unit: payload.unit || "₹",
      target: Number(payload.target) || 200000,
      startDate: payload.startDate,
      endDate: payload.endDate,
      progress: payload.progress || 0,
      history: payload.history || [],
      milestones: payload.milestones || [],
      createdAt: Date.now(),
    };

    setGoals((prev) => {
      if (prev.some((x) => x.id === id)) {
        return prev;
      }
      return [newGoal, ...prev];
    });

    setSelectedId(id);
    return newGoal;
  }, []);

  // Update progress for a goal
  const updateProgress = useCallback((id, amount, date, title, subtitle) => {
    setGoals((prev) =>
      prev.map((x) => {
        if (x.id !== id) return x;
        const added = Number(amount) || 0;
        const newProgress = Math.min((x.progress || 0) + added, x.target || 200000);
        const historyItem = {
          id: uuidv4(),
          title: title || "Monthly Deposit",
          subtitle: subtitle || "Goal progress contribution",
          amount: added,
          total: newProgress,
          date: date || new Date().toISOString(),
        };
        return {
          ...x,
          progress: newProgress,
          history: [historyItem, ...(x.history || [])],
        };
      })
    );
  }, []);

  // Update goal parameters
  const updateGoal = useCallback((id, updatedFields) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        return {
          ...g,
          ...updatedFields,
          target: Number(updatedFields.target) || g.target,
        };
      })
    );
  }, []);

  // Delete a goal
  const deleteGoal = useCallback((id) => {
    setGoals((prev) => prev.filter((x) => x.id !== id));
    setSelectedId((cur) => (cur === id ? null : cur));
  }, []);

  // Select a goal by ID
  const selectGoalById = useCallback((id) => setSelectedId(id), []);

  const selected = useMemo(
    () => goals.find((g) => g.id === selectedId) || goals[0] || null,
    [goals, selectedId]
  );

  return (
    <GoalsContext.Provider
      value={{
        goals,
        createGoal,
        updateProgress,
        updateGoal,
        deleteGoal,
        selected,
        selectGoalById,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
}
