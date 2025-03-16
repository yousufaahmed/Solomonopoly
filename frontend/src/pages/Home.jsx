// Written by Mohammed Zarrar Shahid

// All relevant imports

import React from "react";
import '../styles/Home.css'
import Navbar from "../components/navbar"; 
import qr from '../assets/qr_code.png'
import tree from '../assets/tree.png'
import Footer from "../components/footer";
import ovals from "../assets/ovals.png"

// Define the Home component
const Home = () => {
    return (
        // Main container for the Home component
        <div className="home_container">
             
             <Navbar />
    
            <h1>Welcome To Green Exeter</h1>
            <p1>A place to boost your sustainability on campus!</p1>

        </div>
    );
};

// Export the Home component as the default export
export default Home;
