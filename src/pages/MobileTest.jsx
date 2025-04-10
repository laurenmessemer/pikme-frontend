import Lottie from "lottie-react";
import { useEffect, useState } from "react";

const BackgroundLottie = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("https://d38a0fe14bafg9.cloudfront.net/icons/Game4.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(console.error);
  }, []);

  if (!animationData) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: -1,
      overflow: "hidden"
    }}>
      <Lottie
        animationData={animationData}
        loop
        autoplay
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />
    </div>
  );
};

export default BackgroundLottie;
