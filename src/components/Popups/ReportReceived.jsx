import "../../styles/popups/ReportImagePopup.css";
import XButton from "../Buttons/XButton";

const ReportReceived = ({ onClose }) => {
  return (
    <div className="report-popup-overlay">
      <div className="report-popup">
        <div className="report-header">
          <h2>Report Image</h2>
          <XButton onClick={onClose} />
        </div>

        <div className="report-body">
          <h3 className="report-received-title">Report Received!</h3>
          <p className="report-received-subtext">
            Your feedback helps keep our game safe.
          </p>

          <div className="report-actions">
            <button className="report-btn submit" onClick={onClose}>
              BACK TO VOTING
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportReceived;
