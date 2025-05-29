import PropTypes from "prop-types";
import "../../styles/cards/JackpotCard.css";
import Submit from "../Buttons/Submit";
import JackpotTimer from "../Timers/JackpotTimer"; // ✅ Swapped in
import { onImageError } from "../../utils/RouterUtils";
import LazyImage from "../Common/LazyImage";
import { ImageUrl } from "../../constant/appConstants";

const entryBadge = `${ImageUrl}/icons/entrybadges.svg`;
const firsttokenprize = `${ImageUrl}/icons/firsttokenprize.svg`;
const secondtokenprize = `${ImageUrl}/icons/secondtokenprize.svg`;
const bronzetokenprize = `${ImageUrl}/icons/bronzetokenprize.svg`;

const JackpotCard = ({
  contestId,
  themePhoto,
  themeName,
  themeDescription,
  onSubmit,
  allData = null,
  previusStep = () => {},
}) => {
  const getClass = (value) =>
    String(value)?.length === 1 ? "single-digit" : "";

  return (
    <div className="jackpot-card bg-light">
      <div className="jackpot-card__timer">
        <JackpotTimer contestId={contestId} /> {/* ✅ Swapped */}
      </div>

      <div className="jackpot-card__image-container">
        <img
          src={themePhoto}
          alt={themeName}
          className="jackpot-card__image"
          onError={onImageError}
        />

        {/* ✅ Entry Badge */}
        <div className="jackpot-card__entry-badge">
          <img src={entryBadge} alt="Entry Badge" />
        </div>
        <div
          className={`jackpot-card__entry-fees  ${getClass(
            allData?.entry_fee
          )}`}
        >
          {allData?.entry_fee || "1"}X
        </div>

        {/* ✅ Medal Icons - Using External URLs */}
        <div className="jackpot-card__medals">
          <div className="trofy-section">
            <LazyImage
              src={firsttokenprize}
              alt="Gold Medal"
              className="jackpot-medal gold"
            />
            <p
              className={`wining-text gold ${getClass(
                allData?.winnings?.second
              )}`}
            >
              {allData?.winnings?.first}x
            </p>
          </div>

          <div className="trofy-section">
            <LazyImage
              src={secondtokenprize}
              alt="Silver Medal"
              className="jackpot-medal silver"
            />
            <p
              className={`wining-text silver ${getClass(
                allData?.winnings?.second
              )}`}
            >
              {allData?.winnings?.second}x
            </p>
          </div>

          <div className="trofy-section">
            <LazyImage
              src={bronzetokenprize}
              alt="Bronze Medal"
              className="jackpot-medal bronze"
            />
            <p
              className={`wining-text bronze ${getClass(
                allData?.winnings?.third
              )}`}
            >
              {allData?.winnings?.third}x
            </p>
          </div>
        </div>
      </div>

      <div className="jackpot-card__content">
        <h3 className="jackpot-card__title text-dark">{themeName}</h3>
        <p className="jackpot-card__description text-subtle">
          {themeDescription}
        </p>
        {/* {allData?.Competitions?.length > 0 ? (
          <div className="jackpot-card__status-message">
            <span className="jackpot-card__status-text">
              You're already in! 🎉
            </span>
          </div>
        ) : ( */}
        <Submit
          text="Submit Now"
          onClick={onSubmit}
          className="no-spacing"
          disabled={allData?.Competitions?.length}
        />
        {/* )} */}
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
