import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UseAuth";
import UtilityTemplate from "../../utils/UtilityTemplate";
import LoginCard from "../Cards/LoginCard";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(""); // ✅ Error state added

  const handleLogin = async (email, password) => {
    try {
      setError(""); // Reset error before making request

      const response = await axios.post("http://localhost:5004/api/auth/login", {
        email,
        password,
      });

      console.log("✅ Login success:", response.data);
      login(response.data.token, response.data.user);

      setTimeout(() => {
        navigate("/");
        window.location.reload(); // ✅ Ensures AccessMenu updates
      }, 100);
    } catch (err) {
      console.error("❌ Login Error:", err);
      setError(err.response?.data?.message || "Login failed"); // ✅ Handles 404 errors properly
    }
  };

  return (
    <UtilityTemplate>
      <LoginCard onSubmit={handleLogin} error={error} />
    </UtilityTemplate>
  );
};

export default Login;
