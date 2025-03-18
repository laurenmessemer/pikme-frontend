import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../../styles/components/MySubmission.css"; // ✅ Reusing styles
import WinnerCard from "./WinnerCard"; // ✅ Using new WinnerCard

const WinnerSubmissions = () => {
    const [winners, setWinners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWinners = async () => {
            try {
                console.log("📢 Fetching past winners...");
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/leaderboard/winners`);
                if (response.data.success) {
                    setWinners(response.data.winners);
                    console.log("🏆 Winners fetched successfully:", response.data.winners);
                } else {
                    throw new Error("Failed to fetch winners.");
                }
            } catch (error) {
                console.error("❌ Error fetching winners:", error);
                setError("Failed to load winners.");
            } finally {
                setLoading(false);
            }
        };

        fetchWinners();
    }, []);

    return (
        <div className="my-submissions-container"> {/* ✅ Reusing styles for layout */}
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : winners.length === 0 ? (
                <div className="no-submissions">
                    <div className="dashed-box">
                        <p>No winners yet!</p>
                    </div>
                </div>
            ) : (
                <div className="my-submissions-grid">
                    {winners.map((winner) => (
                        <WinnerCard key={winner.startDate + winner.username} {...winner} />
                    ))}
                </div>
            )}
        </div>
    );
};

WinnerSubmissions.propTypes = {
    winners: PropTypes.array,
};

export default WinnerSubmissions;
