import PropTypes from "prop-types";
import "../../styles/popups/popups.css";
import SubmitButton from "../Buttons/Submit";

const RegistrationSuccessPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {/* ✅ Header */}
        <div className="popup-header">
          <button className="popup-close" onClick={onClose}>✖</button>
        </div>

        {/* ✅ Message */}
        <h2 className="popup-title">All Done!</h2>
        <p className="popup-message">
          You're all set! Please check your email to verify your account.
          <br /><br />
          Once verified, you can start competing and voting!
        </p>

        {/* ✅ Action Button */}
        <div className="popup-button">
          <SubmitButton text="Got It!" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

RegistrationSuccessPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default RegistrationSuccessPopup;
