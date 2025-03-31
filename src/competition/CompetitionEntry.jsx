import { useState } from "react";
import { useCompetition } from "../context/CompetitionContext";
import "../styles/competition/CompetitionEntry.css";
import StepFour from "./StepFour";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";

const CompetitionEntry = () => {
  const { contestId, setContestId } = useCompetition(); // ⬅️ imageUrl & imageFile now come from context, so no need for entryData
  const [entryData, setEntryData] = useState(null);     // ✅ Still tracking extra data from Step 2
  const [step, setStep] = useState(1);
  const [matchType, setMatchType] = useState("pick_random");
  const [inviteLink, setInviteLink] = useState(null);

  const nextStep = (data) => {
    console.log("🔁 CompetitionEntry nextStep() called with:", data);

    if (step === 1 && data) {
      setContestId(data);
    } else if (step === 2 && data) {
      setEntryData(data); // ✅ Preserve other data (like fileKey)
      setMatchType(data.matchType || "pick_random");
    } else if (step === 3 && data) {
      setMatchType(data.matchType || "pick_random");
      if (data.matchType === "invite_friend") {
        setInviteLink(data.inviteLink);
      }
    }

    setStep((prev) => prev + 1);
  };

  console.log("🎯 Current matchType in CompetitionEntry:", matchType);

  return (
    <div className="competition-entry-container">
      {step === 1 && <StepOne nextStep={nextStep} />}
      {step === 2 && contestId && <StepTwo nextStep={nextStep} />}
      {step === 3 && entryData && contestId && (
        <StepThree
          contestId={contestId}
          matchType={matchType}
          nextStep={nextStep}
        />
      )}
      {step === 4 && (
        <StepFour
          contestId={contestId}
          matchType={matchType}
          inviteLink={inviteLink}
        />
      )}
    </div>
  );
};

export default CompetitionEntry;


// import { useState } from "react";
// import { useCompetition } from "../context/CompetitionContext";
// import "../styles/competition/CompetitionEntry.css";
// import StepFour from "./StepFour";
// import StepOne from "./StepOne";
// import StepThree from "./StepThree";
// import StepTwo from "./StepTwo";

// const CompetitionEntry = () => {
//   const { contestId, setContestId, entryData, setEntryData } = useCompetition();
//   const [step, setStep] = useState(1);
//   const [matchType, setMatchType] = useState("pick_random"); // ✅ Default matchType
//   const [inviteLink, setInviteLink] = useState(null);

//   const nextStep = (data) => {
//     console.log("🔁 CompetitionEntry nextStep() called with:", data); // 🔍 Add this
  
//     if (step === 1 && data) {
//       setContestId(data);
//     } else if (step === 2 && data) {
//       setEntryData(data);
//       setMatchType(data.matchType || "pick_random"); // ✅ Ensure matchType is defined
//     } else if (step === 3 && data) {
//       setMatchType(data.matchType || "pick_random"); // ✅ Ensure matchType persists
//       if (data.matchType === "invite_friend") {
//         setInviteLink(data.inviteLink);
//       }
//     }
//     setStep((prev) => prev + 1);
//   };

//   console.log("🎯 Current matchType in CompetitionEntry:", matchType);

//   return (
//     <div className="competition-entry-container">
//       {step === 1 && <StepOne nextStep={nextStep} />}
//       {step === 2 && contestId && <StepTwo contestId={contestId} nextStep={nextStep} />}
//       {step === 3 && entryData && contestId && (
//         <StepThree 
//           contestId={contestId} 
//           imageUrl={entryData.imageUrl} 
//           imageFile={entryData.imageFile}  // ✅ Pass imageFile to StepThree
//           matchType={matchType} 
//           nextStep={nextStep} 
//         />
//       )}
//       {step === 4 && entryData && (
//         <StepFour 
//           contestId={contestId} 
//           imageUrl={entryData.imageUrl} 
//           imageFile={entryData.imageFile}  // ✅ Pass imageFile to StepFour
//           matchType={matchType} 
//           inviteLink={inviteLink} 
//         />
//       )}
//     </div>
//   );
// };

// export default CompetitionEntry;
