import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth";
import "../styles/admin/AdminLogin.css";

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear error state

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password,
      });
    

      console.log("✅ Login success:", response.data);

      if (response.data.user.role !== "admin") {
        throw new Error("Unauthorized: You must be an admin to access this page.");
      }

      // ✅ Store token before navigating
      localStorage.setItem("authToken", response.data.token);
      login(response.data.token, response.data.user);

      console.log("🔄 Redirecting to /admin-console...");
      navigate("/admin-console");
      setTimeout(() => window.location.reload(), 300);
    } catch (err) {
      console.error("❌ Admin Login Error:", err);
      setError(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
