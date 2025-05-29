import PropTypes from "prop-types";

const XButton = ({ onClick, newUi = false }) => {
  return (
    <button
      className={`x-button ${newUi ? "new-position" : ""}`}
      onClick={onClick}
    >
      ✖
    </button>
  );
};

XButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default XButton;
