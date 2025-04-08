import PropTypes from "prop-types";
import flashIcon from "../../assets/icons/flash.svg";
import "../../styles/cards/SubmissionCard.css";
import Opponent from "../Buttons/Opponent";
import Submit from "../Buttons/Submit";
import Dropdown from "../Dropdowns/Dropdown";
import SubmissionTimer from "../Timers/SubmissionTimer";

const SubmissionCard = ({
  contestTitle,
  contestDescription,
  contestId,
  entryFee,
  selectedOpponent,
  onOpponentSelect,
  onSubmit,
  showOpponentButtons = true,
}) => {
  return (
    <div className="submission-card">
      {/* Header */}
      <div className="submission-header">
        <img src={flashIcon} alt="Contest Icon" className="contest-icon" />
        <h2 className="contest-title">{contestTitle}</h2>
      </div>

      {/* Countdown */}
      <SubmissionTimer contestId={contestId} entryFee={entryFee} />

      {/* Medals */}
      <div className="submission-card__medals">
        <img
          src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/firsttokenprize.svg"
          alt="Gold Medal"
          className="submission-medal gold"
        />
        <img
          src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/secondtokenprize.svg"
          alt="Silver Medal"
          className="submission-medal silver"
        />
        <img
          src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/bronzetokenprize.svg"
          alt="Bronze Medal"
          className="submission-medal bronze"
        />
      </div>


      {/* Description */}
      <p className="contest-description">{contestDescription}</p>

      {/* Dropdowns */}
      <Dropdown title="Rules & Guidelines">
        <ul>
          <li>No AI-generated images</li>
          <li>Must be original work</li>
          <li>Only high-resolution images</li>
          <li>No watermarks or text overlays</li>
        </ul>
      </Dropdown>
      
      <Dropdown title="Payout Details">
        <div className="payout-box">
          <div className="payout-header">
            <span>Placement</span>
            <span>Payout</span>
          </div>

          <div className="payout-row">
            <span className="payout-left">
              <img
                src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/firstpayout.svg"
                alt="1st place"
                className="payout-icon"
              />
              1st
            </span>
            <span className="payout-right">
              30x
              <img
                src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/token.svg"
                alt="Token icon"
                className="token-icon"
              />
            </span>
          </div>

          <div className="payout-row">
            <span className="payout-left">
              <img
                src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/secondpayout.svg"
                alt="2nd place"
                className="payout-icon"
              />
              2nd
            </span>
            <span className="payout-right">
              20x
              <img
                src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/token.svg"
                alt="Token icon"
                className="token-icon"
              />
            </span>
          </div>

          <div className="payout-row">
            <span className="payout-left">
              <img
                src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/thirdpayout.svg"
                alt="3rd place"
                className="payout-icon"
              />
              3rd
            </span>
            <span className="payout-right">
              10x
              <img
                src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/token.svg"
                alt="Token icon"
                className="token-icon"
              />
            </span>
          </div>
        </div>
      </Dropdown>

      {/* Opponent Section or Join Message */}
      {showOpponentButtons ? (
        <>
          <p className="opponent-description">Choose Your Opponent</p>
          <div className="submission-card-opponents">
            <Opponent
              opponentName="Challenge Friend"
              isSelected={selectedOpponent === "invite_friend"}
              onClick={() => onOpponentSelect("invite_friend")}
            />
            <Opponent
              opponentName="Pick For Me"
              isSelected={selectedOpponent === "pick_random"}
              onClick={() => onOpponentSelect("pick_random")}
            />
          </div>
        </>
      ) : (
        <div
        className="join-invite-message"
        // style={{
        //   display: "flex",
        //   justifyContent: "center",
        //   alignItems: "center",
        //   textAlign: "center",
        //   borderRadius: "8px",
        //   marginTop: ".7rem",
        //   marginBottom: "0",
        // }}
      >
        <p
          className="join-invite-text"
          // style={{
          //   fontSize: ".75rem",
          //   color: "#333",
          //   maxWidth: "500px",
          // }}
        >
          You are invited to join this contest by a friend. Upload your best photo to go head-to-head and see who wins!
        </p>
      </div>
      )}

      {/* Submit Button */}
      <div className="submission-card-submit">
        <Submit onClick={onSubmit} />
      </div>
    </div>
  );
};

SubmissionCard.propTypes = {
  contestTitle: PropTypes.string.isRequired,
  contestDescription: PropTypes.string.isRequired,
  contestId: PropTypes.number.isRequired,
  entryFee: PropTypes.number.isRequired,
  selectedOpponent: PropTypes.string,
  onOpponentSelect: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  showOpponentButtons: PropTypes.bool,
};

