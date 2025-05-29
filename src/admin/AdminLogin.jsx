/*
 * File: AdminLogin.jsx
 * Author: HARSH CHAUHAN
 * Created Date: May 19th, 2025
 * Description: This component handles admin login flow with hookform and yup schema validation.
 */

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth";
import "../styles/admin/AdminLogin.scss";
import { checkSuccessResponse } from "../utils/RouterUtils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMessage from "../components/Common/ErrorMessage";
import { useState } from "react";
import CustomSvgIcon from "../constant/CustomSvgIcons";

// Validation schema
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup.string().trim().required("Password is required"),
});

const AdminLogin = () => {
  const { login, setIsLoginLoading, isLoginLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const navigate = useNavigate();

  // Initialize react-hook-form with validation
  const {
    register,
    handleSubmit,
    formState,
    setError: setFormError,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange", // Validate on change
    criteriaMode: "all", // Show all validation errors
  });

  const onSubmit = async (data) => {
    setIsLoginLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email: data.email,
          password: data.password,
        }
      );

      console.log("✅ Login success:", response.data);

      if (response.data.user.role !== "admin") {
        throw new Error(
          "Unauthorized: You must be an admin to access this page."
        );
      }

      if (checkSuccessResponse(response)) {
        setIsLoginLoading(false);
        // ✅ Store token before navigating
        localStorage.setItem("authToken", response.data.token);
        login(response.data.token, response.data.user);

        console.log("🔄 Redirecting to /admin-console...");
        navigate("/admin-console");
        setTimeout(() => window.location.reload(), 300);
      }
    } catch (err) {
      console.error("❌ Admin Login Error:", err);
      setIsLoginLoading(false);
      setFormError("root", {
        type: "manual",
        message: err.response?.data?.message || err.message || "Login failed",
      });
    } finally {
      setIsLoginLoading(false);
    }
  };

  return (
    <div className="admin-main-container">
      <div className="admin-login-container">
        <h2 className="admin-login-title">Admin Console Login</h2>
        <p className="admin-login-description">
          Enter your credentials to access the admin dashboard
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="admin-login-form common-form"
        >
          <div className="field-box">
            <label className="form-label" htmlFor="email">
              EMAIL ADDRESS <span className="star-required">*</span>
            </label>
            <div className="input-box">
              <input
                id="email"
                type="email"
                placeholder="Admin Email"
                className={`form-input ${
                  formState.errors.email ? "error-input" : ""
                }`}
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
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`form-input password-input ${
                  formState.errors.password ? "error-input" : ""
                }`}
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
          {/* Root error message */}
          {formState.errors.root && (
            <div className="error-message">
              <p>{formState.errors.root.message}</p>
            </div>
          )}
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
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
