// Signup.jsx
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
  const [redirectTo, setRedirectTo] = useState("/"); // ✅ Default to homepage

  // ✅ Extract referral and redirect code from URL on load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("ref");
    const redirect = params.get("redirect");

    if (code) setReferralCode(code);
    if (redirect) setRedirectTo(redirect); // ✅ This only activates for join-invite links
  }, [location]);

  const handleSignup = async (username, email, password, inputReferralCode) => {
    try {
      setError("");

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        username,
        email,
        password,
        referralCode: inputReferralCode || referralCode, // ✅ Use provided or auto-referral
      });

      console.log("✅ Signup success:", response.data);

      // ✅ Redirect to invite flow (if provided), or home
      navigate(redirectTo);
      window.location.reload();

    } catch (error) {
      console.error("❌ Signup failed:", error.response?.data?.message || "Unknown error");
      setError(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <UtilityTemplate>
      <CreateAccountCard
        onSubmit={handleSignup}
        referralCode={referralCode}
        error={error}
      />
    </UtilityTemplate>
  );
};

export default Signup;
