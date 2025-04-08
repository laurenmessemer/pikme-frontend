import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import "../../styles/timers/SubmissionTimer.css"; // ✅ Same styles

const JackpotTimer = ({ contestId }) => {
  const [timeRemaining, setTimeRemaining] = useState({});
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
      setTimeRemaining({ expired: true });
      return;
    }
  
    setTimeRemaining({
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      expired: false,
    });
  };
  

  return (
    <div className="submission-timer">
      {timeRemaining?.expired ? (
        <span className="timer-text">Submission Closed</span>
      ) : timeRemaining?.seconds !== undefined ? (
        <span className="timer-text">
          {isUpcoming && <span className="yellow-status-dot" />} 
          {isUpcoming && "Upcoming | "}
          <FaRegClock className="timer-icon" />
          {`${String(timeRemaining.days).padStart(2, "0")}:${String(timeRemaining.hours).padStart(2, "0")}:${String(timeRemaining.minutes).padStart(2, "0")}:${String(timeRemaining.seconds).padStart(2, "0")}`}
        </span>
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
