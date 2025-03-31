import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Add useNavigate
import "../../styles/dropdowns/Settings.css";

const Settings = ({ isOpen, onClose, logout }) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // ✅ Needed to navigate programmatically

  // ✅ Close dropdown when clicking outside
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
        <li>
          <Link to="/settings" onClick={onClose}>
            Settings & Privacy
          </Link>
        </li>

        {/* ✅ NEW: Join a Contest Option */}
        <li
          className="dropdown-item"
          onClick={() => {
            navigate("/join");
            onClose();
          }}
        >
          Join a Contest
        </li>
      </ul>

      <hr />

      <li className="logout-btn" onClick={logout}>Sign Out</li>
    </div>
  );
};

// ✅ Prop Validation
Settings.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Settings;
