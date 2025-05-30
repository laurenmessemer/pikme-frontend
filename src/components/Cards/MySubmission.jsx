import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/UseAuth"; // ✅ Auth hook
import "../../styles/components/MySubmission.css";
import MySubmissionCard from "./MySubmissionCard";
import PersonalSubmission from "./PersonalSubmission";

const MySubmissions = ({
  userId,
  selectedSubmission: propSelectedSubmission,
  setSelectedSubmission: propSetSelectedSubmission,
}) => {
  const { user, token } = useAuth(); // ✅ get auth user
  const isLoggedIn = !!user;

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback to local state if no props provided
  const [localSelectedSubmission, setLocalSelectedSubmission] = useState(null);
  const selectedSubmission = propSelectedSubmission ?? localSelectedSubmission;
  const setSelectedSubmission =
    propSetSelectedSubmission ?? setLocalSelectedSubmission;

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!userId) {
        setLoading(false); // prevent loading spinner from staying forever
        return;
      }

      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/leaderboard/mysubmissions?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        if (response.data.success) {
          setSubmissions(response.data.submissions);
        } else {
          console.error("❌ Failed to fetch submissions");
        }
      } catch (error) {
        console.error("❌ Error fetching submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchSubmissions();
    } else {
      setLoading(false); // skip fetching if not logged in
    }
  }, [userId, isLoggedIn]);

  const handleSubmissionClick = (submission) => {
    if (!submission || !submission.image) {
      console.error("❌ Submission data is incomplete!", submission);
      return;
    }

    const contestData = {
      theme: submission.theme || "Unknown Theme",
      contestStatus: submission.contestStatus || "Upcoming",
      matchType: submission.matchType || "pick_random",
      inviteLink: submission.inviteLink || null,
      userEntry: {
        imageUrl: submission.image || "https://via.placeholder.com/150",
        votes: submission.votes || 0,
        username: submission.username || "Me",
      },
    };

    setSelectedSubmission({
      contestData,
      competitionId: submission.id,
    });
  };

  const closePersonalSubmission = () => {
    setSelectedSubmission(null);
  };

  if (selectedSubmission) {
    return (
      <PersonalSubmission
        contestData={selectedSubmission.contestData}
        competitionId={selectedSubmission.competitionId}
        userId={userId}
        onClose={closePersonalSubmission}
      />
    );
  }

  return (
    <div className="my-submissions-container">
      {loading ? (
        <p>Loading...</p>
      ) : !isLoggedIn ? (
        <div className="no-submissions">
          <div className="dashed-box">
            <p>Join a game!</p>
          </div>
        </div>
      ) : submissions.length !== 0 ? (
        <div className="no-submissions">
          <div className="dashed-box">
            <p>Join a game!</p>
          </div>
        </div>
      ) : (
        <div className="my-submissions-grid with-more-gap">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              onClick={() => handleSubmissionClick(submission)}
              className="submission-wrapper"
              role="button"
              tabIndex={0}
            >
              <MySubmissionCard
                {...submission}
                isLoggedIn={isLoggedIn}
                isNewCardUi={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

MySubmissions.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default MySubmissions;

// import axios from "axios";
// import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
// import { useAuth } from "../../context/UseAuth"; // ✅ import useAuth
// import "../../styles/components/MySubmission.css";
// import MySubmissionCard from "./MySubmissionCard";
// import PersonalSubmission from "./PersonalSubmission";

// const MySubmissions = ({ userId }) => {
//   const { user } = useAuth(); // ✅ get auth user
//   const isLoggedIn = !!user;

//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedSubmission, setSelectedSubmission] = useState(null);

//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       if (!userId) {
//         console.warn("⚠️ Missing userId");
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/leaderboard/mysubmissions?userId=${userId}`
//         );

//         if (response.data.success) {
//           console.log("📦 Submissions from API:", response.data.submissions);
//           setSubmissions(response.data.submissions);
//         } else {
//           console.error("❌ Failed to fetch submissions");
//         }
//       } catch (error) {
//         console.error("❌ Error fetching submissions:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubmissions();
//   }, [userId]);

//   const handleSubmissionClick = (submission) => {
//     if (!submission || !submission.image) {
//       console.error("❌ Submission data is incomplete!", submission);
//       return;
//     }

//     const contestData = {
//       theme: submission.theme || "Unknown Theme",
//       contestStatus: submission.contestStatus || "Upcoming",
//       matchType: submission.matchType || "pick_random",
//       inviteLink: submission.inviteLink || null,
//       userEntry: {
//         imageUrl: submission.image || "https://via.placeholder.com/150",
//         votes: submission.votes || 0,
//         username: submission.username || "Me",
//       },
//     };

//     setSelectedSubmission({
//       contestData,
//       competitionId: submission.id,
//     });
//   };

//   const closePersonalSubmission = () => {
//     setSelectedSubmission(null);
//   };

//   if (selectedSubmission) {
//     return (
//       <PersonalSubmission
//         contestData={selectedSubmission.contestData}
//         competitionId={selectedSubmission.competitionId}
//         userId={userId}
//         onClose={closePersonalSubmission}
//       />
//     );
//   }

//   return (
//     <div className="my-submissions-container">
//       {loading ? (
//         <p>Loading...</p>
//       ) : submissions.length === 0 ? (
//         <div className="no-submissions">
//           <div className="dashed-box">
//             <p>Join a game!</p>
//           </div>
//         </div>
//       ) : (
//         <div className="my-submissions-grid">
//           {submissions.map((submission) => (
//             <div
//               key={submission.id}
//               onClick={() => handleSubmissionClick(submission)}
//               className="submission-wrapper"
//               role="button"
//               tabIndex={0}
//             >
//               <MySubmissionCard {...submission} isLoggedIn={isLoggedIn} /> {/* ✅ pass it here */}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// MySubmissions.propTypes = {
//   userId: PropTypes.number.isRequired,
// };

// export default MySubmissions;
