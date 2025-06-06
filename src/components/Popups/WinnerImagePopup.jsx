import PropTypes from "prop-types";
import "../../styles/popups/popups.css";
import LazyImage from "../Common/LazyImage";

const WinnerImagePopup = ({ imageUrl, onClose, isFullView = false }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
      className={`winner-popup-container ${isFullView ? "full-view" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <LazyImage
          src={imageUrl}
          alt="Winning Submission"
          className="winner-popup-image"
        />
        {/* <img
          src={imageUrl}
          alt="Winning Submission"
          className="winner-popup-image"
          onError={onImageError}
        /> */}
      </div>
    </div>
  );
};

WinnerImagePopup.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  isFullView: PropTypes.bool,
};

export default WinnerImagePopup;
