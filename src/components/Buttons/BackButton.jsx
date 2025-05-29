import PropTypes from "prop-types";
import { FaChevronLeft } from "react-icons/fa";

const BackButton = ({ onClick, disabled = false, className = "" }) => {
  return (
    <button
      className={`back-button ${className} ${
        disabled ? "button-disabled" : "button-cta"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <FaChevronLeft />
    </button>
  );
};

BackButton.propTypes = {
  text: PropTypes.string, // Custom button text
  onClick: PropTypes.func, // Function to execute on click
  disabled: PropTypes.bool, // Whether button is disabled
  className: PropTypes.string, // Allows custom styling
};

export default BackButton;
