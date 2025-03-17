import PropTypes from "prop-types";
import "../../styles/buttons/Challenge.css"; // ✅ Import CSS

const Challenge = ({ onClick }) => {
    return (
        <button className="challenge-button" onClick={onClick}>
            Challenge
        </button>
    );
};

// Prop Types Validation
Challenge.propTypes = {
    onClick: PropTypes.func
};

export default Challenge;
