import { useState } from "react";
import SubmissionWallet from "../components/Cards/SubmissionWallet";
import UploadImage from "../components/Cards/UploadImage";
import "../styles/pages/Compete.css";

const piggybankIcon =
  "https://d38a0fe14bafg9.cloudfront.net/icons/piggybank.svg";

const Compete = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleUpload = (file) => {
    console.log("Uploaded file:", file.name);
    setUploadedFile(URL.createObjectURL(file));
  };

  return (
    <div className="compete-page bg-secondary flex">
      <div className="container compete-container">
        <div className="compete-content">
          {/* ✅ Left Side: SubmissionWallet */}
          <SubmissionWallet
            contestIcon={piggybankIcon}
            contestTitle="Sunset Vibes"
            contestId={101} // Example contest ID
            balance={1000.0} // Dynamic wallet balance
            entryFee={1.0} // Entry fee for submission
            totalCharge={1.0} // Total charge for submission
            confirmText="CONFIRM" // Button text
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

export default Compete;
