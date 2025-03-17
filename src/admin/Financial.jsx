import { useEffect, useState } from "react";

const Financial = () => {
  const [financialData, setFinancialData] = useState(null);

  useEffect(() => {
    // Simulated API call for financial data (Replace with real API call)
    setTimeout(() => {
      setFinancialData({
        totalRevenue: "$120,430",
        totalPayouts: "$35,210",
        avgTransactionValue: "$14.75",
        newSubscriptions: 527,
        refundRequests: 12,
      });
    }, 1000);
  }, []);

  return (
    <div className="financial-container">
      <h2>Financial Metrics</h2>

      {!financialData ? (
        <p>Loading financial metrics...</p>
      ) : (
        <div className="financial-metrics">
          <div className="metric-card">
            <h3>Total Revenue</h3>
            <p>{financialData.totalRevenue}</p>
          </div>
          <div className="metric-card">
            <h3>Total Payouts</h3>
            <p>{financialData.totalPayouts}</p>
          </div>
          <div className="metric-card">
            <h3>Avg. Transaction Value</h3>
            <p>{financialData.avgTransactionValue}</p>
          </div>
          <div className="metric-card">
            <h3>New Subscriptions</h3>
            <p>{financialData.newSubscriptions}</p>
          </div>
          <div className="metric-card">
            <h3>Refund Requests</h3>
            <p>{financialData.refundRequests}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Financial;
