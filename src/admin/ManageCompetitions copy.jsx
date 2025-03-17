import { useEffect, useState } from "react";
import "../styles/admin/ManageCompetitions.css";

const API_URL = "${import.meta.env.VITE_API_URL}/api/competitions";
const WINNERS_API_URL = "${import.meta.env.VITE_API_URL}/api/competitions/determine-winners"; // ✅ New API for determining winners

const ManageCompetitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [determiningWinners, setDeterminingWinners] = useState(false);

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);

      const data = await response.json();
      setCompetitions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Function to Manually Trigger Winner Determination
  const handleDetermineWinners = async () => {
    setDeterminingWinners(true);
    try {
      const response = await fetch(WINNERS_API_URL, { method: "POST" });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      const data = await response.json();
      console.log("🏆 Winners determined:", data);
      alert("Winners successfully determined!");

      // ✅ Refresh competitions after winners are determined
      fetchCompetitions();
    } catch (error) {
      console.error("❌ Error determining winners:", error);
      alert("Error determining winners. Check console for details.");
    } finally {
      setDeterminingWinners(false);
    }
  };

  return (
    <div className="manage-competitions-container">
      <div className="header">
        <h2>Manage Competitions</h2>
        <button
          className="determine-winners-btn"
          onClick={handleDetermineWinners}
          disabled={determiningWinners}
        >
          {determiningWinners ? "Determining..." : "Determine Winners"}
        </button>
      </div>

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
};

export default ManageCompetitions;
