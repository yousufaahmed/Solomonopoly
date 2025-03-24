import React, { useEffect, useState } from "react";
import '../styles/UserProfile.css';
import sign_out from "../assets/sign_out.png";
import coinsImage from "../assets/coins.png";
import default_profile from '../assets/user_profile.png';
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN } from "../constants";
import Navbar from "../components/navbar";
import axios from 'axios';

// Dynamically import and sort avatars by rarity
const avatarModules = import.meta.glob('../assets/profilepics/*.png', {
  eager: true,
  import: 'default'
});

const avatarEntries = Object.entries(avatarModules);

const commonAvatars = avatarEntries
  .filter(([filename]) => filename.includes("PROFILE_COMMON_"))
  .map(([_, src]) => src);

const uncommonAvatars = avatarEntries
  .filter(([filename]) => filename.includes("PROFILE_UNCOMMON_"))
  .map(([_, src]) => src);

const rareAvatars = avatarEntries
  .filter(([filename]) => filename.includes("PROFILE_RARE_"))
  .map(([_, src]) => src);

const avatarList = [...commonAvatars, ...uncommonAvatars, ...rareAvatars];


const UserProfile = () => {
  const [name, setName] = useState('');
  const [coins, setCoins] = useState(0);
  const [leaderboardPosition, setLeaderboardPosition] = useState(null);
  const [campus, setCampus] = useState("Streatham");
  const [selectedAvatar, setSelectedAvatar] = useState(localStorage.getItem("selectedAvatar") || default_profile);
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) return;
        const decoded = jwtDecode(token);

        const usernameResponse = await fetch(`http://localhost:8000/api/user/${decoded.user_id}/username/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const { username } = await usernameResponse.json();
        setName(username);

        const leaderboardResponse = await axios.get("http://localhost:8000/api/leaderboard/");
        const leaderboardData = leaderboardResponse.data;

        const sortedLeaderboard = leaderboardData.sort((a, b) => b.points - a.points);
        const userRecord = sortedLeaderboard.find(
          record => record.username.toLowerCase() === username.toLowerCase()
        );

        if (userRecord) {
          setCoins(userRecord.points);
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
        <img src={sign_out} alt="signout" className="sign_out_image" />
      </button>

      {/* Coins display */}
      <button type="submit" className="coins_icon">
        <img src={coinsImage} alt="coins" className="coins_image" />
        {coins}
      </button>

      {/* Profile picture (clickable) */}
      <img
        src={selectedAvatar}
        alt="user_img"
        className="user_img"
        onClick={() => setShowAvatarPopup(!showAvatarPopup)}
        style={{ cursor: "pointer" }}
      />

      {/* User info and avatar popup */}
      <div className="user_text">
        <h1 className="user_intro">Hi {name}!</h1>
        <h1 className="user_id">#345-876</h1>
        <h1 className="user_date">Joined Mar 2025</h1>

        {showAvatarPopup && (
          <div className="avatar_popup">
            {avatarList.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`avatar-${index}`}
                className="avatar_option"
                onClick={() => {
                  setSelectedAvatar(avatar);
                  localStorage.setItem("selectedAvatar", avatar);
                  setShowAvatarPopup(false);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Campus dropdown */}
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

      {/* Leaderboard position button */}
      <button type="button" className="leaderpos_btn">
        Leaderboard Position: {leaderboardPosition ? `#${leaderboardPosition}` : "#?"}
      </button>
    </div>
  );
};

export default UserProfile;
