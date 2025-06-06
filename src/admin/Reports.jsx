import { ReportProvider } from "../contexts/ReportContext.jsx";
import AllReports from "../components/Reports/AllReports.jsx";
import FlaggedUserReports from "../components/Reports/FlaggedUserReports.jsx";
import ReportedImages from "../components/Reports/ReportedImages.jsx";

const ReportsContent = () => {
  return (
    <div className="reports-container">
      <div className="header new-header">
        <h2>Reports & Moderation</h2>
      </div>
      <div className="reports-tables-row">
        <ReportedImages />
        <FlaggedUserReports />
      </div>
      <div className="reports-tables-row with-spacing">
      <AllReports/>
      </div>
    </div>
  );
};

const Reports = () => {
  return (
    <ReportProvider>
      <ReportsContent />
    </ReportProvider>
  );
};

export default Reports;
