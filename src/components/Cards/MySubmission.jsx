import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../../styles/components/MySubmission.css";
import MySubmissionCard from "./MySubmissionCard";
import PersonalSubmission from "./PersonalSubmission";

const MySubmissions = ({ userId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!userId) {
        console.warn("⚠️ Missing userId");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/leaderboard/mysubmissions?userId=${userId}`
        );

        if (response.data.success) {
          console.log("📦 Submissions from API:", response.data.submissions);
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

    fetchSubmissions();
  }, [userId]);

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
      ) : submissions.length === 0 ? (
        <div className="no-submissions">
          <div className="dashed-box">
            <p>Join a game!</p>
          </div>
        </div>
      ) : (
        <div className="my-submissions-grid">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              onClick={() => handleSubmissionClick(submission)}
              className="submission-wrapper"
              role="button"
              tabIndex={0}
            >
              <MySubmissionCard {...submission} />
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
