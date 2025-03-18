import axios from "axios";
import { useState } from "react";
import UtilityTemplate from "../../utils/UtilityTemplate"; // ✅ Wrap in Utility Template
import Access from "../Buttons/Access"; // ✅ Use Access button for submit

const ResetPasswordRequest = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/reset-password-request`, {
        email,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <UtilityTemplate>
      <h2 className="form-title">Reset Password</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Access text="REQUEST RESET" variant="cta" type="submit" />
      </form>
      {message && <p className="success-message">{message}</p>}
    </UtilityTemplate>
  );
};

export default ResetPasswordRequest;
