import { useEffect, useState } from "react";
import "../styles/admin/ManageCompetitions.css";

const API_URL = "http://localhost:5004/api/competitions";
const WINNERS_API_URL = "http://localhost:5004/api/competitions/determine-winners"; // ✅ New API for determining winners

const ManageCompetitions = () => {
  console.log("📌 ManageCompetitions component is rendering!");

  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [determiningWinners, setDeterminingWinners] = useState(false);

  // ✅ Function to Fetch Competitions (Move outside useEffect)
  const fetchCompetitions = async () => {
    console.log("📢 Fetching competitions from API:", API_URL);
    setLoading(true);
    
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("✅ Competitions fetched successfully:", data);

      setCompetitions(data);
      setError(null);
    } catch (err) {
      console.error("❌ Fetch Error:", err);
      setError(err.message);
    } finally {
      console.log("⏳ Fetching completed, setting loading to false.");
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("🔍 useEffect triggered, calling fetchCompetitions...");
    fetchCompetitions();
  }, []);

  // ✅ Function to Manually Trigger Winner Determination
  const handleDetermineWinners = async () => {
    setDeterminingWinners(true);
    console.log("🏆 Determine Winners button clicked!");

    try {
      const response = await fetch(WINNERS_API_URL, { method: "POST" });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("🏆 Winners determined successfully:", data);
      alert("Winners successfully determined!");

      // ✅ Refresh competitions after winners are determined
      await fetchCompetitions(); // ✅ FIXED: Call the function after updating winners
    } catch (error) {
      console.error("❌ Error determining winners:", error);
      alert("Error determining winners. Check console for details.");
    } finally {
      setDeterminingWinners(false);
    }
  };

  try {
    return (
      <div className="manage-competitions-container">
        <h2>Manage Competitions</h2>
        <p>✅ This is a test to confirm the component is rendering.</p>

        <button
          className="determine-winners-btn"
          onClick={handleDetermineWinners}
          disabled={determiningWinners}
        >
          {determiningWinners ? "Determining..." : "Determine Winners"}
        </button>

        {loading ? (
          <p>Loading competitions...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : competitions.length === 0 ? (
          <p>No competitions available.</p>
        ) : (
          <table className="competitions-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Contest</th>
                <th>User 1</th>
                <th>User 2</th>
                <th>Votes (User 1)</th>
                <th>Votes (User 2)</th>
                <th>Winner</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {competitions.map((comp) => (
                <tr key={comp.id}>
                  <td>{comp.id}</td>
                  <td>{comp.Contest?.name || "N/A"}</td>
                  <td>{comp.User1?.username || "N/A"}</td>
                  <td>{comp.User2?.username || "N/A"}</td>
                  <td>{comp.votes_user1}</td>
                  <td>{comp.votes_user2}</td>
                  <td>{comp.winner_username || "TBD"}</td>
                  <td className={`status ${comp.status?.toLowerCase()}`}>{comp.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  } catch (error) {
    console.error("❌ Error rendering ManageCompetitions:", error);
    return <p>❌ Error rendering component. Check console for details.</p>;
  }
};

export default ManageCompetitions;
