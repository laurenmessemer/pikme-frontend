import { useEffect, useState } from "react";

const Platform = () => {
  const [platformStats, setPlatformStats] = useState(null);

  useEffect(() => {
    // Simulated API call to fetch platform statistics (Replace with real API request)
    setTimeout(() => {
      setPlatformStats({
        totalUsers: 15234,
        activeUsers: 7342,
        serverUptime: "99.98%",
        apiResponseTime: "320ms",
        totalStorageUsed: "1.2TB",
        reportedIssues: 12,
      });
    }, 1000);
  }, []);

  return (
    <div className="platform-container">
      <div className="header">
        <h2>Platform Metrics</h2>
      </div>

      {!platformStats ? (
        <p>Loading platform data...</p>
      ) : (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{platformStats.totalUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Active Users</h3>
            <p>{platformStats.activeUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Server Uptime</h3>
            <p>{platformStats.serverUptime}</p>
          </div>
          <div className="stat-card">
            <h3>API Response Time</h3>
            <p>{platformStats.apiResponseTime}</p>
          </div>
          <div className="stat-card">
            <h3>Total Storage Used</h3>
            <p>{platformStats.totalStorageUsed}</p>
          </div>
          <div className="stat-card">
            <h3>Reported Issues</h3>
            <p>{platformStats.reportedIssues}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Platform;
