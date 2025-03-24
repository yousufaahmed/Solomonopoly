import React, { useEffect, useState } from "react";
import "../styles/Achievements.css";
import Navbar from "../components/navbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../constants";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [playerId, setPlayerId] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) return;

        const decoded = jwtDecode(token);
        const userId = decoded.user_id;

        // Step 1: Get player ID from user ID
        const playerRes = await axios.get(`http://localhost:8000/api/playerid/${userId}/`);
        const pid = playerRes.data.player_id;
        setPlayerId(pid);

        // Step 2: Get player's achievements progress
        const playerAchievementsRes = await axios.get(`http://localhost:8000/api/player/${pid}/achievements/`);
        const playerAchievements = playerAchievementsRes.data;

        // Step 3: For each, fetch the full achievement info
        const detailedAchievements = await Promise.all(
          playerAchievements.map(async (pa) => {
            const achievementRes = await axios.get(`http://localhost:8000/api/achievement/${pa.achievement}/`);
            const maxCount = 10; // Set your starting baseline here
            const progress = ((maxCount - pa.count) / maxCount) * 100;

            return {
              ...achievementRes.data,
              progress,
              earned: pa.completed,
              remaining: pa.count,
              maxCount: maxCount,
            };
          })
        );

        setAchievements(detailedAchievements);
      } catch (err) {
        console.error("Failed to fetch achievements:", err);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <div className="achievements-wrapper">
      <Navbar />
      <div className="achievements-container">
        {achievements.map((trophy, index) => (
          <div key={index} className="trophy-card">
            <div className="trophy-left">
              {trophy.logo ? (
                <img src={`/assets/achievements/${trophy.logo}`} alt="Trophy" className="trophy-img" />
              ) : (
                <div className="trophy-img-placeholder">🏆</div>
              )}
            </div>
            <div className="trophy-middle">
              <h3 className="trophy-title">{trophy.name}</h3>
              <p className="trophy-description">{trophy.description}</p>
              <div className="trophy-progress-bar">
                <div
                  className="trophy-progress-fill"
                  style={{ width: `${Math.min(trophy.progress, 100)}%` }}
                ></div>
              </div>
              <p className="trophy-count">
                {trophy.earned ? "✅ Completed" : `${trophy.remaining} left`}
              </p>
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
