// Written by Mohammed Zarrar Shahid

import React from "react";
import '../styles/Home.css';
import Navbar from "../components/navbar"; 
import Footer from "../components/Footer";  // Import the Footer component
import qr from '../assets/qr_code.png';
import tree from '../assets/tree.svg';
import ovals from "../assets/ovals.png";

const Home = () => {
    return (
        <div className="home_container">
            <div className="home_content">
                <Navbar />
    
                <h1>Welcome To Green Exeter</h1>
                <h2>A place to boost your sustainability on campus!</h2>
                <img src={tree} alt="tree" className="tree" />

                <div className="button-container">
                    <button 
                      className="learn_button" 
                      onClick={() => window.location.href = 'https://www.exeter.ac.uk/about/sustainability/'}
                    >
                      Learn More About Being Green
                    </button>
                    <button 
                      className="qr_button" 
                      onClick={() => window.location.href = '/qr'}
                    >
                      Scan a QR Code
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Home;
