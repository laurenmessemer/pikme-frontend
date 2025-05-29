import PropTypes from "prop-types";
import "../../styles/cards/SubmissionCard.css";
import Opponent from "../Buttons/Opponent";
import Submit from "../Buttons/Submit";
import Dropdown from "../Dropdowns/Dropdown";
import SubmissionTimer from "../Timers/SubmissionTimer";
import LazyImage from "../Common/LazyImage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EMAIL_REGEX, ImageUrl } from "../../constant/appConstants";
import BackButton from "../Buttons/BackButton";

const flashIcon = "https://d38a0fe14bafg9.cloudfront.net/icons/flash.svg";
const firsttokenprize = `${ImageUrl}/icons/firsttokenprize.svg`;
const secondtokenprize = `${ImageUrl}/icons/secondtokenprize.svg`;
const bronzetokenprize = `${ImageUrl}/icons/bronzetokenprize.svg`;

// Validation schema
const validationSchema = yup.object().shape({
  invitee_name: yup.string().required("Invitee name is required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(EMAIL_REGEX, "Invalid email format"),
});

const SubmissionCard = ({
  contestTitle,
  contestDescription,
  contestId,
  entryFee,
  selectedOpponent,
  onOpponentSelect,
  onSubmit,
  showOpponentButtons = true,
  isManageRedirect = false,
  previusStep = () => {},
  isShowPreviousButton = false,
  allData = null,
}) => {
  // Initialize react-hook-form with conditional validation
  const { register, handleSubmit, formState, reset } = useForm({
    // Only apply validation schema if selectedOpponent is "invite_friend"
    resolver:
      selectedOpponent === "invite_friend"
        ? yupResolver(validationSchema)
        : undefined,
    defaultValues: { email: "", invitee_name: "" },
    mode: "onChange", // Validate on change
    criteriaMode: "all", // Show all validation errors
  });

  // Handle form submission
  const onFormSubmit = (data) => {
    // Pass the form data to the parent component
    onSubmit(data);
  };

  // Handle submit button click based on opponent selection
  const handleButtonClick = () => {
    if (selectedOpponent === "invite_friend") {
      // If "invite_friend" is selected, use form validation
      handleSubmit(onFormSubmit)();
    } else {
      // Otherwise, just call onSubmit with the current form values or empty object
      onSubmit();
    }
  };
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
        {allData?.winnings?.first ? (
          <div className="trofy-section">
            <LazyImage
              src={firsttokenprize}
              alt="Gold Medal"
              className="submission-medal gold"
            />
            <p className="wining-text gold">{allData?.winnings?.first}x</p>
          </div>
        ) : (
          <LazyImage
            src="https://d38a0fe14bafg9.cloudfront.net/icons/firsttokenprize.svg"
            alt="Gold Medal"
            className="submission-medal gold"
          />
        )}
        {allData?.winnings?.second ? (
          <div className="trofy-section">
            <LazyImage
              src={secondtokenprize}
              alt="Silver Medal"
              className="submission-medal silver"
            />
            <p className="wining-text silver">{allData?.winnings?.second}x</p>
          </div>
        ) : (
          <LazyImage
            src="https://d38a0fe14bafg9.cloudfront.net/icons/secondtokenprize.svg"
            alt="Silver Medal"
            className="submission-medal silver"
          />
        )}
        {allData?.winnings?.third ? (
          <div className="trofy-section">
            <LazyImage
              src={bronzetokenprize}
              alt="Bronze Medal"
              className="submission-medal bronze"
            />
            <p className="wining-text bronze">{allData?.winnings?.third}x</p>
          </div>
        ) : (
          <LazyImage
            src="https://d38a0fe14bafg9.cloudfront.net/icons/bronzetokenprize.svg"
            alt="Bronze Medal"
            className="submission-medal bronze"
          />
        )}
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
              <LazyImage
                src="https://d38a0fe14bafg9.cloudfront.net/icons/firstpayout.svg"
                alt="1st place"
                className="payout-icon"
              />
              1st
            </span>
            <span className="payout-right">
              30x
              <LazyImage
                src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
                alt="Token icon"
                className="token-icon"
              />
            </span>
          </div>

          <div className="payout-row">
            <span className="payout-left">
              <LazyImage
                src="https://d38a0fe14bafg9.cloudfront.net/icons/secondpayout.svg"
                alt="2nd place"
                className="payout-icon"
              />
              2nd
            </span>
            <span className="payout-right">
              20x
              <LazyImage
                src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
                alt="Token icon"
                className="token-icon"
              />
            </span>
          </div>

          <div className="payout-row">
            <span className="payout-left">
              <LazyImage
                src="https://d38a0fe14bafg9.cloudfront.net/icons/thirdpayout.svg"
                alt="3rd place"
                className="payout-icon"
              />
              3rd
            </span>
            <span className="payout-right">
              10x
              <LazyImage
                src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
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
              onClick={() => {
                onOpponentSelect("pick_random");
                reset({ email: "", invitee_name: "" });
              }}
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
            You are invited to join this contest by a friend. Upload your best
            photo to go head-to-head and see who wins!
          </p>
        </div>
      )}

      {isManageRedirect && selectedOpponent === "invite_friend" ? (
        <div className="common-form flex-form mt1">
          <div className="field-box">
            <label className="form-label" htmlFor="invitee_name">
              Invitee Name <span className="star-required">*</span>
            </label>
            <div className="input-box">
              <input
                id="invitee_name"
                className={`form-input ${
                  formState.errors.invitee_name ? "error-input" : ""
                }`}
                placeholder="Enter invitee name"
                {...register("invitee_name")}
              />
              {!formState.errors.invitee_name &&
                formState.dirtyFields.invitee_name && (
                  <div className="green-custom-checkmark"></div>
                )}
            </div>
            {formState.errors.invitee_name && (
              <p className="custom-error-message">
                {formState.errors.invitee_name.message}
              </p>
            )}
          </div>
          <div className="field-box">
            <label className="form-label" htmlFor="email">
              EMAIL ADDRESS <span className="star-required">*</span>
            </label>
            <div className="input-box">
              <input
                id="email"
                className={`form-input ${
                  formState.errors.email ? "error-input" : ""
                }`}
                type="email"
                placeholder="Valid email address"
                {...register("email")}
              />
              {!formState.errors.email && formState.dirtyFields.email && (
                <div className="green-custom-checkmark"></div>
              )}
            </div>
            {formState.errors.email && (
              <p className="custom-error-message">
                {formState.errors.email.message}
              </p>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* Submit Button */}
      <div className="submission-card-submit with-spacing">
        {isShowPreviousButton && (
          <BackButton onClick={previusStep} className="no-spacing" />
        )}
        <Submit onClick={handleButtonClick} className="no-spacing" />
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
  isManageRedirect: PropTypes.bool,
};

export default SubmissionCard;
