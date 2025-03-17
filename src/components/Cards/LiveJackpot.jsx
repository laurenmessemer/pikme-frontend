import { useState } from "react";
import Activity from "../../components/Cards/Activity";
import HeadStats from "../../components/Cards/HeadStats";
import "../../styles/components/LiveJackpot.css";

const LiveJackpot = () => {
    const [isHeadStatsActive, setIsHeadStatsActive] = useState(true);

    return (
        <div className="livejackpot-container">
            {/* Toggle Buttons */}
            <div className="toggle-group">
                <button 
                    className={`toggle-button ${isHeadStatsActive ? "active" : ""}`}
                    onClick={() => setIsHeadStatsActive(true)}
                >
                    Head-to-Head
                </button>
                <button 
                    className={`toggle-button ${!isHeadStatsActive ? "active" : ""}`}
                    onClick={() => setIsHeadStatsActive(false)}
                >
                    Activity
                </button>
            </div>

            {/* Render the Selected Component */}
            <div className="livejackpot-content">
                {isHeadStatsActive ? <HeadStats /> : <Activity />}
            </div>
        </div>
    );
};

export default LiveJackpot;
