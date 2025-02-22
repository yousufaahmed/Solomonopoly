import React from "react";
import '../styles/Home.css'
import qr from '../assets/qr_code.png'
import tree from '../assets/tree.png'


const Home = () => {
    return (
        <div className="home_container">

            <div className='home_header'>
                <h1>Home</h1>
                <h2>Welcome to Green Exeter!</h2>
            </div>

            <div className="tree"style={{ backgroundImage: `url(${tree})`}}></div>

            <button type="button" className="home_leaderboard_btn"> Leaderboard</button>

            <button type="button" className="home_taskboard_btn"> Close to Completing</button>

            <button type="submit" className="qr_button" onClick={() => window.location.href ='/qr'}>Scan a QR Code 
            <img src={qr} alt="qr_scanner" className="qr_image"/>
            </button>

            <button type="submit" className="sustainability_btn">Learn More About Sustainability</button>

            <div className="oval1"></div>
            <div className="oval2"></div>
            <div className="oval3"></div>

        </div>
    );
};

export default Home;