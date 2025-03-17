import { useEffect, useState } from "react";

const Engagement = () => {
  const [engagementData, setEngagementData] = useState(null);

  useEffect(() => {
    // Simulated API call for engagement data (Replace with real API call)
    setTimeout(() => {
      setEngagementData({
        activeUsers: 1204,
        newUsers: 347,
        avgSessionDuration: "5m 32s",
        retentionRate: "68%",
        totalInteractions: 82394,
      });
    }, 1000);
  }, []);

  return (
    <div className="engagement-container">
      <h2>Engagement & Retention</h2>
      
      {!engagementData ? (
        <p>Loading engagement metrics...</p>
      ) : (
        <div className="engagement-metrics">
          <div className="metric-card">
            <h3>Active Users</h3>
            <p>{engagementData.activeUsers}</p>
          </div>
          <div className="metric-card">
            <h3>New Users</h3>
            <p>{engagementData.newUsers}</p>
          </div>
          <div className="metric-card">
            <h3>Avg. Session Duration</h3>
            <p>{engagementData.avgSessionDuration}</p>
          </div>
          <div className="metric-card">
            <h3>Retention Rate</h3>
            <p>{engagementData.retentionRate}</p>
          </div>
          <div className="metric-card">
            <h3>Total Interactions</h3>
            <p>{engagementData.totalInteractions}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Engagement;
