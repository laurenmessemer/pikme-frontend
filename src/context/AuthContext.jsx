import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

const defaultProvider = {
  token: "",
  user: {},
  login: () => {},
  logout: () => {},
  isLoginLoading: false,
  setIsLoginLoading: () => {},
};

const AuthContext = createContext(defaultProvider);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          // ✅ Use env variable
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        })
        .then((res) => {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data)); // ✅ Store user in local storage
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        });
    }
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData)); // ✅ Save user data

    if (userData?.role === "admin") {
      localStorage.setItem("authToken", newToken);
    }
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (user?.role === "admin") {
      localStorage.removeItem("authToken");
    }
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isLoginLoading, setIsLoginLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
