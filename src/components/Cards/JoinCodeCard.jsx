import PropTypes from "prop-types";
import { useState } from "react";
import "../../styles/cards/JoinCodeCard.css";
import Submit from "../Buttons/Submit";

const JoinCodeCard = ({ onSubmit }) => {
  const [code, setCode] = useState("");

  const handleClick = () => {
    const trimmed = code.trim();
    if (trimmed.length >= 6) {
      onSubmit(trimmed);
    }
  };

  return (
    <div className="join-code-wrapper">
      <div className="join-code-card">
        <h2 className="join-title">Join a Contest</h2>
        <p className="join-subtitle">Enter your contest invite code:</p>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="join-input"
          placeholder="a1b2c3d4e5f6"
        />
        <Submit text="Continue" onClick={handleClick} className="join-submit" />
      </div>
    </div>
  );
};

JoinCodeCard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default JoinCodeCard;
