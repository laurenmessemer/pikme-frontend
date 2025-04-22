import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth"; // ✅ Import your Auth hook
import "../styles/admin/AdminConsole.css";
import AdminNav from "./AdminNav";

const AdminConsole = () => {
  const navigate = useNavigate();
  const [isVerifiedAdmin, setIsVerifiedAdmin] = useState(false);
  const { user, logout } = useAuth(); // ✅ Pull user from context

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/admin-login");
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      if (decodedToken.role === "admin") {
        setIsVerifiedAdmin(true);
      } else {
        localStorage.removeItem("authToken");
        navigate("/admin-login");
      }
    } catch (error) {
      console.error("❌ Error decoding token:", error);
      localStorage.removeItem("authToken");
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    logout(); // ✅ clear context too
    navigate("/admin-login");
  };

  if (!isVerifiedAdmin || !user) {
    return <p>Loading...</p>;
  }

  return (
  <div className="admin-container">
    {/* 🔹 Top Header */}
    <header className="admin-header">
      <div className="admin-header-left">
        <h1 className="admin-title">PikMe Admin Console</h1>
      </div>
      <div className="admin-header-user">
        <span className="admin-username">
          <strong>{user.username || user.email}</strong>
        </span>
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </header>

    {/* 🔹 Main layout under header: sidebar + content */}
    <div className="admin-body">
      <AdminNav />

      <div className="admin-main">
        <div className="content-wrapper">
          <div className="admin-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  </div>
  );  
};

export default AdminConsole;
