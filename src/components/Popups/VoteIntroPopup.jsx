import PropTypes from "prop-types";
import "../../styles/popups/VoteIntroPopup.css";
import Submit from "../Buttons/Submit";
import XButton from "../Buttons/XButton";
import SubmissionTimer from "../Timers/SubmissionTimer";

const VoteIntroPopup = ({
  contestId,
  themePhoto,
  themeName,
  themeDescription,
  entryFee,
  onStartVoting,
}) => {
  return (
    <div className="vote-intro-overlay">
      <div className="vote-intro-card bg-light">
        <div className="vote-intro-timer">
          <SubmissionTimer contestId={contestId} entryFee={entryFee} />
        </div>

        <XButton onClick={onStartVoting} className="popup-close" />

        <div className="vote-intro-image-container">
          <img src={themePhoto} alt={themeName} className="vote-intro-image" />


        </div>

        <div className="vote-intro-content">
          <h3 className="vote-intro-title text-dark">{themeName}</h3>
          <p className="vote-intro-description text-subtle">{themeDescription}</p>

          <Submit text="Vote Now" onClick={onStartVoting} />
        </div>
      </div>
    </div>
  );
};

VoteIntroPopup.propTypes = {
  contestId: PropTypes.number.isRequired,
  themePhoto: PropTypes.string.isRequired,
  themeName: PropTypes.string.isRequired,
  themeDescription: PropTypes.string.isRequired,
  entryFee: PropTypes.number, // ❌ remove `.isRequired`
  prizePool: PropTypes.number,
  onStartVoting: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default VoteIntroPopup;
