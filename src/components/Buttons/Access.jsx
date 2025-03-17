import PropTypes from "prop-types";
import "../../styles/buttons/Access.css"; // Ensure this CSS file is created and linked

const Access = ({ text, onClick, variant = "light" }) => {
  return (
    <button 
      className={`access-button ${variant}`} 
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Access.propTypes = {
  text: PropTypes.string.isRequired, // Button text (e.g., "LOG IN" or "CREATE ACCOUNT")
  onClick: PropTypes.func, // Click handler function
  variant: PropTypes.oneOf(["light", "cta"]), // Color variant: "light" or "cta"
};

export default Access;
