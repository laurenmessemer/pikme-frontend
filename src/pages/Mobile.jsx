// This page displays a "Check us out on Desktop" message for mobile devices.

import "../styles/pages/Mobile.css";

const Mobile = () => {
  return (
    <div
      className="mobile-overlay"
      style={{
        backgroundImage: `url('https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/bckgrmob.svg')`,
      }}
    >
      <div className="mobile-container">
        <img
          src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/pikme_svg.svg"
          alt="PikMe Logo"
          className="mobile-logo"
        />
        <img
          src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/cubes.svg"
          alt="Cute Cubes"
          className="mobile-cubes"
        />
        <div className="mobile-content">
          <h1 className="mobile-title">
            CHECK US OUT
            <br />
            ON MOBILE!
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
