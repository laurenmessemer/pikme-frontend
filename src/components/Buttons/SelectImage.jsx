import PropTypes from "prop-types";

const SelectImage = ({ onSelect, isImageLoading = false }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onSelect(file); // ✅ Calls onSelect properly
    }
  };

  return (
    <>
      {isImageLoading ? (
        <>
          <span class="plain-loader"></span>
        </>
      ) : (
        <label className="select-image-button">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            hidden
          />{" "}
          {/* ✅ Hidden input */}
          <span>Upload Image</span> {/* ✅ Styled button text */}
        </label>
      )}
    </>
  );
};

// ✅ Ensure correct PropTypes validation
SelectImage.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default SelectImage;
