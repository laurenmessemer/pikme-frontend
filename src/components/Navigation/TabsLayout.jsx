import { Outlet, useLocation } from "react-router-dom";
import "../../styles/nav/TabsLayout.css";
import Footer from "../Navigation/Footer"; // ✅ Import Footer
import AccessMenu from "./AccessMenu"; // ✅ Import
import Tabs from "./TabBackground";

function TabsLayout() {
  const location = useLocation();

  // Map paths to z-indices
  const zIndices = {
    "/": 100,
    "/vote": 200,
    "/compete": 300,
    "/leaderboard": 400,
    "/leaderboard/Live": 400,
    "/leaderboard/Winners": 400,
    "/leaderboard/MySubmissions": 400,
    "/join/upload": 300,
  };

  const tabBackgrounds = {
    "/": "var(--light)",
    "/vote": "var(--vote-background)",
    "/compete": "var(--compete-background)",
    "/leaderboard": "var(--leaderboard-background)",
    "/leaderboard/Live": "var(--leaderboard-background)",
    "/leaderboard/Winners": "var(--leaderboard-background)",
    "/leaderboard/MySubmissions": "var(--leaderboard-background)",
    "/join/upload": "var(--compete-background)",
  };

  const getBasePath = (path) => {
    const parts = path.split("/");
    return `/${parts[1] || ""}/${parts[2] || ""}`.replace(/\/$/, ""); // normalize to 2-level
  };

  const basePath = getBasePath(location.pathname);

  const backgroundColor = tabBackgrounds[basePath] || "transparent";
  const contentZ = zIndices[basePath] || 100;

  return (
    <>
      <div className="tabs-layout">
        <Tabs />

        {/* ✅ Global Access Menu */}
        <div className="access-menu-wrapper">
          <AccessMenu />
        </div>

        <div
          className="tab-content"
          style={{ backgroundColor, zIndex: contentZ }}
        >
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default TabsLayout;
