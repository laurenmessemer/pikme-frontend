/*
 * File: LoginCard.jsx
 * Author: HARSH CHAUHAN
 * Created Date: May 19th, 2025
 * Description: This component handles login flow with hookform and yup schema validation.
 */

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../styles/cards/LoginCard.css";
import ErrorMessage from "../Common/ErrorMessage";
import { useEffect, useState } from "react";
import CustomSvgIcon from "../../constant/CustomSvgIcons";

// Validation schema
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup.string().trim().required("Password is required"),
});

const LoginCard = ({
  onSubmit,
  error,
  onResendVerification,
  emailForResend,
  isLoginLoading = false,
  emailValue = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Initialize react-hook-form with validation
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange", // Validate on change
    criteriaMode: "all", // Show all validation errors
  });

  useEffect(() => {
    if (emailValue) {
      reset({
        email: emailValue,
        password: "",
      });
    }
  }, [emailValue]);

  const handleFormSubmit = async (data) => {
    await onSubmit(data.email, data.password);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Log In to PikMe</h1>
      <form
        className="login-form common-form"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
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
              disabled={isLoginLoading}
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

        <div className="field-box">
          <label className="form-label" htmlFor="password">
            PASSWORD <span className="star-required">*</span>
          </label>
          <div className="input-box">
            <input
              id="password"
              className={`form-input password-input ${
                formState.errors.password ? "error-input" : ""
              }`}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              disabled={isLoginLoading}
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

        {/* ✅ Error with optional resend link */}
        {error && (
          <div className="error-message no-space">
            <p>{error}</p>
            {error.toLowerCase().includes("verify") &&
              onResendVerification &&
              emailForResend && (
                <p
                  className="resend-link"
                  onClick={() => onResendVerification(emailForResend)}
                >
                  Resend verification email
                </p>
              )}
          </div>
        )}

        <Link to="/reset-password" className="forgot-password-link">
          Forgot your password?
        </Link>

        <div>
          <button
            className="login-button"
            type="submit"
            disabled={isLoginLoading}
          >
            {isLoginLoading ? (
              <>
                <span className="cu-loader"></span>
              </>
            ) : (
              "LOG IN"
            )}
          </button>
          <div className="divider">
            <span className="line"></span>
            {/* <span className="divider-text">OR CONTINUE WITH</span> */}
            {/* <span className="line"></span> */}
          </div>
          {/* <div className="social-login">
                <div className="social-icon"><FaGoogle /></div>
                <div className="social-icon"><FaApple /></div>
                <div className="social-icon"><FaFacebook /></div>
              </div> */}
          <p className="footer-text">
            Don't have an account? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

LoginCard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  onResendVerification: PropTypes.func,
  emailForResend: PropTypes.string,
  isLoginLoading: PropTypes.bool,
  emailValue: PropTypes.string,
};

export default LoginCard;

// import PropTypes from "prop-types";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import "../../styles/buttons/CustomCheck.css";
// import "../../styles/cards/LoginCard.css";

// const LoginCard = ({ onSubmit, error }) => {
//   const [formValues, setFormValues] = useState({ email: "", password: "" });

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormValues((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await onSubmit(formValues.email, formValues.password);
//   };

//   return (
//     <div className="login-container">
//       <h1 className="login-title">Log In to PikMe</h1>

//       <form className="login-form" onSubmit={handleSubmit}>
//         <label className="form-label" htmlFor="email">EMAIL ADDRESS</label>
//         <input
//           id="email"
//           className="form-input"
//           type="email"
//           placeholder="Valid email address"
//           value={formValues.email}
//           onChange={handleInputChange}
//           required
//         />

//         <label className="form-label" htmlFor="password">PASSWORD</label>
//         <input
//           id="password"
//           className="form-input"
//           type="password"
//           placeholder="Enter your password"
//           value={formValues.password}
//           onChange={handleInputChange}
//           required

//         />

//         {/* ✅ Show error message */}
//         {error && <p className="error-message">{error}</p>}

//         <Link to="/reset-password" className="forgot-password-link">
//           Forgot your password?
//         </Link>

//         <button className="login-button" type="submit">LOG IN</button>

//         <div className="divider">
//           <span className="line"></span>
//           {/* <span className="divider-text">OR CONTINUE WITH</span> */}
//           {/* <span className="line"></span> */}
//         </div>

//         {/* <div className="social-login">
//           <div className="social-icon"><FaGoogle /></div>
//           <div className="social-icon"><FaApple /></div>
//           <div className="social-icon"><FaFacebook /></div>
//         </div> */}

//         <p className="footer-text">
//           Don't have an account? <Link to="/signup">Create an account</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// LoginCard.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   error: PropTypes.string, // ✅ Accepts error message
// };

// export default LoginCard;
