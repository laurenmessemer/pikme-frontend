import { useEffect, useState } from "react";
import "../styles/admin/ManageContests.css";

const CONTESTS_API_URL = "http://localhost:5004/api/contests";
const COMPETITIONS_API_URL = "http://localhost:5004/api/competitions";
const WINNERS_API_URL = "http://localhost:5004/api/competitions/determine-winners"; // ✅ New API for determining winners

const ManageContests = () => {
  console.log("📌 ManageContests component is rendering!");

  // ✅ Contests State
  const [contests, setContests] = useState([]);
  const [contestsLoading, setContestsLoading] = useState(true);
  const [contestsError, setContestsError] = useState(null);

  // ✅ Competitions State
  const [competitions, setCompetitions] = useState([]);
  const [competitionsLoading, setCompetitionsLoading] = useState(true);
  const [competitionsError, setCompetitionsError] = useState(null);
  const [determiningWinners, setDeterminingWinners] = useState(false);

  // ✅ Fetch Contests
  useEffect(() => {
    const fetchContests = async (retryCount = 2) => {
      console.log("📢 Fetching contests from API:", CONTESTS_API_URL);
      setContestsLoading(true);

      try {
        const response = await fetch(CONTESTS_API_URL);
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`HTTP ${response.status}: ${text}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Invalid response format: Expected an array");

        console.log("✅ Contests fetched successfully:", data);
        setContests(data);
        setContestsError(null);
      } catch (err) {
        console.error("❌ Error fetching contests:", err);
        if (retryCount > 0) {
          console.warn(`Retrying... (${retryCount} attempts left)`);
          setTimeout(() => fetchContests(retryCount - 1), 2000);
          return;
        }
        setContestsError(err.message);
      } finally {
        setContestsLoading(false);
      }
    };

    fetchContests();
  }, []);

  // ✅ Fetch Competitions
  const fetchCompetitions = async () => {
    console.log("📢 Fetching competitions from API:", COMPETITIONS_API_URL);
    setCompetitionsLoading(true);

    try {
      const response = await fetch(COMPETITIONS_API_URL);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("✅ Competitions fetched successfully:", data);

      setCompetitions(data);
      setCompetitionsError(null);
    } catch (err) {
      console.error("❌ Error fetching competitions:", err);
      setCompetitionsError(err.message);
    } finally {
      console.log("⏳ Fetching completed, setting loading to false.");
      setCompetitionsLoading(false);
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
      await fetchCompetitions();
    } catch (error) {
      console.error("❌ Error determining winners:", error);
      alert("Error determining winners. Check console for details.");
    } finally {
      setDeterminingWinners(false);
    }
  };

  return (
    <div className="manage-contests-container">
      {/* ✅ Contests Section */}
      <div className="header">
        <h2>Manage Contests</h2>
      </div>

      {contestsLoading ? (
        <p>Loading contests...</p>
      ) : contestsError ? (
        <p className="error">{contestsError}</p>
      ) : contests.length === 0 ? (
        <p>No contests available.</p>
      ) : (
        <table className="contests-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Theme</th>
              <th>Entry Fee</th>
              <th>Total Entries</th>
              <th>Prize Pool</th>
              <th>1st Place</th>
              <th>2nd Place</th>
              <th>3rd Place</th>
              <th>Contest Live Date</th>
              <th>Submission Deadline</th>
              <th>Voting Live Date</th>
              <th>Voting Deadline</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest) => (
              <tr key={contest.id}>
                <td>{contest.id}</td>
                <td>
                  <span className={`status ${contest.status?.toLowerCase() || "unknown"}`}>
                    {contest.status || "Unknown"}
                  </span>
                </td>
                <td>{contest.Theme?.name || "N/A"}</td>
                <td>${contest.entry_fee ?? 0}</td>
                <td>{contest.total_entries ?? 0}</td>
                <td>${contest.prize_pool ?? 0}</td>
                <td>${contest.winnings?.first ?? "N/A"}</td>
                <td>${contest.winnings?.second ?? "N/A"}</td>
                <td>${contest.winnings?.third ?? "N/A"}</td>
                <td>{contest.contest_live_date ? new Date(contest.contest_live_date).toLocaleDateString() : "TBD"}</td>
                <td>{contest.submission_deadline ? new Date(contest.submission_deadline).toLocaleDateString() : "TBD"}</td>
                <td>{contest.voting_live_date ? new Date(contest.voting_live_date).toLocaleDateString() : "TBD"}</td>
                <td>{contest.voting_deadline ? new Date(contest.voting_deadline).toLocaleDateString() : "TBD"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ✅ Competitions Section */}
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

      {competitionsLoading ? (
        <p>Loading competitions...</p>
      ) : competitionsError ? (
        <p className="error">{competitionsError}</p>
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

export default ManageContests;
