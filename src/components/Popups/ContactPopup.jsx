import PropTypes from "prop-types";
import { useState } from "react";
import "../../styles/popups/ContactPopup.css";
import { useAuth } from "../../context/UseAuth";

const ContactPopup = ({ onClose }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (result.success) {
        setConfirmation("Thanks for reaching out! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError("Failed to send. Please try again.");
      }
    } catch {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="contact-popup-overlay">
      <div className="contact-popup">
        <div className="contact-header">
          <h2>Contact Us</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {confirmation ? (
          <p className="confirmation-message">{confirmation}</p>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <label htmlFor="name">
              NAME<span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">
              EMAIL<span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="message">
              MESSAGE<span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              maxLength={500}
              placeholder="Enter max 500 characters."
              value={formData.message}
              onChange={handleChange}
              required
            />
            <div className="contact-form-buttons">
              <button type="button" onClick={onClose} className="btn-cancel">
                CANCEL
              </button>
              <button
                type="submit"
                className="btn-add"
                disabled={!formData.message.trim()}
              >
                ADD
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

ContactPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ContactPopup;
