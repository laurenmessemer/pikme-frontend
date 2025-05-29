import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "../../styles/nav/AccessMenu.css";
import Access from "../Buttons/Access";
import SettingsDropdown from "../Dropdowns/Settings";
import WalletBadge from "../Wallet/WalletBadge"; // ✅ Import WalletBadge

function AccessMenu() {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {}, [user]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <div className="access-container">
      {/* ✅ Place WalletBadge next to the username */}
      {user?.role === "admin" && (
        <div className="access-links">
          <Access
            text="Admin Console"
            variant="light"
            onClick={() => navigate("/admin-console/themes")}
          />
        </div>
      )}
      <div className="wallet-badge">{user && <WalletBadge />}</div>
      <div className="access-menu">
        {!user ? (
          <div className="access-links">
            <Access
              text="LOG IN"
              variant="light"
              onClick={() => navigate("/login")}
            />
            <Access
              text="CREATE ACCOUNT"
              variant="cta"
              onClick={() => navigate("/signup")}
            />
          </div>
        ) : (
          <div className="access-logged-in">
            <div className="access-username" onClick={toggleDropdown}>
              <span className="status-dot"></span>
              <span className="username-text">{user.username}</span>
              {isDropdownOpen ? (
                <FaChevronUp className="dropdown-arrow" />
              ) : (
                <FaChevronDown className="dropdown-arrow" />
              )}
            </div>
          </div>
        )}
      </div>

      {createPortal(
        <SettingsDropdown
          isOpen={isDropdownOpen}
          onClose={closeDropdown}
          logout={logout}
        />,
        document.body
      )}
    </div>
  );
}

export default AccessMenu;
