import React, { useEffect, useState } from "react";
import Navbar from '../components/navbar';
import '../styles/Store.css';
import bronzePack from '../assets/bronze-pack.png';
import silverPack from '../assets/silver-pack.png';
import goldPack from '../assets/gold-pack.png';
import coinsImage from '../assets/coins.png';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';

const Store = () => {
  const [coins, setCoins] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) return;

        const decoded = jwtDecode(token);

        const usernameResponse = await fetch(`http://localhost:8000/api/user/${decoded.user_id}/username/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const { username } = await usernameResponse.json();

        const leaderboardResponse = await axios.get("http://localhost:8000/api/leaderboard/");
        const leaderboardData = leaderboardResponse.data;

        const userRecord = leaderboardData.find(
          record => record.username.toLowerCase() === username.toLowerCase()
        );

        if (userRecord) {
          setCoins(userRecord.points);
        }
      } catch (error) {
        console.error("Failed to fetch coins:", error);
      }
    };

    fetchCoins();
  }, []);

  const handleBuyPack = (packType, price) => {
    if (coins < price) {
      setErrorMessage("Not enough credits!");
      // Clear error message after 3 seconds
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
    
    // If they have enough coins, proceed to pack opening
    window.location.href = `/packopening?pack=${packType}`;
  };

  return (
    <div className="store-container">
      <Navbar />

      {/* Coins top-right */}
      <button type="button" className="coins_icon">
        <img src={coinsImage} alt="coins" className="coins_image" />
        {coins}
      </button>

      <h1 className="store-title">Store</h1>
      <p className="store-subtitle">Purchase packs to obtain collectors cards!</p>
      
      {/* Error message display */}
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      <div className="store-cards">
        {/* Bronze */}
        <div className="store-card">
          <img src={bronzePack} alt="Bronze Pack" className="pack-image" />
          <hr className="pack-divider" />
          <h3 className="pack-name">Bronze Card Pack</h3>
          <hr className="pack-divider" />
          <p className="pack-description">Open to obtain a bronze collectors card!</p>
          <hr className="pack-divider" />
          <p className="pack-price">150 Coins</p>
          <button
            className="buy-button"
            onClick={() => handleBuyPack('bronze', 150)}
          >
            Buy now!
          </button>
        </div>

        {/* Silver */}
        <div className="store-card">
          <img src={silverPack} alt="Silver Pack" className="pack-image" />
          <hr className="pack-divider" />
          <h3 className="pack-name">Silver Card Pack</h3>
          <hr className="pack-divider" />
          <p className="pack-description">Open to obtain a silver collectors card!</p>
          <hr className="pack-divider" />
          <p className="pack-price">300 Coins</p>
          <button 
            className="buy-button" 
            onClick={() => handleBuyPack('silver', 300)}
          >
            Buy now!
          </button>
        </div>

        {/* Gold */}
        <div className="store-card">
          <img src={goldPack} alt="Gold Pack" className="pack-image" />
          <hr className="pack-divider" />
          <h3 className="pack-name">Gold Card Pack</h3>
          <hr className="pack-divider" />
          <p className="pack-description">Open to obtain a gold collectors card!</p>
          <hr className="pack-divider" />
          <p className="pack-price">450 Coins</p>
          <button 
            className="buy-button" 
            onClick={() => handleBuyPack('gold', 450)}
          >
            Buy now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Store;