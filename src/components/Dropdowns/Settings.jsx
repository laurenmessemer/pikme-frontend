import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/dropdowns/Settings.css";

const Settings = ({ isOpen, onClose, logout }) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [hasUnreadAlerts, setHasUnreadAlerts] = useState(false);

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

  // ✅ Check if there are any unread alerts in localStorage
  useEffect(() => {
    const savedReadAlerts =
      JSON.parse(localStorage.getItem("readAlerts")) || [];
    const allAlertIds = [
      "alert-1",
      "alert-2",
      "alert-3",
      "alert-4",
      "alert-5",
      "alert-6",
      "alert-7",
    ];
    const hasUnread = allAlertIds.some((id) => !savedReadAlerts.includes(id));
    setHasUnreadAlerts(hasUnread);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="settings-dropdown" ref={dropdownRef}>
      <div className="dropdown-header">Account</div>

      <ul>
        <li
          className="dropdown-item"
          onClick={() => {
            navigate("/alerts");
            onClose();
          }}
        >
          {hasUnreadAlerts && <span className="status-dot" />} Alerts
        </li>

        {/* ✅ Settings & Privacy */}
        <li
          className="dropdown-item"
          onClick={() => {
            navigate("/settings");
            onClose();
          }}
        >
          Settings & Privacy
        </li>

        {/* ✅ Join a Contest Option */}
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

      <li
        className="logout-btn"
        onClick={() => {
          onClose();
          logout();
        }}
      >
        Sign Out
      </li>
    </div>
  );
};

Settings.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Settings;

// import PropTypes from "prop-types";
// import { useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../../styles/dropdowns/Settings.css";

// const Settings = ({ isOpen, onClose, logout }) => {
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   // ✅ Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         onClose();
//       }
//     }
//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <div className="settings-dropdown" ref={dropdownRef}>
//       <div className="dropdown-header">Account</div>

//       <ul>
//         <li><span className="status-dot"></span> Alerts</li>

//         {/* ✅ UPDATED: Now routes to new MenuSettings */}
//         <li>
//           <Link to="/settings" onClick={onClose}>
//             Settings & Privacy
//           </Link>
//         </li>

//         {/* ✅ Join a Contest Option */}
//         <li
//           className="dropdown-item"
//           onClick={() => {
//             navigate("/join");
//             onClose();
//           }}
//         >
//           Join a Contest
//         </li>
//       </ul>

//       <hr />

//       <li className="logout-btn" onClick={logout}>Sign Out</li>
//     </div>
//   );
// };

// Settings.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   logout: PropTypes.func.isRequired,
// };

// export default Settings;
