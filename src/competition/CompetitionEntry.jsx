import { useState } from "react";
import { useCompetition } from "../context/CompetitionContext";
import "../styles/competition/CompetitionEntry.css";
import StepFour from "./StepFour";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";

const CompetitionEntry = () => {
  const { contestId, setContestId, entryData, setEntryData } = useCompetition();
  const [step, setStep] = useState(1);
  const [matchType, setMatchType] = useState("pick_random"); // ✅ Default matchType
  const [inviteLink, setInviteLink] = useState(null);

  const nextStep = (data) => {
    if (step === 1 && data) {
      setContestId(data);
    } else if (step === 2 && data) {
      setEntryData(data);
      setMatchType(data.matchType || "pick_random"); // ✅ Ensure matchType is defined
    } else if (step === 3 && data) {
      setMatchType(data.matchType || "pick_random"); // ✅ Ensure matchType persists
      if (data.matchType === "invite_friend") {
        setInviteLink(data.inviteLink);
      }
    }
    setStep((prev) => prev + 1);
  };

  return (
    <div className="competition-entry-container">
      {step === 1 && <StepOne nextStep={nextStep} />}
      {step === 2 && contestId && <StepTwo contestId={contestId} nextStep={nextStep} />}
      {step === 3 && entryData && contestId && (
        <StepThree 
          contestId={contestId} 
          imageUrl={entryData.imageUrl} 
          imageFile={entryData.imageFile}  // ✅ Pass imageFile to StepThree
          matchType={matchType} 
          nextStep={nextStep} 
        />
      )}
      {step === 4 && entryData && (
        <StepFour 
          contestId={contestId} 
          imageUrl={entryData.imageUrl} 
          imageFile={entryData.imageFile}  // ✅ Pass imageFile to StepFour
          matchType={matchType} 
          inviteLink={inviteLink} 
        />
      )}
    </div>
  );
};

export default CompetitionEntry;
