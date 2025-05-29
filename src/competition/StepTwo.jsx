import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import SubmissionCard from "../components/Cards/SubmissionCard";
import UploadImage from "../components/Cards/UploadImage";
import HowToVote from "../components/Popups/HowToPlay"; // ✅ Import the popup
import { useCompetition } from "../context/CompetitionContext";
import { useAuth } from "../context/UseAuth";
import ToastUtils from "../utils/ToastUtils";
import LazyImage from "../components/Common/LazyImage";

const preloadImage = (url) => {
  const img = new Image();
  img.src = url;
};

const StepTwo = ({ nextStep, previusStep = () => {} }) => {
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
  const [selectedOpponent, setSelectedOpponent] = useState("pick_random");
  const [fileKey, setFileKey] = useState(null); // ✅ State to store file key
  const [showHowToVote, setShowHowToVote] = useState(true); // ✅ Show popup on load
  const { user, token } = useAuth(); // Get user details from context

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
    if (!file) {
      console.warn("⚠️ No file provided for upload.");
      return;
    }

    if (!userId) {
      console.error("❌ Cannot upload image — user ID is missing.");
      return;
    }

    setImageFile(file);
    setImageLoading(true);

    try {
      console.log("📤 Requesting pre-signed URL with:", {
        user_id: userId,
        contest_id: contestId,
        match_type: selectedOpponent,
        fileType: file.type,
      });

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
            match_type: selectedOpponent,
            fileType: file.type,
          },
        }
      );

      const { uploadURL, fileKey, pendingEntryId } = response.data;
      console.log("✅ Pre-signed URL received:", uploadURL);

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
      setMatchType(selectedOpponent);
      preloadImage(imageUrl);

      const updateResponse = await axios.post(
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

      console.log("✅ Backend response:", updateResponse.data);
    } catch (error) {
      setImageLoading(false);
      console.error(
        "❌ Upload failed:",
        error?.response?.data || error.message
      );
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmit = (data) => {
    let formData = {};
    if (!imageFile) {
      // alert("Please upload an image before proceeding.");
      ToastUtils.warning("Please upload an image before proceeding.");
      return;
    }
    if (selectedOpponent === "invite_friend") {
      formData = data;
    }
    nextStep({
      imageUrl,
      imageFile,
      matchType: selectedOpponent,
      fileKey,
      ...formData,
    });
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
          selectedOpponent={selectedOpponent}
          onOpponentSelect={setSelectedOpponent}
          onSubmit={handleSubmit}
          isManageRedirect={true}
          previusStep={previusStep}
          isShowPreviousButton={true}
          allData={contest}
        />
        {imageUrl ? (
          <div className="uploaded-image-container">
            <LazyImage
              src={imageUrl}
              alt="Uploaded Preview"
              className="uploaded-image"
            />
            {/* <img
              src={imageUrl}
              alt="Uploaded Preview"
              className="uploaded-image"
              onError={onImageError}
            /> */}
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

StepTwo.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default StepTwo;
