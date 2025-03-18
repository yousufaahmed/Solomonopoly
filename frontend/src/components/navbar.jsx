import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/logo_nav.png";
import user_profile from "../assets/user_profile.png";
import { ACCESS_TOKEN } from "../constants";

const Navbar = () => {
  const navigate = useNavigate();
  // Create a state to track authentication.
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem(ACCESS_TOKEN))
  );

  // Create a function to update the authentication state.
  const checkAuth = () => {
    setIsAuthenticated(Boolean(localStorage.getItem(ACCESS_TOKEN)));
  };

  // Option 1: Listen to the 'storage' event for cross-tab updates.
  useEffect(() => {
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // Option 2: Use an interval or custom event if needed. For example:
  // useEffect(() => {
  //   const interval = setInterval(checkAuth, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <nav className="navbar_container">
      <button
        type="button"
        className="navbar_home"
        onClick={() => navigate("/home")}
      >
        <img src={logo} alt="logo" className="logo_img" />
      </button>

      <div className="nav-links-container">
        {/* Other navigation links */}
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
        <button
          type="button"
          className="nav-links"
          onClick={() => navigate("/qr")}
        >
          <p>QR-Scanner</p>
        </button>
        <button
          type="button"
          className="nav-links"
          onClick={() => navigate("/map")}
        >
          <p>Map</p>
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

        {isAuthenticated ? (
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
    </nav>
  );
};

export default Navbar;
