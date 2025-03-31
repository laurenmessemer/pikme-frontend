import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StepThreeInvite from "../competition/StepThreeInvite";
import Confirmation from "../components/Cards/Confirmation";

const StepThreeInviteWrapper = () => {
  const { inviteCode } = useParams();

  const [competition, setCompetition] = useState(null);
  const [error, setError] = useState("");
  const [confirmationData, setConfirmationData] = useState(null);

  useEffect(() => {
    console.log("🟢 StepThreeInviteWrapper mounted with inviteCode:", inviteCode);

    const fetchCompetition = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/competition-entry/invite/${inviteCode}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Invalid invite code.");

        setCompetition(data.competition);
        console.log("✅ StepThree loaded contest:", data.competition);
      } catch (err) {
        console.error("❌ StepThree error:", err);
        setError(err.message);
      }
    };

    fetchCompetition();
  }, [inviteCode]);

  if (error) return <p className="error-message">❌ {error}</p>;
  if (!competition) return <p className="loading-message">🔄 Loading match...</p>;

  if (confirmationData) {
    return (
      <Confirmation
        newBalance={confirmationData.newBalance}
        inviteLink={inviteCode}
        matchType="invite_friend"
        joinedExistingMatch={true}
      />
    );
  }

  return (
    <StepThreeInvite
      contestId={competition.contest_id}
      inviteLink={inviteCode}
      entryFee={1}
      nextStep={({ newBalance }) => {
        setConfirmationData({ newBalance });
      }}
    />
  );
};

export default StepThreeInviteWrapper;
