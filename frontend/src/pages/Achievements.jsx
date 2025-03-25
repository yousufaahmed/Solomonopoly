// Created by: Aleem, Sri Guhan, Yousuf

import React, { useEffect, useState } from "react";
import "../styles/Achievements.css";
import Navbar from "../components/navbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../constants";
const API = import.meta.env.VITE_API_BASE;

// Dynamically import all trophy images from assets folder
const trophyImages = import.meta.glob("../assets/*_trophy_image.png", {
  eager: true,
  import: "default",
});

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [playerId, setPlayerId] = useState(null);

  // Select trophy image based on tags
  const getTrophyImage = (tags) => {
    if (!tags || tags.length === 0) {
      return trophyImages["../assets/Default_trophy_image.png"];
    }

    const tagMap = {
      water: "Water_trophy_image.png",
      recycling: "Recycling_trophy_image.png",
      cycle: "Bike_trophy_image.png",
      walk: "Walking_trophy_image.png",
      bus: "Bus_trophy_image.png",
    };
    
    for (const tag of tags) {
      const filename = tagMap[tag.toLowerCase()];
      if (filename && trophyImages[`../assets/${filename}`]) {
        return trophyImages[`../assets/${filename}`];
      }
    }

    return trophyImages["../assets/Default_trophy_image.png"];
  };

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) return;

        const decoded = jwtDecode(token);
        const userId = decoded.user_id;

        // Step 1: Get player ID
        const playerRes = await axios.get(`${API}/api/playerid/${userId}/`);
        const pid = playerRes.data.player_id;
        setPlayerId(pid);

        // Step 2: Get ALL achievements to know their original counts
        const allAchievementsRes = await axios.get(`${API}/api/achievements/`);
        const allAchievements = allAchievementsRes.data;
        
        // Create a map of achievement ID to original count
        const achievementCountMap = {};
        allAchievements.forEach(achievement => {
          achievementCountMap[achievement.achievement_id] = achievement.count;
        });

        // Step 3: Get player's achievements progress
        const playerAchievementsRes = await axios.get(`${API}/api/player/${pid}/achievements/`);
        const playerAchievements = playerAchievementsRes.data;

        const detailedAchievements = await Promise.all(
          playerAchievements.map(async (pa) => {
            const achievementRes = await axios.get(`${API}/api/achievement/${pa.achievement}/`);
            const achievement = achievementRes.data;

            // Get the original total count from our map
            const originalTotalCount = achievementCountMap[pa.achievement] || 1;
            
            // If pa.count is remaining items (e.g., "7 left"), then:
            const completed = originalTotalCount - pa.count;
            const progressPercentage = (completed / originalTotalCount) * 100;
            
            // Ensure progress is between 0 and 100
            const progress = Math.max(0, Math.min(100, progressPercentage));
            
            console.log(`Achievement: ${achievement.name}`);
            console.log(`- Original total count: ${originalTotalCount}`);
            console.log(`- Count remaining: ${pa.count}`);
            console.log(`- Completed: ${completed}`);
            console.log(`- Progress %: ${progress}`);
            
            const tagNames = (pa.tags || []).map((tag) => tag.name.toLowerCase());

            return {
              ...achievement,
              progress,
              earned: pa.completed,
              remaining: pa.count,
              maxCount: originalTotalCount,
              tags: tagNames,
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
        {achievements.map((trophy, index) => {
          const trophyImage = getTrophyImage(trophy.tags);

          return (
            <div key={index} className="trophy-card">
              <div className="trophy-left">
                <img src={trophyImage} alt="Trophy" className="trophy-img" />
              </div>
              <div className="trophy-middle">
                <h3 className="trophy-title">{trophy.name}</h3>
                <p className="trophy-description">{trophy.description}</p>
                <div className="trophy-progress-bar">
                  <div
                    className="trophy-progress-fill"
                    style={{ 
                      width: `${trophy.progress}%`,
                      // Add a minimum width for visibility even at small percentages
                      minWidth: trophy.progress > 0 ? '4px' : '0'
                    }}
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
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;