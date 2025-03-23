// Written by Mohammed Zarrar Shahid and Aleem-Deen Abbas Hussein

import React from 'react';
import Navbar from '../components/navbar';
import '../styles/Store.css';
import bronzePack from '../assets/bronze-pack.png';
import silverPack from '../assets/silver-pack.png';
import goldPack from '../assets/gold-pack.png';

const Store = () => {
  return (
    <div className="store-container">
      <Navbar />
      <h1 className="store-title">Store</h1>
      <p className="store-subtitle">Purchase packs to obtain collectors cards!</p>

      <div className="store-cards">
        <div className="store-card">
          <img src={bronzePack} alt="Bronze Pack" className="pack-image" />
          <hr className="pack-divider" />
          <h3 className="pack-name">Bronze Card Pack</h3>
          <hr className="pack-divider" />
          <p className="pack-description">Open to obtain a bronze collectors card!</p>
          <hr className="pack-divider" />
          <p className="pack-price">150 Coins</p>
          <button className="buy-button">Buy now!</button>
        </div>

        <div className="store-card">
          <img src={silverPack} alt="Silver Pack" className="pack-image" />
          <hr className="pack-divider" />
          <h3 className="pack-name">Silver Card Pack</h3>
          <hr className="pack-divider" />
          <p className="pack-description">Open to obtain a silver collectors card!</p>
          <hr className="pack-divider" />
          <p className="pack-price">300 Coins</p>
          <button className="buy-button">Buy now!</button>
        </div>

        <div className="store-card">
          <img src={goldPack} alt="Gold Pack" className="pack-image" />
          <hr className="pack-divider" />
          <h3 className="pack-name">Gold Card Pack</h3>
          <hr className="pack-divider" />
          <p className="pack-description">Open to obtain a gold collectors card!</p>
          <hr className="pack-divider" />
          <p className="pack-price">450 Coins</p>
          <button className="buy-button">Buy now!</button>
        </div>
      </div>
    </div>
  );
};

export default Store;
