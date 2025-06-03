import PropTypes from "prop-types";
import { useState } from "react";
import { FaLink } from "react-icons/fa"; // Copy icon
import { useNavigate } from "react-router-dom"; // Navigation
import "../../styles/cards/Confirmation.css";
import RogueButton from "../Buttons/RogueButton"; // Import new button

const Confirmation = ({ newBalance, inviteLink }) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="confirmation-container">
      <h1 className="confirmation-title">You’re in!</h1>
      <p className="confirmation-balance">
        New Token Balance: <strong>{newBalance} x 🟠</strong>
      </p>

      {/* ✅ Invite Link Input */}
      <div className="confirmation-link-container">
        <input
          type="text"
          value={inviteLink}
          readOnly
          className="confirmation-link"
        />
        <button className="copy-button" onClick={handleCopy}>
          <FaLink className="copy-icon" />
        </button>
      </div>
      <p className="confirmation-text">
        Copy the link to invite a friend to your head-to-head match. You can
        change your opponent in ‘My Submissions’ under the Leaderboard tab.
      </p>

      {copied && <p className="copy-message">Link copied!</p>}

      {/* ✅ Buttons */}
      <div className="confirmation-buttons">
        <RogueButton
          text="VIEW SUBMISSION"
          onClick={() => navigate("/leaderboard/MySubmissions")}
          variant="default"
        />
        <RogueButton
          text="VOTE NOW!"
          onClick={() => navigate("/vote")} // ✅ Ensure lowercase "vote" to match route
          variant="highlighted"
        />
      </div>
    </div>
  );
};

Confirmation.propTypes = {
  newBalance: PropTypes.number.isRequired,
  inviteLink: PropTypes.string.isRequired, // ✅ Now required since it's always generated
};

export default Confirmation;
