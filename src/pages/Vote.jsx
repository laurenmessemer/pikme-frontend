/*
 * File: Vote.jsx
 * Author: HARSH CHAUHAN
 * Created Date: May 21th, 2025
 * Description: This component handles voting management system with full flow.
 */

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FiFlag, FiInfo } from "react-icons/fi";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import EndVoting from "../components/Popups/EndVoting";
import HowToVote from "../components/Popups/HowToVote";
import LoginToVotePopup from "../components/Popups/LoginToVotePopup";
import ReportImagePopup from "../components/Popups/ReportImage";
import ReportReceived from "../components/Popups/ReportReceived";
import VoteIntroPopup from "../components/Popups/VoteIntroPopup";
import { useAuth } from "../context/UseAuth";
import "../styles/pages/Vote.css";
import ToastUtils from "../utils/ToastUtils";
import LazyImage from "../components/Common/LazyImage";
import { ImageUrl } from "../constant/appConstants";

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
  const [allCompetitions, setAllCompetitions] = useState([]);
  const [currentContestId, setCurrentContestId] = useState(null);
  const [votedCompetitionIds, setVotedCompetitionIds] = useState([]);
  const [playLottie, setPlayLottie] = useState(false); // 👈 Start false

  const [reportMode, setReportMode] = useState(false);
  const [reportSelectedImage, setReportSelectedImage] = useState(null);
  const [showReportPopup, setShowReportPopup] = useState(false);
  const [showReportReceived, setShowReportReceived] = useState(false);

  const navigate = useNavigate();
  const { user, token } = useAuth();
  const userId = user?.id;
  const isLoggedIn = !!user;
  const currentUserId = isLoggedIn ? user.id : 99999;

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const hasFetchedInitialCompetition = useRef(false);

  const [anonVoteCount, setAnonVoteCount] = useState(() => {
    // Initialize from localStorage for anonymous users
    if (!isLoggedIn) {
      const anonId = localStorage.getItem("anon_id");
      if (anonId) {
        const storedCount = localStorage.getItem(`anon_vote_count_${anonId}`);
        return storedCount ? parseInt(storedCount, 10) : 0;
      }
    }
    return 0;
  });

  const [hasSeenHowToVote, setHasSeenHowToVote] = useState(() => {
    // Only track "has seen" for logged-in users
    return isLoggedIn && localStorage.getItem("hasSeenHowToVote") === "true";
  });

  useEffect(() => {
    if (!isLoggedIn && !localStorage.getItem("anon_id")) {
      localStorage.setItem("anon_id", uuidv4());
    }
  }, [isLoggedIn]);

  // Clear anonymous vote count when user logs in
  useEffect(() => {
    if (isLoggedIn && anonVoteCount > 0) {
      setAnonVoteCount(0);
      // Also clear from localStorage for all anon_ids (cleanup)
      const anonId = localStorage.getItem("anon_id");
      if (anonId) {
        localStorage.removeItem(`anon_vote_count_${anonId}`);
      }
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
      setLoading(true);
      const queue = await fetchIntroPopups();
      if (queue.length > 0) {
        const firstContestId = queue[0].contestId;
        setCurrentContestId(firstContestId);

        if (!hasFetchedInitialCompetition.current) {
          hasFetchedInitialCompetition.current = true;
          await fetchVotingEntries(firstContestId);
        } else {
          setLoading(false);
        }
      } else {
        // No contests available
        setLoading(false);
      }
    };
    initialize();
  }, [showHowToVotePopup]);

  const fetchIntroPopups = async () => {
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
      const contests = response.data;
      if (!Array.isArray(contests)) return [];

      const voteResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/vote/get-entries`,
        {
          params: {
            userId: userId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      const allCompetitions = voteResponse.data.competitions || [];

      const validContests = contests.filter((contest) =>
        allCompetitions.some(
          (comp) => Number(comp.contestId) === Number(contest.id)
        )
      );

      const queue = validContests.map((contest) => ({
        contestId: contest.id,
        themePhoto: contest.Theme?.cover_image_url || "",
        themeName: contest.Theme?.name || "Theme",
        themeDescription:
          contest.Theme?.description || "No description available",
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

  // Get Entries
  const fetchVotingEntries = async (contestId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/vote/get-entries`,
        {
          params: {
            userId: userId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      const comps = response.data.competitions || [];

      // Set all competitions regardless of filtering
      setAllCompetitions(comps);

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

      const allImages = filtered.flatMap((comp) => [
        comp.user1_image,
        comp.user2_image,
      ]);
      preloadImages(allImages);
    } catch (err) {
      console.error("❌ Error fetching voting competitions:", err);
      setError("Failed to load voting entries.");
    } finally {
      // Ensure loading is set to false after everything is processed
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
      // Make sure loading is complete before showing no competitions
      setLoading(false);
      setCompetitions([]);
    }
  };

  const closeIntroPopup = () => {
    setShowIntroPopup(false);

    // ✅ For logged-in users: show HowToVote once
    if (isLoggedIn && !hasSeenHowToVote) {
      setShowHowToVotePopup(true);
      localStorage.setItem("hasSeenHowToVote", "true");
      setHasSeenHowToVote(true);
    }

    // ✅ For non-logged-in users: show HowToVote every time
    if (!isLoggedIn) {
      setShowHowToVotePopup(true);
    }

    // ✅ Fetch competitions if needed
    if (!hasFetchedInitialCompetition.current && currentContestId) {
      hasFetchedInitialCompetition.current = true;
      fetchVotingEntries(currentContestId);
    }

    // ✅ If HowToVote isn't being shown, start animation immediately
    if (isLoggedIn && hasSeenHowToVote) {
      setPlayLottie(true);
    }
  };

  const handleVote = async (selectedImage) => {
    const current = competitions[currentCompetitionIndex];
    if (!current) return;

    if (!isLoggedIn && anonVoteCount >= 3) {
      setShowLoginPrompt(true);
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/vote/vote`,
        {
          competitionId: current.id,
          selectedImage,
          voterId: currentUserId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

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

      if (!isLoggedIn) {
        const newCount = anonVoteCount + 1;
        setAnonVoteCount(newCount);

        // Persist vote count to localStorage
        const anonId = localStorage.getItem("anon_id");
        if (anonId) {
          localStorage.setItem(
            `anon_vote_count_${anonId}`,
            newCount.toString()
          );
        }
      }
    } catch (err) {
      err?.response?.data?.message
        ? ToastUtils.error(err?.response?.data?.message)
        : "";
      setError("Vote failed. Try again.");
    }
  };

  useEffect(() => {
    if (animationComplete) {
      setSelected(null);
      setAnimationComplete(false);
      setPlayLottie(true); // ✅ reset to play animation again

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
    !loading &&
    competitions.length === 0 &&
    popupQueue.length === 0 &&
    !showIntroPopup;

  const [desktopLottie, setDesktopLottie] = useState(null);
  // const [mobileLottie, setMobileLottie] = useState(null);

  useEffect(() => {
    const fetchLotties = async () => {
      try {
        const [desktopRes] = await Promise.all([
          fetch(`${ImageUrl}/icons/video1_lottie.json`),
          fetch(`${ImageUrl}/icons/Mob_ver.json`),
        ]);

        const desktopJSON = await desktopRes.json();
        // const mobileJSON = await mobileRes.json();

        setDesktopLottie(desktopJSON);
        // setMobileLottie(mobileJSON);
      } catch (err) {
        console.error("❌ Error loading Lottie JSONs:", err);
      }
    };

    fetchLotties();
  }, []);

  return (
    <>
      {!showHowToVotePopup && showIntroPopup && currentPopup && (
        <VoteIntroPopup {...currentPopup} onStartVoting={closeIntroPopup} />
      )}

      {showHowToVotePopup && (
        <HowToVote
          onClose={() => {
            setShowHowToVotePopup(false);
            setPlayLottie(true); // ✅ Start animation now
          }}
        />
      )}

      {showLoginPrompt && (
        <LoginToVotePopup onClose={() => setShowLoginPrompt(false)} />
      )}

      {showEndScreen && <EndVoting onClose={() => navigate("/")} />}

      {reportMode && (
        <div className="report-overlay">
          <div className="vote-report-controls">
            <button
              onClick={resetReportFlow}
              className="vote-report-btn vote-report-cancel"
            >
              CANCEL
            </button>
            <button
              className="vote-report-btn vote-report-confirm"
              disabled={!reportSelectedImage}
              onClick={() => setShowReportPopup(true)}
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
              await axios.post(
                `${import.meta.env.VITE_API_URL}/api/reports/submit`,
                {
                  reporterId: currentUserId,
                  competitionId: competition.id,
                  imageUrl,
                  categories,
                  description,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "ngrok-skip-browser-warning": "true",
                  },
                }
              );
              setShowReportPopup(false);
              setShowReportReceived(true);
            } catch (err) {
              console.error("❌ Error submitting report:", err);
            }
          }}
        />
      )}

      {showReportReceived && <ReportReceived onClose={resetReportFlow} />}
      {allCompetitions &&
      allCompetitions.length > 0 &&
      !showIntroPopup &&
      !showHowToVotePopup &&
      !loading ? (
        <>
          <div className="vote-actions">
            <div
              className="vote-icon"
              onClick={() => setShowHowToVotePopup(true)}
              title="How to Vote"
            >
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
        </>
      ) : (
        <></>
      )}
      <div className="vote-container new-container">
        <div className="mobile-full-overlay" />
        {loading ? (
          <p className="loading-message custom">Loading competitions...</p>
        ) : (
          <>
            {allCompetitions &&
            allCompetitions.length > 0 &&
            !showIntroPopup &&
            !showHowToVotePopup ? (
              <></>
            ) : (
              <>
                <div className="no-competitions-container">
                  <div className="no-competitions-box">
                    {isLoggedIn ? (
                      <>
                        <h3 className="no-competitions-title">
                          No more competitions left to vote on
                        </h3>
                        <p className="no-competitions-message">
                          Check back later for new competitions!
                        </p>
                        <button
                          className="no-competitions-button"
                          onClick={() => navigate("/")}
                        >
                          Return Home
                        </button>
                      </>
                    ) : (
                      <>
                        <h3 className="no-competitions-title">
                          Log in to see more competitions
                        </h3>
                        <p className="no-competitions-message">
                          Create an account or log in to vote on more
                          competitions and earn tokens!
                        </p>
                        <button
                          className="no-competitions-button"
                          onClick={() => navigate("/login")}
                        >
                          Log In
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {error && <p className="error">{error}</p>}
        {!showIntroPopup && !showHowToVotePopup ? (
          <>
            {!loading && allCompetitions && allCompetitions.length > 0 && (
              <>
                <div
                  className={`vote-animation-container new-flex ${
                    reportMode || showReportPopup || showReportReceived
                      ? "report-mode-background"
                      : ""
                  }`}
                >
                  {!reportMode && !showReportPopup && !showReportReceived && (
                    <>
                      <div className="lottie-desktop">
                        <Lottie
                          animationData={desktopLottie}
                          play={playLottie}
                          loop={false}
                          onComplete={() => setPlayLottie(false)}
                          className="vote-animation"
                        />
                      </div>
                      <div className="lottie-mobile">
                        {/* <Lottie
                          animationData={mobileLottie}
                          play={playLottie}
                          loop={false}
                          onComplete={() => setPlayLottie(false)}
                          className="vote-animation"
                        /> */}
                      </div>
                    </>
                  )}
                </div>
              </>
            )}

            {current &&
              (!showIntroPopup ||
                reportMode ||
                showReportPopup ||
                showReportReceived) && (
                <div
                  className={`vote-content ${selected ? "vote-fade-out" : ""}`}
                >
                  {["user1_image", "user2_image"].map((key, index) => {
                    const image = current[key];
                    const isSelected = selected === image;
                    const isReporting =
                      (reportMode || showReportPopup || showReportReceived) &&
                      reportSelectedImage === image;

                    return (
                      <div
                        key={image}
                        className={`vote-box ${
                          index === 0 ? "slide-in-left" : "slide-in-right"
                        }`}
                      >
                        <div
                          className={`vote-wrapper ${
                            isSelected ? "selected" : ""
                          }`}
                          onClick={() =>
                            reportMode || showReportPopup || showReportReceived
                              ? setReportSelectedImage(image)
                              : handleVote(image)
                          }
                        >
                          <LazyImage
                            src={image}
                            alt={`Entry ${index + 1}`}
                            className={`vote-submission ${
                              isReporting ? "report-selected" : ""
                            }`}
                          />
                          <div className="vote-overlay">
                            {!selected && !reportMode && (
                              <div className="vote-label">Vote</div>
                            )}
                            {isSelected && (
                              <div className="vote-plus-one">+1</div>
                            )}
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
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Vote;
