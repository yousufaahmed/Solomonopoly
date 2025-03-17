// // Written by Aleem Abbas-Hussain

// // All relevant imports
// import React, { useState } from 'react';
// import '../styles/Leaderboard.css';
// import Footer from '../components/footer';  // Import existing Footer component
// import profile_picture from '../assets/user_profile.png' // Import profile picture for user "Mark"


// // Array containing all 'friends'
// const Leaderboard = () => {
//   const friendsList = [
//     { name: "Mark (You)", score: 342, image: profile_picture },
//     { name: "Mohammed", score: 339, image: "https://randomuser.me/api/portraits/men/4.jpg" },
//     { name: "Sophie", score: 327, image: "https://randomuser.me/api/portraits/women/1.jpg" }
//   ];

// // Array containing all app users (also includes friends)
//   const leaderboardData = {
//     Everyone: [
//       { name: "James", score: 364, image: "https://randomuser.me/api/portraits/men/1.jpg" },
//       { name: "Timothy", score: 356, image: "https://randomuser.me/api/portraits/men/2.jpg" },
//       ...friendsList,
//       { name: "Elijah", score: 336, image: "https://randomuser.me/api/portraits/men/5.jpg" },
//       { name: "Noah", score: 295, image: "https://randomuser.me/api/portraits/men/6.jpg" },
//       { name: "Aisha", score: 104, image: "https://randomuser.me/api/portraits/women/2.jpg" }
//     ],
//     Friends: friendsList
//   };

//   const [activeTab, setActiveTab] = useState("Everyone");

//   // Sort and calculate ranks based on score
//   const getRankedData = (data) => {
//     return data
//       .sort((a, b) => b.score - a.score)  // Sort by score descending
//       .map((user, index) => ({
//         ...user,
//         rank: `#${index + 1}`  // Assign rank based on sorted position
//       }));
//   };

//   // Get data for the active tab
//   const displayData = activeTab === "Everyone" 
//     ? getRankedData([...leaderboardData.Everyone])
//     : getRankedData([...leaderboardData.Friends]);

//   // Creates divider to hold all in the leaderboard page
//   return (
//     <div className="leaderboard-container">
//       <header className="leaderboard-header">
//         Leaderboard
//       </header>
      
//       <div className="tabs">
//         <button
//           className={`tab-button ${activeTab === "Everyone" ? "active" : ""}`}
//           onClick={() => setActiveTab("Everyone")}
//         >
//           Everyone
//         </button>
//         <button
//           className={`tab-button ${activeTab === "Friends" ? "active" : ""}`}
//           onClick={() => setActiveTab("Friends")}
//         >
//           Friends
//         </button>
//       </div>

//       <div className="leaderboard-list">
//         {displayData.map((user, index) => (
//           <div key={index} className="leaderboard-item">
//             <div className="leaderboard-user">
//               <img
//                 src={user.image}
//                 alt={user.name}
//                 className="user-image"
//               />
//               <div className="user-info">
//                 <p className="user-name">{user.name}</p>
//                 <p className="user-score">{user.score} coins</p>
//               </div>
//             </div>
//             <span className="user-rank">{user.rank}</span>
//           </div>
//         ))}
//       </div>

//       <div className="friend-code-container">
//         <input
//           type="text"
//           placeholder="Enter Friend Code"
//           className="friend-code-input"
//         />
//         <button className="add-friend-button">Add Friend</button>
//       </div>

//       <Footer />  {/* Use the existing Footer component */}
//     </div>
//   );
// };

// export default Leaderboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Leaderboard.css';
import Footer from '../components/footer';  // Update the import path if needed
import Navbar from "../components/navbar"; 

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/leaderboard/');
        console.log("Leaderboard data:", response.data);
        setLeaderboardData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  // Sort and calculate ranks based on points
  const getRankedData = (data) => {
    return data
      .sort((a, b) => b.points - a.points)  // Sort by points descending
      .map((user, index) => ({
        ...user,
        rank: `#${index + 1}`  // Assign rank based on sorted position
      }));
  };

  const displayData = getRankedData([...leaderboardData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="leaderboard-container">

      <Navbar />
      <header className="leaderboard-header">
        Leaderboard
      </header>

      <div className="leaderboard-list">
        {displayData.map((user, index) => (
          <div key={index} className="leaderboard-item">
            <div className="leaderboard-user">
              <img
                src={user.image || "/fallback.png"}  // fallback if 'image' doesn't exist
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
        ))}
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

