// This page displays a "Check us out on Desktop" message for mobile devices.

import LazyImage from "../components/Common/LazyImage";
import { ImageUrl } from "../constant/appConstants";
import "../styles/pages/Mobile.css";

const Mobile = () => {
  return (
    <div
      className="mobile-overlay"
      style={{
        backgroundImage: `url('${ImageUrl}/icons/bckgrmob.svg')`,
      }}
    >
      <div className="mobile-container">
        <LazyImage
          src={`${ImageUrl}/icons/pmlogo.png`}
          alt="PikMe Logo"
          className="mobile-logo"
        />
        {/* <img
          src={`${ImageUrl}/icons/pmlogo.png`}
          alt="PikMe Logo"
          className="mobile-logo"
          onError={onImageError}
        /> */}
        <LazyImage
          src={`${ImageUrl}/icons/cubes.png`}
          alt="Cute Cubes"
          className="mobile-cubes"
        />
        {/* <img
          src={`${ImageUrl}/icons/cubes.png`}
          onError={onImageError}
          alt="Cute Cubes"
          className="mobile-cubes"
        /> */}
        <div className="mobile-content">
          <h1 className="mobile-title">
            CHECK US OUT
            <br />
            ON DESKTOP!
          </h1>
          <p className="mobile-description">
            PikMe is best experienced on a desktop browser.
            <br />
            <br />
            Please visit us on your computer for the full experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mobile;
