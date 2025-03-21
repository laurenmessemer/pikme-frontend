import axios from "axios";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import voteAnimation from "../assets/lottie/video1_lottie.json";
import EndVoting from "../components/Popups/EndVoting"; // ✅ Show when no more competitions exist
import RainingCards from "../components/Popups/RainingCards";
import "../styles/pages/Vote.css";

const Vote = () => {
    const [competitions, setCompetitions] = useState([]); // Store active competitions
    const [currentCompetitionIndex, setCurrentCompetitionIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [error, setError] = useState(null);
    const [playAnimation, setPlayAnimation] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [showEndVotingPopup, setShowEndVotingPopup] = useState(false);

    useEffect(() => {
        fetchVotingEntries();
    }, []);

    const fetchVotingEntries = async () => {
        try {
            console.log("📡 Fetching competitions...");
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/vote/get-entries`);
            
            console.log("📡 API Request Sent:", `${import.meta.env.VITE_API_URL}/api/vote/get-entries`);
            console.log("✅ Full API Response:", response);
            
            if (response.data) {
                console.log("✅ Response Data:", response.data);
    
                if (Array.isArray(response.data.competitions)) {
                    console.log("✅ Competitions for voting:", response.data.competitions);
                    
                    if (response.data.competitions.length > 0) {
                        setCompetitions(response.data.competitions);
                        setCurrentCompetitionIndex(0); // Start with first competition
                    } else {
                        setShowEndVotingPopup(true); // No competitions left
                    }
                } else {
                    console.error("❌ competitions is not an array:", response.data.competitions);
                    setError("Unexpected response format.");
                }
            } else {
                console.error("❌ Response data is undefined or null.");
                setError("No data received from the server.");
            }
        } catch (error) {
            console.error("❌ Error fetching competitions:", error);
            console.error("🔍 Error Details:", {
                message: error.message,
                response: error.response ? {
                    status: error.response.status,
                    statusText: error.response.statusText,
                    data: error.response.data
                } : "No response received"
            });
            setError("Failed to load competitions.");
        }
    };
    

    // ✅ Handle voting
    const handleVote = async (selectedImage) => {
        if (!competitions[currentCompetitionIndex]) return;
    
        const competitionId = competitions[currentCompetitionIndex].id;
        console.log("📤 Sending vote for:", { competitionId, selectedImage });
    
        try {
            // ✅ Send vote request to backend
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/vote/vote`, { 
                competitionId, 
                selectedImage 
            });
    
            console.log("✅ Vote response:", response.data);
    
            setSelected(selectedImage);
            setPlayAnimation(true);
    
            setTimeout(() => {
                setAnimationComplete(true);
            }, 2000);
        } catch (error) {
            console.error("❌ Error casting vote:", error);
            setError("Vote submission failed.");
        }
    };
    

    useEffect(() => {
        if (animationComplete) {
            setSelected(null);
            setPlayAnimation(false);
            setAnimationComplete(false);

            if (currentCompetitionIndex < competitions.length - 1) {
                setCurrentCompetitionIndex(currentCompetitionIndex + 1); // Move to next competition
            } else {
                setShowEndVotingPopup(true); // No more competitions
            }
        }
    }, [animationComplete]);

    if (showEndVotingPopup) return <EndVoting />; // ✅ Show when no more competitions exist

    const currentCompetition = competitions[currentCompetitionIndex];

    return (
        <>
            <RainingCards trigger={true} />

            <div className="vote-container">
                {error && <p className="error">{error}</p>}

                <Lottie
                    key={playAnimation ? "play" : "stop"}
                    animationData={voteAnimation}
                    play={playAnimation}
                    onComplete={() => setAnimationComplete(true)}
                    className="vote-animation"
                />

                {currentCompetition ? (
                    <div className="vote-content">
                        {/* ✅ Left Image */}
                        <div className="vote-box slide-in-left">
                            <img
                                src={currentCompetition.user1_image}
                                alt="Entry 1"
                                className={`vote-submission ${
                                    selected === currentCompetition.user1_image ? "selected" : selected !== null ? "not-selected" : ""
                                }`}
                                onClick={() => handleVote(currentCompetition.user1_image)}
                            />
                            {!selected && <div className="vote-label">Vote</div>}
                            {selected === currentCompetition.user1_image && <div className="vote-checkmark">✔</div>}
                        </div>

                        {/* ✅ Right Image */}
                        <div className="vote-box slide-in-right">
                            <img
                                src={currentCompetition.user2_image}
                                alt="Entry 2"
                                className={`vote-submission ${
                                    selected === currentCompetition.user2_image ? "selected" : selected !== null ? "not-selected" : ""
                                }`}
                                onClick={() => handleVote(currentCompetition.user2_image)}
                            />
                            {!selected && <div className="vote-label">Vote</div>}
                            {selected === currentCompetition.user2_image && <div className="vote-checkmark">✔</div>}
                        </div>
                    </div>
                ) : (
                    <p className="loading-message">Loading...</p>
                )}
            </div>
        </>
    );
};

export default Vote;
