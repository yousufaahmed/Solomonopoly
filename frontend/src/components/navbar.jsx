// All relevant imports
import React, { useState } from "react";
import "../styles/navbar.css";
import logo from '../assets/logo_nav.png';

// Navbar component with hamburger menu for mobile
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar_container">
      <button
        type="button"
        className="navbar_home"
        onClick={() => window.location.href = '/home'}
      >
        <img src={logo} alt="logo_img" className="logo_img" />
      </button>

      {/* Hamburger icon, visible on mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Navigation links container */}
      <div className={`nav-links-container ${menuOpen ? "open" : ""}`}>
        <button
          type="button"
          className="nav-links"
          onClick={() => window.location.href = '/leaderboard'}
        >
          <p>Leaderboard</p>
        </button>

        <button
          type="button"
          className="nav-links"
          onClick={() => window.location.href = '/taskboard'}
        >
          <p>Taskboard</p>
        </button>

        <button
          type="button"
          className="nav-links"
          onClick={() => window.location.href = '/achievements'}
        >
          <p>Achievements</p>
        </button>

        <button
          type="button"
          className="nav-links"
          onClick={() => window.location.href = '/store'}
        >
          <p>Store</p>
        </button>

        <button
          type="button"
          className="login-nav"
          onClick={() => window.location.href = '/loginform'}
        >
          <p>Log in</p>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
