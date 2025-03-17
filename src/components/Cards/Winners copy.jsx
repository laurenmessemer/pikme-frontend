import PropTypes from "prop-types";
import "../../styles/components/Winners.css";
import WinnerCard from "./WinnerCard";

const Winners = ({ pastWinners }) => {
  return (
    <div className="winners-container">
      <div className="winners-grid">
        {pastWinners.length === 0 ? (
          <p>No past winners available.</p>
        ) : (
          pastWinners.map((winner) => (
            <WinnerCard key={`${winner.startDate}-${winner.username}`} {...winner} /> // ✅ Unique key
          ))
        )}
      </div>
    </div>
  );
};

// ✅ Define PropTypes for Winners
Winners.propTypes = {
  pastWinners: PropTypes.arrayOf(
    PropTypes.shape({
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      theme: PropTypes.string.isRequired,
      payout: PropTypes.number.isRequired,  // Ensure payout is a number
      entries: PropTypes.number.isRequired
    })
  ).isRequired
};

export default Winners;
