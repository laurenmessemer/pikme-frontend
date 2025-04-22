import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/buttons/CustomCheck.css";
import "../../styles/cards/LoginCard.css";

const LoginCard = ({ onSubmit, error, onResendVerification, emailForResend }) => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formValues.email, formValues.password);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Log In to PikMe</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="email">EMAIL ADDRESS</label>
        <input
          id="email"
          className="form-input"
          type="email"
          placeholder="Valid email address"
          value={formValues.email}
          onChange={handleInputChange}
          required
        />

        <label className="form-label" htmlFor="password">PASSWORD</label>
        <input
          id="password"
          className="form-input"
          type="password"
          placeholder="Enter your password"
          value={formValues.password}
          onChange={handleInputChange}
          required
        />

        {/* ✅ Error with optional resend link */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
            {error.toLowerCase().includes("verify") && onResendVerification && emailForResend && (
              <p className="resend-link" onClick={() => onResendVerification(emailForResend)}>
                Resend verification email
              </p>
            )}
          </div>
        )}

        <Link to="/reset-password" className="forgot-password-link">
          Forgot your password?
        </Link>

        <button className="login-button" type="submit">LOG IN</button>

        <div className="divider">
          <span className="line"></span>
        </div>

        <p className="footer-text">
          Don’t have an account? <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </div>
  );
};

LoginCard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  onResendVerification: PropTypes.func,
  emailForResend: PropTypes.string,
};

export default LoginCard;


// import PropTypes from "prop-types";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import "../../styles/buttons/CustomCheck.css";
// import "../../styles/cards/LoginCard.css";

// const LoginCard = ({ onSubmit, error }) => {
//   const [formValues, setFormValues] = useState({ email: "", password: "" });

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormValues((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await onSubmit(formValues.email, formValues.password);
//   };

//   return (
//     <div className="login-container">
//       <h1 className="login-title">Log In to PikMe</h1>

//       <form className="login-form" onSubmit={handleSubmit}>
//         <label className="form-label" htmlFor="email">EMAIL ADDRESS</label>
//         <input
//           id="email"
//           className="form-input"
//           type="email"
//           placeholder="Valid email address"
//           value={formValues.email}
//           onChange={handleInputChange}
//           required
//         />

//         <label className="form-label" htmlFor="password">PASSWORD</label>
//         <input
//           id="password"
//           className="form-input"
//           type="password"
//           placeholder="Enter your password"
//           value={formValues.password}
//           onChange={handleInputChange}
//           required
          
//         />

//         {/* ✅ Show error message */}
//         {error && <p className="error-message">{error}</p>}

//         <Link to="/reset-password" className="forgot-password-link">
//           Forgot your password?
//         </Link>

//         <button className="login-button" type="submit">LOG IN</button>

//         <div className="divider">
//           <span className="line"></span>
//           {/* <span className="divider-text">OR CONTINUE WITH</span> */}
//           {/* <span className="line"></span> */}
//         </div>

//         {/* <div className="social-login">
//           <div className="social-icon"><FaGoogle /></div>
//           <div className="social-icon"><FaApple /></div>
//           <div className="social-icon"><FaFacebook /></div>
//         </div> */}

//         <p className="footer-text">
//           Don’t have an account? <Link to="/signup">Create an account</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// LoginCard.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   error: PropTypes.string, // ✅ Accepts error message
// };

// export default LoginCard;
