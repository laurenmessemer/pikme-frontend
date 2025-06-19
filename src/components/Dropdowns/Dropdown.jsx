import PropTypes from "prop-types";
import { useState } from "react";
import "../../styles/dropdowns/Dropdown.css"; // ✅ Update to match your folder structure

const Dropdown = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="dropdown">
      <div
        className={`dropdown-header ${isOpen ? "open" : ""}`}
        onClick={toggleDropdown}
      >
        {title}
        <span className="dropdown-icon">{isOpen ? "−" : "+"}</span>
      </div>
      {isOpen && <div className="dropdown-content">{children}</div>}
    </div>
  );
};

// ✅ PropTypes Validation
Dropdown.propTypes = {
  title: PropTypes.string.isRequired, // The title of the dropdown
  children: PropTypes.node.isRequired, // Any JSX content inside the dropdown
  defaultOpen: PropTypes.bool, // The defaultOpen of the dropdown
};

export default Dropdown;
