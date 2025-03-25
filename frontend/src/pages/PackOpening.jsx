//  Written by Aleem Abbas-Hussain and Mohammed Shahid and Sri Guhan

import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import "../styles/packopening.css";
import packSound from "../assets/sounds/pack_open.mp3";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../constants";
import axios from "axios";
const API = import.meta.env.VITE_API_BASE;

const cardModules = import.meta.glob('../assets/cards/*.png', {
  eager: true,
  import: 'default'
});

const PackOpening = () => {
  const audioRef = useRef(null);
  const [cardImage, setCardImage] = useState(null);
  const [cardName, setCardName] = useState("");
  const [rarity, setRarity] = useState("");
  const [hasRedeemed, setHasRedeemed] = useState(false);
  const redemptionRef = useRef(false); // Use ref to track redemption across renders

  const packType = new URLSearchParams(window.location.search).get("pack");

  useEffect(() => {
    const redeemCard = async () => {
      // Check the ref value instead of state to prevent double redemption
      if (redemptionRef.current) return;
      
      // Set ref immediately to prevent any possibility of double execution
      redemptionRef.current = true;
      
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
          console.error("No token found");
          return;
        }

        const decoded = jwtDecode(token);

        const playerRes = await axios.get(`${API}/api/playerid/${decoded.user_id}/`);
        const playerId = playerRes.data.player_id;

        console.log(`Redeeming ${packType} pack for player ${playerId}`); // Debug log

        const res = await axios.post(`${API}/api/player/${playerId}/redeem_pack/`, {
          pack_type: packType
        });

        const card = res.data.card_awarded;
        setCardName(card.name);
        setRarity(card.rarity);
        setHasRedeemed(true);

        const imagePath = `../assets/cards/${card.picture}`;
        const matchedImage = cardModules[imagePath];
        setCardImage(matchedImage || null);
      } catch (err) {
        console.error("Redemption failed", err);
        // Reset the ref if redemption fails so user can try again
        redemptionRef.current = false;
      }
    };

    redeemCard();

    const audio = audioRef.current;
    if (audio) {
      audio.volume = 1.0;
      audio.play().catch(console.error);

      setTimeout(() => {
        const fade = setInterval(() => {
          audio.volume = Math.max(audio.volume - 0.05, 0);
          if (audio.volume === 0) {
            audio.pause();
            clearInterval(fade);
          }
        }, 100);
      }, 2500);
    }

    const end = Date.now() + 3000;
    const frame = () => {
      confetti({ particleCount: 7, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
    
    // Cleanup function
    return () => {
      if (audio) {
        audio.pause();
        audio.volume = 0;
      }
    };
  }, [packType]); // Only depend on packType, not hasRedeemed

  return (
    <>
      <audio ref={audioRef} src={packSound} preload="auto" />
      <div className="packopening_wrapper">
        <button
          type="button"
          className="close-btn"
          onClick={() => (window.location.href = "/store")}
        >
          X
        </button>
        {cardImage && (
          <>
            <img
              src={cardImage}
              alt={cardName}
              className={`card-image rarity-${rarity}`}
            />
          </>
        )}
      </div>
    </>
  );
};

export default PackOpening;
