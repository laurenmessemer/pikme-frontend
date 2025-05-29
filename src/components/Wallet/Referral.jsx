import axios from "axios";
import { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa";
import "../../styles/wallet/Referral.css";

const Referral = () => {
  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const fetchReferralCode = async () => {
      try {
        const token = localStorage.getItem("token"); // or however you store it
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        const code = response.data.referral_code;
        const fullLink = `${window.location.origin}/signup?ref=${code}`;
        setInviteLink(fullLink);
      } catch (err) {
        console.error("❌ Error fetching referral code:", err);
        setError("Unable to load referral link.");
      }
    };

    fetchReferralCode();
  }, []);

  return (
    <div className="referral-container">
      <h1 className="referral-title">Refer & Earn</h1>

      {inviteLink && (
        <div className="referral-link-container">
          <input
            type="text"
            value={inviteLink}
            readOnly
            className="referral-link"
          />
          <button className="copy-button" onClick={handleCopy}>
            <FaLink className="copy-icon" />
          </button>
        </div>
      )}

      {copied && <p className="copy-message">Link copied!</p>}
      {error && <p className="error-message">{error}</p>}

      <p className="referral-text">
        Copy the link to invite a friend to PikMe. You’ll each get 10 tokens
        when they sign up!
      </p>
    </div>
  );
};

export default Referral;
