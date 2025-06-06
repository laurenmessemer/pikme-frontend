import PropTypes from "prop-types";
import "../../styles/popups/popups.css";
import {
  POST_CLOSE_WARNING_POPUP,
  REINVITE_OPPONENT_API,
} from "../../constant/ApiUrls";
import { checkSuccessResponse } from "../../utils/RouterUtils";
import { api } from "../../api";
import ToastUtils from "../../utils/ToastUtils";
import SubmitButton from "../Buttons/Submit"; // ✅ Import button component
import { useState } from "react";
import CustomSvgIcon from "../../constant/CustomSvgIcons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UseAuth";

const AccountWarningPopup = ({
  onClose,
  title = "Account Ban",
  warningPopup = false,
}) => {
  const { user, login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const onFormSubmit = async () => {
    try {
      setIsSubmitting(true);

      const response = await api({
        endpoint: POST_CLOSE_WARNING_POPUP,
      });

      if (checkSuccessResponse(response)) {
        // Update user context with age verification status
        const updatedUser = { ...response?.data?.user };
        const token = localStorage.getItem("token");
        login(token, updatedUser);
        onClose();
        onClose();
      } else {
        ToastUtils.error(response?.data?.error);
      }
    } catch (error) {
      ToastUtils.error(
        error.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="error-container">
        <div className="popup-header">
          {warningPopup && (
            <button className="close-btn new-close-btn" onClick={onClose}>
              <CustomSvgIcon icon={"CloseModelIcon"} />
            </button>
          )}
        </div>
        <div className="popup-content latest-popup-content">
          {/* ✅ Main Content */}
          <h2 className="popup-title">{title}</h2>

          {/* ✅ Message */}
          <p className="popup-message">
            A manual review of your entries have determined that you’ve
            repeatedly posted photos that go against PikMe rules.
          </p>
          {warningPopup ? (
            <>
              <p className="popup-message">
                Everyone can help keep our community safe by only uploading
                appropriate photos. If you need a refresher on our rules,
                <span className="link-text"
                  onClick={() => {
                    navigate("/terms");
                  }}
                >
                  click here
                </span>.
              </p>
              <p className="popup-message">
                Further violations may result in an account ban. Please contact
                us through the “Contact Us” form in Settings.
              </p>
            </>
          ) : (
            <>
              <p className="popup-message">
                After multiple warnings, you continued uploading content that
                broke PikMe rules, so we have banned your account from any
                current and future contests.
              </p>
              <p className="popup-message">
                If you have any questions, please contact us through click below
                button.
              </p>
            </>
          )}
          {/* ✅ Close Button */}
          <div className="popup-button">
            {warningPopup ? (
              <>
                <button
                  className={`submit-button no-spacing ${
                    isSubmitting ? "button-disabled" : "button-cta"
                  }`}
                  onClick={onFormSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span class="cu-loader"></span>
                    </>
                  ) : (
                    "I Understand"
                  )}
                </button>
              </>
            ) : (
              <>
                <SubmitButton
                  text="Contact Us"
                  onClick={() => {
                    onClose();
                    navigate("/settings");
                  }}
                  className="no-spacing"
                  disabled={isSubmitting}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

AccountWarningPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  warningPopup: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default AccountWarningPopup;
