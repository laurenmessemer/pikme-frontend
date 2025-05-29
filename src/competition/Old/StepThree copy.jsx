import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import SubmissionWallet from "../components/Cards/SubmissionWallet";
import InsufficientFunds from "../components/Popups/InsufficientFunds";
import AuthContext from "../context/AuthContext";
import { useCompetition } from "../context/CompetitionContext";
import { WalletContext } from "../context/WalletContext";

const StepThree = ({ nextStep }) => {
  const { balance, setBalance, refreshBalance } = useContext(WalletContext);
  const { user, token } = useContext(AuthContext);
  const { contestId, imageUrl } = useCompetition();

  const [entryFee, setEntryFee] = useState(null);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [showInsufficientFunds, setShowInsufficientFunds] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contestId) {
      setError("Missing contest ID. Please restart the process.");
      return;
    }

    const fetchContestData = async () => {
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
        setEntryFee(response.data.entry_fee ?? 0); // Prevent null errors
      } catch (error) {
        console.error("❌ Error fetching contest details:", error);
        setError("Failed to load contest details.");
        setEntryFee(0); // Default value
      } finally {
        setLoading(false);
      }
    };

    fetchContestData();
  }, [contestId]);

  const handleConfirmAndEnter = async () => {
    if (!user) {
      setError("User data is missing. Please refresh and try again.");
      return;
    }

    if (!imageUrl) {
      setError("Image is missing. Please upload before entering.");
      return;
    }

    if (balance < entryFee) {
      setShowInsufficientFunds(true);
      return;
    }

    setProcessing(true);

    console.log("📸 Submitting entry with image:", imageUrl); // ✅ Debugging

    try {
      // ✅ Deduct tokens first
      const tokenResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/competition-entry/use-token`,
        {
          user_id: user.id,
          contest_id: contestId,
          user1_image: imageUrl, // ✅ Ensure image is included
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      if (tokenResponse.data.new_balance !== undefined) {
        console.log(
          "✅ Tokens deducted. New Balance:",
          tokenResponse.data.new_balance
        );
        setBalance(tokenResponse.data.new_balance); // ✅ Update balance immediately
      }

      refreshBalance(); // ✅ Ensure consistency

      // ✅ Directly enter the competition (no checks for duplicates or open matches)
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/competition-entry/enter`,
        {
          user_id: user.id,
          contest_id: contestId,
          image_url: imageUrl, // ✅ Ensure image is included
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      nextStep();
    } catch (error) {
      console.error(
        "❌ Error processing entry:",
        error.response?.data || error
      );
      setError(
        error.response?.data?.message || "Failed to process competition entry."
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="step-three-container flex">
      {showInsufficientFunds && (
        <InsufficientFunds onClose={() => setShowInsufficientFunds(false)} />
      )}
      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="loading">⏳ Loading contest details...</p>
      ) : (
        <SubmissionWallet
          contestTitle="Competition Entry"
          contestId={contestId}
          contestIcon="/icons/trophy.svg"
          balance={balance}
          entryFee={entryFee ?? 0} // Prevent null errors
          totalCharge={entryFee ?? 0} // Prevent null errors
          confirmText={processing ? "Processing..." : "Confirm & Pay"}
          onConfirm={handleConfirmAndEnter}
          disableConfirm={processing}
        />
      )}

      <div className="uploaded-image-container">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Uploaded Preview"
            className="uploaded-image"
          />
        ) : (
          <p className="error">⚠️ No image uploaded!</p>
        )}
      </div>
    </div>
  );
};

StepThree.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default StepThree;
