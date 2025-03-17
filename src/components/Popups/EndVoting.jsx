import PropTypes from "prop-types";
import "../../styles/popups/popups.css"; // ✅ Import styles
import SubmitButton from "../Buttons/Submit"; // ✅ Import button component

const EndVoting = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {/* ✅ White Header Section */}
        <div className="popup-header">
          <button className="popup-close" onClick={onClose}>✖</button>
        </div>

        {/* ✅ Main Content */}
        <h2 className="popup-title">Wow!<br/>You are a Voting Machine!</h2>
        <p className="popup-message">
        You’ve gone through all the entries in this game! Come back tomorrow for the next game!
        </p>

        {/* ✅ Close Button */}
        <div className="popup-button">
          <SubmitButton onClick={onClose} text="Okay" />
        </div>
      </div>
    </div>
  );
};

EndVoting.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default EndVoting;
