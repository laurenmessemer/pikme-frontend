import { useNavigate, useParams } from "react-router-dom";
import CustomSvgIcon from "../constant/CustomSvgIcons";
import { useAuth } from "../context/UseAuth";
import { useEffect, useState } from "react";
import {
  GET_BY_ID_REPORTED,
  POST_USER_REPORT_STATUS,
} from "../constant/ApiUrls";
import { checkSuccessResponse } from "../utils/RouterUtils";
import { api } from "../api";
import LazyImage from "../components/Common/LazyImage";
import WinnerImagePopup from "../components/Popups/WinnerImagePopup";

const ReportDetails = () => {
  const navigate = useNavigate();
  const { UserId } = useParams();
  const { user, token } = useAuth();
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
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
        endpoint: POST_USER_REPORT_STATUS,
        payloadData: {
          status: type,
          reportId: UserId,
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
        endpoint: GET_BY_ID_REPORTED,
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
    <>
      <div className="reports-container">
        <div className="header new-header header-with-back">
          <div className="flex" onClick={handleBackClick}>
            <CustomSvgIcon icon={"ArrowLeftIcon"} />
          </div>
          <h2>Reports - Report ID [{UserId}]</h2>
        </div>

        <div className="report-details-section">
          <div className="report-content mb0">
            {flaggedDataLoading ? (
              <div className="report-image-section">
                <div className="reported-image">
                  <div className="image-skeleton"></div>
                </div>
              </div>
            ) : flaggedReportData?.report?.image_url ? (
              <div
                className="image-card new-image-card"
                onClick={() => {
                  setSelectedImage(flaggedReportData?.report?.image_url);
                }}
              >
                <LazyImage
                  src={flaggedReportData?.report?.image_url}
                  alt="Entry"
                  className="contest-image"
                />
              </div>
            ) : (
              <div className="report-image-section">
                <div className="reported-image">
                  <div className="image-placeholder">
                    <CustomSvgIcon icon={"ImageIcon"} />
                  </div>
                </div>
              </div>
            )}
            <div className="report-info-section">
              <div className="report-details-table">
                <div className="detail-row">
                  <span className="detail-label">Submitting User</span>
                  <span className="detail-value">
                    {flaggedDataLoading ? (
                      <div className="skeleton-only-line"></div>
                    ) : (
                      <>
                        {flaggedReportData?.report?.Reporter?.username || "-"}
                      </>
                    )}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Reporting User</span>
                  <span className="detail-value">
                    {flaggedDataLoading ? (
                      <div className="skeleton-only-line"></div>
                    ) : (
                      <>
                        {flaggedReportData?.report?.ReportedUser?.username ||
                          "-"}
                        {flaggedReportData?.report?.status === "Violation" ? (
                          <span
                            className="status-tag ban"
                            style={{ marginLeft: "8px" }}
                          >
                            Violation
                          </span>
                        ) : flaggedReportData?.report?.status === "No Violation" ? (
                          <span
                            className="status-tag warn"
                            style={{ marginLeft: "8px" }}
                          >
                            No Violation
                          </span>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Contest ID:</span>
                  <span className="detail-value">
                    {flaggedDataLoading ? (
                      <div className="skeleton-only-line"></div>
                    ) : (
                      <>{flaggedReportData?.report?.competition_id || "-"}</>
                    )}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Contest Theme:</span>
                  <span className="detail-value">
                    {flaggedDataLoading ? (
                      <div className="skeleton-only-line"></div>
                    ) : (
                      <>
                        {flaggedReportData?.report?.Competition?.Contest?.Theme
                          ?.name || "-"}
                      </>
                    )}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Report Category:</span>
                  <span className="detail-value">
                    {" "}
                    {flaggedDataLoading ? (
                      <div className="skeleton-only-line"></div>
                    ) : (
                      <>
                        {flaggedReportData?.report?.categories &&
                        flaggedReportData?.report?.categories?.length > 0 ? (
                          <>
                            {flaggedReportData?.report?.categories?.map(
                              (data) => {
                                return (
                                  <span
                                    key={data}
                                    className="category-tag"
                                    style={{ marginRight: "8px" }}
                                  >
                                    {data},
                                  </span>
                                );
                              }
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Extra Info:</span>
                  <span className="detail-value">
                    {flaggedDataLoading ? (
                      <div className="skeleton-only-line"></div>
                    ) : (
                      <>{flaggedReportData?.report?.description || "-"}</>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
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
                onClick={() => handleButtonClick("No Violation")}
              >
                {loadingButton === "No Violation"
                  ? "Loading..."
                  : "No Violation"}
              </button>
              <button
                className="action-btn violation-btn"
                onClick={() => handleButtonClick("Violation")}
                disabled={isLoading}
              >
                {loadingButton === "Violation" ? "Loading..." : "Violation"}
              </button>
            </div>
          )}
        </div>
      </div>
      {selectedImage && (
        <WinnerImagePopup
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
          isFullView={true}
        />
      )}
    </>
  );
};

export default ReportDetails;
