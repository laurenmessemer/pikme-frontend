import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { checkSuccessResponse } from "../../utils/RouterUtils";
import { useAuth } from "../../context/UseAuth";
import UtilityTemplate from "../../utils/UtilityTemplate";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const token = searchParams.get("token");
  const inviteCode = searchParams.get("inviteCode");
  const [status, setStatus] = useState("verifying");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/verify-email`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
            params: { token, inviteCode },
          }
        );
        if (checkSuccessResponse(response)) {
          if (response.data.token && response.data.inviteCode) {
            login(response.data.token, response.data.user);
            setStatus("success");
            navigate(`/join/upload/${response.data.inviteCode}`);
          } else if (response.data.token) {
            login(response.data.token, response.data.user);
            setStatus("success");
            navigate("/");
          } else {
            setStatus("success");
            navigate("/login");
          }
        }
      } catch (err) {
        console.error("❌ Email verification failed:", err);
        setStatus("error");
      }
    };

    if (token) {
      verify();
    } else {
      // Give a brief moment to show "verifying" before showing error
      setTimeout(() => setStatus("error"), 500);
    }
  }, [token, navigate]);

  return (
    <UtilityTemplate>
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        {status === "verifying" && (
          <p className="loading-message">
            Please wait while we verify your email address...
          </p>
        )}

        {status === "success" && (
          <p className="success-message">
            Your email has been successfully verified. Redirecting you now...
          </p>
        )}

        {status === "error" && (
          <p className="error-message">
            Invalid or expired verification token. Please try again or request a
            new verification email.
          </p>
        )}
      </div>
    </UtilityTemplate>
  );
};

export default VerifyEmail;
