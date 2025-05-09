import PropTypes from "prop-types";
import "../../styles/popups/popups.css"; // ✅ Import styles
import SubmitButton from "../Buttons/Submit"; // ✅ Import button component

const InsufficientFunds = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {/* ✅ White Header Section */}
        <div className="popup-header">
          <button className="popup-close" onClick={onClose}>✖</button>
        </div>

        {/* ✅ Main Content */}
        <h2 className="popup-title">Insufficient Funds</h2>
        <p className="popup-message">
          You do not have enough tokens to enter this competition. Please add more tokens to continue.
        </p>

        {/* ✅ Close Button */}
        <div className="popup-button">
        <SubmitButton onClick={onClose} text="Okay" />
        </div>
      </div>
    </div>
  );
};

InsufficientFunds.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default InsufficientFunds;
