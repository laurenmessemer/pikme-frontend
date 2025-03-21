import axios from "axios";
import { useEffect, useState } from "react";
import piggybankIcon from "../../assets/icons/piggybank.svg";
import Dropdown from "../../components/Dropdowns/Dropdown";
import "../../styles/cards/HeadStats.css";

const HeadStats = () => {
    const [contestData, setContestData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [autoScroll, setAutoScroll] = useState(true);
    
    useEffect(() => {
        const fetchLiveContest = async () => {
            try {
                console.log("📢 Fetching live contest data...");
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/leaderboard/live-contests`);
                console.log("✅ Live Contest Data:", response);

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

    // Auto-scroll function
    useEffect(() => {
        if (!contestData || !contestData.entries) return;

        let interval;
        if (autoScroll) {
            interval = setInterval(() => {
                const container = document.querySelector(".image-carousel");
                if (container) {
                    container.scrollBy({ left: 200, behavior: "smooth" });

                    // Reset scroll when reaching the end
                    if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
                        container.scrollTo({ left: 0, behavior: "smooth" });
                    }
                }
            }, 2000); // Scroll every 2 seconds
        }
        return () => clearInterval(interval);
    }, [contestData, autoScroll]);

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

            {/* Leaderboard & Image Carousel */}
            <div className="headstats-content">
                {/* Leaderboard Column */}
                <div className="leaderboard-column">
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

                {/* Image Carousel */}
                <div 
                    className="image-carousel"
                    onMouseEnter={() => setAutoScroll(false)} 
                    onMouseLeave={() => setAutoScroll(true)}
                >
                    {contestData.entries.map((entry, index) => (
                        <img key={index} src={entry.imageUrl} alt="Contest Entry" className="carousel-image" />
                    ))}
                </div>
            </div>
        </div> 
    );
};

export default HeadStats;
