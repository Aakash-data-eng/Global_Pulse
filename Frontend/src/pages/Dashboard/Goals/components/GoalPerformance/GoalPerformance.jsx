import React, { useContext } from "react";
import "./GoalPerformance.css";
import { GoalsContext } from "../../goalsContext.jsx";
import ProgressRing from "../GoalStats/ProgressRing.jsx";
import GoalStats from "../GoalStats/GoalStats.jsx";
import WeeklyChart from "../WeeklyChart/WeeklyChart.jsx";

export default function GoalPerformance({
  onOpenUpdate,
  onOpenDelete,
}) {
  const { selected } = useContext(GoalsContext);

  if (!selected)
    return (
      <div style={{ padding: 20 }}>
        Select a goal
      </div>
    );

  const completion = Math.round(
    (selected.progress / (selected.target || 1)) * 100
  );

  return (
    <section className="gp-root">
      <header className="gp-head">
        <h1>Goal Performance</h1>

        <div className="gp-actions">
          <button
            className="btn btn-outline"
            onClick={onOpenUpdate}
          >
            Update Progress
          </button>

          <button
            className="btn btn-danger"
            onClick={onOpenDelete}
          >
            Delete Goal
          </button>
        </div>
      </header>

      <div className="gp-main">

        <div className="gp-card">

          <ProgressRing percent={completion} />

          <div className="gp-info">
            <h2>{selected.name}</h2>
            <p className="muted">{selected.notes}</p>
          </div>

        </div>

        <div className="gp-stats">
          <GoalStats goal={selected} />
        </div>

      </div>

      {/* Weekly Graph */}

      <div className="gp-chart">
        <WeeklyChart goal={selected} />
      </div>

      {/* Upcoming Milestones Removed */}

    </section>
  );
}