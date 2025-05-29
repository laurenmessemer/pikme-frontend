import { useEffect, useState } from "react";
import "../styles/admin/ManageContests.css";
import { useAuth } from "../context/UseAuth";

const API_URL = `${import.meta.env.VITE_API_URL}/api/contests`;

const ManageContests = () => {
  const { token } = useAuth();
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContests = async (retryCount = 2) => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`HTTP ${response.status}: ${text}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format: Expected an array");
        }

        setContests(data);
        setError(null); // Clear error on success
      } catch (err) {
        console.error("❌ Error fetching contests:", err);

        if (retryCount > 0) {
          console.warn(`Retrying... (${retryCount} attempts left)`);
          setTimeout(() => fetchContests(retryCount - 1), 2000);
          return;
        }

        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  return (
    <div className="manage-contests-container">
      <div className="header">
        <h2>Manage Contests</h2>
        <div className="header-buttons"></div>
      </div>

      {loading ? (
        <p>Loading contests...</p>
      ) : error ? (
        <p className="error">{error}</p>
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
                  <span
                    className={`status ${
                      contest.status?.toLowerCase() || "unknown"
                    }`}
                  >
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
                <td>
                  {contest.contest_live_date
                    ? new Date(contest.contest_live_date).toLocaleDateString()
                    : "TBD"}
                </td>
                <td>
                  {contest.submission_deadline
                    ? new Date(contest.submission_deadline).toLocaleDateString()
                    : "TBD"}
                </td>
                <td>
                  {contest.voting_live_date
                    ? new Date(contest.voting_live_date).toLocaleDateString()
                    : "TBD"}
                </td>
                <td>
                  {contest.voting_deadline
                    ? new Date(contest.voting_deadline).toLocaleDateString()
                    : "TBD"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageContests;
