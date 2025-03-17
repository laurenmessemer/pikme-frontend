import { useState } from "react";
import Confirmation from "../components/Cards/Confirmation";
import H2HCard from "../components/Cards/H2HCard";
import SubmissionCard from "../components/Cards/SubmissionCard";
import SubmissionWallet from "../components/Cards/SubmissionWallet";
import UploadImage from "../components/Cards/UploadImage";
import "../styles/pages/Compete.css";

const H2HFlow = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="compete-page bg-secondary flex">
      <div className="container compete-container">
        {step === 1 && (
          <H2HCard themeName="Sunset Vibes" onChallenge={() => setStep(2)} />
        )}

        {step === 2 && (
          <>
            <SubmissionCard contestTitle="Sunset Vibes" />
            <UploadImage onUpload={() => setStep(3)} />
          </>
        )}

        {step === 3 && (
          <>
            <SubmissionWallet contestTitle="Sunset Vibes" onConfirm={() => setStep(4)} />
            <UploadImage />
          </>
        )}

        {step === 4 && <Confirmation />}
      </div>
    </div>
  );
};

export default H2HFlow;
