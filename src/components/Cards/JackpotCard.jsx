import PropTypes from "prop-types";
import entryBadge from "../../assets/badges/entrybadges.svg"; // ✅ Entry Badge
import "../../styles/cards/JackpotCard.css";
import Submit from "../Buttons/Submit";
import JackpotTimer from "../Timers/JackpotTimer"; // ✅ Swapped in

const JackpotCard = ({
  contestId,
  themePhoto,
  themeName,
  themeDescription,
  onSubmit,
}) => {
  return (
    <div className="jackpot-card bg-light">
      <div className="jackpot-card__timer">
        <JackpotTimer contestId={contestId} /> {/* ✅ Swapped */}
      </div>

      <div className="jackpot-card__image-container">
        <img src={themePhoto} alt={themeName} className="jackpot-card__image" />

        {/* ✅ Entry Badge */}
        <div className="jackpot-card__entry-badge">
          <img src={entryBadge} alt="Entry Badge" />
        </div>

        {/* ✅ Medal Icons - Using External URLs */}
        <div className="jackpot-card__medals">
          <img
            src="https://d38a0fe14bafg9.cloudfront.net/icons/firsttokenprize.svg"
            alt="Gold Medal"
            className="jackpot-medal gold"
          />
          <img
            src="https://d38a0fe14bafg9.cloudfront.net/icons/secondtokenprize.svg"
            alt="Silver Medal"
            className="jackpot-medal silver"
          />
          <img
            src="https://d38a0fe14bafg9.cloudfront.net/icons/bronzetokenprize.svg"
            alt="Bronze Medal"
            className="jackpot-medal bronze"
          />
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
