import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StepFourInvite from "./StepFourInvite";
import { useAuth } from "../context/UseAuth";

const StepFourInviteWrapper = () => {
  const { token } = useAuth();
  const { inviteCode } = useParams();
  const [competition, setCompetition] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(
      "📩 StepFourInviteWrapper mounted with inviteCode:",
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
        console.log("✅ StepFour loaded contest:", data.competition);
      } catch (err) {
        console.error("❌ StepFourInvite error:", err);
        setError(err.message);
      }
    };

    fetchCompetition();
  }, [inviteCode]);

  if (error) return <p className="error-message">❌ {error}</p>;
  if (!competition)
    return <p className="loading-message">🔄 Loading match...</p>;

  return <StepFourInvite inviteLink={inviteCode} joinedExistingMatch={true} />;
};

export default StepFourInviteWrapper;
