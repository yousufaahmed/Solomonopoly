/* Written by Aleem Abbas-Hussain*/

// Import necessary modules and styles
import React from 'react';
import '../styles/Splash.css'; // Import custom CSS for SplashScreen component
import logo from '../assets/logo.svg'; // Import logo image

// Define the SplashScreen component
const SplashScreen = () => {
  return (
    // Main container for the SplashScreen component
    <div className="splash-screen">
      
      {/* Logo image for branding */}
      <img 
        src={logo} 
        alt="Green Exeter Logo" 
        className="logo" 
      />

      {/* Welcome text */}
      <h2 className="welcome-text">Welcome Back</h2>
      
      {/* Button container for navigation options */}
      <div className="splash-button">
        
        {/* Link to navigate to the sign-in form */}
        <a 
          href="/loginform" 
          className="splashbutton"
        >
          SIGN IN
        </a>
        
        {/* Link to navigate to the sign-up form */}
        <a 
          href="/signup" 
          className="splashbutton"
        >
          SIGN UP
        </a>

      </div>
    </div>
  );
};

// Export the SplashScreen component as the default export
export default SplashScreen;
