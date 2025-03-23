/* Written by Aleem Abbas-Hussain */

import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import '../styles/QRScreen.css';
import qr_code from '../assets/qr_code.png';
import ios_torch_button from '../assets/ios_torch_button.png';
import Footer from '../components/footer';
import { ACCESS_TOKEN } from '../constants';
import Navbar from "../components/navbar"

function QRScreen() {
  const webcamRef = useRef(null);
  const [scanResult, setScanResult] = useState('');
  const [playerId, setPlayerId] = useState(null);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [stream, setStream] = useState(null);
  const [track, setTrack] = useState(null);

  useEffect(() => {
    const fetchPlayerId = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) return;

        const decoded = jwtDecode(token);
        console.log('Decoded token:', decoded);
        const response = await axios.get(`http://localhost:8000/api/playerid/${decoded.user_id}/`);
        setPlayerId(response.data.player_id);
      } catch (err) {
        console.error("Error fetching player ID:", err);
      }
    };

    fetchPlayerId();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const imageSrc = webcamRef.current.getScreenshot();

      if (imageSrc) {
        const image = new Image();
        image.src = imageSrc;

        image.onload = async () => {
          const canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;
          const context = canvas.getContext('2d');

          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            const taskId = Number(code.data); // Ensure it's a number
            setScanResult(taskId);
            alert(`QR Code Task ID: ${taskId}`);

            if (playerId) {
              try {
                await axios.patch(`http://localhost:8000/api/task/${playerId}/${taskId}/update/`, {
                  completed: true,
                });
                alert("Task updated successfully!");
              } catch (err) {
                console.error("Error updating task:", err);
                alert("Failed to update task.");
              }
            }
          }
        };
      }
    }, 500);

    return () => clearInterval(interval);
  }, [playerId]); // Runs when playerId is available
  

  // Function to toggle the flashlight on and off
  const toggleFlashlight = async () => {
    if (!flashlightOn) {
      try {
        // Request access to the device's rear camera
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });

        const videoTrack = mediaStream.getVideoTracks()[0];
        const capabilities = videoTrack.getCapabilities();

        // Check if the device supports flashlight/torch
        if (capabilities.torch) {
          await videoTrack.applyConstraints({
            advanced: [{ torch: true }]
          });
          setStream(mediaStream);
          setTrack(videoTrack);
          setFlashlightOn(true);
        } else {
          alert("Torch is not supported on this device.");
        }
      } catch (error) {
        console.error("Error accessing the flashlight:", error);
        alert("Failed to access the flashlight.");
      }
    } else {
      // Turn off the flashlight and stop the media stream
      if (track) {
        await track.applyConstraints({
          advanced: [{ torch: false }]
        });
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      }
      setFlashlightOn(false);
    }
  };

  return (
    <>
      {/* Main container for the QR screen */}
      <div className="qr-container">
        <Navbar />
        
        {/* Header section with title and description */}
        <div className="qr-header">
          <h2>Scan QR</h2>
          <p>Use your phone's camera to scan a QR code</p>
        </div>
  
        {/* Camera container for scanning QR codes */}
        <div className="qr-camera-container">
          {/* Webcam component for live camera feed */}
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: 'environment', // Use the rear camera
            }}
          />
  
          {/* Overlay for the QR scanning area */}
          <div className="qr-overlay">
            <img src={qr_code} alt="QR Overlay" className="qr-overlay-image" />
          </div>

          {/* iOS torch icon for enabling flashlight */}
          <div className="ios-torch">
            <img src={ios_torch_button} alt="IOS Torch" className="ios-torch-image" />
          </div>
  
          {/* Button to toggle the flashlight */}
          <div className="qr-torch">
            <button 
              className="torch-button"
              onClick={toggleFlashlight}
            >
              <i className={`fas fa-bolt ${flashlightOn ? 'on' : ''}`}></i>
            </button>
          </div>
        </div>
  
        {/* Bottom navigation bar with icons */}
        <div className="qr-navbar">
          <i className="fas fa-home"></i>
          <i className="fas fa-user-circle"></i>
          <i className="fas fa-bars"></i>
        </div>

       

      </div>
    </>
  );
}

// Export the QRScreen component as the default export
export default QRScreen;