import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Dropdown from "../../components/Dropdowns/Dropdown";
import { useAuth } from "../../context/UseAuth";
import "../../styles/cards/HeadStats.css";
import JackpotTimer from "../Timers/JackpotTimer";

const HeadStats = () => {
  const { user: authUser } = useAuth();
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
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/leaderboard/live-contests`);
        if (response.data.success) {
          console.log("📥 API Response:", response.data);
          
          setGroupedUsers(response.data.contest.leaderboard);
          setContestData(response.data.contest);
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

  const loggedInUser = groupedUsers.find((u) => String(u.id) === String(authUser?.id));
  const imagesToShow =
    groupedUsers.find((u) => u.id === hoveredUserId)?.images || loggedInUser?.images || [];

  const formatMargin = (margin) =>
    margin > 0 ? `+${margin}` : margin < 0 ? `${margin}` : `±0`;

  const prizeIconUrls = [
    "https://d38a0fe14bafg9.cloudfront.net/icons/firsttokenprize.svg",
    "https://d38a0fe14bafg9.cloudfront.net/icons/secondtokenprize.svg",
    "https://d38a0fe14bafg9.cloudfront.net/icons/bronzetokenprize.svg",
  ];

  return (
    <div className="headstats-container">
      <div className="headstats-header">
        <div className="theme-title">
          <img
            src="https://d38a0fe14bafg9.cloudfront.net/icons/piggybank.svg"
            alt="Piggybank"
            className="piggybank-icon"
          />
          <h2 className="contest-name">{contestData.contestName}</h2>
        </div>
        <div className="jackpot-timer-wrapper">
          <JackpotTimer contestId={20} />
        </div>
        <p className="prize-pool">Ranking the margins of victory for all 1v1 matchups this week.</p>
        <p className="contest-details">
          {contestData.leaderboard.length} Matchups | Entry: 1x
          <img
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
                    <img
                      src="https://d38a0fe14bafg9.cloudfront.net/icons/firstpayout.svg"
                      alt="1st place"
                      className="payout-icon"
                    />
                    1st
                  </span>
                  <span className="payout-right">
                    30x
                    <img
                      src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
                      alt="Token icon"
                      className="token-icon"
                    />
                  </span>
                </div>

                <div className="payout-row">
                  <span className="payout-left">
                    <img
                      src="https://d38a0fe14bafg9.cloudfront.net/icons/secondpayout.svg"
                      alt="2nd place"
                      className="payout-icon"
                    />
                    2nd
                  </span>
                  <span className="payout-right">
                    20x
                    <img
                      src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
                      alt="Token icon"
                      className="token-icon"
                    />
                  </span>
                </div>

                <div className="payout-row">
                  <span className="payout-left">
                    <img
                      src="https://d38a0fe14bafg9.cloudfront.net/icons/thirdpayout.svg"
                      alt="3rd place"
                      className="payout-icon"
                    />
                    3rd
                  </span>
                  <span className="payout-right">
                    10x
                    <img
                      src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
                      alt="Token icon"
                      className="token-icon"
                    />
                  </span>
                </div>
              </div>
            </Dropdown>


          </div>

          <div className="headstats-my-submission">
            {authUser ? (
              loggedInUser ? (
                <>
                  <img
                    src={loggedInUser.images[0].imageUrl}
                    alt="My Submission"
                    className="headstats-my-submission-image"
                  />
                  <div className="headstats-my-submission-info">
                    <p className="headstats-my-submission-username">Me</p>
                  </div>
                  <div className="headstats-my-submission-earnings">
                    {formatMargin(loggedInUser.totalMargin)}
                  </div>
                </>
              ) : (
                <div className="headstats-my-submission-placeholder">
                  <p className="headstats-my-submission-invite">You haven’t entered yet!</p>
                </div>
              )
            ) : (
              <div className="headstats-my-submission-placeholder">
                <p className="headstats-my-submission-invite">Login to see your submission.</p>
              </div>
            )}
          </div>

          <div className="user-submission-divider"></div>

          {groupedUsers.map((user, i) => {
            const isTop3 = i < 3;
            const isMe = authUser && String(user.id) === String(authUser.id);
            let backgroundColor = "var(--disabled-light)";
            if (isMe) backgroundColor = "var(--cta)";
            else if (isTop3) backgroundColor = "var(--compete-background)";

            return (
              <div
                key={user.id}
                className="leaderboard-card"
                onMouseEnter={() => setHoveredUserId(user.id)}
                onMouseLeave={() => setHoveredUserId(null)}
              >
                {isTop3 && (
                  <div className="rank-badge-wrapper-headstats">
                    <img
                      src={`https://d38a0fe14bafg9.cloudfront.net/icons/${
                        i === 0 ? "firstplace" : i === 1 ? "secondplace" : "thirdplace"
                      }.svg`}
                      alt={`${i + 1} place`}
                      className="rank-icon-headstats"
                    />
                  </div>
                )}
                <div className="leaderboard-content-headstats">
                  <img
                    src={user.images[0].imageUrl}
                    alt={user.username}
                    className="submission-image"
                  />
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
                  <img src={img.imageUrl} alt="Entry" className="contest-image" />
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


// import axios from "axios";
// import { useEffect, useRef, useState } from "react";
// import Dropdown from "../../components/Dropdowns/Dropdown";
// import { useAuth } from "../../context/UseAuth";
// import "../../styles/cards/HeadStats.css";
// import JackpotTimer from "../Timers/JackpotTimer";

// const HeadStats = () => {
//   const { user: authUser } = useAuth();
//   const [contestData, setContestData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isPaused, setIsPaused] = useState(false);
//   const scrollContainerRef = useRef(null);

//   useEffect(() => {
//     const fetchLiveContest = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/leaderboard/live-contests`);
//         if (response.data.success) {
//           setContestData(response.data.contest);
//         } else {
//           throw new Error("Failed to fetch live contests.");
//         }
//       } catch (error) {
//         console.error("❌ Error fetching live contests:", error);
//         setError("Failed to load live contest.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLiveContest();
//   }, []);

