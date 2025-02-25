<<<<<<< HEAD
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

=======
// Written by Mohammed Zarrar Shahid


// Import necessary modules and styles
import React from "react";
import '../styles/UserProfile.css'; // Import custom CSS for UserProfile component
import Footer from "../components/footer"; // Import Footer component
import sign_out from "../assets/sign_out.png"; // Import sign_out icon
import coins from "../assets/coins.png"; // Import coins icon
import user_profile from '../assets/user_profile.png'; // Import user profile image
import arrow from '../assets/arrow.png'; // Import arrow icon

// Define the UserProfile component
const UserProfile = () => {
    return (
        // Main container for the UserProfile component
        <div className="user_container">


            {/* Settings button with settings icon */}
            <button 
                type="submit" 
                className="sign_out_icon"
            >
                <img 
                    src={sign_out} 
                    alt="signout" 
                    className="sign_out_image" onClick={() => window.location.href ='/splashscreen'}></img>
            </button>

            {/* Coins button displaying user's coin balance */}
            <button 
                type="submit" 
                className="coins_icon"
            >
                <img 
                    src={coins} 
                    alt="coins" 
                    className="coins_image"
                />
                342
            </button>

            {/* User profile image */}
            <img 
                src={user_profile} 
                alt="user_img" 
                className="user_img"
            />

            {/* User information section */}
>>>>>>> 6cf15b28 (frontend)
            <div className="user_text">
                <h1 className="user_intro">Hi Mark!</h1>
                <h1 className="user_id">#345-876</h1>
                <h1 className="user_date">Joined Feb 2025</h1>
            </div>

<<<<<<< HEAD
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
=======
            {/* Button displaying user's campus location */}
            <button 
                type="button" 
                className="campus_btn"
            >
                Campus: Streatham
            </button>

            {/* Button displaying user's leaderboard position */}
            <button 
                type="button" 
                className="leaderpos_btn"
            >
                Leaderboard Position: #42
            </button>

            {/* Section displaying remaining tasks */}
            <div className="remtasks_btn">
                Remaining Tasks:

                {/* Task button for recycling task with arrow icon */}
                <button 
                    type="button" 
                    className="remtasks1_btn"
                >
                    Recycle at all bin locations
                    <img 
                        src={arrow} 
                        alt="arrow_img" 
                        className="arrow_image1"
                    />
                </button>

                {/* Task button for biking task with arrow icon */}
                <button 
                    type="button" 
                    className="remtasks2_btn"
                >
                    Park bike at bike rack locations
                    <img 
                        src={arrow} 
                        alt="arrow_img" 
                        className="arrow_image2"
                    />
                </button>
            </div>

            {/* Footer section */}
            <div className="footer">
                <Footer />
            </div>

        </div>
    );
}

// Export the UserProfile component as the default export
export default UserProfile;
>>>>>>> 6cf15b28 (frontend)
