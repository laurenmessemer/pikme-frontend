import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import themePlaceholder from "../assets/placeholders/snack.webp";
import JackpotCard from "../components/Cards/JackpotCard";
import LoginToCompetePopup from "../components/Popups/LoginToCompete";
import { useCompetition } from "../context/CompetitionContext";
import { useAuth } from "../context/UseAuth";
import { api } from "../api";
import { checkSuccessResponse } from "../utils/RouterUtils";
import { ENDPOINTS_CONTEST_LIVE_UPCOMING_API } from "../constant/ApiUrls";
import AgeVerification from "../components/Popups/AgeVerification";

const preloadImages = (urls) => {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

const StepOne = ({ nextStep, previusStep = () => {} }) => {
  const [contests, setContests] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [ageverificationPopUp, setAgeverificationPopUp] = useState(false);
  const { setContestId, contestId } = useCompetition();
  const { user, token } = useAuth();
  const isLoggedIn = !!user;

  useEffect(() => {
    const fetchLiveContests = async () => {
      try {
        setIsLoading(true);
        const response = await api({
          endpoint: ENDPOINTS_CONTEST_LIVE_UPCOMING_API,
        });

        if (checkSuccessResponse(response)) {
          const sorted = response.data.sort((a, b) => {
            if (a.status === "Live" && b.status !== "Live") return -1;
            if (a.status !== "Live" && b.status === "Live") return 1;
            return (
              new Date(a.contest_live_date) - new Date(b.contest_live_date)
            ); // secondary sort
          });
          setContests(sorted);

          const coverImageUrls = sorted
            .map((contest) => contest.Theme?.cover_image_url)
            .filter(Boolean);

          preloadImages(coverImageUrls);
        } else {
          setError("Error fetching contests.");
          console.error("❌ Error fetching contests:");
        }
      } catch (err) {
        setError("Error fetching contests.");
        console.error("❌ Error fetching contests:", err);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLiveContests();
  }, []);

  return (
    <div className="step-one-container">
      {/* ✅ Header */}
      <div className="step-one-header">
        <button className="step-one-button">HEAD-TO-HEAD</button>
        <p className="step-one-description">
          In Head-to-Head, your photo faces off against a single competitor.
          Enter as many times as you want and win by the largest margins to
          claim the prize!
        </p>
      </div>
      {isLoading ? (
        <p className="loading-message">Loading Contests...</p>
      ) : (
        <>
          {/* ✅ Error Display */}
          {error && <p className="error-message">{error}</p>}

          {/* ✅ Contests or Loading */}
          {!error && contests.length === 0 ? (
            <p className="no-contests-message">No active contests.</p>
          ) : (
            <div className="step-one-cards-container">
              {contests.map((contest) => (
                <JackpotCard
                  key={contest.id}
                  contestId={contest.id}
                  themePhoto={
                    contest.Theme?.cover_image_url
                      ? contest.Theme.cover_image_url
                      : themePlaceholder
                  }
                  entryFee={Number(contest.entry_fee)}
                  prizePool={Number(contest.prize_pool)}
                  themeName={contest.Theme?.name || "Theme"}
                  themeDescription={
                    contest.Theme?.description || "No description available"
                  }
                  allData={contest}
                  onSubmit={() => {
                    if (!isLoggedIn) {
                      setShowLoginPrompt(true);
                      return;
                    } else {
                      setAgeverificationPopUp(true);
                      setContestId(contest.id);
                    }
                  }}
                  previusStep={previusStep}
                  className="jackpot-card"
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* ✅ Age Verification Popup */}
      {ageverificationPopUp && (
        <AgeVerification
          onClose={() => setAgeverificationPopUp(false)}
          onSubmit={() => {
            setAgeverificationPopUp(false);
            nextStep(contestId);
          }}
        />
      )}
      {/* ✅ Login Popup */}
      {showLoginPrompt && (
        <LoginToCompetePopup onClose={() => setShowLoginPrompt(false)} />
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
// import themePlaceholder from "../assets/placeholders/snack.webp";
// import JackpotCard from "../components/Cards/JackpotCard";
// import { useCompetition } from "../context/CompetitionContext";
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
//   const { setContestId } = useCompetition();

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
//           .filter(Boolean); // removes undefined/null

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
//       {/* ✅ Restored Heading */}
//       <div className="step-one-header">
//         <button className="step-one-button">HEAD-TO-HEAD</button>
//         <p className="step-one-description">
//           In Head-to-Head, your photo faces off against a single competitor.
//           Enter as many times as you want and win by the largest margins to claim the prize!
//         </p>
//       </div>

//       {error && <p className="error-message">{error}</p>}
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
//                   ? contest.Theme.cover_image_url // ✅ Use the full database URL directly
//                   : themePlaceholder
//               }
//               entryFee={Number(contest.entry_fee)}
//               prizePool={Number(contest.prize_pool)}
//               themeName={contest.Theme?.name || "Theme"}
//               themeDescription={contest.Theme?.description || "No description available"}
//               onSubmit={() => {
//                 setContestId(contest.id);
//                 nextStep(contest.id);
//               }}
//               className="jackpot-card"
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// StepOne.propTypes = {
//   nextStep: PropTypes.func.isRequired,
// };

// export default StepOne;
