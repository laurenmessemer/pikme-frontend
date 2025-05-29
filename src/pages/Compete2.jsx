import PropTypes from "prop-types";
import SubmissionCard from "../components/Cards/SubmissionCard";
import UploadImage from "../components/Cards/UploadImage";
import "../styles/pages/Compete.css";

const piggybankIcon =
  "https://d38a0fe14bafg9.cloudfront.net/icons/piggybank.svg";

// ✅ Static fake contest data
const fakeContestData = {
  contestId: 1, // 🔹 Ensures contestId is NOT undefined
  contestIcon: piggybankIcon,
  contestTitle: "Sunset Vibes",
  contestDescription: "Capture the perfect sunset moment!",
  rules: ["No filters", "Must be original", "High resolution only"],
};

const Compete2 = ({ onSubmit }) => {
  return (
    <div className="compete-page bg-secondary flex">
      <div className="container compete-container">
        <div className="compete-content">
          {/* ✅ Fake Contest Data (No API Calls) */}
          <SubmissionCard {...fakeContestData} />

          {/* ✅ Fake Upload Image Component */}
          <UploadImage onUpload={() => {}} />
        </div>

        {/* ✅ Fake "Next" Button for Navigation */}
        <button className="fake-next-button" onClick={onSubmit}>
          Next
        </button>
      </div>
    </div>
  );
};

// ✅ Add PropTypes Validation
Compete2.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Compete2;
