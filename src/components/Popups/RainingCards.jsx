import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { useEffect, useState } from "react";
import "../../styles/popups/RainingCards.css";
import LazyImage from "../Common/LazyImage";
import { ImageUrl } from "../../constant/appConstants";

const blueCard = `${ImageUrl}/icons/bluecard.svg`;
const greenCard = `${ImageUrl}/icons/greencard.svg`;
const yellowCard = `${ImageUrl}/icons/yellowcard.svg`;

const RainingCards = ({ trigger }) => {
  const [rainingCards, setRainingCards] = useState([]);

  useEffect(() => {
    if (trigger) {
      const cardTypes = [blueCard, yellowCard, greenCard];
      const cards = Array.from({ length: 35 }, (_, index) => ({
        id: index,
        src: cardTypes[Math.floor(Math.random() * cardTypes.length)],
        x: Math.random() * window.innerWidth,
        rotation: Math.random() * 360,
        delay: Math.random() * 1.5,
      }));
      setRainingCards(cards);

      setTimeout(() => setRainingCards([]), 3000);
    }
  }, [trigger]);

  return (
    <div className={`raining-cards ${trigger ? "active" : ""}`}>
      {rainingCards.map((card) => (
        <LazyImage
          key={card.id}
          src={card.src}
          alt="Raining Card"
          className="raining-card"
          style={{
            left: `${card.x}px`,
            transform: `rotate(${card.rotation}deg)`,
            animationDelay: `${card.delay}s`,
          }}
        />
        // <img
        //   key={card.id}
        //   src={card.src}
        //   alt="Raining Card"
        //   className="raining-card"
        //   style={{
        //     left: `${card.x}px`,
        //     transform: `rotate(${card.rotation}deg)`,
        //     animationDelay: `${card.delay}s`,
        //   }}
        //   onError={onImageError}
        // />
      ))}
    </div>
  );
};

// Prop validation
RainingCards.propTypes = {
  trigger: PropTypes.bool.isRequired, // Ensure trigger is a boolean and is required
};

export default RainingCards;
