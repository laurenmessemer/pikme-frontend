import PropTypes from "prop-types";
import flashIcon from "../../assets/icons/flash.svg"; // ✅ Same icon as SubmissionCard
import "../../styles/cards/SubmissionWallet.css";
import Submit from "../Buttons/Submit";
import SubmissionTimer from "../Timers/SubmissionTimer";

const SubmissionWallet = ({
    contestTitle,
    contestId,
    balance,
    entryFee = 0,
    totalCharge = 0,
    confirmText = "Confirm & Pay",
    onConfirm,
    disableConfirm,
}) => {
    return (
        <div className="submission-wallet">
            {/* Header - Uses Flash Icon like SubmissionCard */}
            <div className="submission-wallet-header">
                <img src={flashIcon} alt="Contest Icon" className="contest-icon" />
                <h2 className="contest-title">{contestTitle}</h2>
            </div>
            
            {/* Timer */}
            <div className="submission-wallet-timer">
                <SubmissionTimer contestId={contestId} />
            </div>

            {/* Wallet and Submission Details */}
            <div className="submission-wallet-container">
                <div className="wallet-section">
                    <div className="wallet-heading">
                        <h3>My Tokens</h3>
                    </div>
                    <div className="wallet-row">
                        <span className="wallet-label">Token Balance</span>
                        <strong className="wallet-value">
                            {balance.toLocaleString(undefined, { minimumFractionDigits: 0 })} x 🟠
                        </strong>
                    </div>
                </div>

                <div className="submission-section">
                    <div className="wallet-heading">
                        <h3>My Submission</h3>
                    </div>
                    <div className="wallet-row">
                        <span className="wallet-label">Entry Fee</span>
                        <strong className="wallet-value">{entryFee.toFixed(0)} x 🟠</strong>
                    </div>
                </div>

                <hr className="wallet-divider" />
                <div className="wallet-heading">
                    <div className="wallet-row">
                        <span className="wallet-heading-1">Total Charge</span>
                        <strong className="wallet-value">{totalCharge.toFixed(0)} x 🟠</strong>
                    </div>
                </div>
            </div>

            {/* ✅ Confirm & Pay Button calls `onConfirm` from StepThree */}
            <div className="submission-wallet-confirm">
                <Submit text={confirmText} onClick={onConfirm} disabled={disableConfirm} />
            </div>
        </div>
    );
};

// ✅ Updated PropTypes: Removed contestIcon prop since it's fixed
SubmissionWallet.propTypes = {
    contestTitle: PropTypes.string.isRequired,
    contestId: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired,
    entryFee: PropTypes.number, 
    totalCharge: PropTypes.number, 
    confirmText: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    disableConfirm: PropTypes.bool.isRequired,
};

export default SubmissionWallet;
