import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminConsole from "./AdminConsole"; // ✅ Ensure this wraps nested routes
import AdminLogin from "./AdminLogin";
import CreateContest from "./CreateContest";
import CreateTheme from "./CreateTheme";
import Engagement from "./Engagement";
import Financial from "./Financial";
import ListAllContests from "./ListAllContests";
import ManageCompetitions from "./ManageCompetitions";
import ManageContests from "./ManageContests";
import ManageThemes from "./ManageThemes";
import Platform from "./Platform";
import Reports from "./Reports";
import Users from "./Users";
import UX from "./UX";

const AdminRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        console.warn("Token expired");
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(decodedToken.role === "admin");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      localStorage.removeItem("authToken");
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // ✅ Prevents flickering while checking auth
  }

  return (
    <Routes>
      {/* ✅ Redirect unauthorized users */}
      {!isAuthenticated && (
        <Route path="*" element={<Navigate to="/admin-login" replace />} />
      )}

      <Route path="/admin-login" element={<AdminLogin />} />

      {isAuthenticated && (
        <Route path="/admin-console/*" element={<AdminConsole />}>
          {/* ✅ Routes inside AdminConsole will render inside <Outlet /> */}
          <Route index element={<ManageThemes />} /> {/* Default Page */}
          <Route path="themes" element={<ManageThemes />} />
          <Route path="themes/create" element={<CreateTheme />} />
          <Route path="contests" element={<ManageContests />} />
          <Route path="contests/create" element={<CreateContest />} />
          <Route path="list-contests" element={<ListAllContests />} />
          <Route path="reports" element={<Reports />} />
          <Route path="users" element={<Users />} />
          <Route path="competitions" element={<ManageCompetitions />} />
          <Route path="metrics/engagement" element={<Engagement />} />
          <Route path="metrics/ux" element={<UX />} />
          <Route path="metrics/financial" element={<Financial />} />
          <Route path="metrics/platform" element={<Platform />} />
        </Route>
      )}

      {/* ✅ Redirect unknown admin routes */}
      <Route path="*" element={<Navigate to="/admin-console" />} />
    </Routes>
  );
};

export default AdminRoutes;
