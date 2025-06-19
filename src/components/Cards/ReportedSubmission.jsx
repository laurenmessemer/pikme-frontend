/*
 * File: ReportedSubmission.jsx
 * Author: HARSH CHAUHAN
 * Created Date: June 18th, 2025
 * Description: This file show the data of reported competition image.
 */

import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/UseAuth"; // ✅ Auth hook
import "../../styles/components/MySubmission.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  GET_BY_ID_COMPETITIONS,
  REPLACE_VIOLATED_IMAGE,
} from "../../constant/ApiUrls";
import UploadImage from "./UploadImage";
import LazyImage from "../Common/LazyImage";
import ReportedSubmissionCard from "./ReportedSubmissionCard";
import { checkSuccessResponse } from "../../utils/RouterUtils";
import { api } from "../../api";
import ToastUtils from "../../utils/ToastUtils";
import ReporetdImageSkeletonCard from "./ReporetdImageSkeletonCard";

const ReportedSubmission = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isImageLoading, setImageLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const competitionId = searchParams.get("competitionId");
  const { user, token } = useAuth(); // ✅ get auth user

  const isLoggedIn = !!user;

  const [loading, setLoading] = useState(true);
  // Fallback to local state if no props provided
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Handle redirects using useEffect to avoid conditional returns
  useEffect(() => {
    if (!competitionId) {
      navigate("/leaderboard");
      return;
    }
    if (competitionId && (!(user?.id || token) || user?.role === "admin")) {
      navigate(`/login?competitionId=${competitionId}`);
      return;
    }
  }, [competitionId, user?.id, user?.role, token, navigate]);

  const handleSubmissionClick = (submission) => {
    if (!submission?.id) {
      return;
    }

    const contestData = {
      theme: submission?.Contest?.Theme?.name || "Unknown Theme",
      contestStatus: submission?.Contest?.status || "Upcoming",
      matchType: submission?.match_type || "pick_random",
      inviteLink: submission.invite_link || null,
      entry_fee: submission?.Contest?.entry_fee || 0,
      contestId: submission?.Contest?.id || null,
      winnings: submission?.Contest?.winnings || {},
    };

    setSelectedSubmission({
      contestData,
      competitionId: submission.id,
    });
  };

  const handleUpload = async (file) => {
    if (!file) {
      return;
    }
    if (!user?.id) {
      return;
    }

    setImageFile(file);
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

  const handleSubmitClick = async () => {
    if (!imageFile || !user?.id || !selectedSubmission) {
      return;
    }
    setIsFormLoading(true);
    try {
      const response = await api({
        endpoint: REPLACE_VIOLATED_IMAGE,
        payloadData: {
          competitionId: competitionId,
          newImageUrl: imageUrl,
        },
      });

      if (checkSuccessResponse(response)) {
        ToastUtils.success(`Image replaced successfully!`);
        navigate("/");
        setIsFormLoading(false);
      }
    } catch (error) {
      setIsFormLoading(false);
    } finally {
      setIsFormLoading(false);
    }
  };

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!user?.id) {
        setLoading(false); // prevent loading spinner from staying forever
        return;
      }
      try {
        setLoading(true);
        setError(null);

        const response = await api({
          endpoint: GET_BY_ID_COMPETITIONS,
          params: {
            competitionId: competitionId,
          },
        });

        if (response && checkSuccessResponse(response)) {
          handleSubmissionClick(response.data?.competition);
        } else {
          const errorMessage =
            response?.data?.message ||
            "Failed to load details. Please try again later.";
          setError(errorMessage);
        }
      } catch (err) {
        setError("Failed to load details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn && user?.id && competitionId) {
      fetchSubmissions();
    } else {
      setLoading(false); // skip fetching if not logged in
    }
  }, [user?.id, isLoggedIn, competitionId]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Show nothing if we're redirecting
  if (
    !competitionId ||
    (competitionId && (!user?.id || user?.role === "admin"))
  ) {
    return null;
  }

  return (
    <div className="my-submissions-container">
      {loading ? (
        <ReporetdImageSkeletonCard />
      ) : (
        <>
          {isLoggedIn ? (
            <>
              {selectedSubmission ? (
                <div className="step-two-container flex">
                  <ReportedSubmissionCard
                    contestTitle={
                      selectedSubmission.contestData?.theme || "Contest Title"
                    }
                    contestDescription={
                      selectedSubmission.contestData?.Theme?.description
                    }
                    allData={selectedSubmission.contestData}
                    onSubmit={handleSubmitClick}
                    disabled={imageUrl ? false : true}
                    isLoading={isFormLoading}
                  />
                  {imageUrl ? (
                    <div className="uploaded-image-container">
                      <LazyImage
                        src={imageUrl}
                        alt="Uploaded Preview"
                        className="uploaded-image"
                      />
                    </div>
                  ) : (
                    <UploadImage
                      onUpload={handleUpload}
                      isImageLoading={isImageLoading}
                    />
                  )}
                </div>
              ) : (
                <></>
              )}
            </>
          ) : (
            <div className="no-competitions-container">
              <div className="no-competitions-box">
                <h3 className="no-competitions-title">Log in to see details</h3>
                <p className="no-competitions-message">
                  Create an account or log in to see details on more
                  competition!
                </p>
                <button
                  className="no-competitions-button"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

ReportedSubmission.propTypes = {};

export default ReportedSubmission;
