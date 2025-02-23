import React from "react"
import '../styles/UserProfile.css'
import Footer from "../components/footer"
import settings from "../assets/settings.png"
import coins from "../assets/coins.png"
import user_profile from '../assets/user_profile.png'
import arrow from '../assets/arrow.png'

const UserProfile = () => {
    return(
        <div className="user_container">

            <button type="submit" className="settings_icon">
                <img src={settings} alt="settings" className="settings_image"/>
            </button>

            <button type="submit" className="coins_icon">
                <img src={coins} alt="coins" className="coins_image"/>342
            </button>

            <img src={user_profile} alt="user_img" className="user_img"/>

            <div className="user_text">
                <h1 className="user_intro">Hi Mark!</h1>
                <h1 className="user_id">#345-876</h1>
                <h1 className="user_date">Joined Feb 2025</h1>
            </div>

            <button type="button" className="campus_btn">Campus: Streatham</button>

            <button type="button" className="leaderpos_btn">Leaderboard Position: #42</button>

            <div className="remtasks_btn">Remaining Tasks:
                <button type="button" className="remtasks1_btn">Recycle at all bin locations
                <img src={arrow} alt="arrow_img" className="arrow_image1"/></button>
                <button type="button" className="remtasks2_btn">Park bike at bike rack locations
                <img src={arrow} alt="arrow_img" className="arrow_image2"/></button>
            </div>

            <div className="footer">
                <Footer/>
            </div>

        </div>
    )
}

export default UserProfile;