/*
 * File: UploadCSVPopup.jsx
 * Author: HARSH CHAUHAN
 * Created Date: June 11th, 2025
 * Description: This component handles upload csv file.
 */

import PropTypes from "prop-types";
import { useState } from "react";
import "../../styles/popups/popups.css";
import ToastUtils from "../../utils/ToastUtils";
import Submit from "../Buttons/Submit";
import BackButton from "../Buttons/BackButton";
import { FiUpload } from "react-icons/fi";
import CustomSvgIcon from "../../constant/CustomSvgIcons";
import { api } from "../../api";
import { checkSuccessResponse } from "../../utils/RouterUtils";
import "../../styles/admin/Engagement.css";

/**
 * UploadCSVPopup Component
 *
 * A modal popup that allows users to upload CSV files.
 * This component provides a common interface for CSV file uploads
 * with template download functionality and proper validation.
 *
 * Features:
 * - File upload with validation for CSV files only
 * - Template download functionality
 * - Loading state management during API submission
 * - Error handling with toast notifications
 *
 * @component
 */

const UploadCSVPopup = ({
  onClose,
  onSubmit,
  downloadAPI = "",
  downloadFileName = "users_template.csv",
  title = "Upload CSV",
  isSubmitting = false,
  setIsUploading = () => {},
  refetchApi = () => {},
  isDownloadButton = false,
  errorData = [],
  setErrorData = () => {},
}) => {
  // State for file handling
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    validateAndSetFile(file);
  };

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  // Validate file and set state
  const validateAndSetFile = (file) => {
    if (!file) return;

    // Check if file is CSV
    if (file.type !== "text/csv" && !file.name.toLowerCase().endsWith(".csv")) {
      ToastUtils.error("Please select a valid CSV file");
      return;
    }

    // Check file size (limit to 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      ToastUtils.error("File size should not exceed 10MB");
      return;
    }

    setSelectedFile(file);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!selectedFile) {
      ToastUtils.error("Please select a CSV file to upload");
      return;
    }

    // refetchApi()

    // Call parent's onSubmit function with the selected file
    onSubmit(selectedFile);
  };

  // Remove selected file
  const removeFile = () => {
    setSelectedFile(null);
  };

  // Handle CSV file Download
  const handleDownloadTemplate = async () => {
    try {
      setIsDownloading(true);

      const payload = {};

      const response = await api({
        endpoint: downloadAPI,
        params: payload,
      });

      if (response && checkSuccessResponse(response)) {
        const blob = new Blob([response?.data], {
          type: "text/csv;charset=utf-8;",
        });
        // Create a link element to trigger the download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = downloadFileName || "template.csv";
        // Append the link to the document body and trigger the click event
        document.body.appendChild(link);
        link.click();
        // Remove the link from the document body
        document.body.removeChild(link);
      } else {
        const errorMessage =
          response?.data?.message ||
          "Failed to downalod csv. Please try again later.";
        setError(errorMessage);
      }
    } catch (err) {
      console.error("❌ Error downalod csv:", err);
    } finally {
      setIsDownloading(false);
    }
  };
  return (
    <div className="contact-popup-overlay">
      <div className="contact-popup upload-csv-popup">
        <div className="contact-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>
            <CustomSvgIcon icon={"CloseModelIcon"} />
          </button>
        </div>
        {errorData && errorData.length > 0 ? (
          <div className="popup-content reinvite-content">
            {/* Currently Competing */}
            <div className="metric-table top-spacing outside-table">
              <div className="common-table-container with-scrollbar">
                <table>
                  <thead>
                    <tr>
                      <th>Line</th>
                      <th>Email</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {errorData.map((data) => (
                      <tr key={data.line}>
                        <td>{data.line}</td>
                        <td>{data.email}</td>
                        <td>{data.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="contact-form-buttons more-space csv-buttons">
              <div></div>
              <div className="right-buttons">
                <BackButton
                  className="no-spacing small-button width-auto btn-white"
                  text={"Close"}
                  onClick={onClose}
                  disabled={isSubmitting || isDownloading}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="popup-content reinvite-content">
              <div className="common-form flex-form">
                <div className="field-box popup-data">
                  {/* File Upload Area */}
                  <div
                    className={`csv-upload-area ${
                      dragActive ? "drag-active" : ""
                    } ${selectedFile ? "has-file" : ""}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {!selectedFile ? (
                      <div className="upload-placeholder">
                        <label>
                          <FiUpload className="copy-icon" />
                          Choose a file or drag and drop it here.
                          <br />
                          Supported format: CSV (Max 10MB)
                          <input
                            type="file"
                            accept=".csv,text/csv"
                            onChange={handleFileSelect}
                            disabled={isSubmitting}
                            style={{ display: "none" }}
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="selected-file">
                        <div className="file-info">
                          <div className="file-details">
                            <p className="file-name">{selectedFile.name}</p>
                            <p className="file-size">
                              {(selectedFile.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        {!isSubmitting && (
                          <div
                            className="remove-file-btn"
                            onClick={removeFile}
                            type="button"
                          >
                            <CustomSvgIcon icon={"CloseModelIcon"} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="contact-form-buttons more-space csv-buttons">
                {isDownloadButton ? (
                  <BackButton
                    className="no-spacing small-button width-auto btn-secondary"
                    text={isDownloading ? "Downloading..." : "Download"}
                    onClick={handleDownloadTemplate}
                    disabled={isDownloading}
                  />
                ) : (
                  <div></div>
                )}

                <div className="right-buttons">
                  <BackButton
                    className="no-spacing small-button width-auto btn-white"
                    text={"CANCEL"}
                    onClick={onClose}
                    disabled={isSubmitting || isDownloading}
                  />

                  <Submit
                    className="no-spacing small-button width-auto success-button"
                    text={isSubmitting ? "Loading..." : "SUBMIT"}
                    onClick={handleSubmit}
                    disabled={isSubmitting || !selectedFile || isDownloading}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

UploadCSVPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDownloadTemplate: PropTypes.func,
  title: PropTypes.string,
  downloadAPI: PropTypes.string.isRequired,
  downloadFileName: PropTypes.string,
  isSubmitting: PropTypes.bool,
  setIsUploading: PropTypes.func.isRequired,
  refetchApi: PropTypes.func,
  isDownloadButton: PropTypes.bool,
  errorData: PropTypes.array,
  setErrorData: PropTypes.func,
};

export default UploadCSVPopup;
