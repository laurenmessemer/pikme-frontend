import PropTypes from "prop-types";
import { useState } from "react";
import "../../styles/cards/H2HCard.css"; // ✅ Import CSS
import ChallengeButton from "../Buttons/Challenge"; // ✅ Import Challenge button
import SubmissionTimer from "../Timers/SubmissionTimer"; // ✅ Import Timer

// Import Medal Assets
import BronzeMedal from "../../assets/medals/medalbronze.svg";
import GoldMedal from "../../assets/medals/medalgold.svg";
import SilverMedal from "../../assets/medals/medalsilver.svg";

const MEDALS = [GoldMedal, SilverMedal, BronzeMedal]; // 🏅 SVG Medal Assets

const H2HCard = ({ contestId, themePhoto, themeName, themeDescription, selectedOptions }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Ensure the admin-selected options are valid (4, 7, 10, or 13 options)
    const isValidSelection = [4, 7, 10, 13].includes(selectedOptions.length);
    const optionsToDisplay = isValidSelection ? [...selectedOptions] : [];

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    // Insert medals at correct positions WITHOUT replacing existing items
    if (isValidSelection) {
        if (selectedOptions.length >= 7) optionsToDisplay.splice(4, 0, { medal: MEDALS[0] }); // Gold Medal (Row 2, Col 1)
        if (selectedOptions.length >= 10) optionsToDisplay.splice(8, 0, { medal: MEDALS[1] }); // Silver Medal (Row 3, Col 1)
        if (selectedOptions.length >= 13) optionsToDisplay.splice(12, 0, { medal: MEDALS[2] }); // Bronze Medal (Row 4, Col 1)
    }

    console.log("Final Grid Content:", optionsToDisplay); // ✅ Debugging Log

    return (
        <div className={`h2h-card ${isExpanded ? "expanded" : ""}`} onClick={toggleExpand}>
            {/* Inner container (stays fixed at the top) */}
            <div className="h2h-card__inner">
                {/* Theme Photo */}
                <div className="h2h-card__image-container">
                    <img src={themePhoto} alt={themeName} className="h2h-card__image" />
                </div>

                {/* Text Content */}
                <div className="h2h-card__content">
                    {/* Timer */}
                    <div className="h2h-card__timer">
                        <SubmissionTimer contestId={contestId} />
                    </div>

                    {/* Theme Name */}
                    <h3 className="h2h-card__title text-dark">{themeName}</h3>

                    {/* Theme Description */}
                    <p className="h2h-card__description text-subtle">{themeDescription}</p>
                </div>
            </div>

            {/* Expanded Grid (only appears when expanded) */}
            {isExpanded && optionsToDisplay.length > 0 && (
                <div className="h2h-card__grid">
                    {optionsToDisplay.map((option, index) => {
                        const isMedalSlot = option.medal !== undefined;
                        const isFreeEntry = option.prize === "10 Votes" && option.entryFee === "FREE";


                        return (
                            <div 
                                key={index} 
                                className={`h2h-card__grid-item ${isMedalSlot ? "transparent" : isFreeEntry ? "bg-light" : `bg-challenge-${Math.floor(index / 4) + 1}`}`}
                            >
                                {/* Display Medal if applicable, otherwise show prize/entry fee */}
                                {isMedalSlot ? (
                                    <div className="medal">
                                        <img src={option.medal} alt="Medal" className="medal-icon" />
                                    </div>
                                ) : (
                                    <>
                                        {/* Prize Pool */}
                                        <div className="grid-prize">{option.prize}</div>

                                        {/* Entry Fee */}
                                        <div className="grid-entry-fee">Entry Fee:{option.entryFee}</div>

                                        {/* Challenge Button */}
                                        <ChallengeButton />
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

// Prop Types Validation
H2HCard.propTypes = {
    contestId: PropTypes.number.isRequired,
    themePhoto: PropTypes.string.isRequired,
    themeName: PropTypes.string.isRequired,
    themeDescription: PropTypes.string.isRequired,
    selectedOptions: PropTypes.arrayOf(
        PropTypes.shape({
            prize: PropTypes.string,
            entryFee: PropTypes.string
        })
    ).isRequired
};

export default H2HCard;
