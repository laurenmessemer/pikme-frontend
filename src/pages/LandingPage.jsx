import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";
import "../styles/pages/LandingPage.css";
import animationData from "../assets/lottie/video2.json";
import WinnerLatestCard from "../components/Cards/WinnerLatestCard";
import WinnerSkeletonCard from "../components/Cards/WinnerSkeletonCard";
import axios from "axios";
import { useAuth } from "../context/UseAuth";

const LandingPage = () => {
  const { token } = useAuth();
  const [cards, setCards] = useState([]);
  console.log("cards: ", cards);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/winners`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
            params: {
              skip: 0,
              limit: 5,
            },
          }
        );
        if (response.data.success) {
          // const allWinners = allDummyWinners || response.data.winners;
          const allWinners = response.data.winners;

          // Handle both old and new data formats
          if (Array.isArray(allWinners) && allWinners.length > 0) {
            // Check if it's the new format (array of contest objects)
            if (allWinners[0].contest_id !== undefined) {
              // New format - create flat array of winner cards only
              const allWinnerCards = [];

              allWinners.forEach((contest) => {
                // Create winner cards only (no theme cards)
                contest.winners.forEach((winner) => {
                  allWinnerCards.push({
                    type: "winner",
                    key: `winner-${contest.contest_id}-${winner.position}`,
                    image: winner.image,
                    username: winner.username,
                    startDate: contest.startDate,
                    endDate: contest.endDate,
                    theme: contest.name,
                    payout: winner.payout,
                    totalVotes: winner.totalVotes,
                    position: winner.position,
                    isThemeCard: false,
                  });
                });
              });

              setCards(allWinnerCards);
            } else {
              // Old format - handle as before (fallback)
              console.warn("Using old data format - consider updating API");
              // You can add old format handling here if needed
            }
          }
        } else {
          throw new Error("Failed to fetch winners.");
        }
      } catch (error) {
        console.error("❌ Error fetching winners:", error);
        setError("Failed to load winners.");
      } finally {
        setLoading(false);
      }
    };

    fetchWinners();
  }, []);

  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const segmentWidth = container.scrollWidth / 3;
    container.scrollLeft = segmentWidth;

    let animationId;
    const scrollSpeed = 0.5;

    const autoScroll = () => {
      container.scrollLeft += scrollSpeed;

      if (container.scrollLeft >= segmentWidth * 2) {
        container.scrollLeft = segmentWidth;
      }

      if (container.scrollLeft <= segmentWidth - container.clientWidth) {
        container.scrollLeft = segmentWidth;
      }

      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Repeat winner cards for infinite scroll effect
  const repeatedWinners = [...cards, ...cards, ...cards];

  return (
    <div className="landing-container">
      {/* ✅ Hero Section */}
      <div className="hero-section">
        <div className="text-content">
          <h1 className="hero-title">Where Creativity Wins, Not Popularity.</h1>
          <p className="hero-subtext">
            Step into the ultimate photo competition. <br />
            Compete head-to-head in anonymous matchups, earn real rewards, and
            let your talent shine—no followers required.
          </p>
        </div>

        <div className="lottie-container">
          <Lottie
            animationData={animationData}
            className="lottie-animation"
            rendererSettings={{
              preserveAspectRatio: "xMidYMid slice",
              progressiveLoad: false, // Disable progressive loading for faster initial render
            }}
          />
        </div>
      </div>

      {/* ✅ Winners Section */}
      <div className="landing-winners-section">
        <h2 className="landing-winners-title">WINNERS</h2>
        {loading ? (
          <div className="auto-scroll-container">
            <div className="auto-scroll-track">
              {[...Array(45)].map((_, index) => (
                <div
                  className="landing-winner-card-wrapper"
                  key={`skeleton-${index}`}
                >
                  <WinnerSkeletonCard />
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : cards.length === 0 ? (
          <div className="no-submissions">
            <div className="dashed-box">
              <p>No winners yet!</p>
            </div>
          </div>
        ) : (
          <div className="auto-scroll-container" ref={scrollRef}>
            <div className="auto-scroll-track">
              {repeatedWinners.map((card, index) => (
                <div
                  className="landing-winner-card-wrapper"
                  key={`${card.key}-${index}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <WinnerLatestCard
                    startDate={card.startDate}
                    endDate={card.endDate}
                    image={card.image}
                    username={card.username}
                    theme={card.theme}
                    payout={card.payout}
                    totalVotes={card.totalVotes}
                    totalParticipants={card.totalParticipants}
                    isThemeCard={card.isThemeCard}
                    position={card.position}
                    isNewCardUI={true}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;

// import axios from "axios";
// import Lottie from "lottie-react";
// import { useEffect, useRef, useState } from "react";
// import animationData from "../assets/lottie/video2.json";
// import "../styles/pages/LandingPage.css";
// import { useAuth } from "../context/UseAuth";
// import WinnerLatestCard from "../components/Cards/WinnerLatestCard";

// const LandingPage = () => {
//   const { token } = useAuth();
//   const [cards, setCards] = useState([]);
//   console.log("cards: ", cards);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchWinners = async () => {
//       try {
//         setLoading(true);

//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/winners`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "ngrok-skip-browser-warning": "true",
//             },
//             params: {
//               skip: 0,
//               limit: 5,
//             },
//           }
//         );
//         if (response.data.success) {
//           // const allWinners = allDummyWinners || response.data.winners;
//           const allWinners = response.data.winners;

//           // Handle both old and new data formats
//           if (Array.isArray(allWinners) && allWinners.length > 0) {
//             // Check if it's the new format (array of contest objects)
//             if (allWinners[0].contest_id !== undefined) {
//               // New format - create flat array of winner cards only
//               const allWinnerCards = [];

//               allWinners.forEach((contest) => {
//                 // Create winner cards only (no theme cards)
//                 contest.winners.forEach((winner) => {
//                   allWinnerCards.push({
//                     type: "winner",
//                     key: `winner-${contest.contest_id}-${winner.position}`,
//                     image: winner.image,
//                     username: winner.username,
//                     startDate: contest.startDate,
//                     endDate: contest.endDate,
//                     theme: contest.name,
//                     payout: winner.payout,
//                     totalVotes: winner.totalVotes,
//                     position: winner.position,
//                     isThemeCard: false,
//                   });
//                 });
//               });

//               setCards(allWinnerCards);
//             } else {
//               // Old format - handle as before (fallback)
//               console.warn("Using old data format - consider updating API");
//               // You can add old format handling here if needed
//             }
//           }
//         } else {
//           throw new Error("Failed to fetch winners.");
//         }
//       } catch (error) {
//         console.error("❌ Error fetching winners:", error);
//         setError("Failed to load winners.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWinners();
//   }, []);
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     const container = scrollRef.current;
//     if (!container || cards.length === 0) return;

//     const segmentWidth = container.scrollWidth / 3;
//     container.scrollLeft = segmentWidth;

//     let animationId;
//     const scrollSpeed = 0.5;

//     const autoScroll = () => {
//       container.scrollLeft += scrollSpeed;

//       if (container.scrollLeft >= segmentWidth * 2) {
//         container.scrollLeft = segmentWidth;
//       }

//       if (container.scrollLeft <= segmentWidth - container.clientWidth) {
//         container.scrollLeft = segmentWidth;
//       }

//       animationId = requestAnimationFrame(autoScroll);
//     };

//     animationId = requestAnimationFrame(autoScroll);

//     return () => cancelAnimationFrame(animationId);
//   }, [cards]);

//   // Create repeated cards for infinite scroll effect
//   const repeatedCards = cards.length > 0 ? [...cards,...cards,...cards] : [];

//   return (
//     <div className="landing-container">
//       {/* ✅ Hero Section */}
//       <div className="hero-section">
//         <div className="text-content">
//           <h1 className="hero-title">Where Creativity Wins, Not Popularity.</h1>
//           <p className="hero-subtext">
//             Step into the ultimate photo competition. <br />
//             Compete head-to-head in anonymous matchups, earn real rewards, and
//             let your talent shine—no followers required.
//           </p>
//         </div>

//         <div className="lottie-container">
//           <Lottie animationData={animationData} className="lottie-animation" />
//         </div>
//       </div>

//       {/* ✅ Winners Section */}
//       <div className="landing-winners-section">
//         <h2 className="landing-winners-title">WINNERS</h2>

//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p className="error-message">{error}</p>
//         ) : cards.length === 0 ? (
//           <div className="no-submissions">
//             <div className="dashed-box">
//               <p>No winners yet!</p>
//             </div>
//           </div>
//         ) : (
//             <div className="auto-scroll-container" ref={scrollRef}>
//               <div className="auto-scroll-track">
//                 {repeatedCards.map((card, index) => (
//                   <div className="landing-winner-card-wrapper" key={`${card.key}-${index}`}>
//                     <WinnerLatestCard
//                       startDate={card.startDate}
//                       endDate={card.endDate}
//                       image={card.image}
//                       username={card.username}
//                       theme={card.theme}
//                       payout={card.payout}
//                       totalVotes={card.totalVotes}
//                       totalParticipants={card.totalParticipants}
//                       isThemeCard={card.isThemeCard}
//                       position={card.position}
//                       isNewCardUI={true}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

// import axios from "axios";
// import Lottie from "lottie-react";
// import { useEffect, useState } from "react";
// import animationData from "../assets/lottie/video2.json";
// import WinnerCard from "../components/Cards/WinnerCard";
// import "../styles/pages/LandingPage.css";

// const LandingPage = () => {
//   const [winners, setWinners] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchWinners = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/leaderboard/winners`);
//         if (response.data.success) {
//           setWinners(response.data.winners);
//         } else {
//           throw new Error("Failed to fetch winners.");
//         }
//       } catch (error) {
//         console.error("❌ Error fetching winners:", error);
//         setError("Failed to load winners.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWinners();
//   }, []);

//   return (
//     <div className="landing-container">
//       {/* ✅ Hero Section */}
//       <div className="hero-section">
//         <div className="text-content">
//           <h1 className="hero-title">Where Creativity Wins, Not Popularity.</h1>
//           <p className="hero-subtext">
//             Step into the ultimate photo competition. <br />
//             Compete head-to-head in anonymous matchups, earn real rewards, and
//             let your talent shine—no followers required.
//           </p>
//         </div>

//         {/* ✅ Lottie Animation */}
//         <div className="lottie-container">
//           <Lottie animationData={animationData} className="lottie-animation" />
//         </div>
//       </div>

//       {/* ✅ Winners Section */}
//       <div className="landing-winners-section">
//         <h2 className="landing-winners-title">WINNERS</h2>

//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p className="error-message">{error}</p>
//         ) : winners.length === 0 ? (
//           <div className="no-submissions">
//             <div className="dashed-box">
//               <p>No winners yet!</p>
//             </div>
//           </div>
//         ) : (
//           <div className="landing-winners-grid">
//             {winners.map((winner) => (
//               <div className="landing-winner-card-wrapper" key={winner.startDate + winner.username}>
//                 <WinnerCard {...winner} />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
