import { useState } from "react";
import Confirmation from "../components/Cards/Confirmation";
import JackpotCard from "../components/Cards/JackpotCard";
import SubmissionCard from "../components/Cards/SubmissionCard";
import UploadImage from "../components/Cards/UploadImage";
import "../styles/pages/Compete.css";

const JackpotFlow = () => {
  const [step, setStep] = useState(1); // Tracks which step user is on

  return (
    <div className="compete-page bg-secondary flex">
      <div className="container compete-container">
        {step === 1 && (
          <JackpotCard 
            themeName="Sunset Vibes"
            prizePool={500}
            entryFee={10}
            onSubmit={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <>
            <SubmissionCard contestTitle="Sunset Vibes" />
            <UploadImage onUpload={() => setStep(3)} />
          </>
        )}

        {step === 3 && <Confirmation />}
      </div>
    </div>
  );
};

export default JackpotFlow;
