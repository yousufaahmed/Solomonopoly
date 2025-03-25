//  Written by Aleem Abbas-Hussain and Mohammed Shahid and Yousuf Ahmed and Sri Guhan

import React, { useEffect, useState } from "react";
import '../styles/UserProfile.css';
import sign_out from "../assets/sign_out.png";
import coinsImage from "../assets/coins.png";
import default_profile from "../assets/profilepics/PROFILE_COMMON_DEFAULT.png";
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN } from "../constants";
import Navbar from "../components/navbar";
import axios from 'axios';
import termsHtml from "./TermsHtml.jsx";
const API = import.meta.env.VITE_API_BASE;

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
  const [selectedAvatar, setSelectedAvatar] = useState(default_profile);
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [playerId, setPlayerId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) return;
        const decoded = jwtDecode(token);
        const userId = decoded.user_id;

        // Get player ID and logo filename
        const playerRes = await axios.get(`${API}/api/playerid/${userId}/`);
        const { player_id, logo } = playerRes.data;
        setPlayerId(player_id);


        // Step 2: Get full player details including campus + logo
        const playerDetailsRes = await axios.get(`${API}/api/player/${player_id}/`);
        const campus = playerDetailsRes.data.campus;


        // Set campus based on ID
        const campusName = campus === 2 ? "St Lukes" : "Streatham";
        setCampus(campusName);

        // Use the saved logo to reconstruct the avatar path
        if (logo && avatarModules[`../assets/profilepics/${logo}`]) {
          setSelectedAvatar(avatarModules[`../assets/profilepics/${logo}`]);
        }

        // Get username
        const usernameRes = await axios.get(`${API}/api/user/${userId}/username/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const { username } = usernameRes.data;
        setName(username);

        // Get leaderboard and player rank
        const leaderboardRes = await axios.get(`${API}/api/leaderboard/`);
        const sorted = leaderboardRes.data.sort((a, b) => b.points - a.points);
        const userEntry = sorted.find(record => record.username.toLowerCase() === username.toLowerCase());

        if (userEntry) {
          setCoins(userEntry.points);
          setLeaderboardPosition(sorted.findIndex(r => r.username.toLowerCase() === username.toLowerCase()) + 1);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setName("User");
      }
    };

    fetchData();
  }, []);

  const handleAvatarSelect = async (avatar) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const decoded = jwtDecode(token);
    const filename = avatar.split("/").pop();

    try {
      await axios.patch(
        `${API}/api/player/${playerId}/logo/`,
        { logo: filename },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSelectedAvatar(avatar);
      setShowAvatarPopup(false);
    } catch (err) {
      console.error("Failed to update avatar:", err);
    }
  };

  return (
    <div className="user_container">
      <Navbar />

      {/* Sign out button */}
      <button type="submit" className="sign_out_icon" onClick={() => window.location.href = '/logout'}>
        <img src={sign_out} alt="signout" className="sign_out_image" />
      </button>

      {/* Coins display */}
      <button type="submit" className="coins_icon">
        <img src={coinsImage} alt="coins" className="coins_image" />
        {coins}
      </button>

      {/* Profile picture - clickable */}
      <img
        src={selectedAvatar || default_profile}
        alt="user_img"
        className="user_img"
        onClick={() => setShowAvatarPopup(!showAvatarPopup)}
        style={{ cursor: "pointer" }}
      />

      <div className="user_text">
        <h1 className="user_intro">Hi {name}!</h1>
        <h1 className="user_date">Joined 2025</h1>

        {showAvatarPopup && (
          <div className="avatar_popup">
            {avatarList.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`avatar-${index}`}
                className="avatar_option"
                onClick={() => handleAvatarSelect(avatar)}
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
          onChange={async (e) => {
            const newCampusName = e.target.value;
            setCampus(newCampusName);

            const campusMap = {
              "Streatham": 1,
              "St Lukes": 2
            };

            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) return;

            try {
              await axios.patch(`${API}/api/player/${playerId}/update/`, {
                campus: campusMap[newCampusName]
              }, {
                headers: { Authorization: `Bearer ${token}` }
              });

              console.log("Campus updated to:", newCampusName);
            } catch (err) {
              console.error("Failed to update campus:", err);
              alert("Failed to update campus.");
            }
          }}
        >
          <option value="Streatham">Streatham</option>
          <option value="St Lukes">St Lukes</option>
        </select>

      </div>

      {/* Leaderboard position */}
      <button type="button" className="leaderpos_btn">
        Leaderboard Position: {leaderboardPosition ? `#${leaderboardPosition}` : "#?"}
      </button>

      {/* Read T&Cs button */}
      <button type="button" className="terms_btn" onClick={() => setShowTermsPopup(!showTermsPopup)}>
        📘 Read T&C's
      </button>

      {showTermsPopup && (
        <div className="terms_popup">
          <button className="terms_close_btn" onClick={() => setShowTermsPopup(false)}>✖</button>
          <div className="terms_content" dangerouslySetInnerHTML={{ __html: termsHtml }} />
        </div>
      )}

      {/* Delete account */}
      <button type="button" className="delete_account_btn" onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}>
        Delete Account 
      </button>


      {showDeleteConfirm && (

  <button
  type="button"
  className="delete_confirm_btn"
  onClick={async () => {
    try {
      const response = await fetch(`${API}/api/player/${playerId}/delete/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      ;

      if (response.ok) {
        alert("Your account has been successfully deleted.");
        localStorage.removeItem(ACCESS_TOKEN); // Remove token
        window.location.href = "/"; // Redirect to home or login page
      } else {
        const errorData = await response.json();
        alert(`Failed to delete account: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Deletion error:", error);
      alert("An error occurred while trying to delete your account.");
    }
  }}
>
  Click to confirm deletion
</button>

)}


    </div>
  );
};

export default UserProfile;
