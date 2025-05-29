import PropTypes from "prop-types";
import "../../styles/components/MySubmissionCard.css";
import LazyImage from "../Common/LazyImage";

const flashIcon = "https://d38a0fe14bafg9.cloudfront.net/icons/flash.svg";

const MySubmissionCard = ({
  image,
  username,
  theme,
  contestStatus,
  position,
  payout,
  isLoggedIn,
  isNewCardUi = false,
}) => {
  const imageUrl =
    image || "https://d38a0fe14bafg9.cloudfront.net/uploads/default.jpg";

  const statusClass = contestStatus
    ? `status-${contestStatus.toLowerCase()}`
    : "status-unknown";

  return (
    <div className={`my-submission-card ${isNewCardUi ? "full-width" : ""}`}>
      {/* Image */}
      <div className="my-submission-card__image-container">
        <LazyImage
          src={imageUrl}
          alt={`${username}'s submission`}
          className="my-submission-card__image"
        />
        {/* <img
          src={imageUrl}
          alt={`${username}'s submission`}
          className="my-submission-card__image"
          onError={onImageError}
        /> */}
      </div>

      {/* Contest Status Label */}
      <div className={`my-submission-card__status-box ${statusClass}`}>
        <span className="my-submission-card__status-text">{contestStatus}</span>
      </div>

      {/* Content */}
      <div className="my-submission-card__content">
        {/* Theme */}
        <div>
          <h2 className="my-submission-card__theme-name">
            <img
              src={flashIcon}
              alt="Flash icon"
              className="my-submission-card__icon"
            />
            {theme}
          </h2>
        </div>

        {/* Rank + Payout */}
        <div className="my-submission-card__user-info">
          {isLoggedIn ? (
            <>
              {position ? `Rank: ${position}` : "Rank: N/A"} |{" "}
              {payout ? `$${payout}` : "No Payout"}
            </>
          ) : (
            "Login to see your rank and payout"
          )}
        </div>
      </div>
    </div>
  );
};

MySubmissionCard.propTypes = {
  image: PropTypes.string,
  username: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  contestStatus: PropTypes.string.isRequired,
  position: PropTypes.string,
  payout: PropTypes.string,
  isLoggedIn: PropTypes.bool,
};

export default MySubmissionCard;

// import PropTypes from "prop-types";
// import "../../styles/components/MySubmissionCard.css";

// // Importing only the head-to-head icon
// import flashIcon from "../../assets/icons/flash.svg";

// const MySubmissionCard = ({ image, username, theme, contestStatus, position, payout, isLoggedIn }) => {
//   const imageUrl = image || "https://d38a0fe14bafg9.cloudfront.net/uploads/default.jpg";

//   return (
//     <div className="my-submission-card">
//       <div className="my-submission-card__image-container">
//         <img
//           src={imageUrl}
//           alt={`${username}'s submission`}
//           className="my-submission-card__image"
//         />
//       </div>
//       <div className={`my-submission-card__status-box status-${contestStatus.toLowerCase()}`}>
//         <span className="my-submission-card__status-text">{contestStatus}</span>
//       </div>
//       <div className="my-submission-card__content">
//         <div>
//           <h2 className="my-submission-card__theme-name">
//             <img src={flashIcon} alt="Flash icon" className="my-submission-card__icon" />
//             {theme}
//           </h2>
//         </div>
//         <div className="my-submission-card__user-info">
//           {isLoggedIn
//             ? `${position ? `Rank: ${position}` : "Rank: N/A"} | ${payout ? `$${payout}` : "No Payout"}`
//             : "Login to see your rank and payout"}
//         </div>
//       </div>
//     </div>
//   );
// };

// MySubmissionCard.propTypes = {
//   image: PropTypes.string,
//   username: PropTypes.string.isRequired,
//   theme: PropTypes.string.isRequired,
//   contestStatus: PropTypes.string.isRequired,
//   position: PropTypes.string,
//   payout: PropTypes.string,
//   isLoggedIn: PropTypes.bool, // ✅ New prop to determine login state
// };

// export default MySubmissionCard;
