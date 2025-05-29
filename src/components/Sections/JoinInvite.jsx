import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StepThreeInvite from "../../competition/StepThreeInvite";
import StepTwoInvite from "../../competition/StepTwoInvite"; // 👈 new!
import { useCompetition } from "../../context/CompetitionContext";
import { useAuth } from "../../context/UseAuth";

const JoinInvite = () => {
  const { inviteLink } = useParams();
  const { user, token } = useAuth();
  const { setContestId } = useCompetition();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [competitionData, setCompetitionData] = useState(null);
  const [step, setStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    const fetchCompetition = async () => {
      try {
        const res = await fetch(
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
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch invite.");

        setCompetitionData(data.competition);
        setContestId(data.competition.contest_id); // ✅ save for context use
      } catch (err) {
        console.error("❌ Invite Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetition();
  }, [inviteLink, setContestId]);

  const goToStepThree = (data) => {
    setUploadedImage(data.imageUrl);
    setStep(2);
  };

  const completeEntry = () => {
    setStep(3);
  };

  if (loading) return <p className="loading-message">🔄 Checking invite...</p>;
  if (error) return <p className="error-message">❌ {error}</p>;
  if (!user)
    return (
      <p className="error-message">🔒 Please log in to join the contest.</p>
    );

  return (
    <div className="join-invite-container">
      {step === 1 && <StepTwoInvite nextStep={goToStepThree} />}
      {step === 2 && (
        <StepThreeInvite
          contestId={competitionData.contest_id}
          inviteLink={inviteLink}
          entryFee={1}
          uploadedImage={uploadedImage}
          nextStep={completeEntry}
        />
      )}
      {step === 3 && (
        <div className="join-complete">
          <h2>You’ve successfully joined the match!</h2>
          <p>Head over to the Leaderboard to see your entry 🔥</p>
        </div>
      )}
    </div>
  );
};

export default JoinInvite;
