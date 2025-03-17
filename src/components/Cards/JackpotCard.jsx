import PropTypes from "prop-types";
import entryBadge from "../../assets/badges/entrybadges.svg"; // ✅ Import Entry Badge
import bronzeMedal from "../../assets/medals/bronzeprize.svg";
import goldMedal from "../../assets/medals/goldprize.svg";
import silverMedal from "../../assets/medals/silverprize.svg";
import "../../styles/cards/JackpotCard.css";
import Submit from "../Buttons/Submit";
import SubmissionTimer from "../Timers/SubmissionTimer";

const JackpotCard = ({
  contestId,
  themePhoto,
  entryFee,
  themeName,
  themeDescription,
  onSubmit,
}) => {
  return (
    <div className="jackpot-card bg-light">
      <div className="jackpot-card__timer">
        <SubmissionTimer contestId={contestId} entryFee={entryFee} />
      </div>

      <div className="jackpot-card__image-container">
        <img src={themePhoto} alt={themeName} className="jackpot-card__image" />

        {/* ✅ Entry Badge - Positioned Over Image but Cut at White Space */}
        <div className="jackpot-card__entry-badge">
          <img src={entryBadge} alt="Entry Badge" />
        </div>

        {/* ✅ Medals in Top Right */}
        <div className="jackpot-card__medals">
          <img src={goldMedal} alt="Gold Medal" className="jackpot-medal gold" />
          <img src={silverMedal} alt="Silver Medal" className="jackpot-medal silver" />
          <img src={bronzeMedal} alt="Bronze Medal" className="jackpot-medal bronze" />
        </div>
      </div>

      <div className="jackpot-card__content">
        <h3 className="jackpot-card__title text-dark">{themeName}</h3>
        <p className="jackpot-card__description text-subtle">{themeDescription}</p>

        <Submit text="Submit Now" onClick={onSubmit} />
      </div>
    </div>
  );
};

JackpotCard.propTypes = {
  contestId: PropTypes.number.isRequired,
  themePhoto: PropTypes.string.isRequired,
  entryFee: PropTypes.number.isRequired,
  themeName: PropTypes.string.isRequired,
  themeDescription: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default JackpotCard;
