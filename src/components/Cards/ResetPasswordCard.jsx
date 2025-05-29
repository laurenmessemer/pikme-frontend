import PropTypes from "prop-types";
import { useState } from "react";
import "../../styles/cards/ResetPasswordCard.css";
import Submit from "../Buttons/Submit";

const ResetPasswordCard = ({ onSubmit, step, email }) => {
  const [formValues, setFormValues] = useState({
    email: "",
    verificationCode: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <div className="reset-container">
      {step === 1 && (
        <form className="reset-form" onSubmit={handleSubmit}>
          <h1 className="reset-title with-space">Reset Your Password</h1>
          <label className="form-label" htmlFor="email">
            EMAIL ADDRESS
          </label>
          <input
            id="email"
            className="form-input"
            type="email"
            placeholder="Email address"
            value={formValues.email}
            onChange={handleInputChange}
          />
          <Submit text="CONTINUE" variant="cta" type="submit" />
        </form>
      )}

      {step === 2 && (
        <form className="reset-form" onSubmit={handleSubmit}>
          <h1 className="reset-title">Reset Your Password</h1>
          <p className="info-text">
            We sent a code to <strong>{email}</strong>
            <br />
            It may take a few minutes to get it.
          </p>
          <label className="form-label" htmlFor="verificationCode">
            VERIFICATION CODE
          </label>
          <input
            id="verificationCode"
            className="form-input"
            type="text"
            placeholder="Verification code"
            value={formValues.verificationCode}
            onChange={handleInputChange}
          />
          <p className="resend-code">Resend Code</p>
          <Submit
            text="CONTINUE"
            variant="cta"
            type="submit"
            className="no-spacing"
          />
        </form>
      )}

      {step === 3 && (
        <form className="reset-form" onSubmit={handleSubmit}>
          <h1 className="reset-title with-space">Enter a New Password</h1>
          <label className="form-label" htmlFor="password">
            NEW PASSWORD
          </label>
          <input
            id="password"
            className="form-input"
            type="password"
            placeholder="Minimum 12 characters"
            value={formValues.password}
            onChange={handleInputChange}
          />
          <label className="form-label" htmlFor="confirmPassword">
            CONFIRM NEW PASSWORD
          </label>
          <input
            id="confirmPassword"
            className="form-input"
            type="password"
            placeholder="Minimum 12 characters"
            value={formValues.confirmPassword}
            onChange={handleInputChange}
          />
          <Submit text="SAVE & CONTINUE" variant="cta" type="submit" />
          <div className="keep-signed-in">
            <label>
              <input type="checkbox" /> Keep me signed in.
            </label>
          </div>
        </form>
      )}
    </div>
  );
};

ResetPasswordCard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  email: PropTypes.string,
};

export default ResetPasswordCard;
