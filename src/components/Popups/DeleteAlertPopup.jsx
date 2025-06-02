import PropTypes from "prop-types";
import "../../styles/popups/popups.css";

const DeleteAlertPopup = ({ onClose, onConfirm }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {/* Header Section */}
        <div className="popup-header">
          <button className="popup-close" onClick={onClose}>
            ✖
          </button>
        </div>

        {/* Main Content */}
        <h2 className="popup-title">Delete Alert</h2>
        <p className="popup-message">
          Are you sure you want to delete this alert? This action cannot be
          undone.
        </p>

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

DeleteAlertPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteAlertPopup;
