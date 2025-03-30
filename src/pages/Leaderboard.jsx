import { useState } from "react";
import Toggle from "../components/Buttons/Toggle";
import JackpotLive from "../components/Cards/LiveJackpot";
import MySubmissions from "../components/Cards/MySubmission";
import WinnerSubmissions from "../components/Cards/Winners";
import { useAuth } from "../context/UseAuth";
import "../styles/pages/Leaderboard.css";

const Leaderboard = () => {
    const { user } = useAuth();
    const userId = user?.id || null;

    const [selectedTab, setSelectedTab] = useState("live");

    const headers = {
        live: "View previous, current, and upcoming submissions.",
        winners: "All the past first-place winners in Jackpot Mode.",
        mysubmissions: "View previous, current, and upcoming submissions."
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

            {/* Render Content Based on Selected Tab */}
            <div className="leaderboard-content">
                {selectedTab === "live" && <JackpotLive />}
                {selectedTab === "winners" && <WinnerSubmissions />}
                {selectedTab === "mysubmissions" ? (
                    userId ? (
                        <MySubmissions userId={userId} />
                    ) : (
                        <div className="no-submissions-container">
                        <div className="no-submissions-box">
                            <p className="login-message">Login to see your submissions.</p>
                        </div>
                        </div>
                    )
                ) : null}
            </div>
        </div>
    );
};

export default Leaderboard;
