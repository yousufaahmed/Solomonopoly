import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import "../styles/Inventory.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { ACCESS_TOKEN } from "../constants";

// Dynamically load all card images from folder
const cardImages = import.meta.glob("../assets/cards/*.png", {
  eager: true,
  import: "default"
});

const Inventory = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const fetchPlayerCards = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) return;
    
        const decoded = jwtDecode(token);
        const playerRes = await axios.get(`http://localhost:8000/api/playerid/${decoded.user_id}/`);
        const playerId = playerRes.data.player_id;
    
        const cardsRes = await axios.get(`http://localhost:8000/api/player/${playerId}/cards/`);
        const fetchedCards = cardsRes.data;
    
        // Define rarity order
        const rarityOrder = {
          legendary: 1,
          rare: 2,
          uncommon: 3,
          common: 4
        };
    
        // 🔽 Sort by rarity before mapping
        const sortedCards = [...fetchedCards].sort((a, b) => {
          return (rarityOrder[a.rarity] || 99) - (rarityOrder[b.rarity] || 99);
        });
    
        // Match images
        const cardsWithImages = sortedCards.map((card, index) => {
          const imagePath = `../assets/cards/${card.picture}`;
          return {
            ...card,
            image: cardImages[imagePath] || null,
            id: index + 1
          };
        });
    
        setCards(cardsWithImages);
        setSelectedCard(cardsWithImages[0]);
      } catch (err) {
        console.error("Failed to load player cards:", err);
      }
    };
    

    fetchPlayerCards();
  }, []);

  return (
    <>
      <Navbar />
      <div className="inventory-container">
        <div className="card-display">
          <h1>Inventory</h1>
          {selectedCard ? (
            <>
              <img src={selectedCard.image} alt={`Card ${selectedCard.name}`} />
              <h2>{selectedCard.name}</h2>
              <p className="rarity">{selectedCard.rarity?.toUpperCase()}</p>
            </>
          ) : (
            <p>You have no cards yet.</p>
          )}
        </div>

        <div className="thumbnail-box">
          <div className="card-thumbnails">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`thumbnail ${selectedCard?.id === card.id ? "active" : ""}`}
                onClick={() => setSelectedCard(card)}
              >
                <img src={card.image} alt={`Card ${card.name}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory;
