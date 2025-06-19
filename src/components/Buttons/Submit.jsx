import PropTypes from "prop-types";

const Submit = ({
  text = "Submit",
  onClick,
  disabled = false,
  className = "",
  isLoading = false,
}) => {
  return (
    <button
      className={`submit-button ${className} ${
        disabled ? "button-disabled" : "button-cta"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? <span className="cu-loader"></span> : <>{text}</>}
    </button>
  );
};

Submit.propTypes = {
  text: PropTypes.string, // Custom button text
  onClick: PropTypes.func, // Function to execute on click
  disabled: PropTypes.bool, // Whether button is disabled
  className: PropTypes.string, // Allows custom styling
  isLoading: PropTypes.bool, // Whether button is isLoading
};

export default Submit;
