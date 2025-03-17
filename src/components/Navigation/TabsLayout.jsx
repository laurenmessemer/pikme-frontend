import { Outlet, useLocation } from "react-router-dom";
import "../../styles/nav/TabsLayout.css";
import Footer from "./Footer";
import Tabs from "./Tabs";

function TabsLayout() {
  const location = useLocation(); // Get the current path

  // Define a mapping of paths to background colors
  const tabBackgrounds = {
    "/": "var(--light)",
    "/compete": "var(--compete-background)",
    "/vote": "var(--vote-background)",
    "/leaderboard": "var(--leaderboard-background)",
  };

  // Get the background color based on the current path, defaulting to primary-brand
  const backgroundColor = tabBackgrounds[location.pathname] || "var(--primary-brand)";

  return (
    <div className="tabs-layout">
      <Tabs /> {/* Persistent navbar at the top */}
      <div className="tab-content" style={{ backgroundColor }}>
        <Outlet /> {/* Dynamically renders the selected page */}
      </div>
      <Footer /> {/* Footer stays at the bottom */}
    </div>
  );
}

export default TabsLayout;
