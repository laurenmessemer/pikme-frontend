import axios from "axios";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import animationData from "../assets/lottie/video2.json";
import WinnerCard from "../components/Cards/WinnerCard";
import "../styles/pages/LandingPage.css";



const LandingPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/winners`);
        if (response.data.success) {
          const allWinners = response.data.winners;
          const flatCardList = [];

          const grouped = {};
          allWinners.forEach((entry) => {
            const id = entry.contestId;
            if (!grouped[id]) {
              grouped[id] = {
                contestId: id,
                theme: entry.Theme?.name || "Theme",
                themeImage: entry.Theme?.cover_image_url || "",
                startDate: entry.startDate,
                endDate: entry.endDate,
                entries: [],
              };
            }
            grouped[id].entries.push(entry);
          });

          Object.values(grouped).forEach((contest) => {
            // Add Theme Card
            flatCardList.push({
              type: "theme",
              key: `theme-${contest.contestId}`,
              image: contest.themeImage,
              startDate: contest.startDate,
              endDate: contest.endDate,
              theme: contest.theme,
              entries: contest.entries.length,
              isThemeCard: true,
            });

            // Add top 3 Winner Cards
            contest.entries.slice(0, 3).forEach((entry, index) => {
              flatCardList.push({
                type: "winner",
                key: `winner-${contest.contestId}-${index}`,
                image: entry.image,
                username: entry.username,
                startDate: contest.startDate,
                endDate: contest.endDate,
                theme: contest.theme,
                payout: parseFloat(entry.payout),
                entries: entry.totalVotes || 0,
                place: index + 1,
                isThemeCard: false,
              });
            });
          });

          setCards(flatCardList);
          const allImageUrls = flatCardList
            .map((card) => card.image)
            .filter(Boolean);

          allImageUrls.forEach((url) => {
            const img = new Image();
            img.src = url;
          });
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
          <Lottie animationData={animationData} className="lottie-animation" />
        </div>
      </div>

      {/* ✅ Winners Section */}
      <div className="landing-winners-section">
        <h2 className="landing-winners-title">WINNERS</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : cards.length === 0 ? (
          <div className="no-submissions">
            <div className="dashed-box">
              <p>No winners yet!</p>
            </div>
          </div>
        ) : (
          <div className="landing-winners-grid">
            {cards.map((card) => (
              <div className="landing-winner-card-wrapper" key={card.key}>
                <WinnerCard
                  startDate={card.startDate}
                  endDate={card.endDate}
                  image={card.image}
                  username={card.username}
                  theme={card.theme}
                  payout={card.payout}
                  entries={card.entries}
                  isThemeCard={card.isThemeCard}
                  place={card.place}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;



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
