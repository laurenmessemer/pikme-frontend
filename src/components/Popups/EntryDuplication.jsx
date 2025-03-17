import PropTypes from "prop-types";
import "../../styles/popups/popups.css"; // ✅ Import styles
import SubmitButton from "../Buttons/Submit"; // ✅ Import button component

const EntryDuplication = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {/* ✅ White Header Section */}
        <div className="popup-header">
          <button className="popup-close" onClick={onClose}>✖</button>
        </div>

        {/* ✅ Main Content */}
        <h2 className="popup-title">Duplicate Entry</h2>
        <p className="popup-message">
          You have already entered this competition! Check My Submissions under the Leaderboard tab.
        </p>

        {/* ✅ Close Button */}
        <div className="popup-button">
          <SubmitButton onClick={onClose} text="Okay" />
        </div>
      </div>
    </div>
  );
};

EntryDuplication.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default EntryDuplication;
