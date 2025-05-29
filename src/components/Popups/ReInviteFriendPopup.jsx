import PropTypes from "prop-types";
import { useState } from "react";
import "../../styles/popups/popups.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { REINVITE_OPPONENT_API } from "../../constant/ApiUrls";
import { checkSuccessResponse } from "../../utils/RouterUtils";
import { api } from "../../api";
import ToastUtils from "../../utils/ToastUtils";
import { EMAIL_REGEX } from "../../constant/appConstants";
import Opponent from "../Buttons/Opponent";

/**
 * ReInviteFriendPopup Component
 *
 * A modal popup that allows users to resend competition invitations to friends.
 * This component is used when a previously invited friend hasn't responded to a
 * competition invitation, and the user wants to send a new invitation with updated
 * contact information.
 *
 * Features:
 * - Form validation using React Hook Form and Yup
 * - Real-time validation feedback with green checkmarks for valid fields
 * - Loading state management during API submission
 * - Error handling with toast notifications
 *
 * @component
 */

// Validation schema
const validationSchema = yup.object().shape({
  invitee_name: yup.string().required("Invitee name is required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(EMAIL_REGEX, "Invalid email format"),
});

const ReInviteFriendPopup = ({ onClose, competitionId = "", onSubmit }) => {
  // State for loading and error handling
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOpponent, setSelectedOpponent] = useState("pick_random");

  // Initialize react-hook-form with validation
  const { register, handleSubmit, formState } = useForm({
    resolver:
      selectedOpponent === "invite_friend"
        ? yupResolver(validationSchema)
        : undefined,
    defaultValues: { email: "", invitee_name: "" },
    mode: "onChange", // Validate on change
    criteriaMode: "all", // Show all validation errors
  });

  // Handle form submission
  const onFormSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const response = await api({
        endpoint: REINVITE_OPPONENT_API,
        payloadData: { ...data, match_type: selectedOpponent, competitionId },
      });

      if (checkSuccessResponse(response)) {
        // Call the onSubmit prop if provided
        if (onSubmit) {
          onSubmit(data, response);
        }
        ToastUtils.success(response?.data?.message);
        onClose();
      } else {
        ToastUtils.error(response?.data?.error);
      }
    } catch (error) {
      console.error("Error reinviting friend:", error);
      ToastUtils.error(
        error.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-popup-overlay">
      <div className="contact-popup">
        <div className="contact-header">
          <h2>Let's Re-invite </h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Form with React Hook Form */}
        <div className="popup-content reinvite-content">
          <div className="common-form flex-form">
            <div className="field-box popup-data">
              <label className="form-label">Choose Your Opponent</label>
              <div className="submission-card-opponents">
                <Opponent
                  opponentName="Challenge Friend"
                  isSelected={selectedOpponent === "invite_friend"}
                  onClick={() => {
                    if (isSubmitting) {
                      return;
                    }
                    setSelectedOpponent("invite_friend");
                  }}
                />
                <Opponent
                  opponentName="Pick For Me"
                  isSelected={selectedOpponent === "pick_random"}
                  onClick={() => {
                    if (isSubmitting) {
                      return;
                    }
                    setSelectedOpponent("pick_random");
                    reset({ email: "", invitee_name: "" });
                  }}
                />
              </div>
            </div>
            {selectedOpponent === "invite_friend" ? (
              <>
                <div className="field-box">
                  <label className="form-label" htmlFor="invitee_name">
                    Invitee Name <span className="star-required">*</span>
                  </label>
                  <div className="input-box">
                    <input
                      id="invitee_name"
                      className={`form-input ${
                        formState.errors.invitee_name ? "error-input" : ""
                      }`}
                      placeholder="Enter invitee name"
                      disabled={isSubmitting}
                      {...register("invitee_name")}
                    />
                    {!formState.errors.invitee_name &&
                      formState.dirtyFields.invitee_name && (
                        <div className="green-custom-checkmark"></div>
                      )}
                  </div>
                  {formState.errors.invitee_name && (
                    <p className="custom-error-message">
                      {formState.errors.invitee_name.message}
                    </p>
                  )}
                </div>
                <div className="field-box">
                  <label className="form-label" htmlFor="email">
                    EMAIL ADDRESS <span className="star-required">*</span>
                  </label>
                  <div className="input-box">
                    <input
                      id="email"
                      className={`form-input ${
                        formState.errors.email ? "error-input" : ""
                      }`}
                      type="email"
                      placeholder="Valid email address"
                      disabled={isSubmitting}
                      {...register("email")}
                    />
                    {!formState.errors.email && formState.dirtyFields.email && (
                      <div className="green-custom-checkmark"></div>
                    )}
                  </div>
                  {formState.errors.email && (
                    <p className="custom-error-message">
                      {formState.errors.email.message}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          {/* ✅ Action Button */}
          <div className="contact-form-buttons more-space">
            <button
              type="button"
              onClick={onClose}
              className="btn-cancel"
              disabled={isSubmitting}
            >
              CANCEL
            </button>
            <button
              className="btn-add"
              onClick={handleSubmit(onFormSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span class="cu-loader"></span>
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ReInviteFriendPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  competitionId: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default ReInviteFriendPopup;
