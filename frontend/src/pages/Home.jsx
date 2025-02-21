import React from "react";
import '../styles/Home.css'
import qr from '../assets/qr_code.png'
import tree from '../assets/tree.png'


const Home = () => {
    return (
        <div className="home_container">

            <div className='header'>
                <h1>Home</h1>
                <h2>Welcome to Green Exeter!</h2>
            </div>

            <div className="tree"style={{ backgroundImage: `url(${tree})`}}></div>

            <button type="submit" className="qr_button">Scan a QR Code 
            <img src={qr} alt="qr_scanner" className="qr_image"/>
            </button>

            <button type="submit" className="sustainability_btn">Learn More About Sustainability</button>

        </div>
    );
};

export default Home;