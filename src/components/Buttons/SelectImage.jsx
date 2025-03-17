import PropTypes from "prop-types";
import "../../styles/buttons/SelectImage.css"; // ✅ Import the CSS file

const SelectImage = ({ onSelect }) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            onSelect(file); // ✅ Calls onSelect properly
        }
    };

    return (
        <label className="select-image-button">
            <input type="file" onChange={handleFileChange} accept="image/*" hidden /> {/* ✅ Hidden input */}
            <span>Upload Image</span> {/* ✅ Styled button text */}
        </label>
    );
};

// ✅ Ensure correct PropTypes validation
SelectImage.propTypes = {
    onSelect: PropTypes.func.isRequired,
};

export default SelectImage;
