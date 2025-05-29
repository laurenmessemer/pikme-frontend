import PropTypes from "prop-types";
import { useContext } from "react";
import Confirmation from "../components/Cards/Confirmation";
import { useCompetition } from "../context/CompetitionContext";
import { WalletContext } from "../context/WalletContext";
import { SiteUrl } from "../constant/appConstants";

const StepFourInvite = ({ inviteLink, joinedExistingMatch }) => {
  const { imageUrl } = useCompetition();
  const { balance } = useContext(WalletContext);

  console.log("🎯 StepFourInvite Props:", { inviteLink, joinedExistingMatch });
  console.log("🖼️ StepFourInvite imageUrl:", imageUrl);

  if (!imageUrl) {
    console.error("❌ Missing imageUrl in StepFourInvite");
    return <p className="error">Image is required to proceed.</p>;
  }

  const fullInviteURL = inviteLink ? `${SiteUrl}/join/${inviteLink}` : null;

  return (
    <div className="step-four-container flex">
      <Confirmation
        newBalance={balance}
        inviteLink={fullInviteURL}
        matchType="invite_friend"
        joinedExistingMatch={joinedExistingMatch}
      />
      <div className="uploaded-image-container">
        <img src={imageUrl} alt="Uploaded Preview" className="uploaded-image" />
      </div>
    </div>
  );
};

StepFourInvite.propTypes = {
  inviteLink: PropTypes.string.isRequired,
  joinedExistingMatch: PropTypes.bool,
};

export default StepFourInvite;
