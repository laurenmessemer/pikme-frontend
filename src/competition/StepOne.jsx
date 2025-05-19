import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import themePlaceholder from "../assets/placeholders/snack.jpg";
import JackpotCard from "../components/Cards/JackpotCard";
import GeoPopup from "../components/Popups/GeoPopup"; // ✅ import GeoPopup
import LoginToCompetePopup from "../components/Popups/LoginToCompete";
import { useCompetition } from "../context/CompetitionContext";
import { useAuth } from "../context/UseAuth";
import "../styles/competition/StepOne.css";

const preloadImages = (urls) => {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

const StepOne = ({ nextStep }) => {
  const [contests, setContests] = useState([]);
  const [error, setError] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showGeoBlock, setShowGeoBlock] = useState(false); // ✅ state for GeoPopup
  const { setContestId } = useCompetition();
  const { user } = useAuth();
  const isLoggedIn = !!user;

  useEffect(() => {
    const fetchLiveContests = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/contests/live-upcoming`);
        const sorted = response.data.sort((a, b) => {
          if (a.status === "Live" && b.status !== "Live") return -1;
          if (a.status !== "Live" && b.status === "Live") return 1;
          return new Date(a.contest_live_date) - new Date(b.contest_live_date);
        });

        setContests(sorted);
        const coverImageUrls = sorted.map(c => c.Theme?.cover_image_url).filter(Boolean);
        preloadImages(coverImageUrls);
      } catch (err) {
        setError("Error fetching contests.");
        console.error("❌ Error fetching contests:", err);
      }
    };

    fetchLiveContests();
  }, []);

  const handleSubmit = async (contestId) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }

    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      const { country, region_code } = data;

      const blockedRegions = ["AR", "CT", "DE", "LA", "MD", "MI", "MT", "SC", "SD", "DC"];

      if (country !== "US" || blockedRegions.includes(region_code)) {
        console.warn(`Blocked region: ${region_code || country}`);
        setShowGeoBlock(true);
        return;
      }

      // If allowed, proceed
      setContestId(contestId);
      nextStep(contestId);
    } catch (err) {
      console.error("Geolocation check failed:", err);
      // Optional: allow fallback behavior or show error
    }
  };

  return (
    <div className="step-one-container">
      <div className="step-one-header">
        <button className="step-one-button">HEAD-TO-HEAD</button>
        <p className="step-one-description">
          In Head-to-Head, your photo faces off against a single competitor.
          Enter as many times as you want and win by the largest margins to claim the prize!
        </p>
      </div>

      {error && <p className="error-message">{error}</p>}

      {contests.length === 0 ? (
        <p className="no-contests-message">No active contests.</p>
      ) : (
        <div className="step-one-cards-container">
          {contests.map((contest) => (
            <JackpotCard
              key={contest.id}
              contestId={contest.id}
              themePhoto={contest.Theme?.cover_image_url || themePlaceholder}
              entryFee={Number(contest.entry_fee)}
              prizePool={Number(contest.prize_pool)}
              themeName={contest.Theme?.name || "Theme"}
              themeDescription={contest.Theme?.description || "No description available"}
              onSubmit={() => handleSubmit(contest.id)} // ✅ use updated handler
              className="jackpot-card"
            />
          ))}
        </div>
      )}

      {showLoginPrompt && (
        <LoginToCompetePopup onClose={() => setShowLoginPrompt(false)} />
      )}

      {showGeoBlock && (
        <GeoPopup onClose={() => setShowGeoBlock(false)} />
      )}
    </div>
  );
};

StepOne.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default StepOne;


// import axios from "axios";
// import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
// import themePlaceholder from "../assets/placeholders/snack.jpg";
// import JackpotCard from "../components/Cards/JackpotCard";
// import LoginToCompetePopup from "../components/Popups/LoginToCompete";
// import { useCompetition } from "../context/CompetitionContext";
// import { useAuth } from "../context/UseAuth";
// import "../styles/competition/StepOne.css";

// const preloadImages = (urls) => {
//   urls.forEach((url) => {
//     const img = new Image();
//     img.src = url;
//   });
// };

// const StepOne = ({ nextStep }) => {
//   const [contests, setContests] = useState([]);
//   const [error, setError] = useState(null);
//   const [showLoginPrompt, setShowLoginPrompt] = useState(false);
//   const { setContestId } = useCompetition();
//   const { user } = useAuth();
//   const isLoggedIn = !!user;

//   useEffect(() => {
//     const fetchLiveContests = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/contests/live-upcoming`);
//         const sorted = response.data.sort((a, b) => {
//           if (a.status === "Live" && b.status !== "Live") return -1;
//           if (a.status !== "Live" && b.status === "Live") return 1;
//           return new Date(a.contest_live_date) - new Date(b.contest_live_date); // secondary sort
//         });
//         setContests(sorted);

//         const coverImageUrls = sorted
//           .map((contest) => contest.Theme?.cover_image_url)
//           .filter(Boolean);

//         preloadImages(coverImageUrls);
//       } catch (err) {
//         setError("Error fetching contests.");
//         console.error("❌ Error fetching contests:", err);
//       }
//     };

//     fetchLiveContests();
//   }, []);

//   return (
//     <div className="step-one-container">
//       {/* ✅ Header */}
//       <div className="step-one-header">
//         <button className="step-one-button">HEAD-TO-HEAD</button>
//         <p className="step-one-description">
//           In Head-to-Head, your photo faces off against a single competitor.
//           Enter as many times as you want and win by the largest margins to claim the prize!
//         </p>
//       </div>

//       {/* ✅ Error Display */}
//       {error && <p className="error-message">{error}</p>}

//       {/* ✅ Contests or Loading */}
//       {contests.length === 0 ? (
//         <p className="no-contests-message">No active contests.</p>
//       ) : (
//         <div className="step-one-cards-container">
//           {contests.map((contest) => (
//             <JackpotCard
//               key={contest.id}
//               contestId={contest.id}
//               themePhoto={
//                 contest.Theme?.cover_image_url
//                   ? contest.Theme.cover_image_url
//                   : themePlaceholder
//               }
//               entryFee={Number(contest.entry_fee)}
//               prizePool={Number(contest.prize_pool)}
//               themeName={contest.Theme?.name || "Theme"}
//               themeDescription={contest.Theme?.description || "No description available"}
//               onSubmit={() => {
//                 if (!isLoggedIn) {
//                   setShowLoginPrompt(true);
//                   return;
//                 }
//                 setContestId(contest.id);
//                 nextStep(contest.id);
//               }}
//               className="jackpot-card"
//             />
//           ))}
//         </div>
//       )}

//       {/* ✅ Login Popup */}
//       {showLoginPrompt && (
//         <LoginToCompetePopup onClose={() => setShowLoginPrompt(false)} />
//       )}
//     </div>
//   );
// };

// StepOne.propTypes = {
//   nextStep: PropTypes.func.isRequired,
// };

// export default StepOne;

