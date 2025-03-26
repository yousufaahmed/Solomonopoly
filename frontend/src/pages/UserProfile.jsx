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

// Dynamically import avatars
const avatarModules = import.meta.glob('../assets/profilepics/*.png', {
  eager: true,
  import: 'default'
});
const avatarList = Object.entries(avatarModules).map(([_, src]) => src);

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
  const [userId, setUserId] = useState(null);

  // Username/Password update
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) return;

        const decoded = jwtDecode(token);
        const userId = decoded.user_id;
        setUserId(userId);

        const playerRes = await axios.get(`${API}/api/playerid/${userId}/`);
        const { player_id, logo } = playerRes.data;
        setPlayerId(player_id);

        const playerDetailsRes = await axios.get(`${API}/api/player/${player_id}/`);
        const campus = playerDetailsRes.data.campus;
        setCampus(campus === 2 ? "St Lukes" : "Streatham");

        if (logo && avatarModules[`../assets/profilepics/${logo}`]) {
          setSelectedAvatar(avatarModules[`../assets/profilepics/${logo}`]);
        }

        const usernameRes = await axios.get(`${API}/api/user/${userId}/username/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setName(usernameRes.data.username);

        const leaderboardRes = await axios.get(`${API}/api/leaderboard/`);
        const sorted = leaderboardRes.data.sort((a, b) => b.points - a.points);
        const userEntry = sorted.find(
          r => r.username.toLowerCase() === usernameRes.data.username.toLowerCase()
        );

        if (userEntry) {
          setCoins(userEntry.points);
          setLeaderboardPosition(sorted.indexOf(userEntry) + 1);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setName("User");
      }
    };

    fetchData();
  }, []);

  const handleAvatarSelect = async (avatar) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
  
    // Safely strip Vercel hash from filename
    const rawFilename = avatar.split("/").pop();
    const filename = rawFilename.replace(/-[a-zA-Z0-9]{8}(?=\.\w+$)/, "");
  
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

  const handleUserUpdate = async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) return;

      // Important: Use user ID, not player ID for this endpoint
      await axios.patch(`${API}/api/user/${userId}/update/`, {
        username: newUsername,
        password: newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Login details updated successfully!");
      // Clear form and redirect to login page
      setNewUsername("");
      setNewPassword("");
      setShowUserDropdown(false);
      
      // Remove token and redirect to login form
      localStorage.removeItem(ACCESS_TOKEN);
      window.location.href = "/loginform";
    } catch (err) {
      console.error("Error updating login:", err);
      alert("Failed to update login details. Please try again.");
    }
  };

  return (
    <div className="user_container">
      <Navbar />

      {/* Sign Out */}
      <button type="submit" className="sign_out_icon" onClick={() => window.location.href = '/logout'}>
        <img src={sign_out} alt="signout" className="sign_out_image" />
      </button>

      {/* Coins */}
      <button type="submit" className="coins_icon">
        <img src={coinsImage} alt="coins" className="coins_image" />
        {coins}
      </button>

      {/* Avatar with ✏️ */}
      <div className="avatar-edit-container" onClick={() => setShowAvatarPopup(!showAvatarPopup)}>
        <img src={selectedAvatar || default_profile} alt="user_img" className="user_img" />
        <span className="emoji-pen">✏️</span>
      </div>

      <div className="user_text">
        <h1 className="user_intro">Hi {name}!</h1>
        <h1 className="user_date">Joined 2025</h1>
      </div>

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

      {/* Campus dropdown */}
      <div className="campus_select_container">
        <select
          className="campus_select"
          value={campus}
          onChange={async (e) => {
            const newCampus = e.target.value;
            setCampus(newCampus);

            const campusMap = {
              "Streatham": 1,
              "St Lukes": 2
            };

            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) return;

            try {
              await axios.patch(`${API}/api/player/${playerId}/update/`, {
                campus: campusMap[newCampus]
              }, {
                headers: { Authorization: `Bearer ${token}` }
              });
              console.log("Campus updated.");
            } catch (err) {
              alert("Failed to update campus.");
            }
          }}
        >
          <option value="Streatham">Streatham</option>
          <option value="St Lukes">St Lukes</option>
        </select>
      </div>

      {/* Change Login Button */}
      <button type="button" className="leaderpos_btn" onClick={() => setShowUserDropdown(!showUserDropdown)}>
        ✨ Change Login Details
      </button>

      {showUserDropdown && (
        <div className="user_dropdown">
          <input
            type="text"
            placeholder="New Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className="update_btn" onClick={handleUserUpdate}>Update & Logout</button>
        </div>
      )}

      {/* Leaderboard Position */}
      <button type="button" className="leaderpos_btn">
        Leaderboard Position: {leaderboardPosition ? `#${leaderboardPosition}` : "#?"}
      </button>

      {/* Terms */}
      <button type="button" className="terms_btn" onClick={() => setShowTermsPopup(!showTermsPopup)}>
        📘 Read T&C's
      </button>

      {showTermsPopup && (
        <div className="terms_popup">
          <button className="terms_close_btn" onClick={() => setShowTermsPopup(false)}>✖</button>
          <div className="terms_content" dangerouslySetInnerHTML={{ __html: termsHtml }} />
        </div>
      )}

      {/* Delete Account */}
      <button type="button" className="delete_account_btn" onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}>
        Delete Account
      </button>

      {showDeleteConfirm && (
        <button type="button" className="delete_confirm_btn" onClick={async () => {
          try {
            const res = await fetch(`${API}/api/player/${playerId}/delete/`, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
              alert("Account deleted.");
              localStorage.removeItem(ACCESS_TOKEN);
              window.location.href = "/";
            } else {
              alert("Failed to delete account.");
            }
          } catch (error) {
            alert("Error deleting account.");
          }
        }}>
          Click to confirm deletion
        </button>
      )}
    </div>
  );
};

export default UserProfile;