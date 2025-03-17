import PropTypes from "prop-types";
import { useState } from "react";
import { FaApple, FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa6";
import "../../styles/cards/CreateAccountCard.css";

const CreateAccountCard = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formValues.username, formValues.email, formValues.password);
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Create account</h1>

      <form className="signup-form" onSubmit={handleSubmit}>
        {/* Username */}
        <label className="form-label" htmlFor="username">USERNAME<span className="required">*</span></label>
        <input
          id="username"
          className="form-input"
          type="text"
          placeholder="Username"
          value={formValues.username}
          onChange={handleInputChange}
          required
        />

        {/* Email */}
        <label className="form-label" htmlFor="email">EMAIL ADDRESS<span className="required">*</span></label>
        <input
          id="email"
          className="form-input"
          type="email"
          placeholder="Valid email address"
          value={formValues.email}
          onChange={handleInputChange}
          required
        />

        {/* Password */}
        <label className="form-label" htmlFor="password">CREATE PASSWORD<span className="required">*</span></label>
        <div className="password-wrapper">
          <input
            id="password"
            className="form-input"
            type={showPassword ? "text" : "password"}
            placeholder="Minimum 12 characters"
            value={formValues.password}
            onChange={handleInputChange}
            required
          />
          <button type="button" className="eye-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Confirm Password */}
        <label className="form-label" htmlFor="confirmPassword">CONFIRM PASSWORD<span className="required">*</span></label>
        <div className="password-wrapper">
          <input
            id="confirmPassword"
            className="form-input"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Minimum 12 characters"
            value={formValues.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <button type="button" className="eye-icon" onClick={toggleConfirmPasswordVisibility}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Submit Button */}
        <button className="signup-button" type="submit">
          CREATE ACCOUNT
        </button>

        {/* Keep Me Signed In */}
        <div className="keep-signed-in">
          <input type="checkbox" className="checkbox-input" id="keepSignedIn" />
          {/* <label htmlFor="keepSignedIn">Keep me signed in.</label> */}
        </div>

        {/* Divider */}
        <div className="divider">
          <span className="line"></span>
          <span className="divider-text">OR CONTINUE WITH</span>
          <span className="line"></span>
        </div>

        {/* Social Signup */}
        <div className="social-signup">
          <FaGoogle className="social-icon" />
          <FaApple className="social-icon" />
          <FaFacebook className="social-icon" />
        </div>

        {/* Terms and Privacy */}
        <p className="terms-text">
          By continuing, you agree to our <a href="/terms">Terms of Service</a>. 
          Please review our <a href="/privacy">Privacy Policy</a> to understand how 
          we use your personal information.
        </p>

        {/* Already have an account? */}
        <p className="footer-text">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </form>
    </div>
  );
};

CreateAccountCard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CreateAccountCard;
