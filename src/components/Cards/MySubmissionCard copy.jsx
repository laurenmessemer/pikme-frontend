import PropTypes from "prop-types";
import Placeholder from "../../assets/images/placeholders/cat.jpg"; // ✅ Import placeholder image
import "../../styles/components/MySubmissionCard.css";

// Importing the icons
import flashIcon from "../../assets/icons/flash.svg";
import piggybankIcon from "../../assets/icons/piggybank.svg";

const MySubmissionCard = ({ image, username, theme, status, position, payout, contestType }) => {
  // ✅ Dynamically determine the correct image source
  const imageUrl = image?.startsWith("data:image") || image?.startsWith("http") 
    ? image // ✅ If Base64 or an external URL, use as is
    : `http://localhost:5004/uploads/${image}`; // ✅ Otherwise, assume it's a stored file

  // ✅ Determine status-based styling
  const getStatusClass = (status) => {
    switch (status) {
      case "Upcoming":
        return "status-upcoming";
      case "Live":
        return "status-live";
      case "Complete":
        return "status-complete";
      default:
        return "";
    }
  };

  return (
    <div className="my-submission-card">
      <div className="my-submission-card__image-container">
        <img
          src={imageUrl}
          alt={`${username}'s submission`}
          className="my-submission-card__image"
          onError={(e) => { e.target.src = {Placeholder}; }} // ✅ Fallback image if loading fails
        />
      </div>
      <div className={`my-submission-card__status-box ${getStatusClass(status)}`}>
        <span className="my-submission-card__status-text">{status}</span>
      </div>
      <div className="my-submission-card__content">
        <div>
          <h2 className="my-submission-card__theme-name">
            {/* ✅ Dynamically show contest icons */}
            {contestType === "jackpot" && <img src={piggybankIcon} alt="Piggybank icon" className="my-submission-card__icon" />}
            {contestType === "head-to-head" && <img src={flashIcon} alt="Flash icon" className="my-submission-card__icon" />}
            {theme}
          </h2>
        </div>
        <div className="my-submission-card__user-info">
          {position} | {payout}
        </div>
      </div>
    </div>
  );
};

// ✅ Define PropTypes
MySubmissionCard.propTypes = {
  image: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  payout: PropTypes.string.isRequired,
  contestType: PropTypes.oneOf(["jackpot", "head-to-head"]).isRequired,
};

export default MySubmissionCard;
