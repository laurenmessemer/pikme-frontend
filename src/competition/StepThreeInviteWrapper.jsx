import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StepThreeInvite from "../competition/StepThreeInvite";
import { useAuth } from "../context/UseAuth";

const StepThreeInviteWrapper = () => {
  const { inviteCode } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [competition, setCompetition] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(
      "🟢 StepThreeInviteWrapper mounted with inviteCode:",
      inviteCode
    );

    const fetchCompetition = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/competition-entry/invite/${inviteCode}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
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
  if (!competition)
    return <p className="loading-message">🔄 Loading match...</p>;

  return (
    <StepThreeInvite
      contestId={competition.contest_id}
      inviteLink={inviteCode}
      entryFee={1}
      nextStep={({ newBalance, imageUrl }) => {
        navigate(`/join/upload/${inviteCode}/done`, {
          state: {
            newBalance,
            imageUrl,
          },
        });
      }}
    />
  );
};

export default StepThreeInviteWrapper;
