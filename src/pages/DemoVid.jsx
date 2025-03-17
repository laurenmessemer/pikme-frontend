import { useState } from "react";
import "../styles/pages/DemoVid.css";
import Compete1 from "./Compete1";
import Compete2 from "./Compete2";
import Compete3 from "./Compete3";
import Compete4 from "./Compete4";

const DemoVid = () => {
    const [step, setStep] = useState(1);
    const [contestId, setContestId] = useState(null);
    const [entryData, setEntryData] = useState(null);
    const userId = 1; // Fake user ID for demo

    // ✅ Move to the next step while storing contest data
    const nextStep = (data) => {
        console.log(`➡️ Moving to Step ${step + 1}`, { data });

        if (step === 1 && data) {
            setContestId(data);
        } else if (step === 2 && data) {
            setEntryData(data);
        }

        setStep((prev) => prev + 1);
    };

    return (
        <div className="competition-entry-container">
            {step === 1 && <Compete1 nextStep={nextStep} />}
            {step === 2 && contestId && <Compete2 contestId={contestId} nextStep={nextStep} />}
            {step === 3 && entryData && contestId ? (
                <Compete3 contestId={contestId} userId={userId} imageUrl={entryData.imageUrl} nextStep={nextStep} />
            ) : (
                step === 3 && <p className="error">❌ Compete3 Not Loading: Missing Entry Data</p>
            )}
            {step === 4 && entryData && (
                <Compete4 contestId={contestId} imageUrl={entryData.imageUrl} />
            )}
        </div>
    );
};

export default DemoVid;
