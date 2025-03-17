// Written by Mohammed Zarrar Shahid

// All relevant imports

import React from "react";
import '../styles/Home.css'
import Navbar from "../components/navbar"; 
import qr from '../assets/qr_code.png'
import tree from '../assets/tree.svg'
import Footer from "../components/footer";
import ovals from "../assets/ovals.png"

// Define the Home component
const Home = () => {
    return (
        // Main container for the Home component
        <div className="home_container">
             
             <Navbar />
    
            <h1>Welcome To Green Exeter</h1>
            <h2>A place to boost your sustainability on campus!</h2>
            <img src={tree} alt="tree" className="tree" />

            <div className="button-container">
                <button className="qr_button" onClick={() => window.location.href = '/qr'}>
                Scan a QR Code
                </button>
                <button className="learn_button" onClick={() => window.location.href = 'https://www.exeter.ac.uk/about/sustainability/'}>
                Learn More About Being Green
                </button>
            </div>


        </div>
    );
};

// Export the Home component as the default export
export default Home;