//   useEffect(() => {
//     if (!scrollContainerRef.current || !contestData) return;

//     let scrollInterval;
//     if (!isPaused) {
//       scrollInterval = setInterval(() => {
//         const container = scrollContainerRef.current;
//         if (!container) return;

//         container.scrollBy({ top: 1.5, behavior: "auto" });

//         if (container.scrollTop >= container.scrollHeight / 2) {
//           container.scrollTo({ top: 0 });
//         }
//       }, 32);
//     }

//     return () => clearInterval(scrollInterval);
//   }, [isPaused, contestData]);

//   if (loading) return <p>Loading live contest...</p>;
//   if (error) return <p className="error-message">{error}</p>;
//   if (!contestData) return <p>No active contests right now.</p>;

//   const userSubmission = authUser
//     ? contestData.leaderboard.find((user) => String(user.id) === String(authUser.id))
//     : null;

//   const formatMargin = (margin) =>
//     margin > 0 ? `+${margin}` : margin < 0 ? `${margin}` : `±0`;

//   const prizeIconUrls = [
//     "https://d38a0fe14bafg9.cloudfront.net/icons/firsttokenprize.svg",
//     "https://d38a0fe14bafg9.cloudfront.net/icons/secondtokenprize.svg",
//     "https://d38a0fe14bafg9.cloudfront.net/icons/bronzetokenprize.svg",
//   ];

//   return (
//     <div className="headstats-container">
//       <div className="headstats-header">
//       <div className="theme-title">
//           <img
//             src="https://d38a0fe14bafg9.cloudfront.net/icons/piggybank.svg"
//             alt="Piggybank"
//             className="piggybank-icon"
//           />
//           <h2 className="contest-name">{contestData.contestName}</h2>
//         </div>

//         <div className="jackpot-timer-wrapper">
//           <JackpotTimer contestId={20} />
//         </div>

//         <p className="prize-pool">
//           Ranking the margins of victory for all 1v1 matchups this week.
//         </p>
//         <p className="contest-details">
//           {contestData.leaderboard.length} Matchups | Entry: 1x
//           <img
//             src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
//             alt="Token"
//             style={{
//               width: "18px",
//               height: "18px",
//               verticalAlign: "middle",
//               marginLeft: "4px",
//             }}
//           />
//         </p>
//       </div>

//       <div className="headstats-content">
//         <div className="leaderboard-column">
//           <div className="payout-dropdown-container">
      
//       <Dropdown title="Payout Details">
//         <div className="payout-box">
//           <div className="payout-header">
//             <span>Placement</span>
//             <span>Payout</span>
//           </div>

//           <div className="payout-row">
//             <span className="payout-left">
//               <img
//                 src="https://d38a0fe14bafg9.cloudfront.net/icons/firstpayout.svg"
//                 alt="1st place"
//                 className="payout-icon"
//               />
//               1st
//             </span>
//             <span className="payout-right">
//               30x
//               <img
//                 src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
//                 alt="Token icon"
//                 className="token-icon"
//               />
//             </span>
//           </div>

