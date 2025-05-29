import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useCompetition } from "../context/CompetitionContext";
import { useAuth } from "../context/UseAuth";
import StepTwoInvite from "./StepTwoInvite";

const StepTwoInviteWrapper = () => {
  const { inviteCode } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { setContestId, setImageFile, setImageUrl } = useCompetition();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("🟢 StepTwoInviteWrapper mounted with inviteCode:", inviteCode);
    console.log("👤 User at mount:", user);

    // Clear old data
    setImageFile(null);
    setImageUrl(null);

    const fetchContest = async () => {
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

        if (!res.ok)
          throw new Error(data.message || "Invalid or expired invite.");

        setContestId(data.competition.contest_id);
        console.log("✅ Contest fetched:", data.competition);
      } catch (err) {
        console.error("❌ Invite Load Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContest();
  }, [inviteCode, user, setContestId, setImageFile, setImageUrl]);

  if (user === undefined)
    return <p className="loading-message">🔐 Checking authentication...</p>;
  if (!user)
    return <Navigate to={`/login?redirect=/join/upload/${inviteCode}`} />;
  if (loading) return <p className="loading-message">🔄 Loading contest...</p>;
  if (error) return <p className="error-message">❌ {error}</p>;

  return (
    <StepTwoInvite
      nextStep={() => navigate(`/join/upload/${inviteCode}/confirm`)}
    />
  );
};

export default StepTwoInviteWrapper;
