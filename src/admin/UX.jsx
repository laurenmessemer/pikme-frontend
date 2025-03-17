import { useEffect, useState } from "react";
const UX = () => {
  const [uxMetrics, setUxMetrics] = useState(null);

  useEffect(() => {
    // Simulated API call to fetch UX data (Replace with real API request)
    setTimeout(() => {
      setUxMetrics({
        avgSessionDuration: "3m 45s",
        bounceRate: "42%",
        pageLoadTime: "2.1s",
        clickThroughRate: "18%",
        heatmap: "📊 Heatmap Data Placeholder",
      });
    }, 1000);
  }, []);

  return (
    <div className="ux-container">
      <h2>UX Metrics</h2>

      {!uxMetrics ? (
        <p>Loading UX data...</p>
      ) : (
        <div className="ux-metrics">
          <div className="metric">
            <h3>Avg. Session Duration</h3>
            <p>{uxMetrics.avgSessionDuration}</p>
          </div>
          <div className="metric">
            <h3>Bounce Rate</h3>
            <p>{uxMetrics.bounceRate}</p>
          </div>
          <div className="metric">
            <h3>Page Load Time</h3>
            <p>{uxMetrics.pageLoadTime}</p>
          </div>
          <div className="metric">
            <h3>Click-Through Rate</h3>
            <p>{uxMetrics.clickThroughRate}</p>
          </div>
          <div className="metric heatmap">
            <h3>Heatmap Analysis</h3>
            <p>{uxMetrics.heatmap}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UX;
