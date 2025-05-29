import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import "../../styles/popups/BoostVote.css";
import LazyImage from "../Common/LazyImage";
import { ImageUrl } from "../../constant/appConstants";

const cardStackIcon = `${ImageUrl}/icons/cardstack.svg`;

const BoostVote = ({ voteCount, submissions, onTriggerRain }) => {
  const [progress, setProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [boostedEntry, setBoostedEntry] = useState(null);

  const handleBoostActivation = useCallback(() => {
    if (submissions.length > 0) {
      const randomIndex = Math.floor(Math.random() * submissions.length);
      setBoostedEntry(submissions[randomIndex]);
    }

    setShowPopup(true);
    onTriggerRain(true);

    setTimeout(() => {
      setShowPopup(false);
      onTriggerRain(false);
    }, 3000);
  }, [submissions, onTriggerRain]);

  useEffect(() => {
    let totalVotes = 0;

    // ✅ Ensure voteCount is valid & get the highest-voted submission
    if (submissions.length > 0) {
      const highestVotedEntry = submissions.reduce(
        (max, entry) =>
          voteCount[entry.id] > (voteCount[max.id] || 0) ? entry : max,
        submissions[0]
      );

      totalVotes = voteCount[highestVotedEntry.id] || 0; // Ensure a valid number
    }

    // ✅ Fix: Ensure totalVotes is a number before doing modulo operation
    const newProgress = Number.isFinite(totalVotes)
      ? (totalVotes % 10) * 10
      : 0;
    setProgress(newProgress);

    if (totalVotes > 0 && totalVotes % 10 === 0) {
      handleBoostActivation();
    }
  }, [voteCount, submissions, handleBoostActivation]);

  return (
    <div className="boost-vote-container">
      <div className="boost-top">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="boost-percentage">{progress}%</span>
        <img src={cardStackIcon} alt="Boost Icon" className="boost-icon" />
        <button className="boost-button" onClick={handleBoostActivation}>
          ADD
        </button>
      </div>
      {/* <span className="boost-text">10 votes to boost my Jackpot image</span> */}

      {/* Boosted Image Pop-up */}
      {showPopup && boostedEntry && (
        <div className="boost-popup-overlay">
          <div className="boost-popup-content">
            <LazyImage
              src={`${import.meta.env.VITE_API_URL}${boostedEntry.image_url}`}
              alt="Boosted Entry"
              className="boosted-entry"
            />
            {/* <img
              src={`${import.meta.env.VITE_API_URL}${boostedEntry.image_url}`}
              alt="Boosted Entry"
              className="boosted-entry"
              onError={onImageError}
            /> */}
          </div>
        </div>
      )}
    </div>
  );
};

BoostVote.propTypes = {
  voteCount: PropTypes.number.isRequired,
  submissions: PropTypes.array.isRequired,
  onTriggerRain: PropTypes.func.isRequired,
};

export default BoostVote;
