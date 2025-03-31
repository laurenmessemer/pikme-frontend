import PropTypes from "prop-types";
import { FaChevronLeft } from "react-icons/fa"; // ✅ Updated Arrow Icon
import { useLocation, useNavigate } from "react-router-dom"; // ✅ Get Current Route
import pikMeLogo from "../assets/logos/pikme_util.svg"; // ✅ Updated Logo
import AccessMenu from "../components/Navigation/AccessMenu"; // Import AccessMenu
import "../styles/utils/UtilityTemplate.css";

const UtilityTemplate = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get current route path

  // ✅ Map routes to header titles
  const pageTitles = {
    "/about": "About",
    "/faq": "FAQ",
    "/terms": "Terms of Service",
    "/privacy": "Privacy Policy",
    "/wallet": "Wallet",
    "/settings": "Settings",
    "/join": "Join a Contest",
  };

  // ✅ Determine what to show in the header (Title or PikMe Logo)
  const headerContent = pageTitles[location.pathname] || (
    <img src={pikMeLogo} alt="PikMe Logo" className="pikme-logo-image" />
  );

  return (
    <div className="utility-template">
      {/* Access Menu */}
      <AccessMenu />

      {/* ✅ Header Section */}
      <header className="utility-header">
        <button className="return-home-button" onClick={() => navigate("/")}>
          <FaChevronLeft className="arrow-left-icon" /> Return to PikMe Home
        </button>

        {/* ✅ Render Dynamic Header Title or Default Logo */}
        <div className="utility-header-content">
          {typeof headerContent === "string" ? (
            <h1 className="utility-header-title">{headerContent}</h1>
          ) : (
            <div className="pikme-logo">{headerContent}</div>
          )}
        </div>
      </header>

      {/* ✅ Main Content */}
      <main className="utility-content">{children}</main>
    </div>
  );
};

// ✅ PropTypes Validation
UtilityTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UtilityTemplate;
