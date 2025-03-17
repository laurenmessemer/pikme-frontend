import PropTypes from "prop-types";
import { useState } from "react";
import { FaLink } from "react-icons/fa";
import "../../styles/wallet/Referral.css";

const Referral = ({ inviteLink }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="referral-container">
            <h1 className="referral-title">Refer & Earn</h1>
            
            <div className="referral-link-container">
                <input type="text" value={inviteLink} readOnly className="referral-link" />
                <button className="copy-button" onClick={handleCopy}>
                    <FaLink className="copy-icon" />
                </button>
            </div>

            {copied && <p className="copy-message">Link copied!</p>}

            <p className="referral-text">
                Copy the link to invite a friend to PikMe. You’ll each get 10 tokens when they sign up!
            </p>
        </div>
    );
};

Referral.propTypes = {
    inviteLink: PropTypes.string.isRequired,
};

export default Referral;
