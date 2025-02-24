// Written by Mohammed Zarrar Shahid

// All relevant imports

import React from "react";
import '../styles/Home.css'
import qr from '../assets/qr_code.png'
import tree from '../assets/tree.png'
import Footer from "../components/footer";
import ovals from "../assets/ovals.png"

// Define the Home component
const Home = () => {
    return (
        // Main container for the Home component
        <div className="home_container">

            {/* Header section with main title and subtitle */}
            <div className='home_header'>
                <h1>Home</h1>
                <h2>Welcome to Green Exeter!</h2>
            </div>

            {/* Tree image as a background */}
            <div className="tree" style={{ backgroundImage: `url(${tree})` }}></div>

            {/* Button to navigate to the leaderboard page */}
            <button 
                type="button" 
                className="home_leaderboard_btn" 
                onClick={() => window.location.href ='/leaderboard'}
            >
                Leaderboard
            </button>

            {/* Button to navigate to the taskboard page */}
            <button 
                type="button" 
                className="home_taskboard_btn" 
                onClick={() => window.location.href ='/taskboard'}
            >
                Close to Completing
            </button>

            {/* Button to navigate to the QR scanner page */}
            <button 
                type="submit" 
                className="qr_button" 
                onClick={() => window.location.href ='/qr'}
            >
                Scan a QR Code 
                <img src={qr} alt="qr_scanner" className="qr_image"/>
            </button>

            {/* Button to open sustainability information in a new tab */}
            <button 
                type="submit" 
                className="sustainability_btn" 
                onClick={() => window.open("https://www.exeter.ac.uk/about/sustainability/", "_blank")}
            >
                Learn More About Sustainability
            </button>

            {/* Ovals image as a background */}
            <div className="ovals" style={{ backgroundImage: `url(${ovals})` }}></div>

            {/* Footer section */}
            <div className="footer">
                <Footer />
            </div>

        </div>
    );
};

// Export the Home component as the default export
export default Home;
