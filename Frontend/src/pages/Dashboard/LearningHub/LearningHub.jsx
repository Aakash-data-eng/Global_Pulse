import React, { useState } from "react";
import "./LearningHub.css";

import learningData from "./learningData";
import LearningCard from "./components/LearningCard";

export default function LearningHub() {
  const [activeModules, setActiveModules] = useState([]);

  const openCourse = (course) => {
    window.open(course.video, "_blank");

    setActiveModules((prev) => {
      const updated = [
        course,
        ...prev.filter((item) => item.id !== course.id),
      ];

      return updated.slice(0, 2);
    });
  };

  return (
    <div className="learning-page">
      <div className="bg-circle bg-circle-1"></div>
      <div className="bg-circle bg-circle-2"></div>
      <div className="bg-circle bg-circle-3"></div>

      <div className="learning-hub">
        {/* Hero */}
        <div className="learning-hero fade-up">
          <div>
            <h1>Learning Hub</h1>

            <p>
              Expand your financial knowledge through curated learning modules
              covering investing, economics and risk management.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="learning-filters">
          {["Beginner", "Intermediate", "Advanced"].map((item) => (
            <button
              key={item}
              onClick={() => {
                document
                  .getElementById(item)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Active Modules */}
        <div className="section-title">
          <h2>Active Modules</h2>

          <p>Your recently opened learning modules.</p>
        </div>

        <div className="active-modules fade-up delay-1">
          {activeModules.length === 0 ? (
            <div className="no-active">
              <h3>No Active Modules</h3>

              <p>
                Start learning by selecting a course below.
              </p>
            </div>
          ) : (
            activeModules.map((course) => (
              <div
                className="active-card"
                key={course.id}
              >
                <img
                  src={course.image}
                  alt={course.title}
                />

                <div className="active-content">
                  <span
                    className={`learning-level ${course.level.toLowerCase()}`}
                  >
                    {course.level}
                  </span>

                  <h3>{course.title}</h3>

                  <p>{course.duration}</p>

                  <button onClick={() => openCourse(course)}>
                    Resume Module →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Explore Learning */}
        <div className="section-title">
          <h2>Explore Learning</h2>

          <p>Choose a module and start learning.</p>
        </div>

        {/* Beginner */}
        <section id="Beginner">
          <h2 className="category-title">Beginner</h2>

          <div className="learning-grid fade-up delay-2">
            {learningData
              .filter((course) => course.level === "Beginner")
              .map((course) => (
                <LearningCard
                  key={course.id}
                  course={course}
                  openCourse={openCourse}
                />
              ))}
          </div>
        </section>

        {/* Intermediate */}
        <section id="Intermediate">
          <h2 className="category-title">Intermediate</h2>

          <div className="learning-grid">
            {learningData
              .filter((course) => course.level === "Intermediate")
              .map((course) => (
                <LearningCard
                  key={course.id}
                  course={course}
                  openCourse={openCourse}
                />
              ))}
          </div>
        </section>

        {/* Advanced */}
        <section id="Advanced">
          <h2 className="category-title">Advanced</h2>

          <div className="learning-grid">
            {learningData
              .filter((course) => course.level === "Advanced")
              .map((course) => (
                <LearningCard
                  key={course.id}
                  course={course}
                  openCourse={openCourse}
                />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}