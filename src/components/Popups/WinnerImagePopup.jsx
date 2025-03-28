import PropTypes from "prop-types";
import "../../styles/popups/popups.css";

const WinnerImagePopup = ({ imageUrl, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="winner-popup-container" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt="Winning Submission" className="winner-popup-image" />
      </div>
    </div>
  );
};

WinnerImagePopup.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default WinnerImagePopup;
