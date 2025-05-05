import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../../styles/popups/popups.css";
import SubmitButton from "../Buttons/Submit";

const LoginToCompetePopup = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {/* ✅ Header */}
        <div className="popup-header">
          <button className="popup-close" onClick={onClose}>✖</button>
        </div>

        {/* ✅ Message */}
        <h2 className="popup-title">Hold Up!</h2>
        <p className="popup-message">
          You need an account to enter a competition.<br />
          <br />
          Log in or create one to start competing.
        </p>

        {/* ✅ Action Button */}
        <div className="popup-button">
          <SubmitButton text="Login or Sign Up" onClick={() => navigate("/login")} />
        </div>
      </div>
    </div>
  );
};

LoginToCompetePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LoginToCompetePopup;
