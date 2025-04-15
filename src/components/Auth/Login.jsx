import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UseAuth";
import UtilityTemplate from "../../utils/UtilityTemplate";
import LoginCard from "../Cards/LoginCard";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (email, password) => {
    try {
      setError(""); // Clear previous error

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password,
      });

      console.log("✅ Login success:", response.data);
      login(response.data.token, response.data.user);

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 100);
    } catch (err) {
      console.error("❌ Login Error:", err);

      const backendMessage = err.response?.data?.message || "";
      if (backendMessage.toLowerCase().includes("suspended")) {
        setError("Your account has been suspended. Please contact support.");
      } else if (backendMessage.toLowerCase().includes("verify")) {
        setError("Please verify your email before logging in.");
      } else if (backendMessage.toLowerCase().includes("invalid")) {
        setError("Invalid email or password.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <UtilityTemplate>
      <LoginCard onSubmit={handleLogin} error={error} />
    </UtilityTemplate>
  );
};

export default Login;


// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/UseAuth";
// import UtilityTemplate from "../../utils/UtilityTemplate";
// import LoginCard from "../Cards/LoginCard";

// const Login = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [error, setError] = useState(""); // ✅ Error state added

//   const handleLogin = async (email, password) => {
//     try {
//       setError(""); // Reset error before making request

//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
//         email,
//         password,
//       });

//       console.log("✅ Login success:", response.data);
//       login(response.data.token, response.data.user);

//       setTimeout(() => {
//         navigate("/");
//         window.location.reload(); // ✅ Ensures AccessMenu updates
//       }, 100);
//     } catch (err) {
//       console.error("❌ Login Error:", err);
//       setError(err.response?.data?.message || "Login failed"); // ✅ Handles 404 errors properly
//     }
//   };

//   return (
//     <UtilityTemplate>
//       <LoginCard onSubmit={handleLogin} error={error} />
//     </UtilityTemplate>
//   );
// };

// export default Login;
