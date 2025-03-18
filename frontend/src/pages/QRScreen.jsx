/* Written by Aleem Abbas-Hussain */

import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import '../styles/QRScreen.css';
import qr_code from '../assets/qr_code.png';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN } from "../constants";

function QRScreen() {
  const webcamRef = useRef(null);
  const [scanResult, setScanResult] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;
          const context = canvas.getContext('2d');
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            setScanResult(code.data);
            alert(`QR Code Data: ${code.data}`);
          }
        };
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="qr-container">
        <Navbar />

        <div className="qr-header">
          <h2>Scan QR</h2>
          <p>Use your phone's camera to scan a QR code</p>
        </div>

        <div className="qr-camera-container">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "environment",
            }}
          />

          <div className="qr-overlay">
            <img src={qr_code} alt="QR Overlay" className="qr-overlay-image" />
          </div>
        </div>

        <div className="qr-navbar">
          <i className="fas fa-home"></i>
          <i className="fas fa-user-circle"></i>
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </>
  );
}

export default QRScreen;
