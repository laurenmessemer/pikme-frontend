import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import "../../styles/timers/SubmissionTimer.css"; // ✅ Reuse same styles

const ThemeTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState("");

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
        setTimeRemaining("00D 00H 00M 00S");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeRemaining(`${days}D ${hours}H ${minutes}M ${seconds}S`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="submission-timer">
      <FaRegClock className="timer-icon" />
      <span className="timer-text">{timeRemaining || "Loading..."}</span>
    </div>
  );
};

export default ThemeTimer;
