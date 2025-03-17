import PropTypes from "prop-types";
import "../../styles/cards/UploadImage.css";
import SelectImage from "../Buttons/SelectImage";

const UploadImage = ({ onUpload }) => {
    const handleFile = (file) => {
        if (file) {
            onUpload(file); // ✅ Ensure file is correctly passed
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            handleFile(file);
        }
    };

    return (
        <div className="upload-container" onDragOver={handleDragOver} onDrop={handleDrop}>
            <div className="upload-placeholder">
                <SelectImage onSelect={handleFile} />
            </div>
        </div>
    );
};

UploadImage.propTypes = {
    onUpload: PropTypes.func.isRequired,
};

export default UploadImage;
