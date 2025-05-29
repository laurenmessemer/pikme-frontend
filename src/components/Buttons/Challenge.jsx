import PropTypes from "prop-types";

const Challenge = ({ onClick }) => {
  return (
    <button className="challenge-button" onClick={onClick}>
      Challenge
    </button>
  );
};

// Prop Types Validation
Challenge.propTypes = {
  onClick: PropTypes.func,
};

export default Challenge;
