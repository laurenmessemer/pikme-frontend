import { useNavigate, useParams } from "react-router-dom";
import CustomSvgIcon from "../constant/CustomSvgIcons";
import { useAuth } from "../context/UseAuth";
import { useEffect, useMemo, useState } from "react";
import {
  GET_BY_ID_REPORTED,
  POST_ADMIN_REVIEW_IMAGE,
  POST_USER_REPORT_STATUS,
} from "../constant/ApiUrls";
import { checkSuccessResponse } from "../utils/RouterUtils";
import { api } from "../api";
import LazyImage from "../components/Common/LazyImage";
import WinnerImagePopup from "../components/Popups/WinnerImagePopup";
import ReplaceViolatedImagePopup from "../components/Popups/ReplaceViolatedImagePopup";
import { formatDateToDDMMYYYY, REPORT_STATUS_CLASSES } from "../constant/appConstants";

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
  const [isReplaceImageModel, setIsReplaceImageModel] = useState(false);

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
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
        fetchFlaggedDetails(UserId);
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

  const handleApproveDenyClick = async (data) => {
    if (!flaggedReportData?.report?.ViolationAction?.id) return;

    try {
      setIsLoading(true);
      setLoadingButton(data?.type); // Set which button is loading

      const response = await api({
        endpoint: POST_ADMIN_REVIEW_IMAGE,
        payloadData: {
          violationActionId: flaggedReportData?.report?.ViolationAction?.id,
          isApprove: data?.value,
        },
      });

      if (checkSuccessResponse(response)) {
        // Update the local state to reflect the new status
        fetchFlaggedDetails(UserId);
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
  const handleUploadImage = () => {
    setIsReplaceImageModel(true);
  };

  const finalImageUrl = useMemo(() => {
    if (flaggedReportData?.report?.ViolationAction?.new_image_url) {
      return flaggedReportData?.report?.ViolationAction?.new_image_url || "";
    } else {
      return flaggedReportData?.report?.image_url || "";
    }
  }, [flaggedReportData]);

  const finalStatus = useMemo(() => {
    if (flaggedReportData?.report?.ViolationAction?.status) {
      return flaggedReportData?.report?.ViolationAction?.status || "";
    } else {
      return flaggedReportData?.report?.status || "";
    }
  }, [flaggedReportData]);

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
            ) : finalImageUrl ? (
              <div
                className="image-card new-image-card"
                onClick={() => {
                  setSelectedImage(finalImageUrl);
                }}
              >
                <LazyImage
                  src={finalImageUrl}
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
                          "-"}{" "}
                        <span
                          className={`status-tag ${REPORT_STATUS_CLASSES[finalStatus]}`}
                        >
                          {finalStatus}
                        </span>
                      </>
                    )}
                  </span>
                </div>
                {finalStatus === "Admin Review Pending" && (
                  <div className="detail-row">
                    <span className="detail-label">Image Changed On</span>
                    <span className="detail-value">
                      {flaggedDataLoading ? (
                        <div className="skeleton-only-line"></div>
                      ) : (
                        <>
                          {flaggedReportData?.report?.ViolationAction?.updatedAt
                            ? formatDateToDDMMYYYY(flaggedReportData?.report?.ViolationAction?.updatedAt, true)
                            : "TBD"}
                        </>
                      )}
                    </span>
                  </div>
                )}
                <div className="detail-row">
                  <span className="detail-label">Competition ID:</span>
                  <span className="detail-value">
                    {flaggedDataLoading ? (
                      <div className="skeleton-only-line"></div>
                    ) : (
                      <>{flaggedReportData?.report?.competition_id || "-"}</>
                    )}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Contest ID:</span>
                  <span className="detail-value">
                    {flaggedDataLoading ? (
                      <div className="skeleton-only-line"></div>
                    ) : (
                      <>
                        {flaggedReportData?.report?.Competition?.contest_id ||
                          "-"}
                      </>
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
              {finalStatus === "Resolved" ||
              finalStatus === "Resolved By Admin" ? (
                <></>
              ) : (
                <>
                  {finalStatus === "Admin Review Pending" ? (
                    <>
                      <button
                        className="action-btn warn-btn"
                        disabled={isLoading}
                        onClick={() =>
                          handleApproveDenyClick({
                            type: "approve",
                            value: true,
                          })
                        }
                      >
                        {loadingButton === "approve" ? "Loading..." : "Approve"}
                      </button>

                      <button
                        className="action-btn violation-btn"
                        onClick={() =>
                          handleApproveDenyClick({ type: "deny", value: false })
                        }
                        disabled={isLoading}
                      >
                        {loadingButton === "deny" ? "Loading..." : "Deny"}
                      </button>
                    </>
                  ) : (
                    <>
                      {finalStatus !== "No Violation" && (
                        <button
                          className="action-btn warn-btn"
                          disabled={isLoading}
                          onClick={() => handleButtonClick("No Violation")}
                        >
                          {loadingButton === "No Violation"
                            ? "Loading..."
                            : "No Violation"}
                        </button>
                      )}
                      {finalStatus !== "Violation" &&
                        finalStatus !== "User Action Pending" && (
                          <button
                            className="action-btn violation-btn"
                            onClick={() => handleButtonClick("Violation")}
                            disabled={isLoading}
                          >
                            {loadingButton === "Violation"
                              ? "Loading..."
                              : "Violation"}
                          </button>
                        )}

                      {finalStatus === "User Action Pending" && (
                        <button
                          className="action-btn back-btn"
                          onClick={() => handleUploadImage("Violation")}
                          disabled={isLoading}
                        >
                          Replace Image
                        </button>
                      )}
                    </>
                  )}
                </>
              )}
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
      {isReplaceImageModel && (
        <ReplaceViolatedImagePopup
          onClose={() => setIsReplaceImageModel(null)}
          reportData={flaggedReportData}
          fetchFlaggedDetails={fetchFlaggedDetails}
        />
      )}
    </>
  );
};

export default ReportDetails;
