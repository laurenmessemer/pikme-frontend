import PropTypes from "prop-types";
import "../../styles/buttons/Submit.css"; // Ensure styles are correctly linked

const Submit = ({ text = "Submit", onClick, disabled = false, className = "" }) => {
  return (
    <button
      className={`submit-button ${className} ${disabled ? "button-disabled" : "button-cta"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

Submit.propTypes = {
  text: PropTypes.string, // Custom button text
  onClick: PropTypes.func, // Function to execute on click
  disabled: PropTypes.bool, // Whether button is disabled
  className: PropTypes.string, // Allows custom styling
};

export default Submit;
