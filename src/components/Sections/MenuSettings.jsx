import { useState } from "react";
import {
    FaEnvelope,
    FaFileAlt,
    FaHeadset,
    FaKey,
    FaShieldAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/sections/MenuSettings.css";
import UtilityTemplate from "../../utils/UtilityTemplate";
import ContactPopup from "../Popups/ContactPopup"; // ✅ Make sure this path is correct

const MenuSettings = () => {
  const [activeTab, setActiveTab] = useState("support");
  const [showContactPopup, setShowContactPopup] = useState(false);
  const navigate = useNavigate();

  return (
    <UtilityTemplate>
      <div className="menu-settings-wrapper">
        <div className="menu-settings-sidebar">
          <h3 className="menu-settings-section-title">Info and support</h3>

          <div
            className={`menu-settings-button ${
              activeTab === "support" ? "active" : ""
            }`}
            onClick={() => setActiveTab("support")}
          >
            <div className="menu-settings-left">
              <FaHeadset className="menu-settings-icon" />
              <span>Support</span>
            </div>
            <span className="menu-settings-arrow">›</span>
          </div>

          <div
            className={`menu-settings-button ${
              activeTab === "privacy" ? "active" : ""
            }`}
            onClick={() => setActiveTab("privacy")}
          >
            <div className="menu-settings-left">
              <FaShieldAlt className="menu-settings-icon" />
              <span>Privacy</span>
            </div>
            <span className="menu-settings-arrow">›</span>
          </div>

          <div
            className={`menu-settings-button ${
              activeTab === "terms" ? "active" : ""
            }`}
            onClick={() => setActiveTab("terms")}
          >
            <div className="menu-settings-left">
              <FaFileAlt className="menu-settings-icon" />
              <span>Terms of Service</span>
            </div>
            <span className="menu-settings-arrow">›</span>
          </div>

          <h3 className="menu-settings-section-title">Login</h3>

          <div
            className="menu-settings-button"
            onClick={() => navigate("/reset-password-request")}
          >
            <div className="menu-settings-left">
              <FaKey className="menu-settings-icon" />
              <span>Change Password</span>
            </div>
            <span className="menu-settings-arrow">›</span>
          </div>
        </div>

        <div className="menu-settings-content">
          {activeTab === "support" && (
            <>
              <h3 className="menu-settings-section-title">Support</h3>
              <div
                className="menu-settings-button"
                onClick={() => setShowContactPopup(true)}
              >
                <div className="menu-settings-left">
                  <FaEnvelope className="menu-settings-icon" />
                  <span>Contact Us</span>
                </div>
                <span className="menu-settings-arrow">›</span>
              </div>
              {showContactPopup && (
                <ContactPopup onClose={() => setShowContactPopup(false)} />
              )}
            </>
          )}

          {activeTab === "privacy" && (
            <>
              <h3 className="menu-settings-section-title">Privacy</h3>
              <p className="menu-settings-privacy-text">
                We value your privacy and respect your creative work—no need to
                worry, you are in control.{" "}
                <Link to="/privacy" className="menu-settings-learn-more">
                  Learn more
                </Link>
              </p>
            </>
          )}

          {activeTab === "terms" && (
            <>
              <h3 className="menu-settings-section-title">Terms of Service</h3>
              <p className="menu-settings-privacy-text">
                We value your trust and respect your rights as a user. Our Terms
                of Service ensure you’re in control.{" "}
                <Link to="/terms" className="menu-settings-learn-more">
                  Learn more
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </UtilityTemplate>
  );
};

export default MenuSettings;
