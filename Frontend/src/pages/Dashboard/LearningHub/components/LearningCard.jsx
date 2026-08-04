
import React from "react";
import "./LearningCard.css";

export default function LearningCard({ course, openCourse }) {
  return (
    <div
      className="learning-card"
      onClick={() => openCourse(course)}
    >
      <img
        src={course.image}
        alt={course.title}
        className="learning-image"
      />

      <div className="learning-content">
        <span
          className={`learning-level ${course.level.toLowerCase()}`}
        >
          {course.level}
        </span>

        <h3>{course.title}</h3>

        <p>{course.description}</p>

        <div className="learning-footer">
          <span>{course.duration}</span>

          <button
            className="learning-btn"
            onClick={(e) => {
              e.stopPropagation();
              openCourse(course);
            }}
          >
            Start Module →
          </button>
        </div>
      </div>
    </div>
  );
}
