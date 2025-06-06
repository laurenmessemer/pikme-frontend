import PropTypes from "prop-types";
import "../../styles/popups/popups.css";
import CustomSvgIcon from "../../constant/CustomSvgIcons";

const DeletePopup = ({ 
  onClose, 
  onConfirm, 
  title = "Delete Confirmation", 
  message = "Are you sure you want to delete this item? This action cannot be undone." 
}) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {/* Header Section */}
        <div className="popup-header">
          <button className="close-btn new-close-btn" onClick={onClose}>
              <CustomSvgIcon icon={"CloseModelIcon"} />
          </button>
        </div>

        {/* Main Content */}
        <h2 className="popup-title">{title}</h2>
        <p className="popup-message">{message}</p>

        {/* Action Buttons */}
        <div className="popup-content">
          <div className="common-footer-buttons">
            <button onClick={onClose} type="button" className="btn-cancel">
              Cancel
            </button>
            <button onClick={onConfirm} className="btn-add">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DeletePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string
};

export default DeletePopup;
