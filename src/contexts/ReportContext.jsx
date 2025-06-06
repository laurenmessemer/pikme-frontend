import { createContext, useContext, useState } from "react";
import { api } from "../api";
import {
  GET_ALL_REPORTS,
  GET_REPORTED_REPORTS,
  GET_REPORTED_IMAGES,
} from "../constant/ApiUrls";
import { checkSuccessResponse } from "../utils/RouterUtils";
import { useAuth } from "../context/UseAuth";
import { countSkipValue } from "../constant/appConstants";

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [allReports, setAllReports] = useState([]);
  const [reportedReports, setReportedReports] = useState([]);
  const [reportedImages, setReportedImages] = useState([]);
  const [allReportsLoading, setAllReportsLoading] = useState(false);
  const [reportedReportsLoading, setReportedReportsLoading] = useState(false);
  const [reportedImagesLoading, setReportedImagesLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllReports = async (paginationData) => {
    if (!user?.id || !token) {
      setAllReportsLoading(false);
      return;
    }

    try {
      setAllReportsLoading(true);
      setError(null);

      const payload = paginationData
        ? {
            limit: paginationData.pageSize,
            skip: countSkipValue(paginationData.page, paginationData.pageSize),
          }
        : {};
      payload.status = paginationData.filter || "All"; // Default to 'all' if no filter is provided
      const response = await api({
        endpoint: GET_ALL_REPORTS,
        params: payload,
      });

      if (response && checkSuccessResponse(response)) {
        const reportsData =
          response.data?.reports || response.data?.data || response.data || [];
        setAllReports(reportsData);
      } else {
        const errorMessage =
          response?.data?.message ||
          "Failed to load reports. Please try again later.";
        setError(errorMessage);
      }
    } catch (err) {
      console.error("❌ Error fetching all reports:", err);
      setError("Failed to load reports. Please try again later.");
    } finally {
      setAllReportsLoading(false);
    }
  };

  const fetchReportedReports = async (paginationData) => {
    if (!user?.id || !token) {
      setReportedReportsLoading(false);
      return;
    }

    try {
      setReportedReportsLoading(true);
      setError(null);

      const payload = paginationData
        ? {
            limit: paginationData.pageSize,
            skip: countSkipValue(paginationData.page, paginationData.pageSize),
          }
        : {};

      const response = await api({
        endpoint: GET_REPORTED_REPORTS,
        params: payload,
      });

      if (response && checkSuccessResponse(response)) {
        const reportsData =
          response.data?.reports || response.data?.data || response.data || [];
        setReportedReports(reportsData);
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
      setReportedReportsLoading(false);
    }
  };

  const fetchReportedImages = async (paginationData) => {
    if (!user?.id || !token) {
      setReportedImagesLoading(false);
      return;
    }

    try {
      setReportedImagesLoading(true);
      setError(null);

      const payload = paginationData
        ? {
            limit: paginationData.pageSize,
            skip: countSkipValue(paginationData.page, paginationData.pageSize),
          }
        : {};

      const response = await api({
        endpoint: GET_REPORTED_IMAGES,
        params: payload,
      });

      if (response && checkSuccessResponse(response)) {
        const imagesData =
          response.data?.images || response.data?.data || response.data || [];
        setReportedImages(imagesData);
      } else {
        const errorMessage =
          response?.data?.message ||
          "Failed to load reported images. Please try again later.";
        setError(errorMessage);
      }
    } catch (err) {
      console.error("❌ Error fetching reported images:", err);
      setError("Failed to load reported images. Please try again later.");
    } finally {
      setReportedImagesLoading(false);
    }
  };

  const value = {
    allReports,
    reportedReports,
    reportedImages,
    allReportsLoading,
    reportedReportsLoading,
    reportedImagesLoading,
    error,
    fetchAllReports,
    fetchReportedReports,
    fetchReportedImages,
  };

  return (
    <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
  );
};

export const useReport = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useReport must be used within a ReportProvider");
  }
  return context;
};
