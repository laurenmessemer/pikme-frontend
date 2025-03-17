import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import SubmissionWallet from "../components/Cards/SubmissionWallet";
import UploadImage from "../components/Cards/UploadImage"; // ✅ Importing UploadImage
import { useCompetition } from "../context/CompetitionContext";
import { useAuth } from "../context/UseAuth";
import { WalletContext } from "../context/WalletContext";
import "../styles/competition/StepThree.css";

const StepThree = ({ nextStep }) => {
  const { balance, setBalance, refreshBalance } = useContext(WalletContext);
  const { contestId, imageUrl, matchType } = useCompetition();
  const { user } = useAuth();
  const userId = user?.id;

  const [entryFee, setEntryFee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!contestId) {
      setError("Missing contest ID. Please restart the process.");
      return;
    }

    const fetchContestData = async () => {
      try {
        console.log("📡 Fetching contest data for:", contestId);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/contests/${contestId}`);
        setEntryFee(response.data.entry_fee ?? 0);
      } catch (error) {
        console.error("❌ Error fetching contest details:", error);
        setError("Failed to load contest details.");
        setEntryFee(0);
      } finally {
        setLoading(false);
      }
    };

    fetchContestData();
  }, [contestId]);

  const handleConfirmPayment = async () => {
    if (!userId || !contestId || entryFee === null || !matchType) {
      console.error("❌ Missing required data:", { userId, contestId, entryFee, matchType });
      setError("Missing required data. Please try again.");
      return;
    }
  
    setProcessing(true);
  
    try {
      const payload = {
        user_id: userId,
        contest_id: contestId,
        entry_fee: entryFee, // ✅ Send entry fee dynamically
        match_type: matchType, // ✅ Ensure match_type is passed
      };
  
      console.log("📡 Sending Confirm Payment Request:", payload); // ✅ Debugging
  
      const response = await axios.post(
        "${import.meta.env.VITE_API_URL}/api/competition-entry/confirm-payment",
        payload
      );
  
      if (response.data.new_balance !== undefined) {
        setBalance(response.data.new_balance);
      }
      refreshBalance();
  
      console.log("✅ Payment confirmed, moving to competition entry...");
      
      // ✅ Move to next step and pass received competition data
      nextStep({
        imageUrl,
        matchType,
        competition: response.data.competition,
        inviteLink: response.data.inviteLink,
        joinedExistingMatch: response.data.joinedExistingMatch,
      });
  
    } catch (error) {
      console.error("❌ Payment failed:", error.response?.data || error);
      setError(error.response?.data?.message || "Payment failed.");
    } finally {
      setProcessing(false);
    }
  };
  

  if (loading) return <p className="loading-message">🔄 Loading contest details...</p>;
  if (error) return <p className="error-message">❌ {error}</p>;

  return (
    <div className="step-three-container flex">
      <SubmissionWallet
        contestTitle="Competition Entry"
        contestId={contestId}
        balance={balance}
        entryFee={entryFee ?? 0}
        totalCharge={entryFee ?? 0}
        confirmText={processing ? "Processing..." : "Confirm & Pay"}
        onConfirm={handleConfirmPayment}
        disableConfirm={processing}
      />

      {imageUrl ? (
        <div className="uploaded-image-container">
          <img src={imageUrl} alt="Uploaded Preview" className="uploaded-image" />
        </div>
      ) : (
        <UploadImage disabled={true} /> // ✅ Disabled Upload, Only Showing UI
      )}
    </div>
  );
};

StepThree.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default StepThree;
