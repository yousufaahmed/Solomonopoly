// Written by Mohammed Zarrar Shahid and Yousuf Ahmed


// Import necessary modules and styles
import React from "react";
import '../styles/UserProfile.css'; // Import custom CSS for UserProfile component
import Footer from "../components/footer"; // Import Footer component
import sign_out from "../assets/sign_out.png"; // Import sign_out icon
import coins from "../assets/coins.png"; // Import coins icon
import user_profile from '../assets/user_profile.png'; // Import user profile image
import arrow from '../assets/arrow.png'; // Import arrow icon
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN } from "../constants";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from "../components/navbar";

// Define the UserProfile component
const UserProfile = () => {
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const token = localStorage.getItem(ACCESS_TOKEN);
                if (!token) return;

                const decoded = jwtDecode(token);
                console.log('Decoded token:', decoded);

                const response = await fetch(`http://localhost:8000/api/user/${decoded.user_id}/username/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch username');
                }

                const data = await response.json();
                setName(data.username); // Adjust this based on your API response structure
            } catch (error) {
                console.error('Error fetching username:', error);
                // Handle error (e.g., show default value)
                setName('User');
            }
        };

        fetchUsername();
    }, []);

    return (
        // Main container for the UserProfile component
        <div className="user_container">

            <Navbar />

            {/* Settings button with settings icon */}
            <button 
                type="submit" 
                className="sign_out_icon"
            >
                <img 
                    src={sign_out} 
                    alt="signout" 
                    className="sign_out_image" onClick={() => window.location.href ='/logout'}></img>
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
            <div className="user_text">
                <h1 className="user_intro">Hi {name}!</h1>
                <h1 className="user_id">#345-876</h1>
                <h1 className="user_date">Joined Feb 2025</h1>
            </div>

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
            data-testid="recycle-task-btn"  // <-- Added test id
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
            data-testid="bike-task-btn"  // <-- Added test id
            >
            Park bike at bike rack locations
            <img 
                src={arrow} 
                alt="arrow_img" 
                className="arrow_image2"
            />
            </button>

            </div>
        </div>
    );
}

// Export the UserProfile component as the default export
export default UserProfile;
