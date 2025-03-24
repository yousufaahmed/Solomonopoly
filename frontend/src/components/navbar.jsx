import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/logo_nav.png";
import user_profile from "../assets/user_profile.png";
import { ACCESS_TOKEN } from "../constants";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem(ACCESS_TOKEN);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar_container">
      <button
        type="button"
        className="navbar_home"
        onClick={() => navigate("/home")}
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
          onClick={() => navigate("/leaderboard")}
        >
          <p>Leaderboard</p>
        </button>

        <button
          type="button"
          className="nav-links"
          onClick={() => navigate("/taskboard")}
        >
          <p>Taskboard</p>
        </button>

        {/* New Achievements button */}
        <button
          type="button"
          className="nav-links"
          onClick={() => navigate("/achievements")}
        >
          <p>Achievements</p>
        </button>

        <button
          type="button"
          className="nav-links"
          onClick={() => navigate("/qr")}
        >
          <p>QR Scanner</p>
        </button>

        <button
          type="button"
          className="nav-links"
          onClick={() => navigate("/inventory")}
        >
          <p>Inventory</p>
        </button>

        <button
          type="button"
          className="nav-links"
          onClick={() => navigate("/store")}
        >
          <p>Store</p>
        </button>

        {/* New Map button */}
        <button
          type="button"
          className="nav-links"
          onClick={() => navigate("/map")}
        >
          <p>Map</p>
        </button>

        {token ? (
          <img
            src={user_profile}
            alt="Profile"
            className="profile_pic"
            onClick={() => navigate("/user")}
          />
        ) : (
          <button
            type="button"
            className="login-nav"
            onClick={() => navigate("/loginform")}
          >
            <p>Log in</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
