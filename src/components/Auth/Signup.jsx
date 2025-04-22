import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UtilityTemplate from "../../utils/UtilityTemplate";
import CreateAccountCard from "../Cards/CreateAccountCard";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [redirectTo, setRedirectTo] = useState("/");
  const [lastEmail, setLastEmail] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("ref");
    const redirect = params.get("redirect");

    if (code) setReferralCode(code);
    if (redirect) setRedirectTo(redirect);
  }, [location]);

  const handleSignup = async (username, email, password, inputReferralCode) => {
    try {
      setError("");
      setLastEmail(email); // Store email for potential resend

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        username,
        email,
        password,
        referralCode: inputReferralCode || referralCode,
      });

      console.log("✅ Signup success:", response.data);
      navigate(redirectTo);
      window.location.reload();
    } catch (error) {
      console.error("❌ Signup failed:", error.response?.data?.message || "Unknown error");
      setError(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  const handleResendEmail = async () => {
    if (!lastEmail) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/resend-verification`, {
        email: lastEmail,
      });
      alert("✅ Verification email resent! Please check your inbox.");
    } catch (err) {
      console.error("❌ Failed to resend email:", err);
      alert("Could not resend verification email. Try again later.");
    }
  };

  return (
    <UtilityTemplate>
      <CreateAccountCard
        onSubmit={handleSignup}
        referralCode={referralCode}
        error={error}
        onResendVerification={handleResendEmail}
      />
    </UtilityTemplate>
  );
};

export default Signup;
