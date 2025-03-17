/* Written by Aleem Abbas-Hussain*/

// All key imports

// Import necessary modules and components
import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam'; // Webcam component for accessing the device camera
import jsQR from 'jsqr'; // Library for decoding QR codes from images
import '../styles/QRScreen.css'; // Import custom CSS styles
import qr_code from '../assets/qr_code.png'; // QR code overlay image
import ios_torch_button from '../assets/ios_torch_button.png'; // Torch button image for iOS
import Footer from '../components/footer'; // Footer component
import Navbar from '../components/navbar';

// Define the QRScreen component
function QRScreen() {
  // References and state variables
  const webcamRef = useRef(null); // Reference to the webcam component
  const [scanResult, setScanResult] = useState(''); // Store the result of the QR code scan
  const [flashlightOn, setFlashlightOn] = useState(false); // Track the flashlight state
  const [stream, setStream] = useState(null); // Store the media stream for flashlight control
  const [track, setTrack] = useState(null); // Store the video track for flashlight control

  // useEffect hook to continuously capture images and scan for QR codes
  useEffect(() => {
    const interval = setInterval(() => {
      // Capture an image from the webcam
      const imageSrc = webcamRef.current.getScreenshot();
      
      if (imageSrc) {
        const image = new Image();
        image.src = imageSrc;

        image.onload = () => {
          // Create a canvas to process the captured image
          const canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;
          const context = canvas.getContext('2d');
          
          // Draw the captured image on the canvas
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          
          // Use jsQR to scan the image data for a QR code
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code) {
            // If a QR code is found, update the state and alert the user
            setScanResult(code.data);
            alert(`QR Code Data: ${code.data}`);
          }
        };
      }
    }, 500); // Scan every 500 milliseconds

    // Cleanup interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

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
      <div className="qr-container">
        <Navbar />

        {/* Header section with title and description */}
        <div className="qr-header">
          <h2>Scan QR</h2>
          <p>Use your phone's camera to scan a QR code</p>
        </div>

        {/* Camera container for scanning QR codes */}
        <div className="qr-camera-container">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "environment", // Use the rear camera
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
            <button className="torch-button" onClick={toggleFlashlight}>
              <i className={`fas fa-bolt ${flashlightOn ? "on" : ""}`}></i>
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
};

export default QRScreen;
