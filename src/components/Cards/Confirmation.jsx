import PropTypes from "prop-types";
import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/cards/Confirmation.css";
import RogueButton from "../Buttons/RogueButton";
import { onImageError } from "../../utils/RouterUtils";

const Confirmation = ({
  newBalance,
  inviteLink,
  matchType,
  joinedExistingMatch,
  isFullLink = false,
}) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const inviteCode = isFullLink ? inviteLink : inviteLink?.split("/").pop();

  const handleCopy = () => {
    if (inviteCode) {
      navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="confirmation-container">
      <h1 className="confirmation-title">You’re in!</h1>

      <p className="confirmation-balance">
        New Token Balance: <strong>{newBalance}</strong>
        <img
          src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
          alt="Token"
          className="token-icon"
          onError={onImageError}
        />
      </p>

      {matchType === "invite_friend" && joinedExistingMatch ? (
        <>
          <p className="waiting-text">
            You’ve been matched with your friend! 🎉
          </p>
          <p className="confirmation-subtext">
            View your entry or jump in to vote now.
          </p>
        </>
      ) : matchType === "invite_friend" && inviteCode ? (
        <>
          <div className="confirmation-link-container">
            <input
              type="text"
              value={inviteCode}
              readOnly
              className="confirmation-link"
            />
            <button className="copy-button" onClick={handleCopy}>
              <FaCopy className="copy-icon" />
            </button>
          </div>
          <p className="confirmation-text">
            {/* Copy the link to invite a friend to your head-to-head match. You can
            change your opponent in ‘My Submissions’ under the Leaderboard tab. */}
            Your friend has been invited via email. For quick sharing, just copy
            and send them this link.
            <br />
            <br />
            If your friend hasn’t joined yet and you’ve had a change of heart,
            head to My Submissions under the Leaderboard to choose a new
            opponent.
          </p>
          {copied && (
            <p className="copy-message">
              {isFullLink ? "Link copied!" : "Code copied!"}
            </p>
          )}
        </>
      ) : matchType === "pick_random" ? (
        <>
          <p className="waiting-text">
            {joinedExistingMatch
              ? "Matched! 2/2"
              : "Waiting for your opponent... ⏳ 1/2"}
          </p>
          <p className="confirmation-subtext">
            View your 1v1 opponent in ‘My Submissions’ under the Leaderboard
            tab.
          </p>
        </>
      ) : (
        <p className="error-text">Unexpected match type.</p>
      )}

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

Confirmation.propTypes = {
  newBalance: PropTypes.number.isRequired,
  inviteLink: PropTypes.string,
  matchType: PropTypes.string.isRequired,
  joinedExistingMatch: PropTypes.bool,
};

export default Confirmation;

// import PropTypes from "prop-types";
// import { useState } from "react";
// import { FaLink } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import "../../styles/cards/Confirmation.css";
// import RogueButton from "../Buttons/RogueButton";

// const Confirmation = ({ newBalance, inviteLink, matchType, joinedExistingMatch }) => {
//   const [copied, setCopied] = useState(false);
//   const navigate = useNavigate();

//   const handleCopy = () => {
//     if (inviteLink) {
//       navigator.clipboard.writeText(inviteLink);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   return (
//     <div className="confirmation-container">
//       <h1 className="confirmation-title">You’re in!</h1>
//       <p className="confirmation-balance">
//         New Token Balance: <strong>{newBalance}x</strong>
//         <img
//           src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
//           alt="Token"
//           className="token-icon"
//         />
//       </p>

//       {matchType === "invite_friend" && inviteLink ? (
//         <>
//           <div className="confirmation-link-container">
//             <input
//               type="text"
//               value={inviteLink}
//               readOnly
//               className="confirmation-link"
//             />
//             <button className="copy-button" onClick={handleCopy}>
//               <FaLink className="copy-icon" />
//             </button>
//           </div>
//           <p className="confirmation-text">
//             Share this link with your friend to join the match.
//           </p>
//           {copied && <p className="copy-message">✅ Link copied!</p>}
//         </>
//       ) : matchType === "pick_random" ? (
//         <>
//           <p className="waiting-text">
//             {joinedExistingMatch ? "Matched! ✅ 2/2" : "Waiting for your opponent... ⏳ 1/2"}
//           </p>
//           <p className="confirmation-subtext">
//             View your 1v1 opponent in ‘My Submissions’ under the Leaderboard tab.
//           </p>
//         </>
//       ) : (
//         <p className="error-text">⚠️ Unexpected match type.</p>
//       )}

//       <div className="confirmation-buttons">
//         <RogueButton
//           text="VIEW SUBMISSION"
//           onClick={() => navigate("/Leaderboard/MySubmissions")}
//           variant="default"
//         />
//         <RogueButton
//           text="VOTE NOW!"
//           onClick={() => navigate("/vote")}
//           variant="highlighted"
//         />
//       </div>
//     </div>
//   );
// };

// Confirmation.propTypes = {
//   newBalance: PropTypes.number.isRequired,
//   inviteLink: PropTypes.string,
//   matchType: PropTypes.string.isRequired,
//   joinedExistingMatch: PropTypes.bool,
// };

// export default Confirmation;
