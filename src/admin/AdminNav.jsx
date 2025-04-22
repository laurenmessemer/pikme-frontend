import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/admin/AdminConsole.css";

const AdminNav = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/admin-login");
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      if (decodedToken.role === "admin") {
        setIsAdmin(true);
      } else {
        localStorage.removeItem("authToken"); // Clear invalid token
        navigate("/admin-login");
      }
    } catch (error) {
      console.error("❌ Error decoding token:", error);
      localStorage.removeItem("authToken");
      navigate("/admin-login");
    }
  }, [navigate]);

  // const handleLogout = () => {
  //   console.log("🚪 Logging out...");
  //   localStorage.removeItem("authToken");
  //   navigate("/admin-login");
  // };

  if (!isAdmin) {
    return null; // Prevents rendering if not authorized
  }

  return (
    <div className="admin-sidebar">
      <nav>
        <h3>Contests</h3>
        <NavLink to="/admin-console/themes" end className={({ isActive }) => (isActive ? "active-link" : "")}>
          Manage Themes
        </NavLink>
        <NavLink to="/admin-console/themes/create" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Add New Theme
        </NavLink>
        <NavLink to="/admin-console/contests" end className={({ isActive }) => (isActive ? "active-link" : "")}>
          Manage Contests
        </NavLink>
        <NavLink to="/admin-console/contests/create" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Create Contest
        </NavLink>
        <NavLink to="/admin-console/competitions" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Manage Competitions
        </NavLink>
        
        {/* <NavLink to="/admin-console/list-contests" className={({ isActive }) => (isActive ? "active-link" : "")}>
          List All Contests
        </NavLink>
        <NavLink to="/admin-console/competitions" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Manage Competitions
        </NavLink> */}

        <NavLink to="/admin-console/reports" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Reports & Moderation
        </NavLink>

        <h3>Users</h3>
        <NavLink to="/admin-console/users" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Users
        </NavLink>



        <h3>Metrics</h3>
        <NavLink to="/admin-console/metrics/engagement" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Engagement & Retention
        </NavLink>
        {/* <NavLink to="/admin-console/metrics/ux" className={({ isActive }) => (isActive ? "active-link" : "")}>
          UX
        </NavLink> */}
        {/* <NavLink to="/admin-console/metrics/financial" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Financial
        </NavLink> */}
        <NavLink to="/admin-console/metrics/platform" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Platform
        </NavLink>
      </nav>

      {/* <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button> */}
    </div>
  );
};

export default AdminNav;
