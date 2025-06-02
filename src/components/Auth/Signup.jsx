import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UtilityTemplate from "../../utils/UtilityTemplate";
import CreateAccountCard from "../Cards/CreateAccountCard";
import { checkSuccessResponse } from "../../utils/RouterUtils";
import ToastUtils from "../../utils/ToastUtils";
import RegistrationSuccessPopup from "../Popups/RegistrationSuccessPopup";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [redirectTo, setRedirectTo] = useState("/");
  const [lastEmail, setLastEmail] = useState("");
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const params = new URLSearchParams(location.search);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const inviteCode = params.get("invite_code");

  useEffect(() => {
    if (inviteCode && inviteCode.length >= 6) {
      async function getUserParticipationHandler() {
        setError("");
        setIsSignUpLoading(true);
        setEmail("");
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/competition-entry/validate-invite-code/${inviteCode}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        if (checkSuccessResponse(response)) {
          setError("");
          setIsSignUpLoading(false);
          setEmail(response?.data?.competition?.invited_friend_email);
          setUserName(response?.data?.competition?.invited_friend_name);
          setReferralCode(response?.data?.referralCode);
          // ToastUtils.success(
          //   "You're all set! Please check your email to verify your account."
          // );
        }
      }
      getUserParticipationHandler();
    }
  }, [inviteCode]);

  useEffect(() => {
    const code = params.get("ref");
    const redirect = params.get("redirect");
    if (code) {
      setReferralCode(code);
    }

    if (redirect) setRedirectTo(redirect);
  }, [location]);

  const handleSignup = async (username, email, password, inputReferralCode) => {
    try {
      setIsSignUpLoading(true);
      setError("");
      setLastEmail(email); // Store email for potential resend

      const payload = {
        username,
        email,
        password,
        referralCode: inputReferralCode || referralCode,
      };

      if (inviteCode) {
        payload.inviteCode = inviteCode;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        payload,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      if (checkSuccessResponse(response)) {
        setIsSignUpLoading(false);
        setShowSuccessPopup(true);
      }
    } catch (error) {
      setIsSignUpLoading(false);
      console.error(
        "❌ Signup failed:",
        error.response?.data?.message || "Unknown error"
      );
      setError(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  const handleResendEmail = async () => {
    if (!lastEmail) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/resend-verification`,
        {
          email: lastEmail,
        }
      );
      // alert("✅ Verification email resent! Please check your inbox.");
      ToastUtils.success("Verification email resent! Please check your inbox.");
    } catch (err) {
      console.error("❌ Failed to resend email:", err);
      // alert("Could not resend verification email. Try again later.");
      ToastUtils.error("Could not resend verification email. Try again later.");
    }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    navigate(redirectTo); // Redirect to specified page or landing page
  };

  return (
    <UtilityTemplate>
      <CreateAccountCard
        onSubmit={handleSignup}
        referralCode={referralCode}
        error={error}
        onResendVerification={handleResendEmail}
        isSignUpLoading={isSignUpLoading}
        usernameValue={userName}
        emailValue={email}
      />
      {showSuccessPopup && (
        <RegistrationSuccessPopup onClose={handleCloseSuccessPopup} />
      )}
    </UtilityTemplate>
  );
};

export default Signup;
