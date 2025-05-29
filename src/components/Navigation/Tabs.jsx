import { NavLink, useLocation } from "react-router-dom";
import PikMe from "../../assets/logos/pikme-solo.svg"; // ✅ Import PikMe logo
import "../../styles/nav/Tabs.css";
import AccessMenu from "./AccessMenu";

function Tabs() {
  const location = useLocation(); // Get the current path

  // Map paths to background colors
  const tabBackgrounds = {
    "/": "var(--light)",
    "/compete": "var(--compete-background)",
    "/vote": "var(--vote-background)",
    "/leaderboard": "var(--leaderboard-background)",
    "/leaderboard/Live": "var(--leaderboard-background)",
    "/leaderboard/Winners": "var(--leaderboard-background)",
    "/leaderboard/MySubmissions": "var(--leaderboard-background)",
  };

  // Get the background color for the current tab
  const activeColor =
    tabBackgrounds[location.pathname] || "var(--primary-brand)";

  return (
    <nav className="tabs-nav">
      <ul>
        <li className="tab-wrapper">
          <NavLink
            to="/"
            className="tab-link"
            style={{
              backgroundColor:
                location.pathname === "/" ? activeColor : "var(--light)",
            }}
          >
            <img src={PikMe} alt="PikMe Logo" className="pikme-logo-solo" />{" "}
            PikMe
          </NavLink>
        </li>
        <li className="tab-wrapper">
          <NavLink
            to="/compete"
            className="tab-link"
            style={{
              backgroundColor:
                location.pathname === "/compete"
                  ? activeColor
                  : "var(--compete-background)",
            }}
          >
            Compete
          </NavLink>
        </li>
        <li className="tab-wrapper">
          <NavLink
            to="/vote"
            className="tab-link"
            style={{
              backgroundColor:
                location.pathname === "/vote"
                  ? activeColor
                  : "var(--vote-background)",
            }}
          >
            Vote
          </NavLink>
        </li>
        <li className="tab-wrapper">
          <NavLink
            to="/leaderboard"
            className="tab-link"
            style={{
              backgroundColor:
                location.pathname === "/leaderboard"
                  ? activeColor
                  : "var(--leaderboard-background)",
            }}
          >
            Leaderboard
          </NavLink>
        </li>
      </ul>
      <AccessMenu />
    </nav>
  );
}

export default Tabs;
