/*
 * File: ReplaceViolatedImagePopup.jsx
 * Author: HARSH CHAUHAN
 * Created Date: June 18th, 2025
 * Description: This popup show the data of reported competition image in admin size.
 */

import axios from "axios";
import PropTypes from "prop-types";
import CustomSvgIcon from "../../constant/CustomSvgIcons";
import UploadImage from "../Cards/UploadImage";
import { useState } from "react";
import { useAuth } from "../../context/UseAuth";
import LazyImage from "../Common/LazyImage";
import ToastUtils from "../../utils/ToastUtils";
import { REPLACE_VIOLATED_IMAGE } from "../../constant/ApiUrls";
import { api } from "../../api";
import { checkSuccessResponse } from "../../utils/RouterUtils";

const ReplaceViolatedImagePopup = ({
  onClose,
  reportData,
  fetchFlaggedDetails = () => {},
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageLoading, setImageLoading] = useState(false);

  const { user, token } = useAuth();

  const userId = user?.id;

  const handleUpload = async (file) => {
    if (!file) {
      console.warn("⚠️ No file provided for upload.");
      return;
    }

    if (!userId) {
      console.error("❌ Cannot upload image — user ID is missing.");
      return;
    }

    setImageLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "update");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/themes/direct-upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (checkSuccessResponse(response)) {
        const { imageUrl } = response.data;
        setImageUrl(imageUrl);
      }
    } catch (error) {
      setImageLoading(false);
    } finally {
      setImageLoading(false);
    }
  };

  const handleReplaceImage = async () => {
    try {
      setIsSubmitting(true);

      const response = await api({
        endpoint: REPLACE_VIOLATED_IMAGE,
        payloadData: {
          newImageUrl: imageUrl,
          reportedUserId: reportData?.report?.reported_user_id,
          competitionId: reportData?.report?.competition_id,
        },
      });

      if (checkSuccessResponse(response)) {
        ToastUtils.success(response?.data?.message);
        fetchFlaggedDetails(userId);
        onClose();
      } else {
        ToastUtils.error(response?.data?.message);
      }
    } catch (error) {
      ToastUtils.error(
        error.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-popup-overlay">
      <div className="contact-popup upload-image-popup">
        <div className="contact-header">
          <h2>Replace violated image </h2>
          {!isSubmitting && (
            <button className="close-btn" onClick={onClose}>
              <CustomSvgIcon icon={"CloseModelIcon"} />
            </button>
          )}
        </div>

        <div className="popup-content reinvite-content">
          <div className="common-image-upload-container">
            <div className="left-card report-details-card">
              <div className="report-details-compact">
                <div className="detail-row full-width">
                  <span className="detail-label">Reporting User:</span>
                  <span className="detail-value">
                    {reportData?.report?.Reporter?.username || "Unknown User"}
                  </span>
                </div>

                <div className="detail-row full-width">
                  <span className="detail-label">Reported User:</span>
                  <span className="detail-value">
                    {reportData?.report?.ReportedUser?.username ||
                      "Unknown User"}
                  </span>
                </div>

                <div className="detail-row full-width">
                  <span className="detail-label">Categories:</span>
                  <span className="detail-value">
                    {reportData?.report?.categories?.length > 0
                      ? reportData.report.categories.join(", ")
                      : "No categories"}
                  </span>
                </div>

                <div className="detail-row full-width">
                  <span className="detail-label">Description:</span>
                  <div className="detail-value">
                    {reportData?.report?.description ||
                      "No description provided"}
                  </div>
                </div>
              </div>
            </div>

            <div className="right-card upload-section">
              {imageUrl ? (
                <div className="uploaded-image-container">
                  <LazyImage
                    src={imageUrl}
                    alt="Uploaded Preview"
                    className="uploaded-image"
                  />
                  {!isSubmitting && (
                    <span
                      className="change-image-btn"
                      onClick={() => setImageUrl("")}
                    >
                      <CustomSvgIcon icon={"CloseModelIcon"} color={"#fff"} />
                    </span>
                  )}
                </div>
              ) : (
                <UploadImage
                  onUpload={handleUpload}
                  isImageLoading={isImageLoading}
                />
              )}
            </div>
          </div>

          {/* ✅ Action Button */}
          <div className="contact-form-buttons more-space">
            <button type="button" onClick={onClose} className="btn-cancel">
              CANCEL
            </button>
            <button
              className="btn-new-submit width-auto"
              disabled={!imageUrl || isSubmitting}
              onClick={handleReplaceImage}
            >
              {isSubmitting ? "Replacing..." : "Replace Image"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ReplaceViolatedImagePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  reportData: PropTypes.object,
  fetchFlaggedDetails: PropTypes.func,
};

export default ReplaceViolatedImagePopup;
