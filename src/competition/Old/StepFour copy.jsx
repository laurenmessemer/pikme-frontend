import { useContext } from "react";
import Confirmation from "../components/Cards/Confirmation";
import { useCompetition } from "../context/CompetitionContext";
import { WalletContext } from "../context/WalletContext";
import { SiteUrl } from "../../constant/appConstants";

const StepFour = () => {
  const { imageUrl } = useCompetition(); // ✅ Get imageUrl from CompetitionContext
  const { balance } = useContext(WalletContext); // ✅ Get balance from WalletContext

  // ✅ Generate a unique invite link with random numbers
  const generateInviteLink = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
    return `${SiteUrl}/headtoheadfriendinvite-${randomNum}`;
  };

  if (!imageUrl) {
    console.error("❌ Missing imageUrl in StepFour");
    return <p className="error">Image is required to proceed.</p>;
  }

  return (
    <div className="step-four-container flex">
      {/* ✅ Left Side: Confirmation Card */}
      <Confirmation
        newBalance={balance}
        inviteLink={generateInviteLink()} // ✅ Use dynamic invite link
      />

      {/* ✅ Right Side: Uploaded Image */}
      <div className="uploaded-image-container">
        <img src={imageUrl} alt="Uploaded Preview" className="uploaded-image" />
      </div>
    </div>
  );
};

export default StepFour;
