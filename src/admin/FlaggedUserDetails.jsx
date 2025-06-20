import { useNavigate, useParams } from "react-router-dom";
import CustomSvgIcon from "../constant/CustomSvgIcons";
import { useAuth } from "../context/UseAuth";
import { useEffect, useState } from "react";
import {
  GET_BY_ID_REPORTED_REPORTS,
  POST_USER_REPORT_ACTION,
} from "../constant/ApiUrls";
import { checkSuccessResponse } from "../utils/RouterUtils";
import { api } from "../api";
import CommonDataTable from "../components/common/DataTable";
import { formatDateToDDMMYYYY } from "../constant/appConstants";

export const allFlaggedReportsColumns = [
  {
    name: "ID",
    selector: (row) => row?.id,
    width: "80px",
    minWidth: "80px",
    cell: (row) => row?.id ?? "-",
  },
  {
    name: "Status",
    selector: (row) => row?.status,
    minWidth: "120px",
    cell: (row) => (
      <>
        {row?.status === "Violation" ? (
          <span className="status-tag ban">{row?.status}</span>
        ) : row.status === "No Violation" ? (
          <span className="status-tag warn">{row?.status}</span>
        ) : (
          <span className="status-tag normal">{row?.status}</span>
        )}
      </>
    ),
  },
  {
    name: "Report Time",
    selector: (row) => row?.createdAt,
    minWidth: "120px",
    cell: (row) =>
      row?.createdAt ? formatDateToDDMMYYYY(row?.createdAt, true) : "-",
  },
  {
    name: "Reporting User",
    selector: (row) => row?.Reporter?.username,
    minWidth: "140px",
    cell: (row) => row?.Reporter?.username ?? "-",
  },
  {
    name: "Theme",
    selector: (row) => row?.Competition?.Contest?.Theme?.name,
    minWidth: "120px",
    cell: (row) => row?.Competition?.Contest?.Theme?.name ?? "-",
  },
  {
    name: "Contest ID",
    selector: (row) => row?.competition_id,
    minWidth: "100px",
    cell: (row) => row?.competition_id ?? "-",
  },
  {
    name: "Report Category",
    selector: (row) => row?.categories,
    minWidth: "150px",
    cell: (row) =>
      Array.isArray(row?.categories)
        ? row.categories.join(", ")
        : row?.categories ?? "-",
  },
];

const FlaggedUserDetails = () => {
  const navigate = useNavigate();
  const { UserId } = useParams();
  const { user, token } = useAuth();
  const [error, setError] = useState(null);
  const [flaggedReportData, setFlaggedReportData] = useState([]);
  const [flaggedDataLoading, setFlaggedDataLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(null); // Track which button is loading

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
  };

  const handleButtonClick = async (type) => {
    if (!type) return;

    try {
      setIsLoading(true);
      setLoadingButton(type); // Set which button is loading

      const response = await api({
        endpoint: POST_USER_REPORT_ACTION,
        payloadData: {
          status: type,
          userId: UserId,
        },
      });

      if (checkSuccessResponse(response)) {
        // Update the local state to reflect the new status
        setFlaggedReportData(prevData => ({
          ...prevData,
          report: {
            ...prevData.report,
            status: type
          }
        }));
        setIsLoading(false);
        setLoadingButton(null);
      } else {
      }
    } catch (err) {
      console.error("Failed:", err);
    } finally {
      setIsLoading(false);
      setLoadingButton(null);
    }
  };

  const fetchFlaggedDetails = async () => {
    if (!user?.id || !token) {
      setFlaggedDataLoading(false);
      return;
    }

    try {
      setFlaggedDataLoading(true);
      setError(null);

      const response = await api({
        endpoint: GET_BY_ID_REPORTED_REPORTS,
        id: UserId,
      });

      if (response && checkSuccessResponse(response)) {
        const reportsData =
          response.data?.reports || response.data?.data || response.data || [];
        setFlaggedReportData(reportsData);
      } else {
        const errorMessage =
          response?.data?.message ||
          "Failed to load reported reports. Please try again later.";
        setError(errorMessage);
      }
    } catch (err) {
      console.error("❌ Error fetching reported reports:", err);
      setError("Failed to load reported reports. Please try again later.");
    } finally {
      setFlaggedDataLoading(false);
    }
  };

  useEffect(() => {
    if (UserId) {
      fetchFlaggedDetails(UserId);
    }
    // eslint-disable-next-line
  }, [UserId]);

  return (
    <div className="reports-container">
      <div className="header new-header header-with-back">
        <div className="flex" onClick={handleBackClick}>
          <CustomSvgIcon icon={"ArrowLeftIcon"} />
        </div>
        <h2>Reports - Flagged User [{UserId}]</h2>
      </div>

      <div className="report-details-section">
        <div className="report-content">
          <div className="report-info-section">
            <div className="report-details-table">
              <div className="detail-row">
                <span className="detail-label">Username</span>
                <span className="detail-value">
                  {flaggedDataLoading ? (
                    <div className="skeleton-only-line"></div>
                  ) : (
                    <>
                      {flaggedReportData?.report?.username || "---"}
                      {flaggedReportData?.report?.status === "Ban" ? (
                        <span
                          className="status-tag ban"
                          style={{ marginLeft: "8px" }}
                        >
                          Ban
                        </span>
                      ) : flaggedReportData?.report?.status === "Warn" ? (
                        <span
                          className="status-tag warn"
                          style={{ marginLeft: "8px" }}
                        >
                          Warn
                        </span>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email</span>
                <span className="detail-value">
                  {flaggedDataLoading ? (
                    <div className="skeleton-only-line"></div>
                  ) : (
                    <>{flaggedReportData?.report?.email || "-"}</>
                  )}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date of birth:</span>
                <span className="detail-value">
                  {flaggedDataLoading ? (
                    <div className="skeleton-only-line"></div>
                  ) : (
                    <>
                      {flaggedReportData?.report?.date_of_birth
                        ? formatDateToDDMMYYYY(flaggedReportData?.report?.date_of_birth, true)
                        : "TBD"}
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="spacing-divider" />
        <CommonDataTable
          tableColumns={allFlaggedReportsColumns}
          tableData={flaggedReportData?.report?.ReportsReceived || []}
          tableDataTotalCount={
            flaggedReportData?.report?.ReportsReceived.length
          }
          isLoading={flaggedDataLoading}
          pagination={false}
        />
        {flaggedDataLoading ? (
          <div></div>
        ) : (
          <div className="report-actions" disabled={isLoading}>
            <button className="action-btn back-btn" onClick={handleBackClick}>
              Back
            </button>
            <button
              className="action-btn warn-btn"
              disabled={isLoading}
              onClick={() => handleButtonClick("Warn")}
            >
              {loadingButton === "Warn" ? "Loading..." : "Warn"}
            </button>
            <button
              className="action-btn violation-btn"
              onClick={() => handleButtonClick("Ban")}
              disabled={isLoading}
            >
              {loadingButton === "Ban" ? "Loading..." : "Ban"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlaggedUserDetails;
