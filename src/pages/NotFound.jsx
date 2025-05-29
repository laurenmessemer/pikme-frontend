/*
 * File: NotFound.jsx
 * Author: HARSH CHAUHAN
 * Created Date: May 21st, 2025
 * Description: This component handles 404 page.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [confetti, setConfetti] = useState([]);

  // Function to navigate back to home
  const goToHome = () => {
    navigate("/");
  };

  // Function to create confetti effect
  const createConfetti = (e) => {
    const button = e.currentTarget;
    const buttonRect = button.getBoundingClientRect();

    const confettiCount = 50;
    const colors = ["#ffd059", "#5cffc3", "#abffff", "#ffc2de"];

    const newConfetti = Array.from({ length: confettiCount }).map((_, i) => {
      return {
        id: Date.now() + i,
        x: buttonRect.left + Math.random() * buttonRect.width,
        y: buttonRect.top,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 5 + Math.random() * 10,
        speedY: 3 + Math.random() * 5,
        speedX: -2 + Math.random() * 4,
        rotation: Math.random() * 360,
      };
    });

    setConfetti(newConfetti);

    // Clear confetti after animation
    setTimeout(() => {
      setConfetti([]);
    }, 2000);
  };

  return (
    <div className="error-page-container">
      <div className="error-box-container">
        <div className="error-box-header">
          <div className="error-box-dots">
            <div className="error-dot"></div>
            <div className="error-dot"></div>
            <div className="error-dot"></div>
          </div>
          <div className="error-box-title">Page Not Found</div>
        </div>

        <div className="error-box-content">
          <div className="error-digits-row">
            <div className="floating-digit digit-4">4</div>
            <div className="floating-digit digit-0">0</div>
            <div className="floating-digit digit-4">4</div>
          </div>

          <div className="error-message">
            <h2>Oops! Page Not Found</h2>
            <p>The page you are looking for doesn't exist or has been moved.</p>
          </div>

          <div className="error-actions">
            <button
              className="error-home-button"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={(e) => {
                goToHome();
                createConfetti(e);
              }}
            >
              <span className="button-text">Return Home</span>
              <span className={`button-arrow ${isHovering ? "animate" : ""}`}>
                →
              </span>
            </button>

            <button className="error-back-button" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        </div>
      </div>

      {/* Render Confetti */}
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="confetti"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            animation: `confetti-fall 2s forwards`,
          }}
        />
      ))}
    </div>
  );
};

export default NotFound;