export default SubmissionCard;


// import PropTypes from "prop-types";
// import flashIcon from "../../assets/icons/flash.svg";
// import bronzeMedal from "../../assets/medals/bronzeprize.svg";
// import goldMedal from "../../assets/medals/goldprize.svg";
// import silverMedal from "../../assets/medals/silverprize.svg";
// import "../../styles/cards/SubmissionCard.css";
// import Opponent from "../Buttons/Opponent";
// import Submit from "../Buttons/Submit";
// import Dropdown from "../Dropdowns/Dropdown";
// import SubmissionTimer from "../Timers/SubmissionTimer";

// const SubmissionCard = ({
//   contestTitle,
//   contestDescription,
//   contestId,
//   entryFee,
//   selectedOpponent,
//   onOpponentSelect,
//   onSubmit,
// }) => {
//   return (
//     <div className="submission-card">
//       {/* Header */}
//       <div className="submission-header">
//         <img src={flashIcon} alt="Contest Icon" className="contest-icon" />
//         <h2 className="contest-title">{contestTitle}</h2>
//       </div>

//       {/* Countdown */}
//       <SubmissionTimer contestId={contestId} entryFee={entryFee} />

//       {/* Medals */}
//       <div className="submission-card__medals">
//         <img src={goldMedal} alt="Gold Medal" className="submission-medal gold" />
//         <img src={silverMedal} alt="Silver Medal" className="submission-medal silver" />
//         <img src={bronzeMedal} alt="Bronze Medal" className="submission-medal bronze" />
//       </div>

//       {/* Description */}
//       <p className="contest-description">{contestDescription}</p>

//       {/* Dropdowns */}
//       <Dropdown title="Rules & Guidelines">
//         <ul>
//           <li>No AI-generated images</li>
//           <li>Must be original work</li>
//           <li>Only high-resolution images</li>
//           <li>No watermarks or text overlays</li>
//         </ul>
//       </Dropdown>
      
//       <Dropdown title="Payout Details">
//         <div className="payout-box">
//           <div className="payout-header">
//             <span>Placement</span>
//             <span>Payout</span>
//           </div>

//           <div className="payout-row">
//             <span className="payout-left">
//               <img
//                 src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/firstpayout.svg"
//                 alt="1st place"
//                 className="payout-icon"
//               />
//               1st
//             </span>
//             <span className="payout-right">
//               30x
//               <img
//                 src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/token.svg"
//                 alt="Token icon"
//                 className="token-icon"
//               />
//             </span>
//           </div>

//           <div className="payout-row">
//             <span className="payout-left">
//               <img
//                 src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/secondpayout.svg"
//                 alt="2nd place"
//                 className="payout-icon"
//               />
//               2nd
//             </span>
//             <span className="payout-right">
//               20x
//               <img
//                 src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/token.svg"
//                 alt="Token icon"
//                 className="token-icon"
//               />
//             </span>
//           </div>

//           <div className="payout-row">
//             <span className="payout-left">
//               <img
//                 src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/thirdpayout.svg"
//                 alt="3rd place"
//                 className="payout-icon"
//               />
//               3rd
//             </span>
//             <span className="payout-right">
//               10x
//               <img
//                 src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/token.svg"
//                 alt="Token icon"
//                 className="token-icon"
//               />
//             </span>
//           </div>
//         </div>
//       </Dropdown>


//       {/* Opponent Selection */}
//       <p className="opponent-description">Choose Your Opponent</p>
//       <div className="submission-card-opponents">
//         <Opponent
//           opponentName="Challenge Friend"
//           isSelected={selectedOpponent === "invite_friend"}
//           onClick={() => onOpponentSelect("invite_friend")}
//         />
//         <Opponent
//           opponentName="Pick For Me"
//           isSelected={selectedOpponent === "pick_random"}
//           onClick={() => onOpponentSelect("pick_random")}
//         />
//       </div>

//       {/* Submit Button */}
//       <div className="submission-card-submit">
//         <Submit onClick={onSubmit} />
//       </div>
//     </div>
//   );
// };

// SubmissionCard.propTypes = {
//   contestTitle: PropTypes.string.isRequired,
//   contestDescription: PropTypes.string.isRequired,
//   contestId: PropTypes.number.isRequired,
//   entryFee: PropTypes.number.isRequired,
//   selectedOpponent: PropTypes.string,
//   onOpponentSelect: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func.isRequired,
// };

// export default SubmissionCard;
