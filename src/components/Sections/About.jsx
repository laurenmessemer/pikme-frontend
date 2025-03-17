import { useState } from "react";
import PikMeSolo from "../../assets/logos/pikme-solo.svg";
import welcomeGIF from "../../assets/static/welcome.gif";
import "../../styles/sections/About.css";

const About = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="about-container">
      <div
        className="about-gif-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={welcomeGIF}
          alt="Welcome Animation"
          className={`about-gif ${isHovered ? "" : "paused"}`}
        />
      </div>
      <div className="about-text-container">
        <h2 className="about-title">
          <img src={PikMeSolo} alt="PikMe Solo Logo" className="about-icon" /> Who we are
        </h2>
        <p className="about-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
};

export default About;
