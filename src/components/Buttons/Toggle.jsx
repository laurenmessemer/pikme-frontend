import PropTypes from "prop-types";
import { useState } from "react";
import "../../styles/Buttons/Toggle.css"; // Import styles

const Toggle = ({ onText = "ON", offText = "OFF", onToggle }) => {
    const [isActive, setIsActive] = useState(false);

    const handleToggle = () => {
        setIsActive(!isActive);
        if (onToggle) onToggle(!isActive);
    };

    return (
        <button 
            className={`toggle-button ${isActive ? "active" : ""}`} 
            onClick={handleToggle}
        >
            {isActive ? onText : offText}
        </button>
    );
};

// Prop Types Validation
Toggle.propTypes = {
    onText: PropTypes.string,  // Custom text when active
    offText: PropTypes.string, // Custom text when inactive
    onToggle: PropTypes.func,  // Callback function on toggle
};

export default Toggle;
