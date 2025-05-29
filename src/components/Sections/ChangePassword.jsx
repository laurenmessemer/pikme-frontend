import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMessage from "../Common/ErrorMessage";
import CustomSvgIcon from "../../constant/CustomSvgIcons";

// Validation schema for change password form
const changePasswordValidationSchema = yup.object().shape({
  currentPassword: yup.string().trim().required("Current password is required"),
  newPassword: yup
    .string()
    .trim()
    .required("New password is required")
    .min(12, "Password must be at least 12 characters"),
  confirmPassword: yup
    .string()
    .trim()
    .required("Please confirm your new password")
    .oneOf([yup.ref("newPassword")], "Passwords don't match."),
});

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangePasswordLoading, setIsChangePasswordLoading] = useState(false);

  // Initialize react-hook-form for change password
  const {
    register: registerChangePassword,
    handleSubmit: handleSubmitChangePassword,
    formState: changePasswordFormState,
    reset: resetChangePasswordForm,
  } = useForm({
    resolver: yupResolver(changePasswordValidationSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange", // Validate on change
    criteriaMode: "all", // Show all validation errors
  });

  // Toggle password visibility functions
  const toggleCurrentPasswordVisibility = () =>
    setShowCurrentPassword(!showCurrentPassword);
  const toggleNewPasswordVisibility = () =>
    setShowNewPassword(!showNewPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Handle change password form submission
  const handleChangePasswordSubmit = async (data) => {
    try {
      setIsChangePasswordLoading(true);
      // TODO: Implement API call to change password
      console.log("Change password data:", data);

      // Reset form on success
      resetChangePasswordForm();

      // TODO: Show success message
      alert("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      // TODO: Show error message
      alert("Failed to change password. Please try again.");
    } finally {
      setIsChangePasswordLoading(false);
    }
  };

  return (
    <>
      <div className="change-password-form-container">
        <form
          className="change-password-form common-form flex-form"
          onSubmit={handleSubmitChangePassword(handleChangePasswordSubmit)}
          autoComplete="off"
        >
          {/* Current Password */}
          <div className="field-box">
            <label className="form-label" htmlFor="currentPassword">
              CURRENT PASSWORD <span className="star-required">*</span>
            </label>
            <div className="input-box">
              <input
                id="currentPassword"
                className={`form-input password-input ${
                  changePasswordFormState.errors.currentPassword
                    ? "error-input"
                    : ""
                }`}
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter your current password"
                disabled={isChangePasswordLoading}
                {...registerChangePassword("currentPassword")}
              />
              <button
                type="button"
                className="eye-icon"
                onClick={toggleCurrentPasswordVisibility}
                disabled={isChangePasswordLoading}
              >
                <CustomSvgIcon
                  icon={
                    showCurrentPassword
                      ? "PasswordEyeOffIcon"
                      : "PasswordEyeIcon"
                  }
                />
              </button>
              {!changePasswordFormState.errors.currentPassword &&
                changePasswordFormState.dirtyFields.currentPassword && (
                  <div className="green-custom-checkmark password-checkmark"></div>
                )}
            </div>
            {changePasswordFormState.errors.currentPassword && (
              <ErrorMessage
                message={changePasswordFormState.errors.currentPassword.message}
              />
            )}
          </div>

          {/* New Password */}
          <div className="field-box">
            <label className="form-label" htmlFor="newPassword">
              NEW PASSWORD <span className="star-required">*</span>
            </label>
            <div className="input-box">
              <input
                id="newPassword"
                className={`form-input password-input ${
                  changePasswordFormState.errors.newPassword
                    ? "error-input"
                    : ""
                }`}
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter your new password"
                disabled={isChangePasswordLoading}
                {...registerChangePassword("newPassword")}
              />
              <button
                type="button"
                className="eye-icon"
                onClick={toggleNewPasswordVisibility}
                disabled={isChangePasswordLoading}
              >
                <CustomSvgIcon
                  icon={
                    showNewPassword ? "PasswordEyeOffIcon" : "PasswordEyeIcon"
                  }
                />
              </button>
              {!changePasswordFormState.errors.newPassword &&
                changePasswordFormState.dirtyFields.newPassword && (
                  <div className="green-custom-checkmark password-checkmark"></div>
                )}
            </div>
            {changePasswordFormState.errors.newPassword && (
              <ErrorMessage
                message={changePasswordFormState.errors.newPassword.message}
              />
            )}
          </div>

          {/* Confirm New Password */}
          <div className="field-box">
            <label className="form-label" htmlFor="confirmPassword">
              CONFIRM NEW PASSWORD <span className="star-required">*</span>
            </label>
            <div className="input-box">
              <input
                id="confirmPassword"
                className={`form-input password-input ${
                  changePasswordFormState.errors.confirmPassword
                    ? "error-input"
                    : ""
                }`}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                disabled={isChangePasswordLoading}
                {...registerChangePassword("confirmPassword")}
              />
              <button
                type="button"
                className="eye-icon"
                onClick={toggleConfirmPasswordVisibility}
                disabled={isChangePasswordLoading}
              >
                <CustomSvgIcon
                  icon={
                    showConfirmPassword
                      ? "PasswordEyeOffIcon"
                      : "PasswordEyeIcon"
                  }
                />
              </button>
              {!changePasswordFormState.errors.confirmPassword &&
                changePasswordFormState.dirtyFields.confirmPassword && (
                  <div className="green-custom-checkmark password-checkmark"></div>
                )}
            </div>
            {changePasswordFormState.errors.confirmPassword && (
              <ErrorMessage
                message={changePasswordFormState.errors.confirmPassword.message}
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            className="submit-button"
            type="submit"
            disabled={isChangePasswordLoading}
          >
            {isChangePasswordLoading ? (
              <>
                <span className="cu-loader"></span>
                Changing Password...
              </>
            ) : (
              "CHANGE PASSWORD"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
