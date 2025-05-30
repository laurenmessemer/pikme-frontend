import PropTypes from "prop-types";
import "../../styles/popups/popups.css";
import { useState } from "react";

const AgeVerification = ({ onClose, onSubmit = () => {} }) => {
  const [ageVerified, setAgeVefired] = useState(false);

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {/* ✅ Header */}
        <div className="popup-header">
          <button className="popup-close" onClick={onClose}>
            ✖
          </button>
        </div>

        {/* ✅ Message */}
        <h2 className="popup-title">Age Verification</h2>
        <p className="popup-message">
          To legally compete in the game, you must be 18 or older.
          <br />
          <div className="custom-checkbox with-new-message">
            <label>
              I am 18 or older.
              <input
                value={ageVerified}
                type="checkbox"
                className="checkbox-input"
                onChange={(e) => setAgeVefired(e.target.checked)}
              />
              <div className="custom-checkmark new-ui" />
            </label>
          </div>
        </p>
        {console.log("ageVerified: ", ageVerified)}
        {/* ✅ Action Button */}
        <div className="popup-button">
          <button
            className={
              !ageVerified ? "back-button full-width" : "submit-button"
            }
            onClick={onSubmit}
            disabled={!ageVerified}
          >
            continue
          </button>
        </div>
      </div>
    </div>
  );
};

AgeVerification.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AgeVerification;
