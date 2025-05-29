import PropTypes from "prop-types";

const Opponent = ({ opponentName, onClick, isSelected }) => {
  return (
    <button
      className={`opponent-button ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(opponentName)}
    >
      {opponentName}
    </button>
  );
};

Opponent.propTypes = {
  opponentName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default Opponent;
