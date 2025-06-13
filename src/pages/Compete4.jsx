import { useState } from "react";
import Confirmation from "../components/Cards/Confirmation"; // Replacing SubmissionWallet
import UploadImage from "../components/Cards/UploadImage";
import "../styles/pages/Compete.css";
import { SiteUrl } from "../constant/appConstants";

const Compete = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleUpload = (file) => {
    setUploadedFile(URL.createObjectURL(file));
  };

  return (
    <div className="compete-page bg-secondary flex">
      <div className="container compete-container">
        <div className="compete-content">
          {/* ✅ Left Side: Confirmation Component */}
          <Confirmation
            newBalance={999.0} // Updated wallet balance after submission
            inviteLink={`${SiteUrl}/headtoheadfriendinvite`} // Shareable link
            onViewSubmission={() => console.log("View Submission Clicked")}
            onVoteNow={() => console.log("Vote Now Clicked")}
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
