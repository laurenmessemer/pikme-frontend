import { useState } from "react";
import { useCompetition } from "../context/CompetitionContext"; // Import context
import StepFour from "./StepFour";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";

const CompetitionEntry = () => {
  const { contestId, setContestId, entryData, setEntryData } = useCompetition();
  const [step, setStep] = useState(1);
  const userId = 1; // Replace with actual user ID if needed

  // ✅ Move to the next step while storing contest ID or entry data
  const nextStep = (data) => {
    console.log(`➡️ Moving to Step ${step + 1}`, { data });

    if (step === 1 && data) {
      setContestId(data);
    } else if (step === 2 && data) {
      setEntryData(data);
    }

    setStep((prev) => prev + 1);
  };

  console.log("🔍 Current Step:", step);
  console.log("🏁 CompetitionEntry - contestId:", contestId);
  console.log("📸 Entry Data -", entryData);

  return (
    <div className="competition-entry-container">
      {step === 1 && <StepOne nextStep={nextStep} />}
      {step === 2 && contestId && (
        <StepTwo contestId={contestId} nextStep={nextStep} />
      )}
      {step === 3 && entryData && contestId ? (
        <StepThree
          contestId={contestId}
          userId={userId} // ✅ Fixed missing userId prop
          imageUrl={entryData.imageUrl}
          nextStep={nextStep}
        />
      ) : (
        step === 3 && (
          <p className="error">❌ StepThree Not Loading: Missing Entry Data</p>
        )
      )}
      {step === 4 && entryData && (
        <StepFour contestId={contestId} imageUrl={entryData.imageUrl} />
      )}
    </div>
  );
};

export default CompetitionEntry;
