import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/admin/Engagement.css";
import { useAuth } from "../context/UseAuth";
import TableLoader from "../components/common/TableLoader";

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
  const [currentCompetingUsers, setCurrentCompetingUsers] = useState(null);
  const [dualEngagement, setDualEngagement] = useState(null);
  const [voterToCompetitorRatio, setVoterToCompetitorRatio] = useState(null);
  const [retentionStats, setRetentionStats] = useState(null);
  const [globalRetentionStats, setGlobalRetentionStats] = useState(null);
  const [weeklyVoterBreakdown, setWeeklyVoterBreakdown] = useState([]); // ✅ New
  const [newVsRepeatCCompeting, setNewVsRepeatCCompeting] = useState([]); // ✅ New
  const [reportRate, setReportRate] = useState([]); // ✅ New
  const [selectedInterval, setSelectedInterval] = useState("all_time");
  const currentUserId = 1;
  const { token } = useAuth();


  useEffect(() => {
    const fetchAllMetrics = async () => {
      try {
        const [
          userRes,
          avgRes,
          percentRes,
          currentCompetingRes,
          dualRes,
          ratioRes,
          retentionRes,
          globalRetentionRes,
          newVsRepeatRes,
          newVsRepeatCompetingRes, // ✅ New
          reportRateRes, // ✅ New
        ] = await Promise.all([
          axios.get(
            `${
              import.meta.env.VITE_API_URL
            }/api/metrics/votes/${currentUserId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "true",
              },
            }
          ),
          axios.get(
            `${import.meta.env.VITE_API_URL}/api/metrics/votes/average`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "true",
              },
            }
          ),
          axios.get(
            `${
              import.meta.env.VITE_API_URL
            }/api/metrics/votes/voting-user-percentage`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "true",
              },
            }
          ),
          axios.get(
            `${
              import.meta.env.VITE_API_URL
            }/api/metrics/votes/current-competing-users`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "true",
              },
            }
          ),
          axios.get(
            `${
              import.meta.env.VITE_API_URL
            }/api/metrics/votes/voting-and-competing-stats`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "true",
              },
            }
          ),
          axios.get(
            `${
              import.meta.env.VITE_API_URL
            }/api/metrics/votes/voter-to-competitor-ratio`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "true",
              },
            }
          ),
          axios.get(
            `${import.meta.env.VITE_API_URL}/api/metrics/votes/retention`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "true",
              },
            }
          ),
          axios.get(
            `${
              import.meta.env.VITE_API_URL
            }/api/metrics/votes/global-retention`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "true",
              },
            }
          ),
          axios.get(
            `${import.meta.env.VITE_API_URL}/api/metrics/votes/new-vs-repeat`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "true",
              },
            }
          ), // ✅ New,
          axios.get(
            `${
              import.meta.env.VITE_API_URL
            }/api/metrics/competitor/new-vs-repeat`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "true",
              },
            }
          ), // ✅ New,
          axios.get(
            `${import.meta.env.VITE_API_URL}/api/metrics/report/report-rate`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "true",
              },
            }
          ), // ✅ New
        ]);

        setVoteMetrics(userRes.data);
        setAverageMetrics(avgRes.data);
        setVotingPercentageMetrics(percentRes.data);
        setCurrentCompetingUsers(currentCompetingRes.data);
        setDualEngagement(dualRes.data);
        setVoterToCompetitorRatio(ratioRes.data);
        setRetentionStats(retentionRes.data);
        setGlobalRetentionStats(globalRetentionRes.data);
        setWeeklyVoterBreakdown(newVsRepeatRes.data);
        setNewVsRepeatCCompeting(newVsRepeatCompetingRes.data); // ✅ New
        setReportRate(reportRateRes.data); // ✅ New
      } catch (err) {
        console.error("❌ Error fetching metrics:", err);
      }
    };

    fetchAllMetrics();
  }, [currentUserId]);

  const formatLabel = (interval) => interval.replace(/_/g, " ").toUpperCase();

  const isDataLoaded =
    voteMetrics &&
    averageMetrics &&
    votingPercentageMetrics &&
    currentCompetingUsers &&
    dualEngagement &&
    voterToCompetitorRatio &&
    retentionStats &&
    globalRetentionStats &&
    weeklyVoterBreakdown.length > 0 &&
    newVsRepeatCCompeting.length > 0 && // ✅ New
    reportRate.length > 0; // ✅ New

  return (
    <div className="engagement-container common-admin-container">
      <div className="header new-header p0">
        <h2>Engagement & Participation</h2>
      </div>

      {/* Voting Breakdown */}
      <div className="metric-table four-column">
        <div className="reports-header-with-select">
          <h3>Voting Activity ({formatLabel(selectedInterval)})</h3>
          <select
            className="common-filter-select"
            id="interval-filter"
            value={selectedInterval}
            onChange={(e) => {
              if(isDataLoaded) {
                setSelectedInterval(e.target.value);
              }
            }}
            disabled={!isDataLoaded}
          >
            {intervals.map((interval) => (
              <option key={interval} value={interval}>
                {formatLabel(interval)}
              </option>
            ))}
          </select>
        </div>
        {isDataLoaded ? (
          <div className="common-table-container with-scrollbar">
            <table>
              <thead>
                <tr>
                  {/* <th>Your Total Votes</th> */}
                  <th>Total Votes (All Users)</th>
                  <th>Unique Voters</th>
                  <th>Avg. Votes Per User</th>
                  <th>% of Users Who Voted</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* <td>{voteMetrics[selectedInterval]}</td> */}
                  <td>{averageMetrics[selectedInterval]?.totalVotes}</td>
                  <td>{averageMetrics[selectedInterval]?.uniqueVoters}</td>
                  <td>{averageMetrics[selectedInterval]?.avgVotesPerUser}</td>
                  <td>
                    {
                      votingPercentageMetrics[selectedInterval]
                        ?.votingUserPercentage
                    }
                    %
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <TableLoader rows={1} columns={4} />
        )}
      </div>

      {/* Currently Competing */}
      <div className="metric-table top-spacing three-column">
        <h3>Live Snapshot: Currently Competing</h3>
        {isDataLoaded ? (
          <div className="common-table-container with-scrollbar">
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
                  <td>{currentCompetingUsers.competingUsers}</td>
                  <td>{currentCompetingUsers.totalUsers}</td>
                  <td>{currentCompetingUsers.percentage}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <TableLoader rows={1} columns={3} />
        )}
        <p className="stat-note">
          *Contests must be Live or Upcoming to be counted.
        </p>
      </div>

      {/* Dual Engagement */}
      <div className="metric-table top-spacing three-column">
        <h3>Dual Engagement: Voting + Competing</h3>
        {isDataLoaded ? (
          <div className="common-table-container with-scrollbar">
            <table>
              <thead>
                <tr>
                  <th>Users Who Voted + Competed</th>
                  <th>Total Users</th>
                  <th>% of Users Who Did Both</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{dualEngagement.current.both}</td>
                  <td>{dualEngagement.current.totalUsers}</td>
                  <td>{dualEngagement.current.percentage}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <TableLoader rows={1} columns={3} />
        )}

        {isDataLoaded ? (
          <div className="common-table-container with-scrollbar">
            <table style={{ marginTop: "1rem" }}>
              <thead>
                <tr>
                  <th>All-Time Voted + Competed</th>
                  <th>Total Users</th>
                  <th>% of Users Who Did Both</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{dualEngagement.all_time.both}</td>
                  <td>{dualEngagement.all_time.totalUsers}</td>
                  <td>{dualEngagement.all_time.percentage}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ marginTop: "1rem" }}>
            <TableLoader rows={1} columns={3} />
          </div>
        )}
      </div>

      {/* Voter to Competitor Ratio */}
      <div className="metric-table top-spacing four-column">
        <h3>Voter to Competitor Ratio</h3>
        {isDataLoaded ? (
          <div className="common-table-container with-scrollbar">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th># of Voters</th>
                  <th># of Competitors</th>
                  <th>Voter:Competitor Ratio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Current (Past 7 Days)</td>
                  <td>{voterToCompetitorRatio.current.voters}</td>
                  <td>{voterToCompetitorRatio.current.competitors}</td>
                  <td>{voterToCompetitorRatio.current.ratio}</td>
                </tr>
                <tr>
                  <td>All Time</td>
                  <td>{voterToCompetitorRatio.all_time.voters}</td>
                  <td>{voterToCompetitorRatio.all_time.competitors}</td>
                  <td>{voterToCompetitorRatio.all_time.ratio}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <TableLoader rows={2} columns={4} />
        )}
      </div>

      {/* Retention Metrics */}
      <div className="metric-table top-spacing four-column">
        <h3>Platform Retention Rates</h3>
        {isDataLoaded ? (
          <div className="common-table-container with-scrollbar">
            <table>
              <thead>
                <tr>
                  <th>Retention Period</th>
                  <th>Cohort Size</th>
                  <th>Users Retained</th>
                  <th>% Retained</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1-Day</td>
                  <td>{retentionStats["1_day"].cohortSize}</td>
                  <td>{retentionStats["1_day"].retained}</td>
                  <td>{retentionStats["1_day"].percentage}%</td>
                </tr>
                <tr>
                  <td>7-Day</td>
                  <td>{retentionStats["7_day"].cohortSize}</td>
                  <td>{retentionStats["7_day"].retained}</td>
                  <td>{retentionStats["7_day"].percentage}%</td>
                </tr>
                <tr>
                  <td>30-Day</td>
                  <td>{retentionStats["30_day"].cohortSize}</td>
                  <td>{retentionStats["30_day"].retained}</td>
                  <td>{retentionStats["30_day"].percentage}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <TableLoader rows={3} columns={4} />
        )}
        <p className="stat-note">
          *A new user is defined as someone who signed up within the last N days
          (1, 7, 30). They are considered retained if they voted or competed
          today.
        </p>
      </div>

      {/* Global Retention (All Users) */}
      <div className="metric-table top-spacing four-column">
        <h3>Global Retention (All Users)</h3>
        {isDataLoaded ? (
          <div className="common-table-container with-scrollbar">
            <table>
              <thead>
                <tr>
                  <th>Timeframe</th>
                  <th>Total Users</th>
                  <th>Active Users</th>
                  <th>% Active</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1-Day</td>
                  <td>{globalRetentionStats["1_day"].totalUsers}</td>
                  <td>{globalRetentionStats["1_day"].active}</td>
                  <td>{globalRetentionStats["1_day"].percentage}%</td>
                </tr>
                <tr>
                  <td>7-Day</td>
                  <td>{globalRetentionStats["7_day"].totalUsers}</td>
                  <td>{globalRetentionStats["7_day"].active}</td>
                  <td>{globalRetentionStats["7_day"].percentage}%</td>
                </tr>
                <tr>
                  <td>30-Day</td>
                  <td>{globalRetentionStats["30_day"].totalUsers}</td>
                  <td>{globalRetentionStats["30_day"].active}</td>
                  <td>{globalRetentionStats["30_day"].percentage}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <TableLoader rows={3} columns={4} />
        )}
        <p className="stat-note">
          *Shows what % of all users (not just new signups) were active within
          1, 7, and 30 days.
        </p>
      </div>

      {/* New vs. Repeat Voters (Weekly) */}
      <div className="metric-table top-spacing three-column">
        <h3>New vs. Repeat Voters (Weekly)</h3>
        {isDataLoaded ? (
          <div className="common-table-container with-scrollbar">
            <table>
              <thead>
                <tr>
                  <th>Week Starting</th>
                  <th>New Voters</th>
                  <th>Repeat Voters</th>
                </tr>
              </thead>
              <tbody>
                {weeklyVoterBreakdown.map((weekData) => (
                  <tr key={weekData.weekStart}>
                    <td>{weekData.weekStart}</td>
                    <td>{weekData.newVoters}</td>
                    <td>{weekData.repeatVoters}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <TableLoader rows={2} columns={3} />
        )}
        <p className="stat-note">
          *New = voting for the first time that week. Repeat = had voted in a
          prior week.
        </p>
      </div>

      {/* New vs. Repeat Competitors (Weekly) */}
      <div className="metric-table top-spacing three-column">
        <h3>New vs. Repeat Competitors (Weekly)</h3>
        {isDataLoaded ? (
          <div className="common-table-container with-scrollbar">
            <table>
              <thead>
                <tr>
                  <th>Week Starting</th>
                  <th>New Competitors</th>
                  <th>Repeat Competitors</th>
                </tr>
              </thead>
              <tbody>
                {newVsRepeatCCompeting.map((weekData) => (
                  <tr key={weekData.weekStart}>
                    <td>{weekData.weekStart}</td>
                    <td>{weekData.newCompetitor}</td>
                    <td>{weekData.repeatCompetitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <TableLoader rows={2} columns={3} />
        )}
        <p className="stat-note">
          *New = competing for the first time that week. Repeat = had competed
          in a prior week. Shows max last two month data.
        </p>
      </div>

      {/* Report Rate (Weekly) */}
      <div className="metric-table top-spacing four-column">
        <h3>Report Rate (Weekly)</h3>
        {isDataLoaded ? (
          <div className="common-table-container with-scrollbar">
            <table>
              <thead>
                <tr>
                  <th>Week Starting</th>
                  <th>Report Count</th>
                  <th>Total Images Count</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {reportRate.map((weekData) => (
                  <tr key={weekData.weekStart}>
                    <td>{weekData.weekStart}</td>
                    <td>{weekData.reportCount}</td>
                    <td>{weekData.totalImagesCount}</td>
                    <td>
                      {(
                        (weekData?.reportCount / weekData?.totalImagesCount) *
                        100
                      ).toFixed(0) + "%"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>{" "}
          </div>
        ) : (
          <TableLoader rows={2} columns={4} />
        )}
        <p className="stat-note">
          *Report rate calculated as (Report Count / Total Images Count) × 100.
          Shows max last two month data.
        </p>
      </div>
    </div>
  );
};

export default Engagement;
