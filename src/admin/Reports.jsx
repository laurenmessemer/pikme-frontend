import { useEffect, useState } from "react";

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Simulated API call to fetch reports (Replace with real API request)
    setTimeout(() => {
      setReports([
        { id: 1, type: "User Misconduct", reportedBy: "Admin1", date: "2025-03-01", status: "Pending" },
        { id: 2, type: "Spam Content", reportedBy: "User45", date: "2025-03-02", status: "Resolved" },
        { id: 3, type: "Inappropriate Content", reportedBy: "User99", date: "2025-03-03", status: "Under Review" },
        { id: 4, type: "Cheating", reportedBy: "User12", date: "2025-03-03", status: "Pending" },
      ]);
    }, 1000);
  }, []);

  return (
    <div className="reports-container">
      <div className="header">
        <h2>Reports & Moderation</h2>
      </div>

      {!reports.length ? (
        <p>Loading reports...</p>
      ) : (
        <table className="reports-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Reported By</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className={report.status === "Pending" ? "highlight-row" : ""}>
                <td>{report.id}</td>
                <td>{report.type}</td>
                <td>{report.reportedBy}</td>
                <td>{report.date}</td>
                <td>
                  <span className={`status ${report.status.toLowerCase().replace(" ", "-")}`}>
                    {report.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reports;
