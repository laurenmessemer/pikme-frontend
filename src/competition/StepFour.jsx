import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import Confirmation from "../components/Cards/Confirmation";
import { useCompetition } from "../context/CompetitionContext";
import { WalletContext } from "../context/WalletContext";
import "../styles/competition/StepFour.css";

const StepFour = ({ inviteLink, matchType, joinedExistingMatch }) => {
  const { imageUrl } = useCompetition();
  const { balance } = useContext(WalletContext);

  const [inviteEmail, setInviteEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const [error, setError] = useState("");

  console.log("🎟️ StepFour Props:", { inviteLink, matchType, joinedExistingMatch });
  console.log("🌟 StepFour Received imageUrl:", imageUrl);

  const fullInviteURL = inviteLink ? `https://www.pikme.com/join/upload/${inviteLink}` : null;

  const handleSendInvite = async () => {
    if (!inviteEmail || !fullInviteURL) return;
    setSending(true);
    setError("");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/competition-entry/send-invite`, {
        email: inviteEmail,
        inviterName: "Your friend", // You can dynamically insert current user's name if available
        inviteLink,
      });
      setInviteSent(true);
    } catch (err) {
      console.error("❌ Error sending invite:", err);
      setError("Failed to send invite. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (!imageUrl) {
    console.error("❌ Missing imageUrl in StepFour - Likely an issue in StepThree");
    return <p className="error">Image is required to proceed.</p>;
  }

  return (
    <div className="step-four-container flex">
      <Confirmation
        newBalance={balance}
        inviteLink={matchType === "invite_friend" ? fullInviteURL : null}
        matchType={matchType}
        joinedExistingMatch={joinedExistingMatch}
      />

      <div className="uploaded-image-container">
        <img src={imageUrl} alt="Uploaded Preview" className="uploaded-image" />
      </div>

      {matchType === "invite_friend" && !joinedExistingMatch && (
        <div className="invite-email-section">
          <h3>Invite a friend to join you</h3>
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="Friend's email address"
            className="invite-email-input"
          />
          <button
            onClick={handleSendInvite}
            disabled={sending || !inviteEmail}
            className="invite-email-button"
          >
            {sending ? "Sending..." : "Send Invite"}
          </button>
          {inviteSent && <p className="success">✅ Invite sent!</p>}
          {error && <p className="error">{error}</p>}
        </div>
      )}
    </div>
  );
};

StepFour.propTypes = {
  inviteLink: PropTypes.string,
  matchType: PropTypes.string.isRequired,
  joinedExistingMatch: PropTypes.bool,
};

export default StepFour;



// import PropTypes from "prop-types";
// import { useContext } from "react";
// import Confirmation from "../components/Cards/Confirmation";
// import { useCompetition } from "../context/CompetitionContext";
// import { WalletContext } from "../context/WalletContext";
// import "../styles/competition/StepFour.css";

// const StepFour = ({ inviteLink, matchType, joinedExistingMatch }) => {
//   const { imageUrl } = useCompetition();
//   const { balance } = useContext(WalletContext);

//   console.log("🎟️ StepFour Props:", { inviteLink, matchType, joinedExistingMatch });
//   console.log("🌟 StepFour Received imageUrl:", imageUrl);

//   if (!imageUrl) {
//     console.error("❌ Missing imageUrl in StepFour - Likely an issue in StepThree");
//     return <p className="error">Image is required to proceed.</p>;
//   }

//   const fullInviteURL = inviteLink ? `https://www.pikme.com/join/${inviteLink}` : null;

//   return (
//     <div className="step-four-container flex">
//       <Confirmation 
//         newBalance={balance} 
//         inviteLink={matchType === "invite_friend" ? fullInviteURL : null} 
//         matchType={matchType} 
//         joinedExistingMatch={joinedExistingMatch}
//       />
//       <div className="uploaded-image-container">
//         <img src={imageUrl} alt="Uploaded Preview" className="uploaded-image" />
//       </div>
//     </div>
//   );
// };


// StepFour.propTypes = {
//   inviteLink: PropTypes.string,
//   matchType: PropTypes.string.isRequired,
//   joinedExistingMatch: PropTypes.bool, // ✅ New prop
// };

// export default StepFour;
