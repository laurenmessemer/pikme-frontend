import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { useEffect, useState } from "react";
import blueCard from "../../assets/icons/bluecard.svg";
import greenCard from "../../assets/icons/greencard.svg";
import yellowCard from "../../assets/icons/yellowcard.svg";
import "../../styles/popups/RainingCards.css";

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
                <img
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
            ))}
        </div>
    );
};

// Prop validation
RainingCards.propTypes = {
    trigger: PropTypes.bool.isRequired, // Ensure trigger is a boolean and is required
};

export default RainingCards;
