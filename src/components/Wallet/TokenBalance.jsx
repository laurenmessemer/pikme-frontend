import PropTypes from "prop-types";
import "../../styles/wallet/TokenBalance.css";

const tokenImg = "https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/token.svg";

const TokenBalance = ({ balance, prizeHistory }) => {
  const formatDate = (timestamp) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };

  const renderTokenIcon = () => (
    <img
      src={tokenImg}
      alt="Token"
      className="token-icon"
      style={{ height: "1em", verticalAlign: "middle" }}
    />
  );

  return (
    <div className="token-balance-container">
      <div className="balance-header">
        <p>Your balance:</p>
        <h2 className="token-amount">
          {renderTokenIcon()}&nbsp;{balance} Tokens
        </h2>
        <p className="balance-subtext">Refer a User to Get More!</p>
      </div>

      <h3 className="prize-history-title">Prize History</h3>

      {prizeHistory.length > 0 ? (
        <div className="prize-history-list">
          {prizeHistory.map((entry, index) => (
            <div key={index} className="prize-entry">
              <div className="prize-left">
                <p className="prize-description">{entry.description}</p>
                <p className="prize-date">{formatDate(entry.timestamp)}</p>
              </div>
              <div className={`prize-right ${entry.amount > 0 ? "positive" : "negative"}`}>
                {entry.amount > 0 ? (
                  <span className="prize-amount-wrapper">
                    +{entry.amount}
                    {entry.currency === "USD" ? (
                      <span className="currency-symbol">$</span>
                    ) : (
                      renderTokenIcon()
                    )}
                  </span>
                ) : (
                  <span className="prize-amount-wrapper">
                    -{Math.abs(entry.amount)}
                    {renderTokenIcon()}
                  </span>
                )}
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
    </div>
  );
};

TokenBalance.propTypes = {
  balance: PropTypes.number.isRequired,
  prizeHistory: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      currency: PropTypes.string,
    })
  ).isRequired,
};

export default TokenBalance;
