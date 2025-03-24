import React, { useState } from 'react';
import Navbar from "../components/navbar";
import Default from "../assets/cards/default.png";
import Bandana from "../assets/cards/bandana.png";
import Cap from "../assets/cards/cap.png";
import Shades from "../assets/cards/shades.png";
import Scarf from "../assets/cards/scarf.png";
import Computer from "../assets/cards/computer.png";
import Exetah from "../assets/cards/exetah.png";
import Gamer from "../assets/cards/gamer.png";
import Pirate from "../assets/cards/pirate.png";
import Science from "../assets/cards/science.png";
import Batcat from "../assets/cards/batcat.png";
import CR7 from "../assets/cards/CR7.png";
import Goku from "../assets/cards/goku.png";
import Smart from "../assets/cards/smart.png";
import Spider from "../assets/cards/spider.png";
import Phoenix from "../assets/cards/phoenix.png";

import "../styles/Inventory.css";

// Example array of cards. Replace these with your actual card images.
const cards = [
  { id: 1, image: Default },
  { id: 2, image: Bandana },
  { id: 3, image: Cap },
  { id: 4, image: Shades },
  { id: 5, image: Scarf },
  { id: 6, image: Computer },
  { id: 7, image: Exetah },
  { id: 8, image: Gamer },
  { id: 9, image: Pirate },
  { id: 10, image: Science },
  { id: 11, image: Batcat },
  { id: 12, image: CR7 },
  { id: 13, image: Goku },
  { id: 14, image: Smart },
  { id: 15, image: Spider },
  { id: 16, image: Phoenix }
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
