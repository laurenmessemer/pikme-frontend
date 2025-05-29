import PropTypes from "prop-types";
import { FaUser } from "react-icons/fa";
import "../../styles/components/WinnerCard.css";
import LazyImage from "../Common/LazyImage";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const WinnerCard = ({
  startDate,
  endDate,
  image,
  username,
  theme,
  payout,
  entries,
}) => {
  return (
    <div className="winner-card">
      <div className="card-image">
        <LazyImage
          src={image}
          alt={`${username}'s winning entry`}
          className="winner-image"
        />
        {/* <img
          src={image}
          alt={`${username}'s winning entry`}
          className="winner-image"
          onError={onImageError}
        /> */}
        <div className="date-box">
          {formatDate(startDate)} - {formatDate(endDate)}
        </div>
      </div>
      <div className="winner-box">Winner: {username}</div>{" "}
      {/* Moved outside card-image */}
      <div className="card-content">
        <div>
          <h2 className="theme-name">{theme}</h2>
          <p className="payout">${payout} won</p>
        </div>
        <div className="entries">
          <FaUser className="icon" />
          <span>{entries}</span>
        </div>
      </div>
    </div>
  );
};

WinnerCard.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  payout: PropTypes.number.isRequired,
  entries: PropTypes.number.isRequired,
};

export default WinnerCard;
