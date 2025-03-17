import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UtilityTemplate from "../../utils/UtilityTemplate";
import CreateAccountCard from "../Cards/CreateAccountCard";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(""); // ✅ Error state for handling failed signup

  const handleSignup = async (username, email, password) => {
    try {
      setError(""); // ✅ Reset error before new request

      const response = await axios.post("http://localhost:5004/api/auth/register", {
        username,
        email,
        password,
      });

      console.log("✅ Signup success:", response.data);

      // ✅ Delay navigation to avoid race conditions
      const timer = setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 100);

      return () => clearTimeout(timer); // ✅ Cleanup function to prevent memory leaks
    } catch (error) {
      console.error("❌ Signup failed:", error.response?.data?.message || "Unknown error");
      setError(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <UtilityTemplate>
      <CreateAccountCard onSubmit={handleSignup} error={error} /> {/* ✅ Pass error to UI */}
    </UtilityTemplate>
  );
};

export default Signup;
