import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../styles/dropdowns/Settings.css";

const Settings = ({ isOpen, onClose, logout }) => {
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="settings-dropdown" ref={dropdownRef}>
            <div className="dropdown-header">Account</div>
            <ul>
                <li><span className="status-dot"></span> Alerts</li>
                <li><Link to="/settings">Settings & Privacy</Link></li>
            </ul>
            <hr />
            <li className="logout-btn" onClick={logout}>Sign Out</li>
        </div>
    );
};

// ✅ Prop Validation
Settings.propTypes = {
    isOpen: PropTypes.bool.isRequired, // Boolean to track dropdown visibility
    onClose: PropTypes.func.isRequired, // Function to close dropdown
    logout: PropTypes.func.isRequired, // Logout function
};

export default Settings;
