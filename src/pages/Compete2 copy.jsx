import { useState } from "react";
import SubmissionCard from "../components/Cards/SubmissionCard"; // ✅ Import SubmissionCard
import UploadImage from "../components/Cards/UploadImage";
import "../styles/pages/Compete.css";

const piggybankIcon =
  "https://d38a0fe14bafg9.cloudfront.net/icons/piggybank.svg";

const Compete2 = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleUpload = (file) => {
    setUploadedFile(URL.createObjectURL(file));
  };

  return (
    <div className="compete-page bg-secondary flex">
      <div className="container compete-container">
        <div className="compete-content">
          {/* ✅ Left Side: SubmissionCard */}
          <SubmissionCard
            contestIcon={piggybankIcon}
            contestTitle="Sunset Vibes"
            contestDescription="Capture the perfect sunset moment!"
            rules={["No filters", "Must be original", "High resolution only"]}
          />

          {/* ✅ Right Side: UploadImage */}
          <UploadImage onUpload={handleUpload} />
        </div>

        {/* ✅ Show preview if an image was uploaded */}
        {uploadedFile && (
          <img
            src={uploadedFile}
            alt="Uploaded Preview"
            className="uploaded-image-preview"
          />
        )}
      </div>
    </div>
  );
};

export default Compete2;
