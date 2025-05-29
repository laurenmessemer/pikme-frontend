import PropTypes from "prop-types";
import { useContext } from "react";
import Confirmation from "../components/Cards/Confirmation";
import { useCompetition } from "../context/CompetitionContext";
import { WalletContext } from "../context/WalletContext";
import { SiteUrl } from "../constant/appConstants";

const StepFour = ({ inviteLink, matchType, joinedExistingMatch }) => {
  const { imageUrl } = useCompetition();
  const { balance } = useContext(WalletContext);

  console.log("🎟️ StepFour Props:", {
    inviteLink,
    matchType,
    joinedExistingMatch,
  });
  console.log("🌟 StepFour Received imageUrl:", imageUrl);

  const generateInviteLink = () => {
    return `${SiteUrl}/headtoheadfriendinvite-${Math.floor(
      1000 + Math.random() * 9000
    )}`;
  };

  if (!imageUrl) {
    console.error(
      "❌ Missing imageUrl in StepFour - Likely an issue in StepThree"
    );
    return <p className="error">Image is required to proceed.</p>;
  }

  return (
    <div className="step-four-container flex">
      <Confirmation
        newBalance={balance}
        inviteLink={
          matchType === "invite_friend"
            ? inviteLink || generateInviteLink()
            : null
        }
        matchType={matchType}
        joinedExistingMatch={joinedExistingMatch} // ✅ Pass this down
      />
      <div className="uploaded-image-container">
        <img src={imageUrl} alt="Uploaded Preview" className="uploaded-image" />
      </div>
    </div>
  );
};

StepFour.propTypes = {
  inviteLink: PropTypes.string,
  matchType: PropTypes.string.isRequired,
  joinedExistingMatch: PropTypes.bool, // ✅ New prop
};

export default StepFour;
