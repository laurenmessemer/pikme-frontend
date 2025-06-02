import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import "../../styles/cards/PersonalSubmission.css";
import RogueButton from "../Buttons/RogueButton";
import XButton from "../Buttons/XButton";
import { useAuth } from "../../context/UseAuth";
import ToastUtils from "../../utils/ToastUtils";
import LazyImage from "../Common/LazyImage";
import ReInviteFriendPopup from "../Popups/ReInviteFriendPopup";
import { FaCopy, FaLink } from "react-icons/fa";
import { checkSuccessResponse } from "../../utils/RouterUtils";
import { ImageUrl } from "../../constant/appConstants";

import GoldMedal from "../../assets/medals/medalgold.svg";
const flashIcon = "https://d38a0fe14bafg9.cloudfront.net/icons/flash.svg";

const walletBadgeIcon = `${ImageUrl}/icons/walletbadge.svg`;

const PersonalSubmission = ({
  contestData,
  userId,
  competitionId,
  onClose,
}) => {
  const [opponentEntry, setOpponentEntry] = useState(null);
  const [isDetailsLoading, setDetailsLoading] = useState(false);
  const [currentUserEntry, setCurrentUserEntry] = useState(null);
  const [isFormModel, setFormModel] = useState(false);
  const [isRandomId, setIsRandomId] = useState("");
  const [resolvedMatchType, setResolvedMatchType] = useState(
    contestData.matchType
  );
  const [resolvedInviteLink, setResolvedInviteLink] = useState(
    contestData.inviteUrl || null
  );
  const { token } = useAuth();

  const finalCode = useMemo(() => {
    if (!resolvedInviteLink) return null;
    return resolvedInviteLink.split("=").pop();
  }, [resolvedInviteLink]);

  useEffect(() => {
    const fetchOpponent = async () => {
      if (!userId || !competitionId) {
        console.warn("⚠️ Missing userId or competitionId");
        return;
      }

      try {
        setDetailsLoading(true);
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/leaderboard/opponent?userId=${userId}&competitionId=${competitionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        if (checkSuccessResponse(res)) {
          const data = await res.json();
          setOpponentEntry(data?.opponent || null);
          setCurrentUserEntry(data?.currentUser || null);
          setResolvedMatchType(data.matchType || contestData.matchType);
          setResolvedInviteLink(
            data.inviteUrl || contestData.inviteUrl || null
          );
          setIsRandomId("");
          setDetailsLoading(false);
        }
      } catch (err) {
        console.error("❌ Error fetching opponent data:", err);
        setDetailsLoading(false);
      } finally {
        setDetailsLoading(false);
      }
    };

    fetchOpponent();
  }, [userId, competitionId, contestData, isRandomId]);

  if (!isDetailsLoading && !contestData) {
    console.error("❌ Missing contestData or currentUserEntry!");
    return <p className="error-message">Contest data is missing.</p>;
  }

  const { theme, contestStatus } = contestData;
  const voteDifference =
    (currentUserEntry?.votes || 0) - (opponentEntry?.votes || 0);
  const isWinner = voteDifference >= 0;
  const lowerStatus = contestStatus.toLowerCase();
  const isUpcoming = lowerStatus === "upcoming";
  const isActive = lowerStatus === "active" || lowerStatus === "live";
  const isComplete = lowerStatus === "complete";

  const renderStatusMessage = () => {
    if (opponentEntry) return null;

    if (resolvedMatchType === "invite_friend") {
      console.log("Waiting for friend to join...");
      return (
        <div className="ps-upcoming-box">
          <p>Waiting for your friend… 1/2</p>
          {/* <p className="ps-invite-note">
            If your friend is taking a while to join, you can choose to find a
            randomly chosen opponent.
          </p> */}
          <div className="ps-invite-actions">
            <div className="custom-link-container">
              <input
                type="text"
                value={`${resolvedInviteLink}`}
                readOnly
                className="custom-confirmation-link"
              />
              <button
                className="copy-button"
                onClick={() => {
                  navigator.clipboard.writeText(`${resolvedInviteLink}`);
                  ToastUtils.success("Invite link copied!");
                }}
                title="Copy link"
              >
                <FaLink className="copy-icon" />
              </button>
            </div>
            <div className="custom-link-container only-btn">
              <button
                className="copy-button"
                onClick={() => {
                  navigator.clipboard.writeText(`${finalCode}`);
                  ToastUtils.success("Invite code copied!");
                }}
                title="Copy code"
              >
                <FaCopy className="copy-icon" />
              </button>
            </div>
            <RogueButton
              text="Reinvite"
              onClick={() => {
                setFormModel(true);
              }}
            ></RogueButton>
            {/* <RogueButton
              text="Find New Opponent"
              variant="outline"
              onClick={() => alert("🔁 Feature coming soon: Switch to random opponent.")}
            >
            </RogueButton> */}
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
    return typeof votes === "number" && votes > 0
      ? `${votes} Votes`
      : "-- Votes";
  };

  return (
    <>
      <XButton onClick={onClose} newUi={true} />
      <div className="ps-container">
        {/* Header */}
        <div className="headstats-header">
          <div className="ps-heading-data">
            <div className="theme-title">
              <img src={flashIcon} alt="Flash" className="flash-icon" />
              <h2 className="contest-name">{theme}</h2>
            </div>
            {isComplete && !isDetailsLoading && (
              <div className={`ps-result-tag ${isWinner ? "won" : "lost"}`}>
                {isWinner ? (
                  <>
                    Won!{" "}
                    <span>
                      + 1x
                      <img
                        height={15}
                        width={15}
                        src={walletBadgeIcon}
                        alt="Wallet Badge"
                        className="wallet-icon"
                      />
                    </span>
                  </>
                ) : (
                  <>Lost</>
                )}
              </div>
            )}
          </div>
          <div
            className={`ps-status-box ps-status-${contestStatus.toLowerCase()}`}
          >
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
            <div className="ps-opponent-card">
              <LazyImage
                src={
                  currentUserEntry?.imageUrl || contestData?.userEntry?.imageUrl
                }
                alt="My Submission"
                className="ps-my-image"
              />
              <div className="ps-opponent-info">
                <p className="ps-username name-with-medal">
                  {isComplete ? (
                    <>
                      {isWinner ? (
                        <img
                          src={GoldMedal}
                          alt="Medal"
                          className="custom-icon medal-icon"
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {currentUserEntry?.username ||
                    contestData?.userEntry?.username ||
                    "Me"}
                </p>
                <p className="ps-votes">
                  {contestStatus === "Complete" ? (
                    <>{isWinner ? "603 votes" : "10 votes"}</>
                  ) : (
                    <>{renderVotes(currentUserEntry?.votes)}</>
                  )}{" "}
                </p>
              </div>

              <div
                className={`ps-my-diff ${isWinner ? "positive" : "negative"}`}
              >
                {contestStatus === "Complete" ? (
                  isWinner ? (
                    "+593"
                  ) : (
                    "-593"
                  )
                ) : (
                  <>
                    {voteDifference > 0 ? `+${voteDifference}` : voteDifference}
                  </>
                )}
              </div>
            </div>

            {/* Conditional Message between user and opponent */}
            {!opponentEntry && !isDetailsLoading && renderStatusMessage()}
            {isDetailsLoading ? (
              <div className="ps-upcoming-box">
                <p>Fetching opponent</p>
                <div className="ps-loading-dots">
                  <span className="dot dot1"></span>
                  <span className="dot dot2"></span>
                  <span className="dot dot3"></span>
                </div>
              </div>
            ) : (
              <>
                {/* Opponent Submission */}
                {opponentEntry && (
                  <>
                    <div className="user-submission-divider no-space"></div>
                    <div className="ps-opponent-card">
                      <img
                        src={opponentEntry.imageUrl}
                        alt="Opponent"
                        className="ps-opponent-img"
                      />
                      <div className="ps-opponent-info">
                        <p className="ps-username name-with-medal">
                          {isComplete ? (
                            <>
                              {!isWinner ? (
                                <img
                                  src={GoldMedal}
                                  alt="Medal"
                                  className="custom-icon medal-icon"
                                />
                              ) : (
                                ""
                              )}
                            </>
                          ) : (
                            ""
                          )}
                          {opponentEntry.username || "Opponent"}
                        </p>
                        <p className="ps-votes">
                          {contestStatus === "Complete" ? (
                            <>{!isWinner ? "603 votes" : "10 votes"}</>
                          ) : (
                            <>{renderVotes(opponentEntry.votes)}</>
                          )}{" "}
                        </p>
                      </div>{" "}
                      <div className={`ps-diff ${!isWinner ? "positive" : ""}`}>
                        {contestStatus === "Complete" ? (
                          !isWinner ? (
                            "+593"
                          ) : (
                            "-593"
                          )
                        ) : (
                          <>
                            {voteDifference < 0
                              ? `+${Math.abs(voteDifference)}`
                              : voteDifference}
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Main Image */}
          <div className="ps-image-column">
            <div className="ps-image-card">
              <LazyImage
                src={
                  currentUserEntry?.imageUrl || contestData?.userEntry?.imageUrl
                }
                alt="Full Submission"
                className="ps-main-image"
              />
              {currentUserEntry?.votes > 0 && (
                <div className="ps-vote-badge">+{currentUserEntry?.votes}</div>
              )}
            </div>
          </div>
        </div>
        {isFormModel && (
          <ReInviteFriendPopup
            onClose={() => setFormModel(false)}
            competitionId={competitionId}
            onSubmit={() => setIsRandomId(crypto.randomUUID())}
          />
        )}
      </div>
    </>
  );
};

PersonalSubmission.propTypes = {
  contestData: PropTypes.shape({
    theme: PropTypes.string.isRequired,
    contestStatus: PropTypes.string.isRequired,
    inviteLink: PropTypes.string,
    matchType: PropTypes.string,
  }).isRequired,
  userId: PropTypes.number.isRequired,
  competitionId: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

export default PersonalSubmission;
