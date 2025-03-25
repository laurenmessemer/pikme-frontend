import axios from "axios";
import { useEffect, useRef, useState } from "react";
import piggybankIcon from "../../assets/icons/piggybank.svg";
import Dropdown from "../../components/Dropdowns/Dropdown";
import { useAuth } from "../../context/UseAuth";
import "../../styles/cards/HeadStats.css";




const HeadStats = () => {
    const { user: authUser } = useAuth(); // ✅ Get real authenticated user
    const [contestData, setContestData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const fetchLiveContest = async () => {
          try {
            console.log("📢 Fetching live contest data...");
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/leaderboard/live-contests`);
            console.log("✅ Live Contest Data:", response.data);
      
            const allContests = response.data;
      
            // ✅ Temporarily filter for contest with id = 20
            const targetContest = allContests.find(contest => contest.id === 20);
      
            if (targetContest) {
              setContestData(targetContest);
            } else {
              throw new Error("Contest with ID 20 not found.");
            }
          } catch (error) {
            console.error("❌ Error fetching live contests:", error);
            setError("Failed to load live contest.");
          } finally {
            setLoading(false);
          }
        };
      
        fetchLiveContest();
      }, []);
      

    // useEffect(() => {
    //     const fetchLiveContest = async () => {
    //         try {
    //             console.log("📢 Fetching live contest data...");
    //             const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/leaderboard/live-contests`);
    //             console.log("✅ Live Contest Data:", response.data);

    //             if (response.data.success) {
    //                 setContestData(response.data.contest);
    //             } else {
    //                 throw new Error("Failed to fetch live contests.");
    //             }
    //         } catch (error) {
    //             console.error("❌ Error fetching live contests:", error);
    //             setError("Failed to load live contest.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchLiveContest();
    // }, []);

    // Auto-scroll effect
    useEffect(() => {
        if (!scrollContainerRef.current || !contestData) return;
        
        let scrollInterval;
        if (!isPaused) {
            scrollInterval = setInterval(() => {
                const container = scrollContainerRef.current;
                if (container) {
                    container.scrollBy({ top: 2, behavior: "smooth" });

                    // Reset scroll position when reaching the end
                    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
                        container.scrollTo({ top: 0, behavior: "smooth" });
                    }
                }
            }, 30); // Moves every 30ms for smooth effect
        }

        return () => clearInterval(scrollInterval);
    }, [isPaused, contestData]);

    if (loading) return <p>Loading live contest...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!contestData) return <p>No active contests right now.</p>;
    if (!authUser) return <p>Loading user data...</p>; // ✅ Prevents errors if user isn't loaded yet

    // ✅ Check if the logged-in user has submitted an entry
    const userSubmission = contestData.leaderboard.find(user => String(user.id) === String(authUser.id));


return (
    <div className="headstats-container">
        {/* Header */}
        <div className="headstats-header">
            <div className="theme-title">
                <img src={piggybankIcon} alt="Piggybank" className="piggybank-icon" />
                <h2 className="contest-name">{contestData.contestName}</h2>
            </div>
            <div>
                <p className="contest-details">{contestData.entries} Entries</p>
                <p className="prize-pool">Prize Pool: {contestData.prizePool}</p>

                <Dropdown title="Payout Details">
                    <div className="payout-table-container">
                        <table className="payout-table">
                            <thead>
                                <tr>
                                    <th>Placement</th>
                                    <th>Payout</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>🥇 1st</td><td>{contestData.leaderboard[0]?.earnings || "$0"}</td></tr>
                                <tr><td>🥈 2nd</td><td>{contestData.leaderboard[1]?.earnings || "$0"}</td></tr>
                                <tr><td>🥉 3rd</td><td>{contestData.leaderboard[2]?.earnings || "$0"}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </Dropdown>
            </div>
        </div>

        {/* Two-column layout */}
        <div className="headstats-content">
            {/* 🟢 Leaderboard + My Submission Column */}
            <div className="leaderboard-column">
                {/* ✅ "My Submission" Section - Always Visible */}
                <div className="headstats-my-submission">
                    {userSubmission ? (
                        <>
                            <img 
                                src={userSubmission.imageUrl} 
                                alt="My Submission" 
                                className="headstats-my-submission-image" 
                            />
                            <div className="headstats-my-submission-info">
                                <p className="headstats-my-submission-username">Me</p>
                                <p className="headstats-my-submission-votes">{userSubmission.votes} Votes</p>
                            </div>
                            <div className="headstats-my-submission-earnings">
                                {userSubmission.earnings}
                            </div>
                        </>
                    ) : (
                        <div className="headstats-my-submission-placeholder">
                            <p className="headstats-my-submission-invite">You haven’t entered yet!</p>
                        </div>
                    )}
                </div>

                <div className="user-submission-divider"></div>

                {/* ✅ Leaderboard Entries */}
                {contestData.leaderboard.map((user) => (
                    <div key={user.id} className="leaderboard-card">
                        <img src={user.imageUrl} alt={user.username} className="submission-image" />
                        <div className="user-info">
                            <p className="username">{user.username}</p>
                            <p className="user-votes">{user.votes} Votes</p>
                        </div>
                        <div className="earnings-container other-earnings">
                            {user.earnings}
                        </div>
                    </div>
                ))}
            </div>

            {/* 🟢 Image Column with Auto-Scroll */}
            <div 
                className="image-column" 
                ref={scrollContainerRef}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {userSubmission && (
                    <div className="image-card">
                        <img src={userSubmission.imageUrl} alt="Your Submission" className="contest-image" />
                        <div className="image-votes">+{userSubmission.votes}</div>
                    </div>
                )}

                {contestData.leaderboard.map((user, index) => (
                    <div key={index} className="image-card">
                        <img src={user.imageUrl} alt={`Entry by ${user.username}`} className="contest-image" />
                        <div className="image-votes">+{user.votes}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
};

export default HeadStats;
