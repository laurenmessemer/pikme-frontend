import "../../styles/components/MySubmissions.css";

const MySubmissions = () => {
    return (
        <div className="my-submissions-container">
            <p>My Submissions Component</p>
        </div>
    );
};

export default MySubmissions;


// import PropTypes from "prop-types";
// import "../../styles/components/MySubmission.css";
// import MySubmissionCard from "./MySubmissionCard";

// const MySubmissions = ({ submissions }) => {
//   return (
//     <div className="my-submissions-container">
//       <div className="my-submissions-grid">
//         {/* Dynamically render MySubmissionCard for each submission */}
//         {submissions.map((submission) => (
//           <MySubmissionCard key={submission.username} {...submission} />
//         ))}
//       </div>
//     </div>
//   );
// };

// // ✅ Define PropTypes for MySubmissions with detailed labeling
// MySubmissions.propTypes = {
//   submissions: PropTypes.arrayOf(
//     PropTypes.shape({
//       startDate: PropTypes.string.isRequired,
//       endDate: PropTypes.string.isRequired,
//       image: PropTypes.string.isRequired,
//       username: PropTypes.string.isRequired,
//       theme: PropTypes.string.isRequired,
//       entries: PropTypes.number.isRequired
//     })
//   ).isRequired
// };

// export default MySubmissions;
