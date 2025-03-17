import PropTypes from "prop-types";
import "../../styles/buttons/Toggle.css"; // ✅ Import styles

const ToggleGroup = ({ options, selected, onSelect }) => {
    return (
        <div className="toggle-group">
            {options.map((option) => (
                <button 
                    key={option.value}
                    className={`toggle-button ${selected === option.value ? "active" : ""}`} 
                    onClick={() => onSelect(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

// ✅ Prop Types Validation
ToggleGroup.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    selected: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default ToggleGroup;
