import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import SubmissionCard from "../components/Cards/SubmissionCard";
import UploadImage from "../components/Cards/UploadImage";
import HowToVote from "../components/Popups/HowToPlay";
import { useCompetition } from "../context/CompetitionContext";
import { useAuth } from "../context/UseAuth";
import ToastUtils from "../utils/ToastUtils";

const preloadImage = (url) => {
  const img = new Image();
  img.src = url;
};

const StepTwoInvite = ({ nextStep }) => {
  const {
    contestId,
    imageUrl,
    setImageUrl,
    imageFile,
    setImageFile,
    setMatchType,
  } = useCompetition();

  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isImageLoading, setImageLoading] = useState(false); // add this in your component
  const [error, setError] = useState(null);
  const [fileKey, setFileKey] = useState(null);
  const [showHowToVote, setShowHowToVote] = useState(true);

  const { user, token } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    if (!contestId) {
      setError("Contest ID is missing.");
      setLoading(false);
      return;
    }

    const fetchContestDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/contests/${contestId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        setContest(response.data);
      } catch (err) {
        console.error("❌ Error fetching contest details:", err);
        setError("Failed to load contest details.");
      } finally {
        setLoading(false);
      }
    };

    fetchContestDetails();
  }, [contestId]);

  const handleUpload = async (file) => {
    if (!file) return;
    setImageFile(file);
    setMatchType("invite_friend");
    setImageLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/competition-entry/get-upload-url`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
          params: {
            user_id: userId,
            contest_id: contestId,
            match_type: "invite_friend",
            fileType: file.type,
          },
        }
      );

      const { uploadURL, fileKey, pendingEntryId } = response.data;

      await axios.put(uploadURL, file, {
        headers: {
          "Content-Type": file.type,
          "Cache-Control": "public, max-age=31536000, immutable",
          "ngrok-skip-browser-warning": "true",
        },
      });

      const imageUrl = uploadURL.split("?")[0];
      setImageUrl(imageUrl);
      setFileKey(fileKey);
      preloadImage(imageUrl);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/competition-entry/update-image`,
        {
          pendingEntryId,
          imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
    } catch (error) {
      setImageLoading(false);
      console.error("❌ Upload failed:", error);
      setError("Upload failed. Please try again.");
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!imageFile) {
      // alert("Please upload an image before proceeding.");
      ToastUtils.warning("Please upload an image before proceeding.");
      return;
    }
    nextStep({ imageUrl, imageFile, matchType: "invite_friend", fileKey });
  };

  if (loading) return <p>Loading contest details...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <>
      {showHowToVote && <HowToVote onClose={() => setShowHowToVote(false)} />}
      <div className="step-two-container flex">
        <SubmissionCard
          contestId={contest?.id}
          contestTitle={contest?.Theme?.name || "Contest Title"}
          contestDescription={
            contest?.Theme?.description || "No description available"
          }
          entryFee={contest?.entry_fee || 0}
          showOpponentButtons={false}
          onSubmit={handleSubmit}
          allData={contest}
        />
        {imageUrl ? (
          <div className="uploaded-image-container">
            <img
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
    </>
  );
};

StepTwoInvite.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default StepTwoInvite;
