import PropTypes from "prop-types";
import { useState } from "react";
import "../../styles/popups/popups.css";
import SubmitButton from "../Buttons/Submit";
import LazyImage from "../Common/LazyImage";

const HowToVote = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onClose();
    }
  };

  const handleDotClick = (targetStep) => {
    setStep(targetStep);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container how-to-vote-popup">
        <div className="popup-header">
          <button className="popup-close" onClick={onClose}>
            ✖
          </button>
        </div>

        <div
          className="popup-content"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {step === 1 ? (
            <div className="step-one-wrapper">
              <LazyImage
                src="https://d38a0fe14bafg9.cloudfront.net/icons/pointer.svg"
                alt="Pointer Icon"
                style={{ width: "36px", marginBottom: "16px" }}
              />
              <h2 className="popup-title" style={{ marginTop: "0px" }}>
                How to Vote
              </h2>
              <p
                className="popup-message"
                style={{ padding: "10px 20px", marginTop: "8px" }}
              >
                For each matchup, pick the photo you like best! Simply click on
                the Vote button or anywhere on the photo to submit your vote.
              </p>
            </div>
          ) : (
            <div className="step-two-wrapper">
              <h2 className="popup-title">
                <LazyImage
                  src="https://d38a0fe14bafg9.cloudfront.net/icons/pointer.svg"
                  alt="Pointer Icon"
                  className="popup-icon"
                />
                What to look for:
              </h2>
              <p className="popup-message narrow-message">
                Vote for the photo you believe best fits the contest — based on
                your personal judgment.
              </p>
              <div
                className="popup-message narrow-message"
                style={{ paddingTop: 0, paddingBottom: 0 }}
              >
                <p>
                  <strong>▪ Creativity</strong> – Original thinking or unique
                  perspective?
                </p>
                <p>
                  <strong>▪ Emotional impact</strong> – Does it make you feel
                  something or tell a story?
                </p>
                <p>
                  <strong>▪ Execution</strong> – Well-composed, focused,
                  technically strong?
                </p>
                <p>
                  <strong>▪ Relevance</strong> – Fits the theme or spirit of the
                  contest?
                </p>
                <p>
                  <strong>▪ Novelty</strong> – Have you seen something like this
                  before?
                </p>
              </div>
              {/* <p className="popup-message narrow-message">
                Vote for the photo you believe best fits the contest — based on{" "}
                <em>your</em> personal judgment.
              </p> */}
            </div>
          )}

          {/* Step indicators */}
          <div style={{ margin: "10px 0" }}>
            {[1, 2].map((dotStep) => (
              <span
                key={dotStep}
                onClick={() => handleDotClick(dotStep)}
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: step === dotStep ? "#333" : "#ccc",
                  margin: "0 4px",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>

          <div className="popup-button">
            <SubmitButton
              onClick={handleNext}
              text={step === 1 ? "Next" : "Let’s Go!"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

HowToVote.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default HowToVote;
