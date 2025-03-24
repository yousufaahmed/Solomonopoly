import React from "react";
import "../styles/Achievements.css";
import Navbar from "../components/navbar";

const Achievements = () => {
  const dummyTrophies = [
    { title: "Title", description: "Description", progress: 30, earned: false },
    { title: "Title", description: "Description", progress: 100, earned: true },
    { title: "Title", description: "Description", progress: 60, earned: false },
  ];

  return (
    <div className="achievements-wrapper">
      <Navbar />
      <div className="achievements-container">
        {dummyTrophies.map((trophy, index) => (
          <div key={index} className="trophy-card">
            <div className="trophy-left">
              <div className="trophy-img-placeholder">🏆</div>
            </div>
            <div className="trophy-middle">
              <h3 className="trophy-title">{trophy.title}</h3>
              <p className="trophy-description">{trophy.description}</p>
              <div className="trophy-progress-bar">
                <div
                  className="trophy-progress-fill"
                  style={{ width: `${Math.min(trophy.progress, 100)}%` }}
                ></div>
              </div>
            </div>
            <div className="trophy-right">
              <span className="trophy-status">{trophy.earned ? "✔️" : "❌"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
