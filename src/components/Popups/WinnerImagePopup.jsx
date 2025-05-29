import PropTypes from "prop-types";
import "../../styles/popups/popups.css";
import LazyImage from "../Common/LazyImage";

const WinnerImagePopup = ({ imageUrl, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="winner-popup-container"
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
};

export default WinnerImagePopup;
