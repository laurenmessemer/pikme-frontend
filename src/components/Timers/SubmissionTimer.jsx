import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import "../../styles/timers/SubmissionTimer.css";
import { useAuth } from "../../context/UseAuth";
import LazyImage from "../Common/LazyImage";

const SubmissionTimer = ({ contestId }) => {
  const { token } = useAuth(); // ✅ get auth user
  const [timeRemaining, setTimeRemaining] = useState({});
  const [entryFee, setEntryFee] = useState(null);
  const [isUpcoming, setIsUpcoming] = useState(false);

  useEffect(() => {
    let interval;

    const fetchContestDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/contests/${contestId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        const contest = response.data?.contest || response.data;

        const { submission_deadline, contest_live_date, entry_fee, status } =
          contest;

        setEntryFee(entry_fee);

        let deadline;
        if (status === "Upcoming") {
          setIsUpcoming(true);
          deadline = new Date(contest_live_date);
        } else {
          deadline = new Date(submission_deadline);
        }

        if (!deadline) {
          setTimeRemaining({ expired: true });
          return;
        }

        updateTimer(deadline);
        interval = setInterval(() => updateTimer(deadline), 1000);
      } catch (error) {
        console.error(
          `❌ Error fetching contest details for contest ${contestId}:`,
          error
        );
        setTimeRemaining({ error: true });
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

  const formatTime = (val) => String(val).padStart(2, "0");

  return (
    <div className="submission-timer">
      {timeRemaining?.expired ? (
        <span className="timer-text">Submission Closed</span>
      ) : timeRemaining?.seconds !== undefined && entryFee !== null ? (
        isUpcoming ? (
          <span className="timer-text">
            <span className="yellow-status-dot" /> Upcoming |{" "}
            <FaRegClock className="timer-icon" />{" "}
            {`${formatTime(timeRemaining.days)}:${formatTime(
              timeRemaining.hours
            )}:${formatTime(timeRemaining.minutes)}:${formatTime(
              timeRemaining.seconds
            )}`}
          </span>
        ) : (
          <span className="timer-text">
            <FaRegClock className="timer-icon" />{" "}
            {`${formatTime(timeRemaining.days)}:${formatTime(
              timeRemaining.hours
            )}:${formatTime(timeRemaining.minutes)}:${formatTime(
              timeRemaining.seconds
            )}`}{" "}
            | Entry = {entryFee}x{" "}
            <LazyImage
              src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
              alt="Token"
              className="token-icon"
              style={{ height: "1em", verticalAlign: "middle" }}
            />
            {/* <img
              src="https://d38a0fe14bafg9.cloudfront.net/icons/token.svg"
              alt="Token"
              className="token-icon"
              style={{ height: "1em", verticalAlign: "middle" }}
              onError={onImageError}
            /> */}
          </span>
        )
      ) : (
        <span className="timer-text">Loading...</span>
      )}
    </div>
  );
};

SubmissionTimer.propTypes = {
  contestId: PropTypes.number.isRequired,
};

export default SubmissionTimer;

// import axios from "axios";
// import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
// import { FaRegClock } from "react-icons/fa";
// import "../../styles/timers/SubmissionTimer.css";

// const SubmissionTimer = ({ contestId }) => {
//   const [timeRemaining, setTimeRemaining] = useState(null);
//   const [entryFee, setEntryFee] = useState(null); // ✅ Fetch entry fee dynamically

//   useEffect(() => {
//     let interval;

//     const fetchContestDetails = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/contests/${contestId}`);

//         // ✅ Extract submission deadline & entry fee
//         const { submission_deadline, entry_fee } = response.data;
//         setEntryFee(entry_fee);

//         if (!submission_deadline) {
//           setTimeRemaining("Expired");
//           return;
//         }

//         const deadline = new Date(submission_deadline);
//         updateTimer(deadline);

//         // ✅ Update timer every second
//         interval = setInterval(() => updateTimer(deadline), 1000);
//       } catch (error) {
//         console.error(`❌ Error fetching contest details for contest ${contestId}:`, error);
//         setTimeRemaining("Error");
//       }
//     };

//     fetchContestDetails();

//     return () => clearInterval(interval); // ✅ Cleanup on unmount
//   }, [contestId]);

//   const updateTimer = (endTime) => {
//     const now = new Date();
//     const diff = endTime - now;

//     if (diff <= 0) {
//       setTimeRemaining("Expired");
//       return;
//     }

//     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//     const minutes = Math.floor((diff / (1000 * 60)) % 60);
//     const seconds = Math.floor((diff / 1000) % 60);

//     setTimeRemaining(`${days}D ${hours}H ${minutes}M ${seconds}S`);
//   };

//   return (
//     <div className="submission-timer">
//       <FaRegClock className="timer-icon" />
//       <span className="timer-text">
//         {timeRemaining === "Expired"
//           ? "Submission Closed"
//           : timeRemaining && entryFee !== null
//             ? `${timeRemaining} | Entry = ${entryFee} x 🟠`
//             : "Loading..."}
//       </span>
//     </div>
//   );
// };

// SubmissionTimer.propTypes = {
//   contestId: PropTypes.number.isRequired,
// };

// export default SubmissionTimer;
