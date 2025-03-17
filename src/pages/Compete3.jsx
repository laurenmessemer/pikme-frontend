import { useState } from "react";
import icon from "../assets/icons/piggybank.svg";
import SubmissionWallet from "../components/Cards/SubmissionWallet";
import UploadImage from "../components/Cards/UploadImage";
import "../styles/pages/Compete.css";

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
                        contestIcon={icon}
                        contestTitle="Sunset Vibes"
                        contestId={101}  // Example contest ID
                        balance={1000.00} // Dynamic wallet balance
                        entryFee={1.00}   // Entry fee for submission
                        totalCharge={1.00} // Total charge for submission
                        confirmText="CONFIRM" // Button text
                    />

                    {/* ✅ Right Side: UploadImage */}
                    <UploadImage onUpload={handleUpload} />
                </div>

                {/* ✅ Show preview if an image was uploaded */}
                {uploadedFile && <img src={uploadedFile} alt="Uploaded Preview" className="uploaded-image-preview" />}
            </div>
        </div>
    );
};

export default Compete;
