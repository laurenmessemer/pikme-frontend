import axios from "axios";
import { useEffect, useState } from "react";
import piggybankIcon from "../../assets/icons/piggybank.svg";
import Dropdown from "../../components/Dropdowns/Dropdown";
import "../../styles/cards/HeadStats.css";

const HeadStats = () => {
    const [contestData, setContestData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLiveContest = async () => {
            try {
                console.log("📢 Fetching live contest data...");
                const response = await axios.get("${import.meta.env.VITE_API_URL}/api/leaderboard/live-contests");

                if (response.data.success) {
                    setContestData(response.data.contest);
                } else {
                    throw new Error("Failed to fetch live contests.");
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

    if (loading) return <p>Loading live contest...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!contestData) return <p>No active contests right now.</p>;

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

            {/* Leaderboard Section */}
            <div className="headstats-content">
                <div className="leaderboard-column">
                    {/* If user has submitted, show their entry */}
                    {contestData.userSubmission && (
                        <>
                            <div className="leaderboard-card user-submission">
                                <img src={contestData.userSubmission.imageUrl} alt="Your Submission" className="submission-image" />
                                <div className="user-info">
                                    <p className="username">{contestData.userSubmission.username}</p>
                                    <p className="user-votes">{contestData.userSubmission.votes} Votes</p>
                                </div>
                                <div className="earnings-container user-earnings">
                                    {contestData.userSubmission.earnings}
                                </div>
                            </div>
                            <div className="user-submission-divider"></div>
                        </>
                    )}

                    {/* Top Leaderboard Users */}
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
            </div>
        </div> 
    );
};

export default HeadStats;
