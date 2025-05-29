import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SubmissionWallet from "../components/Cards/SubmissionWallet";
import UploadImage from "../components/Cards/UploadImage";
import { useAuth } from "../context/UseAuth";
import { WalletContext } from "../context/WalletContext";
import "../styles/pages/JoinInvite.css";

const JoinInvite = () => {
  const { inviteLink } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { balance, setBalance, refreshBalance } = useContext(WalletContext);

  const [competition, setCompetition] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [entryFee, setEntryFee] = useState(null);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [isImageLoading, setImageLoading] = useState(false); // add this in your component

  useEffect(() => {
    if (!user) {
      navigate(`/signup?redirect=/join/${inviteLink}`);
      return;
    }

    const fetchCompetition = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/competition-entry/invite/${inviteLink}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        setCompetition(res.data.competition);
        setEntryFee(res.data.competition?.Contest?.entry_fee || 0);
      } catch (err) {
        console.error("❌ Error loading invite competition:", err);
        setError(err.response?.data?.message || "Error loading invite.");
      }
    };

    fetchCompetition();
  }, [user, inviteLink, navigate]);

  const handleUpload = async (file) => {
    if (!file || !competition) return;
    setImageLoading(true);

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/competition-entry/get-upload-url`,
        {
          params: {
            user_id: user.id,
            contest_id: competition.contest_id,
            match_type: "invite_friend",
            fileType: file.type,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      await axios.put(res.data.uploadURL, file, {
        headers: {
          "Content-Type": file.type,
          "ngrok-skip-browser-warning": "true",
        },
      });

      const finalUrl = res.data.uploadURL.split("?")[0];
      setImageUrl(finalUrl);
    } catch (err) {
      setImageLoading(false);
      console.error("❌ Upload error:", err);
      setError("Upload failed. Try again.");
    } finally {
      setImageLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!user || !imageUrl || !competition) return;
    setProcessing(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/competition-entry/accept-invite`,
        {
          inviteLink,
          user_id: user.id,
          imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      if (res.data.new_balance !== undefined) {
        setBalance(res.data.new_balance);
        refreshBalance();
      }

      console.log("✅ Joined invite competition!");
      navigate("/"); // or route to result page
    } catch (err) {
      console.error("❌ Join failed:", err);
      setError(err.response?.data?.message || "Join failed.");
    } finally {
      setProcessing(false);
    }
  };

  if (error) return <p className="error">{error}</p>;
  if (!competition) return <p>Loading competition...</p>;

  return (
    <div className="join-invite-container">
      <h2 className="join-header">You are joining a friend’s competition!</h2>

      {imageUrl ? (
        <div className="uploaded-image-container">
          <img src={imageUrl} alt="Your Upload" className="uploaded-image" />
        </div>
      ) : (
        <UploadImage onUpload={handleUpload} isImageLoading={isImageLoading} />
      )}

      <SubmissionWallet
        contestTitle="Join Competition"
        contestId={competition.contest_id}
        balance={balance}
        entryFee={entryFee ?? 0}
        totalCharge={entryFee ?? 0}
        confirmText={processing ? "Processing..." : "Confirm & Join"}
        onConfirm={handleConfirm}
        disableConfirm={processing || !imageUrl}
      />
    </div>
  );
};

export default JoinInvite;
