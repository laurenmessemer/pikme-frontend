import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import themePlaceholder from "../assets/placeholders/snack.webp";
import JackpotCard from "../components/Cards/JackpotCard";
import { useCompetition } from "../context/CompetitionContext";
import { useAuth } from "../context/UseAuth";

const StepOne = ({ nextStep }) => {
  const { token } = useAuth();
  const [contests, setContests] = useState([]);
  const [error, setError] = useState(null);
  const { setContestId } = useCompetition();

  useEffect(() => {
    const fetchLiveContests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/contests/live`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        setContests(response.data);
      } catch (err) {
        setError("Error fetching contests.");
        console.error("❌ Error fetching contests:", err);
      }
    };

    fetchLiveContests();
  }, []);

  return (
    <div className="step-one-container">
      {/* ✅ Restored Heading */}
      <div className="step-one-header">
        <button className="step-one-button">HEAD-TO-HEAD</button>
        <p className="step-one-description">
          In Head-to-Head, your photo faces off against a single competitor.
          Enter as many times as you want and win by the largest margins to
          claim the prize!
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
              themePhoto={
                contest.Theme?.cover_image_url
                  ? contest.Theme.cover_image_url // ✅ Use the full database URL directly
                  : themePlaceholder
              }
              entryFee={Number(contest.entry_fee)}
              prizePool={Number(contest.prize_pool)}
              themeName={contest.Theme?.name || "Theme"}
              themeDescription={
                contest.Theme?.description || "No description available"
              }
              onSubmit={() => {
                setContestId(contest.id);
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
