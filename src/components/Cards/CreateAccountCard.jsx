/*
 * File: CreateAccountCard.jsx
 * Author: HARSH CHAUHAN
 * Created Date: May 19th, 2025
 * Description: This component handles signup flow with hookform and yup schema validation.
 */

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../styles/cards/CreateAccountCard.css";
import ErrorMessage from "../Common/ErrorMessage";
import CustomSvgIcon from "../../constant/CustomSvgIcons";
import { EMAIL_REGEX } from "../../constant/appConstants";

// Validation schema
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .trim()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: yup
    .string()
    .trim()
    .matches(EMAIL_REGEX, "Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(12, "Password must be at least 12 characters"),
  confirmPassword: yup
    .string()
    .trim()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords don't match."),
  referralCode: yup.string().matches(/^\S*$/, "Whitespace is not allowed"),
});

const CreateAccountCard = ({
  onSubmit,
  referralCode,
  isSignUpLoading = false,
  usernameValue = "",
  emailValue = "",
  error,
}) => {
  // Initialize react-hook-form with validation
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: usernameValue || "",
      email: emailValue || "",
      password: "",
      confirmPassword: "",
      referralCode: referralCode || "",
    },
    mode: "onChange", // Validate on change
    criteriaMode: "all", // Show all validation errors
  });

  useEffect(() => {
    if (usernameValue || emailValue || referralCode) {
      reset({
        username: usernameValue || "",
        email: emailValue || "",
        password: "",
        confirmPassword: "",
        referralCode: referralCode || "",
      });
    }
  }, [usernameValue, emailValue, referralCode]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleFormSubmit = async (data) => {
    await onSubmit(data.username, data.email, data.password, data.referralCode);
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Create account</h1>
      <form
        className="signup-form common-form"
        onSubmit={handleSubmit(handleFormSubmit)}
        autoComplete="off"
      >
        {/* Username */}
        <div className="field-box">
          <label className="form-label" htmlFor="username">
            USERNAME <span className="star-required">*</span>
          </label>
          <div className="input-box">
            <input
              id="username"
              className={`form-input ${
                formState.errors.username ? "error-input" : ""
              }`}
              type="text"
              placeholder="Username"
              disabled={isSignUpLoading}
              {...register("username")}
            />
            {!formState.errors.username && formState.dirtyFields.username && (
              <div className="green-custom-checkmark"></div>
            )}
          </div>
          {formState.errors.username && (
            <ErrorMessage message={formState.errors.username.message} />
          )}
        </div>

        {/* Email */}
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
              disabled={isSignUpLoading}
              {...register("email")}
            />
            {!formState.errors.email && formState.dirtyFields.email && (
              <div className="green-custom-checkmark"></div>
            )}
          </div>
          {formState.errors.email && (
            <ErrorMessage message={formState.errors.email.message} />
          )}
        </div>

        {/* Password */}
        <div className="field-box">
          <label className="form-label" htmlFor="password">
            CREATE PASSWORD <span className="star-required">*</span>
          </label>
          <div className="password-wrapper">
            <input
              id="password"
              className={`form-input password-input ${
                formState.errors.password ? "error-input" : ""
              }`}
              type={showPassword ? "text" : "password"}
              placeholder="Minimum 12 characters"
              disabled={isSignUpLoading}
              {...register("password")}
            />
            <button
              type="button"
              className={`eye-icon  ${
                formState.errors.password ? "error-eye-icon" : ""
              }`}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <CustomSvgIcon icon="PasswordEyeOffIcon" />
              ) : (
                <CustomSvgIcon icon="PasswordEyeIcon" />
              )}
            </button>
            {!formState.errors.password && formState.dirtyFields.password && (
              <div
                className={`green-custom-checkmark password-checkmark`}
              ></div>
            )}
          </div>
          {formState.errors.password && (
            <ErrorMessage message={formState.errors.password.message} />
          )}
        </div>

        {/* Confirm Password */}
        <div className="field-box">
          <label className="form-label" htmlFor="confirmPassword">
            CONFIRM PASSWORD <span className="star-required">*</span>
          </label>
          <div className="password-wrapper">
            <input
              id="confirmPassword"
              className={`form-input password-input ${
                formState.errors.confirmPassword ? "error-input" : ""
              }`}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Minimum 12 characters"
              disabled={isSignUpLoading}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              className={`eye-icon`}
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <CustomSvgIcon icon="PasswordEyeOffIcon" />
              ) : (
                <CustomSvgIcon icon="PasswordEyeIcon" />
              )}
            </button>
            {!formState.errors.confirmPassword &&
              formState.dirtyFields.confirmPassword && (
                <div
                  className={`green-custom-checkmark password-checkmark`}
                ></div>
              )}
          </div>
          {formState.errors.confirmPassword && (
            <ErrorMessage message={formState.errors.confirmPassword.message} />
          )}
        </div>

        {/* Referral Code */}
        <div className="field-box">
          <label className="form-label" htmlFor="referralCode">
            REFERRAL CODE <span className="optional">(optional)</span>
          </label>
          <div className="input-box">
            <input
              id="referralCode"
              className={`form-input ${
                formState.errors.referralCode ? "error-input" : ""
              }`}
              type="text"
              placeholder="PIK000000 (Optional)"
              disabled={isSignUpLoading}
              {...register("referralCode")}
            />
            {!formState.errors.referralCode &&
              formState.dirtyFields.referralCode && (
                <div className="green-custom-checkmark"></div>
              )}
          </div>
          {formState.errors.referralCode && (
            <ErrorMessage message={formState.errors.referralCode.message} />
          )}
        </div>
        {/* ✅ Error with optional resend link */}
        {error && (
          <div className="error-message no-space">
            <p>{error}</p>
          </div>
        )}
        <div>
          {/* Submit Button */}
          <button
            className="signup-button"
            type="submit"
            disabled={isSignUpLoading}
          >
            {isSignUpLoading ? (
              <>
                <span className="cu-loader"></span>
              </>
            ) : (
              "CREATE ACCOUNT"
            )}
          </button>

          {/* Keep Me Signed In */}
          {/* <div className="keep-signed-in">
                <input type="checkbox" className="checkbox-input" id="keepSignedIn" /> */}
          {/* <label htmlFor="keepSignedIn">Keep me signed in.</label> */}
          {/* </div> */}

          {/* Divider */}
          <div className="divider">
            <span className="line"></span>
            {/* <span className="divider-text">OR CONTINUE WITH</span> */}
            {/* <span className="line"></span> */}
          </div>

          {/* Social Signup */}
          {/* <div className="social-signup">
                  <FaGoogle className="social-icon" />
                  <FaApple className="social-icon" />
                  <FaFacebook className="social-icon" />
            </div> */}
          {/* Terms and Privacy */}
          <p className="terms-text">
            By continuing, you agree to our{" "}
            <a href="/terms">Terms of Service</a>. Please review our{" "}
            <a href="/privacy">Privacy Policy</a> to understand how we use your
            personal information.
          </p>

          {/* Already have an account? */}
          <p className="footer-text">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </form>
    </div>
  );
};

CreateAccountCard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  referralCode: PropTypes.string,
  isSignUpLoading: PropTypes.bool,
  usernameValue: PropTypes.string,
  emailValue: PropTypes.string,
};

export default CreateAccountCard;
