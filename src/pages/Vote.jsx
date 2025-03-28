import axios from "axios";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";
import voteAnimation from "../assets/lottie/video1_lottie.json";
import EndVoting from "../components/Popups/EndVoting";
import HowToVote from "../components/Popups/HowToVote";
import RainingCards from "../components/Popups/RainingCards";
import VoteIntroPopup from "../components/Popups/VoteIntroPopup";
import "../styles/pages/Vote.css";

const Vote = () => {
  const [popupQueue, setPopupQueue] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [currentCompetitionIndex, setCurrentCompetitionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showIntroPopup, setShowIntroPopup] = useState(true);
  const [showHowToVotePopup, setShowHowToVotePopup] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentContestId, setCurrentContestId] = useState(null);
  const [votedCompetitionIds, setVotedCompetitionIds] = useState([]);
  const [playLottie, setPlayLottie] = useState(true); 
  const [setPendingVoteImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      const queue = await fetchIntroPopups();
      if (queue.length > 0) {
        const firstContestId = queue[0].contestId;
        setCurrentContestId(firstContestId);
        if (!showHowToVotePopup) {
          await fetchVotingEntries(firstContestId);
        }
      }
    };
    initialize();
  }, [showHowToVotePopup]);

  const fetchIntroPopups = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/contests/live`);
      const contests = response.data;
      if (!Array.isArray(contests)) return [];

      const voteResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/vote/get-entries`);
      const allCompetitions = voteResponse.data.competitions || [];

      const validContests = contests.filter((contest) =>
        allCompetitions.some((comp) => Number(comp.contestId) === Number(contest.id))
      );

      const queue = validContests.map((contest) => ({
        contestId: contest.id,
        themePhoto: contest.Theme?.cover_image_url || "",
        themeName: contest.Theme?.name || "Theme",
        themeDescription: contest.Theme?.description || "No description available",
        entryFee: Number(contest.entry_fee),
        prizePool: Number(contest.prize_pool) || 0,
      }));

      setPopupQueue(queue);
      return queue;
    } catch (err) {
      console.error("❌ Error fetching intro popups or competitions:", err);
      return [];
    }
  };

  const fetchVotingEntries = async (contestId) => {
    setLoading(true);
    setPlayLottie(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/vote/get-entries`);
      const comps = response.data.competitions || [];

      const filtered = comps.filter(
        (comp) =>
          Number(comp.contestId) === Number(contestId) &&
          !votedCompetitionIds.includes(comp.id)
      );

      if (filtered.length === 0) {
        handleNextContest();
        return;
      }

      setCompetitions(filtered);
      setCurrentCompetitionIndex(0);
    } catch (err) {
      console.error("❌ Error fetching voting competitions:", err);
      setError("Failed to load voting entries.");
    } finally {
      setLoading(false);
    }
  };

  const handleNextContest = () => {
    const nextQueue = popupQueue.slice(1);
    const nextContest = nextQueue[0];

    setPopupQueue(nextQueue);
    setVotedCompetitionIds([]);
    setShowIntroPopup(!!nextContest);

    if (nextContest) {
      setCurrentContestId(nextContest.contestId);
      fetchVotingEntries(nextContest.contestId);
    } else {
      setCompetitions([]);
    }
  };

  const closeIntroPopup = () => {
    setShowIntroPopup(false);
    fetchVotingEntries(currentContestId);
  };

  const handleVote = async (selectedImage) => {
    const current = competitions[currentCompetitionIndex];
    if (!current) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/vote/vote`, {
        competitionId: current.id,
        selectedImage,
      });

      setSelected(selectedImage);
      setPendingVoteImage(selectedImage);

      setTimeout(() => {
        if (selectedImage === current.user1_image) {
          current.votes_user1 += 1;
        } else if (selectedImage === current.user2_image) {
          current.votes_user2 += 1;
        }

        setCompetitions((prev) => {
          const updated = [...prev];
          updated[currentCompetitionIndex] = { ...current };
          return updated;
        });

        setPendingVoteImage(null);
      }, 600);

      setVotedCompetitionIds((prev) => [...prev, current.id]);
      setTimeout(() => setAnimationComplete(true), 1500);
    } catch (err) {
      console.error("❌ Error submitting vote:", err);
      setError("Vote failed. Try again.");
    }
  };

  useEffect(() => {
    if (animationComplete) {
      setSelected(null);
      setAnimationComplete(false);
      setPlayLottie(true);

      const nextIndex = currentCompetitionIndex + 1;
      if (nextIndex < competitions.length) {
        setCurrentCompetitionIndex(nextIndex);
      } else {
        handleNextContest();
      }
    }
  }, [animationComplete]);

  const showEndScreen =
    competitions.length === 0 && popupQueue.length === 0 && !showIntroPopup;

  const current = competitions[currentCompetitionIndex];
  const currentPopup = popupQueue[0];

  return (
    <>
      <RainingCards trigger={true} />

      {showHowToVotePopup && (
        <HowToVote onClose={() => setShowHowToVotePopup(false)} />
      )}

      {!showHowToVotePopup && showIntroPopup && currentPopup && (
        <VoteIntroPopup
          contestId={currentPopup.contestId}
          themePhoto={currentPopup.themePhoto}
          themeName={currentPopup.themeName}
          themeDescription={currentPopup.themeDescription}
          entryFee={currentPopup.entryFee}
          prizePool={currentPopup.prizePool}
          onStartVoting={closeIntroPopup}
          onClose={closeIntroPopup}
        />
      )}

      {showEndScreen && <EndVoting onClose={() => navigate("/")} />}

      <div className="vote-container">
        {error && <p className="error">{error}</p>}
        {loading && <p className="loading-message">Loading contests...</p>}

        <div className="vote-animation-container">
          <Lottie
            animationData={voteAnimation}
            play={playLottie}
            loop={false}
            onComplete={() => setPlayLottie(false)}
            className="vote-animation"
          />
        </div>

        {current && !showIntroPopup && (
          <div className={`vote-content ${selected ? "vote-fade-out" : ""}`}>
            {["user1_image", "user2_image"].map((userKey, index) => {
              const image = current[userKey];
              const isSelected = selected === image;
              const otherSelected = selected && selected !== image;

              return (
                <div
                  key={image}
                  className={`vote-box ${index === 0 ? "slide-in-left" : "slide-in-right"}`}
                >
                  <div
                    className={`vote-wrapper ${
                      isSelected ? "selected" : otherSelected ? "not-selected" : ""
                    }`}
                    onClick={() => handleVote(image)}
                  >
                    <img
                      src={image}
                      alt={`Entry ${index + 1}`}
                      className={`vote-submission ${isSelected ? "selected" : otherSelected ? "not-selected" : ""}`}
                    />

                    <div className="vote-overlay">
                      {!selected && <div className="vote-label">Vote</div>}
                      {isSelected && <div className="vote-plus-one">+1</div>}
                      {selected && (
                        <div className="vote-counter">
                          {userKey === "user1_image"
                            ? current.votes_user1
                            : current.votes_user2} votes
                        </div>
                      )}
                      {isSelected && (
                        <div className="vote-checkmark-wrapper">
                          <div className="vote-checkmark-back"></div>
                          <div className="vote-checkmark">
                            <span className="checkmark-icon" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Vote;