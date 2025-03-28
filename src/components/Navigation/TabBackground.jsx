import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/nav/TabBackground.css";

const imageFiles = [
  { src: "https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/pm2.svg", id: "home-tab", route: "/" },
  { src: "https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/pm3.svg", id: "vote-tab", route: "/vote" },
  { src: "https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/pm4.svg", id: "compete-tab", route: "/compete" },
  { src: "https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/pm5.svg", id: "lead-tab", route: "/leaderboard" }
];

const TabBackground = () => {
  const [topIndex, setTopIndex] = useState(imageFiles.length);
  const [activeTabId, setActiveTabId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // When the route changes, bring the matching image to the front
  useEffect(() => {
    const match = imageFiles.find((tab) => tab.route === location.pathname);
    if (match) {
      const image = document.getElementById(match.id);
      if (image) {
        const nextZ = topIndex + 1;
        image.style.zIndex = nextZ;
        setTopIndex(nextZ);
        setActiveTabId(match.id);
      }
    }
  }, [location.pathname]);

  const handleTabClick = (index) => {
    const route = imageFiles[index].route;
    navigate(route);
    // ⛔ Don't bring image to front yet — wait for useEffect to do it after routing
  };

  return (
    <div className="scalable-container1">
      <div className="tab-container1">
        <div className="tab-wrapper1">
          <div className="tab-buttons1">
            {imageFiles.map((tab, index) => (
              <button
                key={tab.id}
                className={`tab-button1 ${tab.id}`}
                onClick={() => handleTabClick(index)}
              >
                {tab.id.replace("-tab", "").toUpperCase()}
              </button>
            ))}
          </div>

          <div className="tab-background-container1">
            {imageFiles.map((tab, index) => (
              <img
                key={tab.id}
                id={tab.id}
                src={tab.src}
                alt={`Tab Background ${index + 1}`}
                className={`tab-background-image1 tab-img-${tab.id}`}
                style={{ zIndex: tab.id === activeTabId ? topIndex : index }}
                onClick={() => handleTabClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabBackground;


