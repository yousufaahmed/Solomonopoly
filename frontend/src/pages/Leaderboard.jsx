<<<<<<< Updated upstream
// Written by Aleem Abbas-Hussain

// All relevant imports
import React, { useState } from 'react';
import '../styles/Leaderboard.css';
import Navbar from '../components/navbar';  // Import existing Footer component
import profile_picture from '../assets/user_profile.png' // Import profile picture for user "Mark"
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import '../styles/Leaderboard.css';
>>>>>>> Stashed changes


// Array containing all 'friends'
const Leaderboard = () => {
<<<<<<< Updated upstream
  const friendsList = [
    { name: "Mark (You)", score: 342, image: profile_picture },
    { name: "Mohammed", score: 339, image: "https://randomuser.me/api/portraits/men/4.jpg" },
    { name: "Sophie", score: 327, image: "https://randomuser.me/api/portraits/women/1.jpg" }
  ];

// Array containing all app users (also includes friends)
  const leaderboardData = {
    Everyone: [
      { name: "James", score: 364, image: "https://randomuser.me/api/portraits/men/1.jpg" },
      { name: "Timothy", score: 356, image: "https://randomuser.me/api/portraits/men/2.jpg" },
      ...friendsList,
      { name: "Elijah", score: 336, image: "https://randomuser.me/api/portraits/men/5.jpg" },
      { name: "Noah", score: 295, image: "https://randomuser.me/api/portraits/men/6.jpg" },
      { name: "Aisha", score: 104, image: "https://randomuser.me/api/portraits/women/2.jpg" }
    ],
    Friends: friendsList
  };

  const [activeTab, setActiveTab] = useState("Everyone");

  // Sort and calculate ranks based on score
  const getRankedData = (data) => {
    return data
      .sort((a, b) => b.score - a.score)  // Sort by score descending
      .map((user, index) => ({
=======
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
>>>>>>> Stashed changes
        ...user,
        rank: `#${index + 1}`  // Assign rank based on sorted position
      }));
  };

<<<<<<< Updated upstream
  // Get data for the active tab
  const displayData = activeTab === "Everyone" 
    ? getRankedData([...leaderboardData.Everyone])
    : getRankedData([...leaderboardData.Friends]);
=======
  const everyoneData = getRankedData(leaderboardData);
  const friendsData = getRankedData(leaderboardData);
  const displayData = activeTab === "Everyone" ? everyoneData : friendsData;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
>>>>>>> Stashed changes

  // Creates divider to hold all in the leaderboard page
  return (
    <div className="leaderboard-container">
<<<<<<< Updated upstream
      <Navbar/>
      <header className="leaderboard-header">
        Leaderboard
      </header>
      
=======
      <Navbar />
      <header className="leaderboard-header">Leaderboard</header>
>>>>>>> Stashed changes
      <div className="tabs">
        <button className={`tab-button ${activeTab === "Everyone" ? "active" : ""}`} onClick={() => setActiveTab("Everyone")}>Everyone</button>
        <button className={`tab-button ${activeTab === "Friends" ? "active" : ""}`} onClick={() => setActiveTab("Friends")}>Friends</button>
      </div>
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
      <div className="leaderboard-list">
        {displayData.map((user, index) => (
          <div key={index} className="leaderboard-item">
            <div className="leaderboard-user">
<<<<<<< Updated upstream
              <img
                src={user.image}
                alt={user.name}
                className="user-image"
              />
=======
              <img src={user.image || "/fallback.png"} alt={user.username} className="user-image" />
>>>>>>> Stashed changes
              <div className="user-info">
                <p className="user-name">{user.name}</p>
                <p className="user-score">{user.score} coins</p>
              </div>
            </div>
            <span className="user-rank">{user.rank}</span>
          </div>
        ))}
      </div>
      <div className="friend-code-container">
        <input type="text" placeholder="Enter Friend Code" className="friend-code-input" />
        <button className="add-friend-button">Add Friend</button>
      </div>
    </div>
  );
};

export default Leaderboard;
