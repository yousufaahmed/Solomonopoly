import React from "react";
import "./styles/footer.css";

const Footer = () => {
    return(
        <div className="footer_container">
            <button type="submit"onClick={() => window.location.href ='/home'}>H</button>
            <button type="submit"onClick={() => window.location.href ='/home'}>Us</button>
            <button type="submit"onClick={() => window.location.href ='/home'}>Qr</button>
        </div>       
    );
}