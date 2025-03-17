import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import themePlaceholder from "../assets/placeholders/snack.jpg";
import JackpotCard from "../components/Cards/JackpotCard";
import { useCompetition } from "../context/CompetitionContext"; // Import context
import "../styles/competition/StepOne.css";

const StepOne = ({ nextStep }) => {
  console.log("📸 Placeholder Image Path:", themePlaceholder);
  const [contests, setContests] = useState([]);
  const [error, setError] = useState(null);
  const { setContestId } = useCompetition(); // Use context

  useEffect(() => {
    const fetchLiveContests = async () => {
      try {
        const response = await axios.get("${import.meta.env.VITE_API_URL}/api/contests/live");
        // console.log("✅ API Response:", response.data);
        setContests(response.data);
      } catch (err) {
        setError("Error fetching contests");
        console.error("❌ Error fetching contests:", err);
      }
    };

    fetchLiveContests();
  }, []);

  return (
    <div className="step-one-container">
      
      {/* ✅ New Section: Button & Description */}
      <div className="step-one-header">
        <button className="step-one-button">HEAD-TO-HEAD</button>
        <p className="step-one-description">
          In Head-to-Head, your photo faces off against a single competitor.
          Enter as many times as you want and win by the largest margins to claim the prize!
        </p>
      </div>
  
      {error && <p className="error">{error}</p>}
      {contests.length === 0 ? (
        <p>No active contests.</p>
      ) : (
        <div className="step-one-cards-container">
          {contests.map((contest) => (
            <JackpotCard
              key={contest.id}
              contestId={contest.id}
              themePhoto={
                contest.Theme?.cover_image_url
                  ? `${import.meta.env.VITE_API_URL}${contest.Theme.cover_image_url}`
                  : themePlaceholder
              }
              entryFee={Number(contest.entry_fee)}
              prizePool={Number(contest.prize_pool)}
              themeName={contest.Theme?.name || "Theme"}
              themeDescription={contest.Theme?.description || "No description available"}
              onSubmit={() => {
                setContestId(contest.id); // ✅ Set contestId globally
                nextStep(contest.id);
              }}
              className="jackpot-card"
            />
          ))}
        </div>
      )}
    </div>
  );  
};

StepOne.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default StepOne;