//           <div className="payout-row">
//             <span className="payout-left">
//               <img
//                 src="https://d38a0fe14bafg9.cloudfront.net/icons/secondpayout.svg"
//                 alt="2nd place"
//                 className="payout-icon"
//               />
//               2nd
//             </span>
//             <span className="payout-right">
//               20x
//               <img
//                 src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
//                 alt="Token icon"
//                 className="token-icon"
//               />
//             </span>
//           </div>

//           <div className="payout-row">
//             <span className="payout-left">
//               <img
//                 src="https://d38a0fe14bafg9.cloudfront.net/icons/thirdpayout.svg"
//                 alt="3rd place"
//                 className="payout-icon"
//               />
//               3rd
//             </span>
//             <span className="payout-right">
//               10x
//               <img
//                 src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
//                 alt="Token icon"
//                 className="token-icon"
//               />
//             </span>
//           </div>
//         </div>
//       </Dropdown>

//           </div>

//           {/* 🔻 USER SUBMISSION (or prompt to log in) */}
//           <div className="headstats-my-submission">
//             {authUser ? (
//               userSubmission ? (
//                 <>
//                   <img
//                     src={userSubmission.imageUrl}
//                     alt="My Submission"
//                     className="headstats-my-submission-image"
//                   />
//                   <div className="headstats-my-submission-info">
//                     <p className="headstats-my-submission-username">Me</p>
//                   </div>
//                   <div className="headstats-my-submission-earnings">
//                     {formatMargin(userSubmission.margin)}
//                   </div>
//                 </>
//               ) : (
//                 <div className="headstats-my-submission-placeholder">
//                   <p className="headstats-my-submission-invite">
//                     You haven’t entered yet!
//                   </p>
//                 </div>
//               )
//             ) : (
//               <div className="headstats-my-submission-placeholder">
//                 <p className="headstats-my-submission-invite">
//                   Login to see your submission.
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="user-submission-divider"></div>

//           {contestData.leaderboard.map((user, i) => {
//             const isTop3 = i < 3;
//             const isMe = authUser && String(user.id) === String(authUser.id);
//             let backgroundColor = "var(--disabled-light)";
//             if (isMe) backgroundColor = "var(--cta)";
//             else if (isTop3) backgroundColor = "var(--compete-background)";

//             return (
//               <div key={user.id} className="leaderboard-card">
//                 {isTop3 && (
//                   <div className="rank-badge-wrapper-headstats">
//                     <img
//                       src={`https://d38a0fe14bafg9.cloudfront.net/icons/${
//                         i === 0
//                           ? "firstplace"
//                           : i === 1
//                           ? "secondplace"
//                           : "thirdplace"
//                       }.svg`}
//                       alt={`${i + 1} place`}
//                       className="rank-icon-headstats"
//                     />
//                   </div>
//                 )}
//                 <div className="leaderboard-content-headstats">
//                   <img
//                     src={user.imageUrl}
//                     alt={user.username}
//                     className="submission-image"
//                   />
//                   <div className="user-info">
//                     <p className="username">{user.username}</p>
//                     {user.earnings !== "0" && (
//                       <p className="user-votes">
//                         {isTop3 && (
//                           <img
//                             src={prizeIconUrls[i]}
//                             alt={`${i + 1} prize icon`}
//                             style={{
//                               width: "18px",
//                               height: "18px",
//                               verticalAlign: "middle",
//                               marginRight: "6px",
//                             }}
//                           />
//                         )}
//                         {user.earnings} Tokens
//                       </p>
//                     )}
//                   </div>
//                   <div
//                     className="earnings-container other-earnings"
//                     style={{ backgroundColor }}
//                   >
//                     {formatMargin(user.margin)}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="image-column">
//           <div
//             className="image-scroll-wrapper"
//             ref={scrollContainerRef}
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//           >
//             {contestData.leaderboard.map((user, index) => {
//               const isMe =
//                 authUser && String(user.id) === String(authUser.id);
//               const isTop3 = index < 3;

//               let backgroundColor = "var(--disabled-light)";
//               if (isMe) backgroundColor = "var(--cta)";
//               else if (isTop3) backgroundColor = "var(--compete-background)";

//               return (
//                 <div key={index} className="image-card">
//                   <img
//                     src={user.imageUrl}
//                     alt={`Entry by ${user.username}`}
//                     className="contest-image"
//                   />
//                   <div className="image-votes" style={{ backgroundColor }}>
//                     {formatMargin(user.margin)}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeadStats;
