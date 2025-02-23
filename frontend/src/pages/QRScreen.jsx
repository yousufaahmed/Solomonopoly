/* Written by Aleem Abbas-Hussain*/

import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import '../styles/QRScreen.css';
import qr_code from '../assets/qr_code.png';
import ios_torch_button from '../assets/ios_torch_button.png';
import Footer from '../components/footer';

function QRScreen() {
  const webcamRef = useRef(null);
  const [scanResult, setScanResult] = useState('');
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [stream, setStream] = useState(null);
  const [track, setTrack] = useState(null);

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

  const toggleFlashlight = async () => {
    if (!flashlightOn) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });

        const videoTrack = mediaStream.getVideoTracks()[0];
        const capabilities = videoTrack.getCapabilities();

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
              facingMode: 'environment',
            }}
          />
  
          <div className="qr-overlay">
          <img src={qr_code} alt="QR Overlay" className="qr-overlay-image" />
          </div>

          <div className="ios-torch">
          <img src={ios_torch_button} alt="IOS Torch" className="ios-torch-image" />
          </div>
  
          <div className="qr-torch">
            <button 
              className="torch-button"
              onClick={toggleFlashlight}
            >
              <i className={`fas fa-bolt ${flashlightOn ? 'on' : ''}`}></i>
            </button>
          </div>
        </div>
  
        <div className="qr-navbar">
          <i className="fas fa-home"></i>
          <i className="fas fa-user-circle"></i>
          <i className="fas fa-bars"></i>
        </div>

        <div className="footer">
        <Footer />
        </div>

      </div>
    </>
  );
  
  
}

export default QRScreen;