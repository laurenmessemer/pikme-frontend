import PropTypes from "prop-types";
import "../../styles/popups/popups.css";
import { useState } from "react";
import { api } from "../../api";
import { VERIFY_YOUR_AGE_API } from "../../constant/ApiUrls";
import { checkSuccessResponse } from "../../utils/RouterUtils";
import { useAuth } from "../../context/UseAuth";

const AgeVerification = ({ onClose, onSubmit = () => {} }) => {
  const [ageVerified, setAgeVefired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, login } = useAuth();

  const handleContinue = async () => {
    if (!ageVerified) return;

    try {
      setIsLoading(true);
      setError("");

      const response = await api({
        endpoint: VERIFY_YOUR_AGE_API,
      });

      if (checkSuccessResponse(response)) {
        // Update user context with age verification status
        const updatedUser = { ...user, age_verified: true };
        const token = localStorage.getItem("token");
        login(token, updatedUser);

        // Call the onSubmit callback to proceed to next step
        onSubmit();
      } else {
        setError(
          response?.data?.message ||
            "Age verification failed. Please try again."
        );
      }
    } catch (err) {
      console.error("❌ Age verification failed:", err);
      setError("Age verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {/* ✅ Header */}
        <div className="popup-header">
          <button
            className="popup-close"
            onClick={onClose}
            disabled={isLoading}
          >
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

        {/* ✅ Error Message */}
        {error && (
          <p
            className="error-message"
            style={{ color: "red", marginTop: "10px" }}
          >
            {error}
          </p>
        )}

        {/* ✅ Action Button */}
        <div className="popup-button">
          <button
            className={
              !ageVerified ? "back-button full-width" : "submit-button"
            }
            onClick={handleContinue}
            disabled={!ageVerified || isLoading}
          >
            {isLoading ? "Verifying..." : "continue"}
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
