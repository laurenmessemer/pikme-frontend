import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/admin/Engagement.css";

const intervals = [
  "all_time",
  "ytd",
  "this_month",
  "last_month",
  "this_week",
  "last_week",
];

const Engagement = () => {
  const [voteMetrics, setVoteMetrics] = useState(null); // personal
  const [averageMetrics, setAverageMetrics] = useState(null); // global
  const [selectedInterval, setSelectedInterval] = useState("all_time");
  const currentUserId = 1; // TODO: Replace with real auth

  useEffect(() => {
    const fetchAllMetrics = async () => {
      try {
        const [userRes, avgRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/metrics/votes/${currentUserId}`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/metrics/votes/average`)
        ]);

        setVoteMetrics(userRes.data);
        setAverageMetrics(avgRes.data);
      } catch (err) {
        console.error("❌ Error fetching vote metrics:", err);
      }
    };

    fetchAllMetrics();
  }, [currentUserId]);

  const formatLabel = (interval) =>
    interval.replace(/_/g, " ").toUpperCase();

  return (
    <div className="engagement-container">
      <h2>Voting Metrics</h2>

      <div className="interval-toggle">
        {intervals.map((interval) => (
          <button
            key={interval}
            onClick={() => setSelectedInterval(interval)}
            className={selectedInterval === interval ? "active" : ""}
          >
            {formatLabel(interval)}
          </button>
        ))}
      </div>

      {(!voteMetrics || !averageMetrics) ? (
        <p>Loading vote metrics...</p>
      ) : (
        <div className="metric-table">
          <table>
            <thead>
              <tr>
                <th>Time Interval</th>
                <th>Your Total Votes</th>
                <th>Total Votes (All Users)</th>
                <th>Unique Voters</th>
                <th>Avg. Votes Per User</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{formatLabel(selectedInterval)}</td>
                <td>{voteMetrics[selectedInterval]}</td>
                <td>{averageMetrics[selectedInterval]?.totalVotes}</td>
                <td>{averageMetrics[selectedInterval]?.uniqueVoters}</td>
                <td>{averageMetrics[selectedInterval]?.avgVotesPerUser}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Engagement;
