import axios from "axios";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";
import voteAnimation from "../assets/lottie/video1_lottie.json";
import EndVoting from "../components/Popups/EndVoting";
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
  const [loading, setLoading] = useState(true);
  const [currentContestId, setCurrentContestId] = useState(null);
  const [votedCompetitionIds, setVotedCompetitionIds] = useState([]);
  const [playLottie, setPlayLottie] = useState(true); // Controlled Lottie animation

  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      const queue = await fetchIntroPopups();
      if (queue.length > 0) {
        const firstContestId = queue[0].contestId;
        setCurrentContestId(firstContestId);
        await fetchVotingEntries(firstContestId);
      }
    };
    initialize();
  }, []);

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
    setPlayLottie(true); // Start Lottie when new entries come in
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

      setVotedCompetitionIds((prev) => [...prev, current.id]);
      setSelected(selectedImage);

      setTimeout(() => setAnimationComplete(true), 90000);
    } catch (err) {
      console.error("❌ Error submitting vote:", err);
      setError("Vote failed. Try again.");
    }
  };

  useEffect(() => {
    if (animationComplete) {
      setSelected(null);
      setAnimationComplete(false);
      setPlayLottie(true); // Restart Lottie for next round

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

      {showIntroPopup && currentPopup && (
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

              
                    {/* Everything below is now grouped inside vote-wrapper */}
                    <div className="vote-overlay">
                      {!selected && <div className="vote-label">Vote</div>}
                      {isSelected && <div className="vote-plus-one">+1</div>}
                      {selected && <div className="vote-counter">{isSelected ? "41 votes" : "40 votes"}</div>}
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


// import axios from "axios";
// import { useEffect, useState } from "react";
// import Lottie from "react-lottie-player";
// import { useNavigate } from "react-router-dom";
// import voteAnimation from "../assets/lottie/video1_lottie.json";
// import EndVoting from "../components/Popups/EndVoting";
// import RainingCards from "../components/Popups/RainingCards";
// import VoteIntroPopup from "../components/Popups/VoteIntroPopup";
// import "../styles/pages/Vote.css";

// const Vote = () => {
//   const [popupQueue, setPopupQueue] = useState([]);
//   const [competitions, setCompetitions] = useState([]);
//   const [currentCompetitionIndex, setCurrentCompetitionIndex] = useState(0);
//   const [selected, setSelected] = useState(null);
//   const [error, setError] = useState(null);
//   const [playAnimation, setPlayAnimation] = useState(false);
//   const [animationComplete, setAnimationComplete] = useState(false);
//   const [showIntroPopup, setShowIntroPopup] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const [currentContestId, setCurrentContestId] = useState(null);
//   const [votedCompetitionIds, setVotedCompetitionIds] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const initialize = async () => {
//       const queue = await fetchIntroPopups();
//       if (queue.length > 0) {
//         const firstContestId = queue[0].contestId;
//         setCurrentContestId(firstContestId);
//         await fetchVotingEntries(firstContestId);
//       }
//     };
//     initialize();
//   }, []);

//   const fetchIntroPopups = async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/contests/live`);
//       const contests = response.data;
//       if (!Array.isArray(contests)) return [];

//       const voteResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/vote/get-entries`);
//       const allCompetitions = voteResponse.data.competitions || [];

//       const validContests = contests.filter((contest) =>
//         allCompetitions.some((comp) => Number(comp.contestId) === Number(contest.id))
//       );

//       const queue = validContests.map((contest) => ({
//         contestId: contest.id,
//         themePhoto: contest.Theme?.cover_image_url || "",
//         themeName: contest.Theme?.name || "Theme",
//         themeDescription: contest.Theme?.description || "No description available",
//         entryFee: Number(contest.entry_fee),
//         prizePool: Number(contest.prize_pool) || 0,
//       }));

//       setPopupQueue(queue);
//       return queue;
//     } catch (err) {
//       console.error("❌ Error fetching intro popups or competitions:", err);
//       return [];
//     }
//   };

//   const fetchVotingEntries = async (contestId) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/vote/get-entries`);
//       const comps = response.data.competitions || [];

//       console.log("📥 Raw competitions:", comps);
//       const filtered = comps.filter(
//         (comp) =>
//           Number(comp.contestId) === Number(contestId) &&
//           !votedCompetitionIds.includes(comp.id)
//       );

//       console.log("✅ Filtered competitions for contestId", contestId, ":", filtered);

//       if (filtered.length === 0) {
//         console.warn(`⚠️ No competitions found for contestId ${contestId}, skipping...`);
//         handleNextContest(); // ✅ updated line
//         return;
//       }

//       setCompetitions(filtered);
//       setCurrentCompetitionIndex(0);
//     } catch (err) {
//       console.error("❌ Error fetching voting competitions:", err);
//       setError("Failed to load voting entries.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNextContest = () => {
//     const nextQueue = popupQueue.slice(1);
//     const nextContest = nextQueue[0];

//     setPopupQueue(nextQueue);
//     setVotedCompetitionIds([]);
//     setShowIntroPopup(!!nextContest);

//     if (nextContest) {
//       setCurrentContestId(nextContest.contestId);
//       fetchVotingEntries(nextContest.contestId);
//     } else {
//       setCompetitions([]); // 🧹 just in case
//     }
//   };

//   const closeIntroPopup = () => {
//     setShowIntroPopup(false);
//     fetchVotingEntries(currentContestId);
//   };

//   const handleVote = async (selectedImage) => {
//     const current = competitions[currentCompetitionIndex];
//     if (!current) return;

//     try {
//       await axios.post(`${import.meta.env.VITE_API_URL}/api/vote/vote`, {
//         competitionId: current.id,
//         selectedImage,
//       });

//       setVotedCompetitionIds((prev) => [...prev, current.id]);
//       setSelected(selectedImage);
//       setPlayAnimation(true);
//       setTimeout(() => setAnimationComplete(true), 2000);
//     } catch (err) {
//       console.error("❌ Error submitting vote:", err);
//       setError("Vote failed. Try again.");
//     }
//   };

//   useEffect(() => {
//     if (animationComplete) {
//       setSelected(null);
//       setPlayAnimation(false);
//       setAnimationComplete(false);

//       const nextIndex = currentCompetitionIndex + 1;
//       if (nextIndex < competitions.length) {
//         setCurrentCompetitionIndex(nextIndex);
//       } else {
//         handleNextContest(); // ✅ updated logic
//       }
//     }
//   }, [animationComplete]);

//   const showEndScreen =
//     competitions.length === 0 && popupQueue.length === 0 && !showIntroPopup && !playAnimation;

//   const current = competitions[currentCompetitionIndex];
//   const currentPopup = popupQueue[0];

//   console.log("📊 showIntroPopup:", showIntroPopup);
//   console.log("📊 currentContestId:", currentContestId);
//   console.log("📊 competitions:", competitions);
//   console.log("📊 votedCompetitionIds:", votedCompetitionIds);

//   return (
//     <>
//       <RainingCards trigger={true} />

//       {showIntroPopup && currentPopup && (
//         <VoteIntroPopup
//           contestId={currentPopup.contestId}
//           themePhoto={currentPopup.themePhoto}
//           themeName={currentPopup.themeName}
//           themeDescription={currentPopup.themeDescription}
//           entryFee={currentPopup.entryFee}
//           prizePool={currentPopup.prizePool}
//           onStartVoting={closeIntroPopup}
//           onClose={closeIntroPopup}
//         />
//       )}

//       {showEndScreen && <EndVoting onClose={() => navigate("/")} />}

//       <div className="vote-container">
//         {error && <p className="error">{error}</p>}
//         {loading && <p className="loading-message">Loading contests...</p>}

//         <Lottie
//           key={playAnimation ? "play" : "stop"}
//           animationData={voteAnimation}
//           play={playAnimation}
//           onComplete={() => setAnimationComplete(true)}
//           className="vote-animation"
//         />

//         {current && !showIntroPopup && !playAnimation && (
//           <div className="vote-content">
//             <div className="vote-box slide-in-left">
//               <img
//                 src={current.user1_image}
//                 alt="Entry 1"
//                 className={`vote-submission ${
//                   selected === current.user1_image ? "selected" : selected ? "not-selected" : ""
//                 }`}
//                 onClick={() => handleVote(current.user1_image)}
//               />
//               {!selected && <div className="vote-label">Vote</div>}
//               {selected === current.user1_image && <div className="vote-checkmark">✔</div>}
//             </div>

//             <div className="vote-box slide-in-right">
//               <img
//                 src={current.user2_image}
//                 alt="Entry 2"
//                 className={`vote-submission ${
//                   selected === current.user2_image ? "selected" : selected ? "not-selected" : ""
//                 }`}
//                 onClick={() => handleVote(current.user2_image)}
//               />
//               {!selected && <div className="vote-label">Vote</div>}
//               {selected === current.user2_image && <div className="vote-checkmark">✔</div>}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Vote;
