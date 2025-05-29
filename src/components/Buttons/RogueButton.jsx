import PropTypes from "prop-types";

const RogueButton = ({ text, onClick, variant = "default" }) => {
  return (
    <button className={`rogueButton ${variant}`} onClick={onClick}>
      {text}
    </button>
  );
};

RogueButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["default", "highlighted"]), // Determines button style
};

export default RogueButton;
