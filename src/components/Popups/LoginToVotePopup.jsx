import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../../styles/popups/popups.css";
import SubmitButton from "../Buttons/Submit";

const LoginToVotePopup = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {/* ✅ Header */}
        <div className="popup-header">
          <button className="popup-close" onClick={onClose}>✖</button>
        </div>

        {/* ✅ Message */}
        <h2 className="popup-title">Wait!</h2>
        <p className="popup-message">
          You used your 3 free votes.<br />
          Create an account or log in to keep voting.
        </p>

        {/* ✅ Action Buttons */}
        <div className="popup-button">
          <SubmitButton text="Login or Sign Up" onClick={() => navigate("/login")} />
        </div>
      </div>
    </div>
  );
};

LoginToVotePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LoginToVotePopup;
