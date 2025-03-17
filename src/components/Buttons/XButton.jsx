import PropTypes from "prop-types";
import "../../styles/buttons/XButton.css"; // ✅ Corrected path

const XButton = ({ onClick }) => {
    return (
        <button className="x-button" onClick={onClick}>
            ✖
        </button>
    );
};

XButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default XButton;
