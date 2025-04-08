import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import "../../styles/timers/SubmissionTimer.css"; // ✅ Reuse same styles

const ThemeTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState({});

  useEffect(() => {
    const getNextSundayNoonEST = () => {
      const now = new Date();
      const estNow = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));

      const day = estNow.getDay(); // 0 (Sun) to 6 (Sat)
      const daysUntilSunday = (7 - day) % 7;
      const nextSunday = new Date(estNow);
      nextSunday.setDate(estNow.getDate() + daysUntilSunday);
      nextSunday.setHours(12, 0, 0, 0); // 12:00 PM

      return nextSunday;
    };

    const updateCountdown = () => {
      const now = new Date();
      const target = getNextSundayNoonEST();
      const diff = target - now;

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

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const format = (val) => String(val).padStart(2, "0");

  return (
    <div className="submission-timer">
      <FaRegClock className="timer-icon" />
      <span className="timer-text">
        {timeRemaining?.expired ? "00:00:00:00" : timeRemaining?.seconds !== undefined ? (
          `${format(timeRemaining.days)}:${format(timeRemaining.hours)}:${format(timeRemaining.minutes)}:${format(timeRemaining.seconds)}`
        ) : "Loading..."}
      </span>
    </div>
  );
};

export default ThemeTimer;
