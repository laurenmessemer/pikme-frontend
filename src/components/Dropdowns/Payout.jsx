import PropTypes from "prop-types";
import { useState } from "react";
import "../../styles/dropdowns/Payout.css"; // ✅ Import styles

const Payout = ({ payoutDetails }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="payout-container">
      <button className="payout-toggle" onClick={toggleDropdown}>
        Payout Details {isOpen ? "▲" : "▼"}
      </button>
      {isOpen && (
        <div className="payout-dropdown">
          <p>
            <strong>1st Place:</strong> {payoutDetails.first || "$500"}
          </p>
          <p>
            <strong>2nd Place:</strong> {payoutDetails.second || "$300"}
          </p>
          <p>
            <strong>3rd Place:</strong> {payoutDetails.third || "$200"}
          </p>
        </div>
      )}
    </div>
  );
};

// ✅ Prop Types Validation
Payout.propTypes = {
  payoutDetails: PropTypes.shape({
    first: PropTypes.string,
    second: PropTypes.string,
    third: PropTypes.string,
  }),
};

export default Payout;
