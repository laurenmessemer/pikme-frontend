import { useState } from "react";
import "../../styles/nav/TabBackground.css";

const imageFiles = [
  { src: "/src/assets/backgrounds/pm2.svg", id: "home-tab" },
  { src: "/src/assets/backgrounds/pm3.svg", id: "vote-tab" },
  { src: "/src/assets/backgrounds/pm4.svg", id: "compete-tab" },
  { src: "/src/assets/backgrounds/pm5.svg", id: "lead-tab" }
];

const TabBackground = () => {
  const [topIndex, setTopIndex] = useState(imageFiles.length);

  const bringToFront = (index) => {
    setTopIndex((prevTop) => prevTop + 1);
    document.getElementById(imageFiles[index].id).style.zIndex = topIndex;
  };

  return (
    <div className="scalable-container1">
      <div className="tab-container1">
        <div className="tab-wrapper1">
          {/* Clickable tab buttons */}
          <div className="tab-buttons1">
            {imageFiles.map((tab, index) => (
              <button
                key={tab.id}
                className={`tab-button1 ${tab.id}`}
                onClick={() => bringToFront(index)}
              >
                {tab.id.replace("-tab", "").toUpperCase()}
              </button>
            ))}
          </div>

          {/* Background images */}
          <div className="tab-background-container1">
            {imageFiles.map((tab, index) => (
              <img
                key={tab.id}
                id={tab.id}
                src={tab.src}
                alt={`Tab Background ${index + 1}`}
                className="tab-background-image1"
                style={{ zIndex: index }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabBackground;
