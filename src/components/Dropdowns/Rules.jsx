import PropTypes from "prop-types";
import { useState } from "react";
import "../../styles/dropdowns/Rules.css";

const Rules = ({ rules }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="rules-container">
            <button className="rules-toggle" onClick={toggleDropdown}>
                Rules & Guidelines {isOpen ? "▲" : "▼"}
            </button>
            {isOpen && (
                <div className="rules-dropdown">
                    <ul>
                        {rules.map((rule, index) => (
                            <li key={index}>{rule}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

// ✅ Prop Types Validation
Rules.propTypes = {
    rules: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Rules;
