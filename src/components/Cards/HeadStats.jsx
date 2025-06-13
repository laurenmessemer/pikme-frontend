import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Dropdown from "../../components/Dropdowns/Dropdown";
import { useAuth } from "../../context/UseAuth";
import "../../styles/cards/HeadStats.css";
import JackpotTimer from "../Timers/JackpotTimer";
import LazyImage from "../Common/LazyImage";
import { ImageUrl } from "../../constant/appConstants";

const piggybankIcon =
  "https://d38a0fe14bafg9.cloudfront.net/icons/piggybank.svg";

const firsttokenprize = `${ImageUrl}/icons/firsttokenprize.svg`;
const secondtokenprize = `${ImageUrl}/icons/secondtokenprize.svg`;
const bronzetokenprize = `${ImageUrl}/icons/bronzetokenprize.svg`;

const preloadImages = (urls) => {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

const HeadStats = () => {
  const { user: authUser, token } = useAuth();
  const [contestData, setContestData] = useState(null);
  const [groupedUsers, setGroupedUsers] = useState([]);
  const [hoveredUserId, setHoveredUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchLiveContest = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/leaderboard/live-contests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        if (response.data.success) {
          setGroupedUsers(response.data.contest.leaderboard);
          setContestData(response.data.contest);

          // Preload the visible leaderboard images
          const leaderboardUserImages = response.data.contest.leaderboard
            .map((user) => user.images?.[0]?.imageUrl)
            .filter(Boolean);

          // Preload all images that appear in the scrolling column
          const scrollColumnImages = response.data.contest.leaderboard
            .flatMap((user) => user.images || [])
            .map((img) => img.imageUrl)
            .filter(Boolean);

          // Merge and preload only those images
          preloadImages([...leaderboardUserImages, ...scrollColumnImages]);
        } else {
          throw new Error("Failed to fetch live contests.");
        }
      } catch (error) {
        console.error("❌ Error fetching live contests:", error);
        setError("Failed to load live contest.");
      } finally {
        setLoading(false);
      }
    };

    fetchLiveContest();
  }, []);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    let scrollInterval;
    if (!isPaused) {
      scrollInterval = setInterval(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        container.scrollBy({ top: 1.5, behavior: "auto" });

        if (container.scrollTop >= container.scrollHeight / 2) {
          container.scrollTo({ top: 0 });
        }
      }, 32);
    }

    return () => clearInterval(scrollInterval);
  }, [isPaused, hoveredUserId]);

  if (loading) return <p>Loading live contest...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!contestData) return <p>No active contests right now.</p>;

  const loggedInUserIndex = groupedUsers.findIndex(
    (u) => String(u.id) === String(authUser?.id)
  );
  const loggedInUser = loggedInUserIndex !== -1 
    ? { ...groupedUsers[loggedInUserIndex], rank: loggedInUserIndex + 1 }
    : null;

  const imagesToShow =
    groupedUsers.find((u) => u.id === hoveredUserId)?.images ||
    loggedInUser?.images ||
    [];

  const formatMargin = (margin) =>
    margin > 0 ? `+${margin}` : margin < 0 ? `${margin}` : `±0`;

  const prizeIconUrls = [firsttokenprize, secondtokenprize, bronzetokenprize];

  return (
    <div className="headstats-container">
      <div className="headstats-header">
        <div className="theme-title">
          <LazyImage
            src={piggybankIcon}
            alt="Piggybank"
            className="piggybank-icon"
          />
          <h2 className="contest-name">{contestData.contestName}</h2>
        </div>
        <div className="jackpot-timer-wrapper">
          <JackpotTimer contestId={contestData?.contestId} />
        </div>
        <p className="prize-pool">
          Ranking the margins of victory for all 1v1 matchups this week.
        </p>
        <p className="contest-details">
          {contestData.leaderboard.length} Matchups | Entry: 1x
          <LazyImage
            src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
            alt="Token"
            style={{
              width: "18px",
              height: "18px",
              verticalAlign: "middle",
              marginLeft: "4px",
            }}
          />
        </p>
      </div>

      <div className="headstats-content">
        <div className="leaderboard-column">
          <div className="payout-dropdown-container">
            <Dropdown title="Payout Details">
              <div className="payout-box">
                <div className="payout-header">
                  <span>Placement</span>
                  <span>Payout</span>
                </div>

                <div className="payout-row">
                  <span className="payout-left">
                    <LazyImage
                      src="https://d38a0fe14bafg9.cloudfront.net/icons/firstpayout.svg"
                      alt="1st place"
                      className="payout-icon"
                    />
                    {/* <img
                      src="https://d38a0fe14bafg9.cloudfront.net/icons/firstpayout.svg"
                      alt="1st place"
                      className="payout-icon"
                      onError={onImageError}
                    /> */}
                    1st
                  </span>
                  <span className="payout-right">
                    {contestData?.winnings?.first
                      ? `${contestData?.winnings?.first}x`
                      : "30x"}
                    <LazyImage
                      src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
                      alt="Token icon"
                      className="token-icon"
                    />
                    {/* <img
                      src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
                      alt="Token icon"
                      className="token-icon"
                      onError={onImageError}
                    /> */}
                  </span>
                </div>

                <div className="payout-row">
                  <span className="payout-left">
                    <LazyImage
                      src="https://d38a0fe14bafg9.cloudfront.net/icons/secondpayout.svg"
                      alt="2nd place"
                      className="payout-icon"
                    />
                    {/* <img
                      src="https://d38a0fe14bafg9.cloudfront.net/icons/secondpayout.svg"
                      alt="2nd place"
                      className="payout-icon"
                      onError={onImageError}
                    /> */}
                    2nd
                  </span>
                  <span className="payout-right">
                    {contestData?.winnings?.second
                      ? `${contestData?.winnings?.second}x`
                      : "20x"}
                    <LazyImage
                      src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
                      alt="Token icon"
                      className="token-icon"
                    />
                    {/* <img
                      src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
                      alt="Token icon"
                      className="token-icon"
                      onError={onImageError}
                    /> */}
                  </span>
                </div>

                <div className="payout-row">
                  <span className="payout-left">
                    <LazyImage
                      src="https://d38a0fe14bafg9.cloudfront.net/icons/thirdpayout.svg"
                      alt="3rd place"
                      className="payout-icon"
                    />
                    {/* <img
                      src="https://d38a0fe14bafg9.cloudfront.net/icons/thirdpayout.svg"
                      alt="3rd place"
                      className="payout-icon"
                      onError={onImageError}
                    /> */}
                    3rd
                  </span>
                  <span className="payout-right">
                    {contestData?.winnings?.third
                      ? `${contestData?.winnings?.third}x`
                      : "10x"}
                    <LazyImage
                      src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
                      alt="Token icon"
                      className="token-icon"
                    />
                    {/* <img
                      src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
                      alt="Token icon"
                      className="token-icon"
                      onError={onImageError}
                    /> */}
                  </span>
                </div>
              </div>
            </Dropdown>
          </div>
          <div className="headstats-my-submission with-number">
            {authUser ? (
              loggedInUser ? (
                <>
                  <div className="headstats-my-submission-image">
                    <div className="rank-number">{loggedInUser?.rank}</div>
                    <LazyImage
                      src={loggedInUser.images[0].imageUrl}
                      alt="My Submission"
                    />
                  </div>
                  <div className="headstats-my-submission-info">
                    <p className="headstats-my-submission-username">Me</p>
                  </div>
                  <div className="headstats-my-submission-earnings">
                    {formatMargin(loggedInUser.totalMargin)}
                  </div>
                </>
              ) : (
                <div className="headstats-my-submission-placeholder">
                  <p className="headstats-my-submission-invite">
                    You haven't entered yet!
                  </p>
                </div>
              )
            ) : (
              <div className="headstats-my-submission-placeholder">
                <p className="headstats-my-submission-invite">
                  Login to see your submission.
                </p>
              </div>
            )}
          </div>

          <div className="user-submission-divider no-space"></div>

          {groupedUsers.map((user, i) => {
            const isTop3 = i < 3;
            const isMe = authUser && String(user.id) === String(authUser.id);
            let backgroundColor = "var(--disabled-light)";
            if (isMe) backgroundColor = "var(--cta)";
            else if (isTop3) backgroundColor = "var(--compete-background)";

            return (
              <div
                key={user.id}
                className="leaderboard-card no-space with-number"
                onMouseEnter={() => setHoveredUserId(user.id)}
                onMouseLeave={() => setHoveredUserId(null)}
              >
                {isTop3 && (
                  <div className="rank-badge-wrapper-headstats">
                    <LazyImage
                      src={`https://d38a0fe14bafg9.cloudfront.net/icons/${
                        i === 0
                          ? "firstplace"
                          : i === 1
                          ? "secondplace"
                          : "thirdplace"
                      }.svg`}
                      alt={`${i + 1} place`}
                      className="rank-icon-headstats"
                    />
                  </div>
                )}
                <div className="leaderboard-content-headstats">
                  <div className="submission-image">
                    <div className="rank-number">{i >= 3 && <>{i + 1}</>}</div>
                    <LazyImage
                      src={user.images[0].imageUrl}
                      alt={user.username}
                      className=""
                    />
                  </div>
                  <div className="user-info">
                    <p className="username">{user.username}</p>
                    {user.earnings !== "0" && (
                      <p className="user-votes">
                        {isTop3 && (
                          <img
                            src={prizeIconUrls[i]}
                            alt={`${i + 1} prize icon`}
                            style={{
                              width: "18px",
                              height: "18px",
                              verticalAlign: "middle",
                              marginRight: "6px",
                            }}
                          />
                        )}
                        {user.earnings} Tokens
                      </p>
                    )}
                  </div>
                  <div
                    className="earnings-container other-earnings"
                    style={{ backgroundColor }}
                  >
                    {formatMargin(user.totalMargin)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="image-column">
          <div
            className="image-scroll-wrapper"
            ref={scrollContainerRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {imagesToShow.map((img, index) => {
              const backgroundColor = "var(--cta)";
              return (
                <div key={index} className="image-card">
                  <LazyImage
                    src={img.imageUrl}
                    alt="Entry"
                    className="contest-image"
                  />
                  <div className="image-votes" style={{ backgroundColor }}>
                    {formatMargin(img.margin)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadStats;
