import PropTypes from "prop-types";
import "../../styles/wallet/TokenBalance.css";

const TokenBalance = ({ balance, prizeHistory }) => {
    return (
        <div className="token-balance-container">
            <div className="balance-header">
                <p>Your balance:</p>
                <h2 className="token-amount">
                    <span className="token-icon">🟠</span>&nbsp;{balance} Tokens
                </h2>
                <p className="balance-subtext">Refer a User to Get More!</p>
            </div>

            <h3 className="prize-history-title">Prize History</h3>

            {prizeHistory.length > 0 ? (
                <div className="prize-history-list">
                    {prizeHistory.map((entry, index) => (
                        <div key={index} className="prize-entry">
                            <div className="prize-left">
                                <p className="prize-description">{entry.type} </p>
                                <p className="prize-date">{"January 10th, 2025"}</p>
                            </div>
                            <div className={`prize-right ${entry.amount > 0 ? "positive" : "negative"}`}>
                                {entry.amount > 0 
                                    ? `+ ${entry.amount} ${entry.currency === "USD" ? "$" : "🟠"}`
                                    : `- ${Math.abs(entry.amount)} 🟠`}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-prize-history">
                    <span className="prize-icon">🎁</span>
                    <p>No prizes.... yet</p>
                </div>
            )}

            <button className="compete-button">Compete and Earn</button>
        </div>
    );
};

TokenBalance.propTypes = {
    balance: PropTypes.number.isRequired,
    prizeHistory: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            currency: PropTypes.string, // USD or Tokens (🪙)
        })
    ).isRequired,
};

export default TokenBalance;
