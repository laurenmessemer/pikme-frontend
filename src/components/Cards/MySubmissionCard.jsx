import PropTypes from "prop-types";
import "../../styles/components/MySubmissionCard.css";

// Importing only the head-to-head icon
import flashIcon from "../../assets/icons/flash.svg";

const MySubmissionCard = ({ image, username, theme, contestStatus, position, payout }) => {
  // ✅ Ensure image is coming from the database and fallback if necessary
  const imageUrl = image || "https://photo-contest-storage.s3.us-east-2.amazonaws.com/uploads/default.jpg";

  return (
    <div className="my-submission-card">
      <div className="my-submission-card__image-container">
        <img
          src={imageUrl}
          alt={`${username}'s submission`}
          className="my-submission-card__image"
        />
      </div>
      <div className={`my-submission-card__status-box status-${contestStatus.toLowerCase()}`}>
        <span className="my-submission-card__status-text">{contestStatus}</span>
      </div>
      <div className="my-submission-card__content">
        <div>
          <h2 className="my-submission-card__theme-name">
            {/* ✅ Always show head-to-head icon */}
            <img src={flashIcon} alt="Flash icon" className="my-submission-card__icon" />
            {theme}
          </h2>
        </div>
        <div className="my-submission-card__user-info">
          {position ? `Rank: ${position}` : "Rank: N/A"} | {payout ? `$${payout}` : "No Payout"}
        </div>
      </div>
    </div>
  );
};

// ✅ Define PropTypes
MySubmissionCard.propTypes = {
  image: PropTypes.string, // ✅ Expecting an S3 URL from the database
  username: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  contestStatus: PropTypes.string.isRequired, // ✅ Fetches from Contest table
  position: PropTypes.string,
  payout: PropTypes.string,
};

export default MySubmissionCard;
