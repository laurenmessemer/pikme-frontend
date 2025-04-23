import axios from "axios";
import { useEffect, useState } from "react";
import { FiFlag, FiInfo } from "react-icons/fi";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import voteAnimation from "../assets/lottie/video1_lottie.json";
import EndVoting from "../components/Popups/EndVoting";
import HowToVote from "../components/Popups/HowToVote";
import ReportImagePopup from "../components/Popups/ReportImage";
import ReportReceived from "../components/Popups/ReportReceived";
import VoteIntroPopup from "../components/Popups/VoteIntroPopup";
import { useAuth } from "../context/UseAuth"; // if not already imported
import "../styles/pages/Vote.css";



const preloadImages = (urls) => {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};


const Vote = () => {
  const [popupQueue, setPopupQueue] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [currentCompetitionIndex, setCurrentCompetitionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showIntroPopup, setShowIntroPopup] = useState(true);
  const [showHowToVotePopup, setShowHowToVotePopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentContestId, setCurrentContestId] = useState(null);
  const [votedCompetitionIds, setVotedCompetitionIds] = useState([]);
  const [playLottie, setPlayLottie] = useState(true);
  const [anonVoteCount, setAnonVoteCount] = useState(0);


  const [reportMode, setReportMode] = useState(false);
  const [reportSelectedImage, setReportSelectedImage] = useState(null);
  const [showReportPopup, setShowReportPopup] = useState(false);
  const [showReportReceived, setShowReportReceived] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();
  const isLoggedIn = !!user;
  const currentUserId = isLoggedIn ? user.id : `anon-${localStorage.getItem("anon_id") || uuidv4()}`;

  useEffect(() => {
    if (!isLoggedIn && !localStorage.getItem("anon_id")) {
      localStorage.setItem("anon_id", uuidv4());
    }
  }, [isLoggedIn]);

  const resetReportFlow = () => {
    setReportMode(false);
    setReportSelectedImage(null);
    setShowReportPopup(false);
    setShowReportReceived(false);
  };

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

      const allImages = filtered.flatMap((comp) => [comp.user1_image, comp.user2_image]);
      preloadImages(allImages);

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
    setShowHowToVotePopup(true); 
    fetchVotingEntries(currentContestId);
  };

  const handleVote = async (selectedImage) => {
    const current = competitions[currentCompetitionIndex];
    if (!current) return;
  
    // ❌ Block anonymous users after 3 votes
    if (!isLoggedIn && anonVoteCount >= 3) {
      setError("You've reached your free vote limit. Log in to keep voting.");
      return;
    }
  
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/vote/vote`, {
        competitionId: current.id,
        selectedImage,
        voterId: currentUserId,
      });
  
      setSelected(selectedImage);
  
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
      }, 600);
  
      setVotedCompetitionIds((prev) => [...prev, current.id]);
      setTimeout(() => setAnimationComplete(true), 1500);
  
      // ✅ Count anonymous vote
      if (!isLoggedIn) {
        setAnonVoteCount((prev) => prev + 1);
      }
  
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

  const current = competitions[currentCompetitionIndex];
  const currentPopup = popupQueue[0];
  const showEndScreen =
    competitions.length === 0 && popupQueue.length === 0 && !showIntroPopup;

  return (
    <>
      {!showHowToVotePopup && showIntroPopup && currentPopup && (
        <VoteIntroPopup {...currentPopup} onStartVoting={closeIntroPopup} />
      )}

      {showHowToVotePopup && (
        <HowToVote onClose={() => setShowHowToVotePopup(false)} />
      )}


      {showEndScreen && <EndVoting onClose={() => navigate("/")} />}

      {reportMode && (
        <div className="report-overlay">
          <div className="vote-report-controls">
            <button
              onClick={() => resetReportFlow()}
              className="vote-report-btn vote-report-cancel"
            >
              CANCEL
            </button>
            <button
              className="vote-report-btn vote-report-confirm"
              disabled={!reportSelectedImage}
              onClick={() => {
                setShowReportPopup(true); // Don't turn off reportMode here!
              }}
            >
              CONFIRM
            </button>
          </div>
        </div>
      )}

      {showReportPopup && reportSelectedImage && (
        <ReportImagePopup
          image={reportSelectedImage}
          onClose={() => {
            setShowReportPopup(false);
            setShowReportReceived(true);
          }}
          onSubmit={async ({ imageUrl, categories, description }) => {
            const competition = competitions[currentCompetitionIndex];
          
            try {
              await axios.post(`${import.meta.env.VITE_API_URL}/api/reports/submit`, {
                reporterId: currentUserId,
                competitionId: competition.id,
                imageUrl,
                categories,
                description,
              });
          
              setShowReportPopup(false);
              setShowReportReceived(true);
            } catch (err) {
              console.error("❌ Error submitting report:", err);
            }
          }}
          
        />
      )}

      {showReportReceived && (
        <ReportReceived
          onClose={() => {
            resetReportFlow();
          }}
        />
      )}

      <div className="vote-container">
        <div className="vote-actions">
          <div className="vote-icon" onClick={() => setShowHowToVotePopup(true)} title="How to Vote">
            <FiInfo size={26} color="white" />
          </div>
          <div
            className="vote-icon"
            onClick={() => {
              setReportMode(true);
              setReportSelectedImage(null);
            }}
            title="Report Image"
          >
            <FiFlag size={26} color="white" />
          </div>
        </div>

        {error && <p className="error">{error}</p>}
        {loading && <p className="loading-message">Loading contests...</p>}

        <div
          className={`vote-animation-container ${
            reportMode || showReportPopup || showReportReceived ? "report-mode-background" : ""
          }`}
        >
          {!reportMode && !showReportPopup && !showReportReceived && (
            <Lottie
              animationData={voteAnimation}
              play={playLottie}
              loop={false}
              onComplete={() => setPlayLottie(false)}
              className="vote-animation"
            />
          )}
        </div>

        {current && (!showIntroPopup || reportMode || showReportPopup || showReportReceived) && (
          <div className={`vote-content ${selected ? "vote-fade-out" : ""}`}>
            {["user1_image", "user2_image"].map((key, index) => {
              const image = current[key];
              const isSelected = selected === image;
              const isReporting =
                (reportMode || showReportPopup || showReportReceived) &&
                reportSelectedImage === image;

              return (
                <div
                  key={image}
                  className={`vote-box ${index === 0 ? "slide-in-left" : "slide-in-right"}`}
                >
                  <div
                    className={`vote-wrapper ${isSelected ? "selected" : ""}`}
                    onClick={() =>
                      reportMode || showReportPopup || showReportReceived
                        ? setReportSelectedImage(image)
                        : handleVote(image)
                    }
                  >
                    <img
                      src={image}
                      alt={`Entry ${index + 1}`}
                      className={`vote-submission ${isReporting ? "report-selected" : ""}`}
                    />
                    <div className="vote-overlay">
                      {!selected && !reportMode && <div className="vote-label">Vote</div>}
                      {isSelected && <div className="vote-plus-one">+1</div>}
                      {selected && (
                        <div className="vote-counter">
                          {key === "user1_image"
                            ? current.votes_user1
                            : current.votes_user2}{" "}
                          votes
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
