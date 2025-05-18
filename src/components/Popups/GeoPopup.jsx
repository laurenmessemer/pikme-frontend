import PropTypes from "prop-types";
import "../../styles/popups/popups.css";

const GeoPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {/* ✅ Header */}
        <div className="popup-header">
          <button className="popup-close" onClick={onClose}>✖</button>
        </div>

        {/* ✅ Message */}
        <h2 className="popup-title">Access Restricted</h2>
        <p className="popup-message">
          Unfortunately, residents of your location are not eligible to enter competitions on PikMe.
          <br /><br />
          We appreciate your interest and hope to expand availability soon.
        </p>

        {/* ✅ Action Button */}
        <div className="popup-button">
          <button className="submit-button" onClick={onClose}>Okay</button>
        </div>
      </div>
    </div>
  );
};

GeoPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default GeoPopup;
