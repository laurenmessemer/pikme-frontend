import PropTypes from "prop-types";
import "../../styles/components/WinnerCard.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const placeIcons = {
  1: "https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/firsttokenprize.svg",
  2: "https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/secondtokenprize.svg",
  3: "https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/bronzetokenprize.svg",
};

const WinnerCard = ({
  startDate,
  endDate,
  image,
  username,
  theme,
  payout,
  entries,
  isThemeCard = false,
  place,
}) => {
  return (
    <div className="winner-card">
      <div className="card-image">
        <img
          src={image}
          alt={`${isThemeCard ? theme : username}'s entry`}
          className="winner-image"
        />
        {isThemeCard && (
          <div className="date-box">
            {formatDate(startDate)} - {formatDate(endDate)}
          </div>
        )}
      </div>

      {!isThemeCard && (
        <div className="winner-box">Winner: {username}</div>
      )}

      <div className="card-content">
        <div>
          {isThemeCard ? (
            <h2 className="theme-name">{theme}</h2>
          ) : (
            <div className="winners-place-wrapper">
              {placeIcons[place] && (
                <img
                  src={placeIcons[place]}
                  alt={`${place} place`}
                  className="winners-place-icon"
                />
              )}
              <span className="payout">${parseFloat(payout).toFixed(2)} won</span>
            </div>
          )}
        </div>

        <div className={`entries ${isThemeCard ? "icon-only no-border" : ""}`}>
          <img
            src={
              isThemeCard
                ? "https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/flash.svg"
                : "https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/pointer.svg"
            }
            alt="entry icon"
            className={`icon ${isThemeCard ? "flash-icon" : ""}`}
          />
          {!isThemeCard && <span>{entries}</span>}
        </div>
      </div>
    </div>
  );
};

WinnerCard.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  username: PropTypes.string,
  theme: PropTypes.string.isRequired,
  payout: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  entries: PropTypes.number.isRequired,
  isThemeCard: PropTypes.bool,
  place: PropTypes.number,
};

export default WinnerCard;
