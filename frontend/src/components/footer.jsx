import React from 'react';
import '../styles/footer.css';
import logo from "../assets/logo_nav.png";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-left">
        <ul className="footer-links">
          <li>
            <a href="/terms">Terms &amp; Conditions</a>
          </li>
          <li>
            <a href="/privacy">Privacy Policy</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
          <li className="company-address">
            1234 Company Address, City, State, Zip
          </li>
        </ul>
      </div>
      <div className="footer-right">
      <img src={logo} alt="Company Logo" className="footer-logo" />

        <div className="additional-info">
          <p>© {new Date().getFullYear()} Company Name. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;