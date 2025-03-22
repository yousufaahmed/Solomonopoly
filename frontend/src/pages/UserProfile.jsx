// Written by Mohammed Zarrar Shahid and Yousuf Ahmed

import React, { useEffect, useState } from "react";
import '../styles/UserProfile.css';
import sign_out from "../assets/sign_out.png";
import coinsImage from "../assets/coins.png";
import user_profile from '../assets/user_profile.png';
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN } from "../constants";
import Navbar from "../components/navbar";
import axios from 'axios';

const UserProfile = () => {
  const [name, setName] = useState('');
  const [coins, setCoins] = useState(0);
  const [leaderboardPosition, setLeaderboardPosition] = useState(null);
  const [campus, setCampus] = useState("Streatham");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) return;
        const decoded = jwtDecode(token);
        console.log('Decoded token:', decoded);

        // Fetch username using fetch (which worked for you)
        const usernameResponse = await fetch(`http://localhost:8000/api/user/${decoded.user_id}/username/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!usernameResponse.ok) {
          throw new Error('Failed to fetch username');
        }
        const usernameData = await usernameResponse.json();
        const username = usernameData.username;
        setName(username);

        // Fetch leaderboard data using axios
        const leaderboardResponse = await axios.get("http://localhost:8000/api/leaderboard/");
        const leaderboardData = leaderboardResponse.data;
        
        // Sort leaderboard data by points in descending order
        const sortedLeaderboard = leaderboardData.sort((a, b) => b.points - a.points);
        
        // Find current user's record by matching the username (case-insensitive)
        const userRecord = sortedLeaderboard.find(
          record => record.username.toLowerCase() === username.toLowerCase()
        );
        
        if (userRecord) {
          setCoins(userRecord.points);
          // Calculate rank based on index position in the sorted array
          const rank = sortedLeaderboard.findIndex(
            record => record.username.toLowerCase() === username.toLowerCase()
          ) + 1;
          setLeaderboardPosition(rank);
        }
      } catch (error) {
        console.error("Error fetching user profile data:", error);
        setName("User");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="user_container">
      <Navbar />

      {/* Sign out button */}
      <button 
        type="submit" 
        className="sign_out_icon"
        onClick={() => window.location.href = '/logout'}
      >
        <img 
          src={sign_out} 
          alt="signout" 
          className="sign_out_image"
        />
      </button>

      {/* Coins button displaying user's coin balance */}
      <button type="submit" className="coins_icon">
        <img 
          src={coinsImage} 
          alt="coins" 
          className="coins_image"
        />
        {coins}
      </button>

      {/* User profile image */}
      <img 
        src={user_profile} 
        alt="user_img" 
        className="user_img"
      />

      {/* User information section */}
      <div className="user_text">
        <h1 className="user_intro">Hi {name}!</h1>
        <h1 className="user_id">#345-876</h1>
        <h1 className="user_date">Joined Feb 2025</h1>
      </div>

      {/* Campus Dropdown Styled as a Button */}
      <div className="campus_select_container">
        <select 
          className="campus_select" 
          value={campus} 
          onChange={(e) => setCampus(e.target.value)}
        >
          <option value="Streatham">Streatham</option>
          <option value="St Lukes">St Lukes</option>
        </select>
      </div>

      {/* Leaderboard position */}
      <button type="button" className="leaderpos_btn">
        Leaderboard Position: {leaderboardPosition ? `#${leaderboardPosition}` : "#?"}
      </button>
    </div>
  );
};

export default UserProfile;
