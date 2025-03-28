import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import "../../styles/timers/SubmissionTimer.css"; // ✅ Same styles

const JackpotTimer = ({ contestId }) => {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isUpcoming, setIsUpcoming] = useState(false);

  useEffect(() => {
    let interval;

    const fetchContestDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/contests/${contestId}`);
        const contest = response.data?.contest || response.data;

        const {
          submission_deadline,
          contest_live_date,
          status
        } = contest;

        let deadline;
        if (status === "Upcoming") {
          setIsUpcoming(true);
          deadline = new Date(contest_live_date);
        } else {
          deadline = new Date(submission_deadline);
        }

        if (!deadline) {
          setTimeRemaining("Expired");
          return;
        }

        updateTimer(deadline);
        interval = setInterval(() => updateTimer(deadline), 1000);
      } catch (error) {
        console.error(`❌ Error fetching contest details for contest ${contestId}:`, error);
        setTimeRemaining("Error");
      }
    };

    fetchContestDetails();
    return () => clearInterval(interval);
  }, [contestId]);

  const updateTimer = (endTime) => {
    const now = new Date();
    const diff = endTime - now;

    if (diff <= 0) {
      setTimeRemaining("Expired");
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    const padded = (val) => val.toString().padStart(2, "0");

    setTimeRemaining(`${padded(days)}D ${padded(hours)}H ${padded(minutes)}M ${padded(seconds)}S`);
  };

  return (
    <div className="submission-timer">
      {timeRemaining === "Expired" ? (
        <span className="timer-text">Submission Closed</span>
      ) : timeRemaining ? (
        isUpcoming ? (
          <span className="timer-text">
            <span className="yellow-status-dot" /> Upcoming | <FaRegClock className="timer-icon" /> {timeRemaining}
          </span>
        ) : (
          <span className="timer-text">
            <FaRegClock className="timer-icon" /> {timeRemaining}
          </span>
        )
      ) : (
        <span className="timer-text">Loading...</span>
      )}
    </div>
  );
};

JackpotTimer.propTypes = {
  contestId: PropTypes.number.isRequired,
};

export default JackpotTimer;
