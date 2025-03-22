import React, { useState } from 'react';
import Navbar from "../components/navbar";
import Default from "../assets/cards/default.png";
import Exetah from "../assets/cards/exetah.png";
import Smart from "../assets/cards/smart.png";
import "../styles/Inventory.css";

// Example array of cards. Replace these with your actual card images.
const cards = [
  { id: 1, image: Default },
  { id: 2, image: Smart },
  { id: 3, image: Exetah }
  // Add more cards as needed
];

const Inventory = () => {
  const [selectedCard, setSelectedCard] = useState(cards[0]);

  return (
    <>
      <Navbar />
      <div className="inventory-container">
        <div className="card-display">
          <h1>Inventory</h1>
          <img src={selectedCard.image} alt={`Card ${selectedCard.id}`} />
        </div>
        <div className="thumbnail-box">
          <div className="card-thumbnails">
            {cards.map(card => (
              <div
                key={card.id}
                className={`thumbnail ${selectedCard.id === card.id ? 'active' : ''}`}
                onClick={() => setSelectedCard(card)}
              >
                <img src={card.image} alt={`Card ${card.id}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory;
