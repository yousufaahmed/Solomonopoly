//All relevant imports
import React from "react";
import "../styles/navbar.css";
import logo from '../assets/logo_nav.png'

//Footer component, all buttons added going to corresponding pages
const Navbar = () => {
    return(
        <div className="navbar_container">
            <button type="submit" className="navbar_home" onClick={() => window.location.href ='/home'}><img src={logo} alt="logo_img" className="logo_img"/></button> 

            <div class="nav-links-container">
                <button type="submit" className="nav-links" onClick={() => window.location.href ='/leaderboard'}><p1>Leaderboard</p1></button>

                <button type="submit" className="nav-links" onClick={() => window.location.href ='/taskboard'}><p1>Taskboard</p1></button>

                <button type="submit" className="nav-links" onClick={() => window.location.href ='/home'}><p1>Achievements</p1></button>

                <button type="submit" className="nav-links" onClick={() => window.location.href ='/home'}><p1>Store</p1></button>

                <button type="submit" className="login-nav" onClick={() => window.location.href ='/loginform'}><p1>Log in</p1></button> 
            </div>

        </div>       
    );
}

export default Navbar;