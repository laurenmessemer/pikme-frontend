import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import XButton from "../components/Buttons/XButton";
import SubmissionCard from "../components/Cards/SubmissionCard";
import UploadImage from "../components/Cards/UploadImage";
import { useCompetition } from "../context/CompetitionContext";
import { useAuth } from "../../context/UseAuth";
import ToastUtils from "../../utils/ToastUtils";

const StepTwo = ({ nextStep }) => {
  // ❌ Removed userId
  const { contestId, imageUrl, setImageUrl } = useCompetition();
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

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

  // Load stored image if missing
  useEffect(() => {
    if (!imageUrl) {
      const savedImage = localStorage.getItem("uploadedImage");
      if (savedImage) {
        setImageUrl(savedImage);
      }
    }
  }, [imageUrl, setImageUrl]);

  // Handle image upload
  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
      localStorage.setItem("uploadedImage", reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle image removal
  const handleRemoveImage = () => {
    setImageUrl(null);
    localStorage.removeItem("uploadedImage");
  };

  // Handle submission (moves to StepThree)
  const handleSubmit = () => {
    if (!imageUrl) {
      // alert("Please upload an image before proceeding.");
      ToastUtils.warning("Please upload an image before proceeding.");
      return;
    }

    console.log("✅ Moving to StepThree with:", { imageUrl });

    nextStep({ imageUrl }); // ✅ Pass imageUrl to StepThree
  };

  if (loading) return <p>Loading contest details...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="step-two-container flex">
      <SubmissionCard
        contestId={contest?.id}
        contestTitle={contest?.Theme?.name || "Contest Title"}
        contestDescription={
          contest?.Theme?.description || "No description available"
        }
        entryFee={contest?.entry_fee || 0}
        onSubmit={handleSubmit}
      />

      {imageUrl ? (
        <div className="uploaded-image-container">
          <XButton onClick={handleRemoveImage} />
          <img
            src={imageUrl}
            alt="Uploaded Preview"
            className="uploaded-image"
          />
        </div>
      ) : (
        <UploadImage onUpload={handleUpload} />
      )}
    </div>
  );
};

StepTwo.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default StepTwo;
