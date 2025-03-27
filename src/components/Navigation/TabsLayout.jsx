import { Outlet, useLocation } from "react-router-dom";
import "../../styles/nav/TabsLayout.css";
import AccessMenu from "./AccessMenu"; // ✅ Import
import Footer from "./Footer";
import Tabs from "./TabBackground";

function TabsLayout() {
  const location = useLocation();

  // Map paths to z-indices
  const zIndices = {
    "/": 100,
    "/vote": 200,
    "/compete": 300,
    "/leaderboard": 400,
  };

  const tabBackgrounds = {
    "/": "var(--light)",
    "/vote": "var(--vote-background)",
    "/compete": "var(--compete-background)",
    "/leaderboard": "var(--leaderboard-background)",
  };

  const backgroundColor = tabBackgrounds[location.pathname] || "transparent";
  const contentZ = zIndices[location.pathname] || 100;

  return (
    <div className="tabs-layout">
      <Tabs />
      
      {/* ✅ Global Access Menu */}
      <div className="access-menu-wrapper">
        <AccessMenu />
      </div>

      <div className="tab-content" style={{ backgroundColor, zIndex: contentZ }}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default TabsLayout;



