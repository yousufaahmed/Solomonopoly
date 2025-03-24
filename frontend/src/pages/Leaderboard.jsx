// Code By: Yousuf Ahmed, Aleem Abbas Hussein, Mohammed Zarrar Shahid

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import '../styles/Leaderboard.css';
import defaultProfile from '../assets/profilepics/PROFILE_COMMON_DEFAULT.png';

// Dynamically import all profile pics
const avatarModules = import.meta.glob('../assets/profilepics/*.png', {
  eager: true,
  import: 'default',
});

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Everyone");

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/leaderboard/");
        setLeaderboardData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  const getRankedData = (array) => {
    return [...array]
      .sort((a, b) => b.points - a.points)
      .map((user, i) => ({
        ...user,
        rank: `#${i + 1}`,
      }));
  };

  const everyoneData = getRankedData(leaderboardData);
  const friendsData = getRankedData([]); // placeholder for future friends logic
  const displayData = activeTab === "Everyone" ? everyoneData : friendsData;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="leaderboard-container">
      <Navbar />
      <header className="leaderboard-header">Leaderboard</header>
      
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "Everyone" ? "active" : ""}`}
          onClick={() => setActiveTab("Everyone")}
        >
          Everyone
        </button>
        <button
          className={`tab-button ${activeTab === "Friends" ? "active" : ""}`}
          onClick={() => setActiveTab("Friends")}
        >
          Friends
        </button>
      </div>

      <div className="leaderboard-list">
        {displayData.map((user, index) => {
          const avatarPath = `../assets/profilepics/${user.logo}`;
          const profilePic = avatarModules[avatarPath] || defaultProfile;

          return (
            <div key={index} className="leaderboard-item">
              <div className="leaderboard-user">
                <img
                  src={profilePic}
                  alt={user.username}
                  className="user-image"
                />
                <div className="user-info">
                  <p className="user-name">{user.username}</p>
                  <p className="user-score">{user.points} coins</p>
                </div>
              </div>
              <span className="user-rank">{user.rank}</span>
            </div>
          );
        })}
      </div>

      <div className="friend-code-container">
        <input
          type="text"
          placeholder="Enter Friend Code"
          className="friend-code-input"
        />
        <button className="add-friend-button">Add Friend</button>
      </div>
    </div>
  );
};

export default Leaderboard;
