import axios from "axios";
import { useEffect, useState } from "react";
import Toggle from "../components/Buttons/Toggle";
import JackpotLive from "../components/Cards/LiveJackpot";
import MySubmissions from "../components/Cards/MySubmission";
import WinnersList from "../components/Cards/Winners";
import { useAuth } from "../context/UseAuth"; // ✅ Use useAuth hook
import "../styles/pages/Leaderboard.css";

const Leaderboard = () => {
    const { user } = useAuth();
    const userId = user?.id || null;

    const [selectedTab, setSelectedTab] = useState("live");
    const [winnersData, setWinnersData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // ✅ State to track errors

    const headers = {
        live: "View previous, current, and upcoming submissions.",
        winners: "All the past first-place winners in Jackpot Mode.",
        mysubmissions: "View previous, current, and upcoming submissions."
    };

    useEffect(() => {
        if (selectedTab === "winners") {
            fetchWinners();
        }
    }, [selectedTab]);

    // ✅ Fetch real past winners
    const fetchWinners = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log("📢 Fetching real past winners from API...");
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/leaderboard/winners`);
    
            if (response.data.success) {
                setWinnersData(response.data.winners);
                console.log("🏆 Winners fetched successfully:", response.data.winners);
            } else {
                throw new Error("Failed to fetch winners.");
            }
        } catch (error) {
            console.error("❌ Error fetching past winners:", error);
            setError("Failed to load winners.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="leaderboard-container">
            {/* Toggle Buttons */}
            <div className="leaderboard-toggle-buttons">
                {["live", "winners", "mysubmissions"].map((tab) => (
                    <Toggle 
                        key={tab}
                        onText={tab.charAt(0).toUpperCase() + tab.slice(1)}
                        offText={tab.charAt(0).toUpperCase() + tab.slice(1)}
                        isActive={selectedTab === tab}
                        onToggle={() => setSelectedTab(tab)}
                    />
                ))}
            </div>

            {/* Dynamic Header Based on Selected Tab */}
            <p className="headers_leaderboard">{headers[selectedTab]}</p>

            {/* ✅ Display error message if it exists */}
            {error && <p className="error-message">❌ {error}</p>}

            {/* Render Content Based on Selected Tab */}
            <div className="leaderboard-content">
                {selectedTab === "live" && <JackpotLive />}
                {selectedTab === "winners" && (
                    loading ? <p>Loading...</p> : <WinnersList pastWinners={winnersData} />
                )}
                {selectedTab === "mysubmissions" && userId ? (
                    <MySubmissions userId={userId} />
                ) : (
                    <div className="no-submissions-container">
                        <div className="no-submissions-box">
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
