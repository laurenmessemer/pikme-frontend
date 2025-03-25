import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import flashIcon from "../../assets/icons/flash.svg";
import "../../styles/cards/PersonalSubmission.css";
import RogueButton from "../Buttons/RogueButton";
import XButton from "../Buttons/XButton";

const PersonalSubmission = ({ contestData, userId, competitionId, onClose }) => {
  const [opponentEntry, setOpponentEntry] = useState(null);
  const [resolvedMatchType, setResolvedMatchType] = useState(contestData.matchType);
  const [resolvedInviteLink, setResolvedInviteLink] = useState(contestData.inviteLink || null);

  // Debug contestData props
  console.log("📦 contestData prop:", contestData);
  console.log("👤 userId:", userId);
  console.log("🏆 competitionId:", competitionId);

  useEffect(() => {
    const fetchOpponent = async () => {
      if (!userId || !competitionId) {
        console.warn("⚠️ Missing userId or competitionId");
        return;
      }
  
      try {
        console.log("🚀 Fetching opponent info...");
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/leaderboard/opponent?userId=${userId}&competitionId=${competitionId}`
        );
        const data = await res.json();
        console.log("🎯 Opponent API response:", data);
        setOpponentEntry(data.opponent || null);
        setResolvedMatchType(data.matchType || contestData.matchType);
        setResolvedInviteLink(data.inviteLink || contestData.inviteLink || null);
      } catch (err) {
        console.error("❌ Error fetching opponent data:", err);
      }
    };
  
    fetchOpponent();
  }, [userId, competitionId, contestData]);
  
  if (!contestData || !contestData.userEntry) {
    console.error("❌ Missing contestData or userEntry!");
    return <p>Error: Contest data is missing.</p>;
  }

  const { theme, contestStatus, userEntry } = contestData;
  const voteDifference = userEntry.votes - (opponentEntry?.votes || 0);
  const isWinner = voteDifference >= 0;
  const lowerStatus = contestStatus.toLowerCase();
  const isUpcoming = lowerStatus === "upcoming";
  const isActive = lowerStatus === "active" || lowerStatus === "live";
  const isComplete = lowerStatus === "complete";

  console.log("🧠 contestStatus:", contestStatus);
  console.log("🎮 matchType:", resolvedMatchType);
  console.log("📊 isUpcoming:", isUpcoming);
  console.log("🔥 isActive:", isActive);
  console.log("✅ isComplete:", isComplete);
  console.log("👥 opponentEntry:", opponentEntry);
  console.log("📸 userEntry:", userEntry);

  const renderStatusMessage = () => {
    if (opponentEntry) return null;

    if (resolvedMatchType === "invite_friend") {
      console.log("🕒 Waiting for friend to join...");
      return (
        <div className="ps-upcoming-box">
          <p>Waiting for your friend… 1/2</p>
          <p className="ps-invite-note">
            If your friend is taking a while to join, you can choose to find a randomly chosen opponent.
          </p>
          <div className="ps-invite-actions">
          <RogueButton
              text="View Friend Link"
              onClick={() => {
                navigator.clipboard.writeText(`https://pikme.com/join/${resolvedInviteLink}`);
                alert("✅ Invite link copied to clipboard!");
              }}
            >
            </RogueButton>
            <RogueButton
              text="Find New Opponent"
              variant="outline"
              onClick={() => alert("🔁 Feature coming soon: Switch to random opponent.")}
            >
            </RogueButton>
          </div>
        </div>
      );
    }

    console.log("🔍 Searching for random opponent...");
    return (
      <div className="ps-upcoming-box">
        <p>Searching for an opponent… 1/2</p>
        <div className="ps-loading-dots">
          <span className="dot dot1"></span>
          <span className="dot dot2"></span>
          <span className="dot dot3"></span>
        </div>
      </div>
    );
  };

  const renderVotes = (votes) => {
    return typeof votes === "number" && votes > 0 ? `${votes} Votes` : "-- Votes";
  };

  return (
    <div className="ps-container">
      {/* Header */}
      <div className="headstats-header">
        <XButton onClick={onClose} />
        <div className="theme-title">
          <img src={flashIcon} alt="Flash" className="flash-icon" />
          <h2 className="contest-name">{theme}</h2>
        </div>
        <div className={`ps-status-box ps-status-${contestStatus.toLowerCase()}`}>
          <span className="ps-status-text">{contestStatus}</span>
        </div>
        <div>
          <p className="contest-details">About the Contest.</p>
        </div>
        <div className="ps-contest-name">Head-to-Head Contest</div>
      </div>

      {/* Content */}
      <div className="ps-content">
        <div className="ps-column">
          {/* User Submission */}
          <div className="ps-my-submission">
            <img src={userEntry.imageUrl} alt="My Submission" className="ps-my-image" />
            <div className="ps-my-info">
              <p className="ps-my-username">{userEntry.username || "Me"}</p>
              <p className="ps-my-votes">{renderVotes(userEntry.votes)}</p>
            </div>

            <div className={`ps-my-diff ${isWinner ? "positive" : "negative"}`}>
              {voteDifference > 0 ? `+${voteDifference}` : voteDifference}
            </div>

            {isComplete && (
              <div className={`ps-result-tag ${isWinner ? "won" : "lost"}`}>
                {isWinner ? "🏆 Won" : "❌ Lost"}
              </div>
            )}
          </div>

          {/* Conditional Message between user and opponent */}
          {!opponentEntry && renderStatusMessage()}

          {/* Opponent Submission */}
          {opponentEntry && (
            <>
              <div className="user-submission-divider"></div>
              <div className="ps-opponent-card">
                <img src={opponentEntry.imageUrl} alt="Opponent" className="ps-opponent-img" />
                <div className="ps-opponent-info">
                  <p className="ps-username">{opponentEntry.username || "Opponent"}</p>
                  <p className="ps-votes">{renderVotes(opponentEntry.votes)}</p>
                </div>
                <div className="ps-diff">
                  {voteDifference < 0 ? `+${Math.abs(voteDifference)}` : voteDifference}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Main Image */}
        <div className="ps-image-column">
          <div className="ps-image-card">
            <img src={userEntry.imageUrl} alt="Full Submission" className="ps-main-image" />
            {userEntry.votes > 0 && <div className="ps-vote-badge">+{userEntry.votes}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

PersonalSubmission.propTypes = {
  contestData: PropTypes.shape({
    theme: PropTypes.string.isRequired,
    contestStatus: PropTypes.string.isRequired,
    inviteLink: PropTypes.string,
    matchType: PropTypes.string,
    userEntry: PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
      username: PropTypes.string,
    }).isRequired,
  }).isRequired,
  userId: PropTypes.number.isRequired,
  competitionId: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

export default PersonalSubmission;
