/*
 * File: ReportedSubmissionCard.jsx
 * Author: HARSH CHAUHAN
 * Created Date: June 18th, 2025
 * Description: This file contains all data of reported image competition.
 */

import PropTypes from "prop-types";
import "../../styles/cards/SubmissionCard.css";
import Submit from "../Buttons/Submit";
import Dropdown from "../Dropdowns/Dropdown";
import LazyImage from "../Common/LazyImage";
import { ImageUrl } from "../../constant/appConstants";
import SubmissionTimer from "../Timers/SubmissionTimer";

const flashIcon = "https://d38a0fe14bafg9.cloudfront.net/icons/flash.svg";
const firsttokenprize = `${ImageUrl}/icons/firsttokenprize.svg`;
const secondtokenprize = `${ImageUrl}/icons/secondtokenprize.svg`;
const bronzetokenprize = `${ImageUrl}/icons/bronzetokenprize.svg`;

const ReportedSubmissionCard = ({
  contestTitle,
  contestDescription,
  onSubmit,
  allData = null,
  disabled = false,
  isLoading = false,
}) => {
  // Handle submit button click based on opponent selection
  const handleButtonClick = () => {
    onSubmit();
  };
  return (
    <div className="submission-card">
      {/* Header */}
      <div className="submission-header">
        <img src={flashIcon} alt="Contest Icon" className="contest-icon" />
        <h2 className="contest-title fix">{contestTitle}</h2>
      </div>

      {/* Countdown */}
      <SubmissionTimer
        contestId={allData?.contestId}
        entryFee={allData?.entry_fee}
      />
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
      {contestDescription && (
        <p className="contest-description">{contestDescription}</p>
      )}

      {/* Dropdowns */}
      <Dropdown title="Rules & Guidelines" defaultOpen={true}>
        <ul>
          <li>No AI-generated images</li>
          <li>Must be original work</li>
          <li>Only high-resolution images</li>
          <li>No watermarks or text overlays</li>
        </ul>
      </Dropdown>

      <Dropdown title="Payout Details" defaultOpen={true}>
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
              {allData?.winnings?.first || 30}x
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
              {allData?.winnings?.second || 20}x
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
              {allData?.winnings?.third || 10}x
              <LazyImage
                src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
                alt="Token icon"
                className="token-icon"
              />
            </span>
          </div>
        </div>
      </Dropdown>

      {/* Submit Button */}
      <div className="submission-card-submit with-spacing">
        <Submit
          onClick={handleButtonClick}
          className="no-spacing"
          disabled={disabled}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

ReportedSubmissionCard.propTypes = {
  contestTitle: PropTypes.string.isRequired,
  contestDescription: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  allData: PropTypes.object, // Optional, can be null
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default ReportedSubmissionCard;
