import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import Navbar from "../components/navbar";
import CR7 from "../assets/cards/CR7.png";
import "../styles/PackOpening.css";
import packSound from "../assets/sounds/pack_open.mp3";

const PackOpening = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Play the sound
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 1.0;
      audio.play().catch((err) => console.log(err));

      // Start fading out after 2.5 seconds
      setTimeout(() => {
        const fadeOutInterval = setInterval(() => {
          if (audio.volume > 0.05) {
            audio.volume = audio.volume - 0.05;
          } else {
            audio.volume = 0;
            clearInterval(fadeOutInterval);
            audio.pause(); // optional: stop playback after fade
          }
        }, 100); // fades over ~1.5 seconds
      }, 2500); // delay before fade starts
    }

    // Firework-style confetti
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#bb0000", "#ffffff"],
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#2E8B57", "#ffffff"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <>
      <audio ref={audioRef} src={packSound} preload="auto" />
      <div className="packopening_wrapper">
        <button
          type="button"
          className="close-btn"
          onClick={() => (window.location.href = "/store")}
        >
          X
        </button>
        <img src={CR7} alt="CR7 Card" />
      </div>
    </>
  );
};

export default PackOpening;
