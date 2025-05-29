import PropTypes from "prop-types";
import "../../styles/popups/popups.css"; // ✅ Import styles
import SubmitButton from "../Buttons/Submit"; // ✅ Import button component
import LazyImage from "../Common/LazyImage";

const HowToPlay = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container how-to-play-popup">
        {/* ✅ White Header Section */}
        <div className="popup-header">
          <button className="popup-close" onClick={onClose}>
            ✖
          </button>
        </div>

        {/* ✅ Main Content */}
        <h2 className="popup-title">How to Win</h2>

        <p className="popup-message">
          <LazyImage
            src="https://d38a0fe14bafg9.cloudfront.net/icons/flash.svg"
            alt="Flash"
            style={{
              width: "20px",
              verticalAlign: "middle",
              marginRight: "6px",
            }}
          />
          {/* <img
            src="https://d38a0fe14bafg9.cloudfront.net/icons/flash.svg"
            alt="Flash"
            style={{
              width: "20px",
              verticalAlign: "middle",
              marginRight: "6px",
            }}
            onError={onImageError}
          /> */}
          Your entry will face off in a match-up against another photo. Get more
          votes to win tokens!
        </p>

        <p className="popup-message">
          <LazyImage
            src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
            alt="Token"
            style={{
              width: "20px",
              verticalAlign: "middle",
              marginRight: "6px",
            }}
          />
          {/* <img
            src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
            alt="Token"
            style={{
              width: "20px",
              verticalAlign: "middle",
              marginRight: "6px",
            }}
            onError={onImageError}
          /> */}
          You can enter as many photos as you want.
        </p>

        <p className="popup-message">
          <LazyImage
            src="https://d38a0fe14bafg9.cloudfront.net/icons/trophy.svg"
            alt="Trophy"
            style={{
              width: "20px",
              verticalAlign: "middle",
              marginRight: "6px",
            }}
          />
          {/* <img
            src="https://d38a0fe14bafg9.cloudfront.net/icons/trophy.svg"
            alt="Trophy"
            style={{
              width: "20px",
              verticalAlign: "middle",
              marginRight: "6px",
            }}
            onError={onImageError}
          /> */}
          Win the Jackpot prize if you have the largest vote difference across
          your photos each week!
        </p>

        {/* ✅ Close Button */}
        <div className="popup-button">
          <SubmitButton onClick={onClose} text="LET’S GO!" />
        </div>
      </div>
    </div>
  );
};

HowToPlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default HowToPlay;
