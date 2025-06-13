import PropTypes from "prop-types";
import "../../styles/components/WinnerCard.css";
import LazyImage from "../Common/LazyImage";
import { ImageUrl } from "../../constant/appConstants";

const userIcon = `${ImageUrl}/icons/user.svg`;

const firsttokenprize = `${ImageUrl}/icons/firsttokenprize.svg`;
const secondtokenprize = `${ImageUrl}/icons/secondtokenprize.svg`;
const bronzetokenprize = `${ImageUrl}/icons/bronzetokenprize.svg`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const placeIcons = {
  1: firsttokenprize,
  2: secondtokenprize,
  3: bronzetokenprize,
};

const placeRewards = {
  1: "30 Tokens",
  2: "20 Tokens",
  3: "10 Tokens",
};

const WinnerLatestCard = ({
  startDate,
  endDate,
  image,
  username,
  theme,
  isThemeCard = false,
  isLandingWinnersOption = false,
  position,
  payout,
  totalVotes,
  totalParticipants,
  isNewCardUI = false,
  isDeksTop = false,
}) => {
  const showDateBox = isThemeCard || isLandingWinnersOption;
  const isStandardCard = !isThemeCard || isLandingWinnersOption;

  return (
    <div
      className={`winner-card ${isStandardCard ? "top-three-card" : ""} ${
        isLandingWinnersOption ? "landing-winners-option" : ""
      } ${isNewCardUI ? "full-width" : ""}`}
    >
      <div className={`card-image ${isDeksTop ? "desktop-top" : ""}`}>
        <LazyImage
          src={image}
          alt={`${isStandardCard ? username : theme}'s entry`}
          className="winner-image"
          critical={true}
          fetchPriority="high"
          onLoad={(e) => e.currentTarget.classList.add("loaded")}
        />
        {showDateBox && (
          <div className="date-box">
            {formatDate(startDate)} - {formatDate(endDate)}
          </div>
        )}
      </div>

      {isStandardCard && <div className="winner-box">Winner: {username}</div>}

      <div className="card-content">
        <div>
          {isStandardCard ? (
            <div className="winners-place-wrapper">
              {placeIcons[position] && (
                <LazyImage
                  src={placeIcons[position]}
                  alt={`${position} place`}
                  className="winners-place-icon"
                />
              )}
              <span className="payout">
                {payout ? `${payout} Tokens` : placeRewards[position] || "—"}
              </span>
            </div>
          ) : (
            <h2 className="theme-name">{theme}</h2>
          )}
        </div>

        <div className="entries">
          {isThemeCard ? (
            <LazyImage src={userIcon} alt="entry icon" className="icon" />
          ) : (
            <LazyImage
              src="https://d38a0fe14bafg9.cloudfront.net/icons/pointer.svg"
              alt="entry icon"
              className="icon"
            />
          )}
          {isStandardCard && <span>{totalVotes || 0}</span>}
          {isThemeCard && totalParticipants && <span>{totalParticipants}</span>}
        </div>
      </div>
    </div>
  );
};

WinnerLatestCard.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  username: PropTypes.string,
  theme: PropTypes.string.isRequired,
  isThemeCard: PropTypes.bool,
  isLandingWinnersOption: PropTypes.bool,
  position: PropTypes.number,
  payout: PropTypes.number,
  totalVotes: PropTypes.number,
  totalParticipants: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isNewCardUI: PropTypes.bool,
};

export default WinnerLatestCard;
