import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import "./GoalFormModal.css";
import { GoalsContext } from "../../goalsContext.jsx";
import {
  X,
  ChevronDown,
  BarChart2,
  DollarSign,
  Coins,
  Layers,
  Landmark,
} from "lucide-react";

const ASSETS = [
  {
    key: "stocks",
    label: "Stocks",
    unit: "Shares",
    Icon: BarChart2,
  },
  {
    key: "gold",
    label: "Gold",
    unit: "Grams",
    Icon: DollarSign,
  },
  {
    key: "silver",
    label: "Silver",
    unit: "Grams",
    Icon: DollarSign,
  },
  {
    key: "crypto",
    label: "Cryptocurrency",
    unit: "Coins",
    Icon: Coins,
  },
  {
    key: "mutual",
    label: "Mutual Funds",
    unit: "Units",
    Icon: Layers,
  },
  {
  key: "bonds",
  label: "Bonds",
  unit: "Units",
  Icon: Landmark,
},
];

function todayDate() {
  return new Date().toISOString().split("T")[0];
}

export default function GoalFormModal({ onClose, onCreate }) {
  const { createGoal } = useContext(GoalsContext);

  const modalRef = useRef(null);

  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  const [asset, setAsset] = useState(ASSETS[0].key);

  const [target, setTarget] = useState("");

  const [startDate, setStartDate] = useState(todayDate());

  const [endDate, setEndDate] = useState(todayDate());

  const [errors, setErrors] = useState({});

  const [openList, setOpenList] = useState(false);

  const [unitAnim, setUnitAnim] = useState(false);

  const selectedAsset = useMemo(() => {
    return ASSETS.find((a) => a.key === asset);
  }, [asset]);

  useEffect(() => {
    document.body.classList.add("modal-open");

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  useEffect(() => {
    setUnitAnim(true);

    const timer = setTimeout(() => {
      setUnitAnim(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [asset]);

  useEffect(() => {
    function closeDropdown(e) {
      if (!modalRef.current?.contains(e.target)) {
        setOpenList(false);
      }
    }

    document.addEventListener("mousedown", closeDropdown);

    return () =>
      document.removeEventListener(
        "mousedown",
        closeDropdown
      );
  }, []);

  function handleTargetChange(e) {
    let value = e.target.value;

    switch (asset) {
      case "stocks":
        value = value.replace(/[^\d]/g, "");
        break;

      case "gold":
      case "silver":
      case "mutual":
        value = value.replace(/[^0-9.]/g, "");

        if (value.includes(".")) {
          const parts = value.split(".");
          value =
            parts[0] +
            "." +
            parts[1].slice(0, 3);
        }

        break;

      case "crypto":
        value = value.replace(/[^0-9.]/g, "");

        if (value.includes(".")) {
          const parts = value.split(".");
          value =
            parts[0] +
            "." +
            parts[1].slice(0, 8);
        }

        break;

    case "bonds":
        value = value.replace(/[^0-9.]/g, "");

        if (value.includes(".")) {
          const parts = value.split(".");
          value =
            parts[0] +
            "." +
            parts[1].slice(0, 2);
        }

        break;

      default:
        break;
    }

    setTarget(value);
  }

  function validate() {
    const e = {};

    if (!name.trim())
      e.name = "Goal name is required.";

    if (!target || Number(target) <= 0)
      e.target =
        "Please enter a valid target.";

    if (
      new Date(endDate) <
      new Date(startDate)
    ) {
      e.date =
        "End date cannot be before Start date.";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) return;

    const payload = {
      id: `goal-${Date.now()}`,
      name,
      notes,
      asset: selectedAsset.key,
      unit: selectedAsset.unit,
      target: Number(target),
      startDate,
      endDate,
    };

    const created = createGoal(payload);

    if (onCreate) {
      onCreate(created);
    }
  }
    return (
    <div className="gf-modal-overlay">
      <div
        className="gf-modal"
        role="dialog"
        aria-modal="true"
        ref={modalRef}
      >
        <div className="gf-modal-head">
          <h3>Set Your Goal</h3>

          <button
            className="icon-btn"
            onClick={onClose}
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <form className="gf-form" onSubmit={handleSubmit}>

          {/* Goal Name */}

          <label>
            Goal Name

            <input
              type="text"
              placeholder="Enter Goal Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {errors.name && (
              <div className="gf-error">
                {errors.name}
              </div>
            )}
          </label>

          {/* Notes */}

          <label>
            Notes

            <input
              type="text"
              placeholder="Write a short note..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>

          {/* Asset Dropdown */}

          <label>

            Investment Asset

            <div className="gf-dropdown">

              <button
                type="button"
                className="gf-dropdown-btn"
                onClick={() =>
                  setOpenList(!openList)
                }
              >

                <span className="gf-selected">

                  <selectedAsset.Icon size={18} />

                  {selectedAsset.label}

                </span>

                <ChevronDown
                  size={18}
                  className={
                    openList
                      ? "rotate"
                      : ""
                  }
                />

              </button>

              {openList && (

                <div className="gf-dropdown-menu">

                  {ASSETS.map((item) => (

                    <button
                      key={item.key}
                      type="button"
                      className={`gf-dropdown-item ${
                        asset === item.key
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {

                        setAsset(item.key);

                        setOpenList(false);

                      }}
                    >

                      <item.Icon size={18} />

                      <span>
                        {item.label}
                      </span>

                    </button>

                  ))}

                </div>

              )}

            </div>

          </label>

          {/* Target */}

          <label>

            Target Quantity

            <div className="gf-quantity">

              <input
                value={target}
                onChange={handleTargetChange}
                placeholder="Enter Target"
              />

              <span
                className={`gf-unit ${
                  unitAnim
                    ? "animate"
                    : ""
                }`}
              >
                {selectedAsset.unit}
              </span>

            </div>

            {errors.target && (
              <div className="gf-error">
                {errors.target}
              </div>
            )}

          </label>

          {/* Dates */}

          <div className="gf-dates">

            <label>

              Start Date

              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(
                    e.target.value
                  )
                }
              />

            </label>

            <label>

              End Date

              <input
                type="date"
                value={endDate}
                onChange={(e) =>
                  setEndDate(
                    e.target.value
                  )
                }
              />

            </label>

          </div>

          {errors.date && (
            <div className="gf-error">
              {errors.date}
            </div>
          )}

          {/* Buttons */}

          <div className="gf-actions">

            <button
              type="button"
              className="btn btn-muted"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Start Goal
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}
