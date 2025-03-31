import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import SubmissionWallet from "../components/Cards/SubmissionWallet";
import UploadImage from "../components/Cards/UploadImage";
import { useCompetition } from "../context/CompetitionContext"; // 👈 added
import { useAuth } from "../context/UseAuth";
import { WalletContext } from "../context/WalletContext";
import "../styles/competition/StepThree.css";

const StepThreeInvite = ({ contestId, inviteLink, entryFee, nextStep }) => {
  const { balance, setBalance, refreshBalance } = useContext(WalletContext);
  const { user } = useAuth();
  const userId = user?.id;

  const {
    imageUrl,
    setImageUrl,
    setImageFile,
  } = useCompetition(); // 👈 use context

  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (file) => {
    setUploading(true);
    setError(null);

    try {
      const fileType = file.type;
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/competition-entry/get-upload-url`,
        {
          params: {
            user_id: userId,
            contest_id: contestId,
            match_type: "invite_friend",
            fileType,
          },
        }
      );

      const { uploadURL, fileKey } = res.data;

      await axios.put(uploadURL, file, {
        headers: { "Content-Type": fileType },
      });

      const publicUrl = `https://${import.meta.env.VITE_S3_BUCKET}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${fileKey}`;

      setImageFile(file);
      setImageUrl(publicUrl);
    } catch (err) {
      console.error("❌ Image Upload Failed:", err);
      setError("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleConfirmInvite = async () => {
    if (!userId || !inviteLink || !imageUrl) {
      setError("Missing required info. Make sure you've uploaded an image.");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const payload = {
        inviteLink,
        user_id: userId,
        imageUrl,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/competition-entry/accept-invite`,
        payload
      );

      if (response.data.new_balance !== undefined) {
        setBalance(response.data.new_balance);
      }

      refreshBalance();

      nextStep({
        imageUrl,
        matchType: "invite_friend",
        competition: response.data.competition,
        newBalance: response.data.new_balance,
      });

    } catch (err) {
      console.error("❌ Failed to join invite:", err);
      setError(err.response?.data?.message || "Unable to join contest.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="step-three-container flex">
      <SubmissionWallet
        contestTitle="Competition Entry"
        contestId={contestId}
        balance={balance}
        entryFee={entryFee ?? 0}
        totalCharge={entryFee ?? 0}
        confirmText={processing ? "Processing..." : "Join Now"}
        onConfirm={handleConfirmInvite}
        disableConfirm={processing || !imageUrl}
      />

      {imageUrl ? (
        <div className="uploaded-image-container">
          <img src={imageUrl} alt="Uploaded Preview" className="uploaded-image" />
        </div>
      ) : (
        <UploadImage onUpload={handleImageUpload} disabled={uploading} />
      )}

      {error && <p className="error-message">❌ {error}</p>}
    </div>
  );
};

StepThreeInvite.propTypes = {
  contestId: PropTypes.number.isRequired,
  inviteLink: PropTypes.string.isRequired,
  entryFee: PropTypes.number.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default StepThreeInvite;
