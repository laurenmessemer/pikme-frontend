import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import UtilityTemplate from "../../utils/UtilityTemplate";
import ResetPasswordCard from "../Cards/ResetPasswordCard";
import { useAuth } from "../../context/UseAuth";

const ResetPassword = () => {
  const { token: tokenData } = useParams();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useAuth();

  const handleReset = async (formValues) => {
    if (step === 1) {
      // Request reset email
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/reset-password-request`,
          {
            email: formValues.email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        setEmail(formValues.email);
        setStep(2);
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "Something went wrong");
      }
    } else if (step === 2) {
      // Verify code
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/verify-code`,
          {
            email,
            code: formValues.verificationCode,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        setStep(3);
      } catch (error) {
        setMessage(error.response?.data?.message || "Invalid code");
      }
    } else if (step === 3) {
      // Reset password
      try {
        if (formValues.password !== formValues.confirmPassword) {
          setMessage("Passwords do not match");
          return;
        }
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
          {
            token: tokenData,
            password: formValues.password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <UtilityTemplate>
      <ResetPasswordCard onSubmit={handleReset} step={step} email={email} />
      {message && <p className="success-message">{message}</p>}
    </UtilityTemplate>
  );
};

export default ResetPassword;
