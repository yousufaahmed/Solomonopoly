/* Written by Aleem Abbas-Hussain*/

import React from'react'
import '../styles/Splash.css'
import logo from '../assets/logo.svg'


const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <img src={logo} alt="Green Exeter Logo" className="logo" />
      <h2 className="welcome-text">Welcome Back</h2>
      <div className="splash-button">
      <a href="http://192.168.0.76:5173/loginform" className="splashbutton">SIGN IN</a>
      <a href="http://192.168.0.76:5173/signup" className="splashbutton">SIGN UP</a>

      </div>
    </div>
  );
};

export default SplashScreen;
