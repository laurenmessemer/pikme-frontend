import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/nav/TabBackground.css";
import LazyImage from "../Common/LazyImage";

// ✅ Improved base path parser
const getBasePath = (path) => {
  if (path === "/") return "/";
  const parts = path.split("/").filter(Boolean);
  return `/${parts[0]}${parts[1] ? "/" + parts[1] : ""}`;
};

// ✅ Unique tab definitions
const imageFiles = [
  {
    src: "https://d38a0fe14bafg9.cloudfront.net/icons/pm2.svg",
    id: "home-tab",
    route: "/",
  },
  {
    src: "https://d38a0fe14bafg9.cloudfront.net/icons/pm3.svg",
    id: "vote-tab",
    route: "/vote",
  },
  {
    src: "https://d38a0fe14bafg9.cloudfront.net/icons/pm4.svg",
    id: "compete-tab",
    route: "/compete",
  },
  {
    src: "https://d38a0fe14bafg9.cloudfront.net/icons/pm5.svg",
    id: "lead-tab",
    route: "/leaderboard",
  },
  // { src: "https://d38a0fe14bafg9.cloudfront.net/icons/pm4.svg", id: "upload-tab", route: "/join/upload" }
];

// ✅ Preload all tab images
const preloadImages = (images) => {
  images.forEach((img) => {
    const image = new Image();
    image.src = img.src;
  });
};

const TabBackground = () => {
  const [topIndex, setTopIndex] = useState(imageFiles.length);
  const [activeTabId, setActiveTabId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    preloadImages(imageFiles);

    const basePath = getBasePath(location.pathname);
    let match = imageFiles.find((tab) => tab.route === basePath);

    // Special case: activate compete-tab when URL contains "join/upload"
    if (!match && location.pathname.includes("join/upload")) {
      match = imageFiles.find((tab) => tab.id === "compete-tab");
    }

    // Special case: activate lead-tab for all leaderboard sub-routes
    if (!match && location.pathname.startsWith("/leaderboard")) {
      match = imageFiles.find((tab) => tab.id === "lead-tab");
    }

    if (match) {
      const image = document.getElementById(match.id);
      if (image) {
        const nextZ = imageFiles?.length + 1;
        image.style.zIndex = nextZ;
        setTopIndex(nextZ);
        setActiveTabId(match.id);
      }
    }
  }, [location.pathname]);

  const handleTabClick = (index) => {
    const route = imageFiles[index].route;
    navigate(route);
    // useEffect will handle the visual update
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
                onClick={() => {
                  handleTabClick(index);
                }}
              >
                {tab.id.replace("-tab", "").toUpperCase()}
              </button>
            ))}
          </div>

          <div className="tab-background-container1">
            {imageFiles.map((tab, index) => (
              <LazyImage
                key={tab.id}
                id={tab.id}
                src={tab.src}
                alt={`Tab Background ${index + 1}`}
                className={`tab-background-image1 tab-img-${tab.id}`}
                style={{ zIndex: tab.id === activeTabId ? topIndex : index }}
                // onClick={() => {
                //   handleTabClick(index);
                // }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabBackground;

// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../../styles/nav/TabBackground.css";

// const getBasePath = (path) => {
//   const parts = path.split("/");
//   return `/${parts[1] || ""}/${parts[2] || ""}`.replace(/\/$/, "");
// };

// const imageFiles = [
//   { src: "https://d38a0fe14bafg9.cloudfront.net/icons/pm2.svg", id: "home-tab", route: "/" },
//   { src: "https://d38a0fe14bafg9.cloudfront.net/icons/pm3.svg", id: "vote-tab", route: "/vote" },
//   { src: "https://d38a0fe14bafg9.cloudfront.net/icons/pm4.svg", id: "compete-tab", route: "/compete" },
//   { src: "https://d38a0fe14bafg9.cloudfront.net/icons/pm5.svg", id: "lead-tab", route: "/leaderboard" },
//   // { src: "https://d38a0fe14bafg9.cloudfront.net/icons/pm4.svg", id: "compete-tab", route: "/join/upload" }
// ];

// const preloadImages = (images) => {
//   images.forEach((img) => {
//     const image = new Image();
//     image.src = img.src;
//   });
// };

// const TabBackground = () => {
//   const [topIndex, setTopIndex] = useState(imageFiles.length);
//   const [activeTabId, setActiveTabId] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // When the route changes, bring the matching image to the front
//   useEffect(() => {

//     preloadImages(imageFiles);  //pre-load images

//     const basePath = getBasePath(location.pathname);
//     const match = imageFiles.find((tab) => tab.route === basePath);

//     if (match) {
//       const image = document.getElementById(match.id);
//       if (image) {
//         const nextZ = topIndex + 1;
//         image.style.zIndex = nextZ;
//         setTopIndex(nextZ);
//         setActiveTabId(match.id);
//       }
//     }
//   }, [location.pathname]);

//   const handleTabClick = (index) => {
//     const route = imageFiles[index].route;
//     navigate(route);
//     //  Don't bring image to front yet — wait for useEffect to do it after routing
//   };

//   return (
//     <div className="scalable-container1">
//       <div className="tab-container1">
//         <div className="tab-wrapper1">
//           <div className="tab-buttons1">
//             {imageFiles.map((tab, index) => (
//               <button
//                 key={tab.id}
//                 className={`tab-button1 ${tab.id}`}
//                 onClick={() => handleTabClick(index)}
//               >
//                 {tab.id.replace("-tab", "").toUpperCase()}
//               </button>
//             ))}
//           </div>

//           <div className="tab-background-container1">
//             {imageFiles.map((tab, index) => (
//               <img
//                 key={tab.id}
//                 id={tab.id}
//                 src={tab.src}
//                 alt={`Tab Background ${index + 1}`}
//                 className={`tab-background-image1 tab-img-${tab.id}`}
//                 style={{ zIndex: tab.id === activeTabId ? topIndex : index }}
//                 loading="eager"
//                 decoding="async"
//                 onClick={() => handleTabClick(index)}
//                 onLoad={(e) => e.target.classList.add("loaded")}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TabBackground;
