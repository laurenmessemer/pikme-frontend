import { useState } from "react";
import PikMeSolo from "../../assets/logos/pikme-solo.svg";
import welcomeGIF from "../../assets/static/welcome.gif";

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
          <img src={PikMeSolo} alt="PikMe Solo Logo" className="about-icon" />{" "}
          Who we are
        </h2>

        {/* Section 1: General */}
        <p className="about-description">
          PikMe is a real-money, skill-based competition platform offering a new
          way for creatives to get paid online. We’re building a head-to-head
          contest system that turns the popularity contest of social media into
          a meritocracy to fairly reward creative skill. Starting with
          photography, we’re providing a direct path to turn your photos into
          profits.
        </p>

        {/* Section 2: Problem Space */}
        <p className="about-description">
          Today, it’s super easy to create content, but super difficult to
          monetize content. You have to compete with 200M+ creators,
          influencers, and professionals with large followings. Not only that,
          you have to figure out the algorithm for each app that you’re on. And
          they don’t pay you until you have enough subscribers. For budding
          photographers and “junior creators,” it’s hard to even get your foot
          in the door. You’re forced to make content that will get you noticed
          by the algorithm, not the things you want to create.
        </p>
        <p className="about-description">
          We want to make monetization accessible for everyone at every stage of
          their creative journey while preserving artistic freedom.
        </p>

        {/* Section 3: Solution + Differentiation */}
        <p className="about-description">
          At PikMe, we don’t care about your social media or years of
          experience. As long as you have a photo you’d like to share and earn
          money for, you have just as much of a chance to win!
        </p>
      </div>
    </div>
  );
};

export default About;
