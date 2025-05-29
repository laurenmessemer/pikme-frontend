import { useState, useEffect } from "react";
import Toggle from "../components/Buttons/Toggle";
import JackpotLive from "../components/Cards/LiveJackpot";
import MySubmissions from "../components/Cards/MySubmission";
import WinnerSubmissions from "../components/Cards/Winners";
import { useAuth } from "../context/UseAuth";
import "../styles/pages/Leaderboard.css";
import { useLocation, useNavigate } from "react-router-dom";
import WinnerSectionSubmissions from "../components/Cards/WinnersSection";

const Leaderboard = () => {
  const { user } = useAuth();
  const userId = user?.id || null;
  const location = useLocation();
  const navigate = useNavigate();

  // Function to map route segments to tab names
  const getTabFromRoute = (pathname) => {
    const pathSegments = pathname.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];

    switch (lastSegment) {
      case "MySubmissions":
        return "mysubmissions";
      case "Live":
        return "live";
      case "Winners":
        return "winners";
      case "leaderboard":
        return "live"; // Default to live when on base leaderboard route
      default:
        return "live"; // Default fallback
    }
  };

  // Initialize selectedTab based on current route
  const [selectedTab, setSelectedTab] = useState(() =>
    getTabFromRoute(location.pathname)
  );
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Update tab when route changes
  useEffect(() => {
    const newTab = getTabFromRoute(location.pathname);
    setSelectedTab(newTab);
  }, [location.pathname]);

  const headers = {
    live: "View previous, current, and upcoming submissions.",
    winners: "All the past first-place winners in Jackpot Mode.",
    mysubmissions: "View previous, current, and upcoming submissions.",
  };

  // Function to handle tab changes and navigation
  const handleTabChange = (tab) => {
    setSelectedTab(tab);

    // Navigate to the appropriate route
    switch (tab) {
      case "live":
        navigate("/leaderboard/Live");
        break;
      case "winners":
        navigate("/leaderboard/Winners");
        break;
      case "mysubmissions":
        setSelectedSubmission(null);
        navigate("/leaderboard/MySubmissions");
        break;
      default:
        navigate("/leaderboard");
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
            onToggle={() => handleTabChange(tab)}
          />
        ))}
      </div>

      {/* Dynamic Header Based on Selected Tab */}
      {!(selectedTab === "live" || selectedSubmission) && (
        <p className="headers_leaderboard">{headers[selectedTab]}</p>
      )}

      {/* Render Content Based on Selected Tab */}
      <div className="leaderboard-content">
        {selectedTab === "live" && <JackpotLive />}
        {/* {selectedTab === "winners" && <WinnerSubmissions />} */}
        {selectedTab === "winners" && <WinnerSectionSubmissions />}
        {selectedTab === "mysubmissions" ? (
          userId ? (
            <MySubmissions
              userId={userId}
              selectedSubmission={selectedSubmission}
              setSelectedSubmission={setSelectedSubmission}
            />
          ) : (
            <div className="no-submissions-container">
              <div className="no-submissions-box">
                <p className="login-message">Join a Game!</p>
              </div>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Leaderboard;
