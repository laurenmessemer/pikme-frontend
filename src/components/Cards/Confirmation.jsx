import PropTypes from "prop-types"; // ✅ Add this at the top
import { useState } from "react";
import { FaLink } from "react-icons/fa"; // Copy icon
import { useNavigate } from "react-router-dom"; // Navigation
import "../../styles/cards/Confirmation.css";
import RogueButton from "../Buttons/RogueButton"; // Import button

const Confirmation = ({ newBalance, inviteLink, matchType, joinedExistingMatch }) => {
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();

    const handleCopy = () => {
        if (inviteLink) {
            navigator.clipboard.writeText(inviteLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="confirmation-container">
            <h1 className="confirmation-title">You’re in!</h1>
            <p className="confirmation-balance">
                New Token Balance: <strong>{newBalance} x 🟠</strong>
            </p>

            {/* ✅ Dynamic UI Based on Match Type */}
            {matchType === "invite_friend" ? (
                <>
                    {/* ✅ Invite Link Section */}
                    <div className="confirmation-link-container">
                        <input 
                            type="text" 
                            value={inviteLink || "Generating link..."} 
                            readOnly 
                            className="confirmation-link" 
                        />
                        <button className="copy-button" onClick={handleCopy} disabled={!inviteLink}>
                            <FaLink className="copy-icon" />
                        </button>
                    </div>
                    <p className="confirmation-text">
                        Copy the link to invite a friend to your head-to-head match. 
                        You can change your opponent in ‘My Submissions’ under the Leaderboard tab.
                    </p>
                    {copied && <p className="copy-message">✅ Link copied!</p>}
                </>
            ) : matchType === "pick_random" ? (
                <>
                    {/* ✅ Show 1/2 if waiting, 2/2 if matched */}
                    <p className="waiting-text">
                        {joinedExistingMatch ? "Matched! ✅ 2/2" : "Waiting for your opponent... ⏳ 1/2"}
                    </p>
                    <p className="confirmation-subtext">
                        View your 1v1 opponent in ‘My Submissions’ under the Leaderboard tab.
                    </p>
                </>
            ) : (
                <>
                    {/* ❌ Fallback for unexpected matchType */}
                    <p className="error-text">⚠️ Unexpected error: Invalid match type.</p>
                </>
            )}

            {/* ✅ Action Buttons */}
            <div className="confirmation-buttons">
                <RogueButton 
                    text="VIEW SUBMISSION" 
                    onClick={() => navigate("/Leaderboard/MySubmissions")} 
                    variant="default"
                />
                <RogueButton 
                    text="VOTE NOW!" 
                    onClick={() => navigate("/vote")} 
                    variant="highlighted"
                />
            </div>
        </div>
    );
};

// ✅ PropTypes Validation
Confirmation.propTypes = {
    newBalance: PropTypes.number.isRequired,
    inviteLink: PropTypes.string,
    matchType: PropTypes.string.isRequired,
    joinedExistingMatch: PropTypes.bool, // ✅ New prop to show 1/2 or 2/2
};

export default Confirmation;
