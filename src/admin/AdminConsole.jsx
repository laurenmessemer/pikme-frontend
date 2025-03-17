import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../styles/admin/AdminConsole.css";
import AdminNav from "./AdminNav";

const AdminConsole = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/admin-login");
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      if (decodedToken.role === "admin") {
        setAdmin(decodedToken);
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
    navigate("/admin-login");
  };

  if (!admin) {
    return <p>Loading...</p>;
  }

  return (
    <div className="admin-container">
      <AdminNav />
      <div className="admin-main">
        <header className="admin-header">
          <span className="admin-username">{admin.email}</span>
          <button className="logout-button" onClick={handleLogout}>Log Out</button>
        </header>
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminConsole;
