import axios from "axios";
import { useState } from "react";
import "../../styles/cards/ResetPasswordCard.css"; // Make sure this file contains .error-message styles
import UtilityTemplate from "../../utils/UtilityTemplate";
import ResetPasswordCard from "../Cards/ResetPasswordCard";

const ResetPasswordRequest = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (formValues) => {
    setMessage(""); // Clear previous messages
    setError("");   // Clear previous errors

    if (step === 1) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/reset-password-request`, {
          email: formValues.email,
        });
        setEmail(formValues.email);
        setStep(2);
        setMessage(response.data.message);
      } catch (err) {
        const resMessage = err.response?.data?.message;
        setError(resMessage || "Email not found. Please try again.");
      }
    } else if (step === 2) {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-code`, {
          email,
          code: formValues.verificationCode,
        });
        setStep(3);
        setMessage("Verification successful. Continue below.");
      } catch (err) {
        const resMessage = err.response?.data?.message;
        setError(resMessage || "Invalid verification code.");
      }
    }
  };

  return (
    <UtilityTemplate>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <ResetPasswordCard onSubmit={handleReset} step={step} email={email} />
    </UtilityTemplate>
  );
};

export default ResetPasswordRequest;


// import axios from "axios";
// import { useState } from "react";
// import UtilityTemplate from "../../utils/UtilityTemplate"; // ✅ Wrap in Utility Template
// import Access from "../Buttons/Access"; // ✅ Use Access button for submit

// const ResetPasswordRequest = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/reset-password-request`, {
//         email,
//       });
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <UtilityTemplate>
//       <h2 className="form-title">Reset Password</h2>
//       <form onSubmit={handleSubmit} className="auth-form">
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <Access text="REQUEST RESET" variant="cta" type="submit" />
//       </form>
//       {message && <p className="success-message">{message}</p>}
//     </UtilityTemplate>
//   );
// };

// export default ResetPasswordRequest;
