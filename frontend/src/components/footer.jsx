import React from "react";
import "../styles/footer.css";
import blackqr from '../assets/qr_code_black.png'
import home from '../assets/home.png'
import user_profile from '../assets/user_profile.png'

const Footer = () => {
    return(
        <div className="footer_container">
            <button type="submit" className="footer_home" onClick={() => window.location.href ='/home'}><img src={home} alt="home_img" className="home_img"/></button>
            <button type="submit" className="footer_user" onClick={() => window.location.href ='/user'}><img src={user_profile} alt="user_img" className="user_img"/></button>
            <button type="submit" className="footer_qr"  onClick={() => window.location.href ='/qr'}><img src={blackqr} alt="qr_code_black" className="qr_black"/></button>
        </div>       
    );
}

export default Footer;