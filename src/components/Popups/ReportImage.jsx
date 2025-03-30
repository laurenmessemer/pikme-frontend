import PropTypes from "prop-types"; // ✅ Import PropTypes
import { useState } from "react";
import "../../styles/popups/ReportImagePopup.css";
import XButton from "../Buttons/XButton";

const categories = [
  "AI-generated",
  "Hate speech or symbols",
  "Nudity or sexual activity",
  "Stolen Content",
  "Suicide or self-injury",
  "Violence",
];

const ReportImagePopup = ({ image, onClose, onSubmit }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [description, setDescription] = useState("");

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else if (selectedCategories.length < 2) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSubmit = () => {
    if (selectedCategories.length === 0) return;
    onSubmit({
      imageUrl: image,
      categories: selectedCategories,
      description,
    });
    onClose();
  };

  return (
    <div className="report-popup-overlay">
      <div className="report-popup">
        <div className="report-header">
          <h2>Report Image</h2>
          <XButton onClick={onClose} />
        </div>

        <p className="report-instruction">Choose up to two reporting categories.</p>

        <div className="report-categories">
          {categories.map((cat) => {
            const isChecked = selectedCategories.includes(cat);
            return (
              <label key={cat} className="report-option">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={isChecked}
                  onChange={() => handleCategoryToggle(cat)}
                />
                <span className="custom-checkmark" />
                <span className="category-label">{cat}</span>
              </label>
            );
          })}
        </div>

        <textarea
          className="report-textarea"
          maxLength={500}
          placeholder="Enter max 500 characters."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="report-actions">
          <button className="report-btn cancel" onClick={onClose}>
            CANCEL
          </button>
          <button
            className="report-btn submit"
            onClick={handleSubmit}
            disabled={selectedCategories.length === 0}
          >
            REPORT
          </button>
        </div>
      </div>
    </div>
  );
};

ReportImagePopup.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ReportImagePopup;
