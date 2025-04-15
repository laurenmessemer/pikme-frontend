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
  const [voteMetrics, setVoteMetrics] = useState(null);
  const [averageMetrics, setAverageMetrics] = useState(null);
  const [votingPercentageMetrics, setVotingPercentageMetrics] = useState(null);
  const [competingUsersMetric, setCompetingUsersMetric] = useState(null);
  const [currentlyActiveCompetingUsers, setCurrentlyActiveCompetingUsers] = useState(null);
  const [selectedInterval, setSelectedInterval] = useState("all_time");
  const currentUserId = 1; // TODO: Replace with real auth

  useEffect(() => {
    const fetchAllMetrics = async () => {
      try {
        const [userRes, avgRes, percentRes, competeRes, activeRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/metrics/votes/${currentUserId}`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/metrics/votes/average`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/metrics/votes/voting-user-percentage`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/metrics/votes/competing-user-percentage`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/metrics/votes/currently-active-competing-users`)
        ]);

        setVoteMetrics(userRes.data);
        setAverageMetrics(avgRes.data);
        setVotingPercentageMetrics(percentRes.data);
        setCompetingUsersMetric(competeRes.data);
        setCurrentlyActiveCompetingUsers(activeRes.data);
      } catch (err) {
        console.error("❌ Error fetching vote metrics:", err);
      }
    };

    fetchAllMetrics();
  }, [currentUserId]);

  const formatLabel = (interval) => interval.replace(/_/g, " ").toUpperCase();

  return (
    <div className="engagement-container">
      <h2>Engagement & Participation</h2>

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

      {(!voteMetrics || !averageMetrics || !votingPercentageMetrics || !competingUsersMetric || !currentlyActiveCompetingUsers) ? (
        <p>Loading metrics...</p>
      ) : (
        <>
          {/* Voting Breakdown */}
          <div className="metric-table">
            <h3>Voting Activity ({formatLabel(selectedInterval)})</h3>
            <table>
              <thead>
                <tr>
                  <th>Your Total Votes</th>
                  <th>Total Votes (All Users)</th>
                  <th>Unique Voters</th>
                  <th>Avg. Votes Per User</th>
                  <th>% of Users Who Voted</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{voteMetrics[selectedInterval]}</td>
                  <td>{averageMetrics[selectedInterval]?.totalVotes}</td>
                  <td>{averageMetrics[selectedInterval]?.uniqueVoters}</td>
                  <td>{averageMetrics[selectedInterval]?.avgVotesPerUser}</td>
                  <td>{votingPercentageMetrics[selectedInterval]?.votingUserPercentage}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Competing Breakdown */}
          <div className="metric-table" style={{ marginTop: "2rem" }}>
            <h3>Competition Participation ({formatLabel(selectedInterval)})</h3>
            <table>
              <thead>
                <tr>
                  <th>Users Who Competed</th>
                  <th>Total Users</th>
                  <th>% of Users Who Competed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{competingUsersMetric[selectedInterval]?.competingUsers}</td>
                  <td>{competingUsersMetric[selectedInterval]?.totalUsers}</td>
                  <td>{competingUsersMetric[selectedInterval]?.percentage}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Currently Competing Snapshot */}
          <div className="metric-table" style={{ marginTop: "2rem" }}>
            <h3>Live Snapshot: Currently Competing (Live or Upcoming)</h3>
            <table>
              <thead>
                <tr>
                  <th>Users Currently Competing</th>
                  <th>Total Users</th>
                  <th>% of Users Competing Now</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{currentlyActiveCompetingUsers.activeCompetingUsers}</td>
                  <td>{currentlyActiveCompetingUsers.totalUsers}</td>
                  <td>{currentlyActiveCompetingUsers.percentage}%</td>
                </tr>
              </tbody>
            </table>
            <p className="stat-note">*This is a real-time metric and not affected by the time interval filter.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Engagement;
