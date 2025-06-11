import { useEffect, useState } from "react";
import "../styles/admin/CreateContest.css";
import { useAuth } from "../context/UseAuth";

const API_URL = `${import.meta.env.VITE_API_URL}/api/contests`;

const CreateContest = () => {
  const { token, user } = useAuth();
  console.log("user: ", user);
  const [themes, setThemes] = useState([]); // Available themes
  const [selectedTheme, setSelectedTheme] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [prizePool, setPrizePool] = useState("");
  const [prizes, setPrizes] = useState(["", "", ""]);
  const [submissionStart, setSubmissionStart] = useState("");
  const [submissionEnd, setSubmissionEnd] = useState("");
  const [votingStart, setVotingStart] = useState("");
  const [votingEnd, setVotingEnd] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // ✅ Fetch themes from API
    fetch(`${import.meta.env.VITE_API_URL}/api/themes`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
    })
      .then((res) => res.json())
      .then((data) => setThemes(data))
      .catch((err) => console.error("Error fetching themes:", err));
  }, []);

  // ✅ Function to add days to a given date
  const addDays = (dateString, days) => {
    const date = new Date(dateString);
    if (isNaN(date)) return ""; // Prevent errors if date is empty
    date.setDate(date.getDate() + days);
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  // ✅ Handle Submission Start Date Selection
  const handleSubmissionStartChange = (e) => {
    const newStart = e.target.value;
    setSubmissionStart(newStart);

    // Autofill related dates
    if (!submissionEnd) setSubmissionEnd(addDays(newStart, 7)); // Submission lasts 7 days
    if (!votingStart) setVotingStart(addDays(newStart, 8)); // Voting starts 1 day after submission ends
    if (!votingEnd) setVotingEnd(addDays(newStart, 11)); // Voting lasts 3 days
  };

  // ✅ Handle Submission End Date Selection
  const handleSubmissionEndChange = (e) => {
    const newEnd = e.target.value;
    setSubmissionEnd(newEnd);

    // Autofill Voting Start if not manually set
    if (!votingStart) setVotingStart(addDays(newEnd, 1));
    if (!votingEnd) setVotingEnd(addDays(newEnd, 4)); // Voting lasts 3 days
  };

  // ✅ Handle Voting Start Date Selection
  const handleVotingStartChange = (e) => {
    const newVotingStart = e.target.value;
    setVotingStart(newVotingStart);

    // Autofill Voting End if not manually set
    if (!votingEnd) setVotingEnd(addDays(newVotingStart, 3));
  };

  const handleCreateContest = async () => {
    // ✅ Validate input
    if (
      !selectedTheme ||
      !entryFee ||
      !prizePool ||
      !submissionStart ||
      !submissionEnd ||
      !votingStart ||
      !votingEnd
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const newContest = {
      // creator_id: 1,
      creator_id: user?.id,
      theme_id: selectedTheme,
      entry_fee: parseInt(entryFee),
      prize_pool: parseFloat(prizePool),
      winnings: {
        first: parseFloat(prizes[0]) || 0,
        second: parseFloat(prizes[1]) || 0,
        third: parseFloat(prizes[2]) || 0,
      },
      contest_live_date: submissionStart, // ✅ Add this line
      status: "Live", // ✅ Add this line
      submission_deadline: submissionEnd,
      voting_live_date: votingStart,
      voting_deadline: votingEnd,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(newContest),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setSuccessMessage("Contest created successfully!");
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="create-contest-container common-admin-container">
      <div className="header new-header p0">
        <h2>Manage Contests - Create Contest</h2>
      </div>

      {error && (
        <div className="error-message no-space">
          <p>{error}</p>
        </div>
      )}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <div className="form-group">
        <label>Theme:</label>
        <select
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
        >
          <option value="">Select Theme</option>
          {themes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Entry Fee:</label>
        <input
          type="number"
          value={entryFee}
          onChange={(e) => setEntryFee(e.target.value)}
        />
      </div>

      <hr />

      <div className="prizes-section">
        <h3>Prizes</h3>
        <label>Prize Pool:</label>
        <input
          type="number"
          value={prizePool}
          onChange={(e) => setPrizePool(e.target.value)}
        />

        {["1st Place", "2nd Place", "3rd Place"].map((label, index) => (
          <div key={index} className="prize-input">
            <label>{label}:</label>
            <input
              type="number"
              value={prizes[index]}
              onChange={(e) => {
                const updatedPrizes = [...prizes];
                updatedPrizes[index] = e.target.value;
                setPrizes(updatedPrizes);
              }}
            />
          </div>
        ))}
      </div>

      <hr />

      <div className="form-group">
        <label>Submission Start:</label>
        <input
          type="date"
          value={submissionStart}
          onChange={handleSubmissionStartChange}
        />
        <label>Voting Start:</label>
        <input
          type="date"
          value={votingStart}
          onChange={handleVotingStartChange}
        />
      </div>

      <div className="form-group">
        <label>Submission End:</label>
        <input
          type="date"
          value={submissionEnd}
          onChange={handleSubmissionEndChange}
        />
        <label>Voting End:</label>
        <input
          type="date"
          value={votingEnd}
          onChange={(e) => setVotingEnd(e.target.value)}
        />
      </div>

      <div className="form-actions">
        <button className="cancel">Cancel</button>
        <button className="create-contest" onClick={handleCreateContest}>
          Create Contest
        </button>
      </div>
    </div>
  );
};

export default CreateContest;
