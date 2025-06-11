import { useEffect, useState } from "react";
import Submit from "../components/Buttons/Submit";
import "../styles/admin/CreateContest.css";
import { useAuth } from "../context/UseAuth";
import BackButton from "../components/Buttons/BackButton";
import ToastUtils from "../utils/ToastUtils";

const API_URL = `${import.meta.env.VITE_API_URL}/api/contests`;

const CreateContest = () => {
  const { token, user } = useAuth();
  const [themes, setThemes] = useState([]); // Available themes
  const [selectedTheme, setSelectedTheme] = useState("");
  const [isSubmmiting, setIsSubmmiting] = useState(false);
  const [entryFee, setEntryFee] = useState("");
  const [prizePool, setPrizePool] = useState("");
  const [prizes, setPrizes] = useState(["", "", ""]);
  const [submissionStart, setSubmissionStart] = useState("");
  const [submissionEnd, setSubmissionEnd] = useState("");
  const [votingStart, setVotingStart] = useState("");
  const [votingEnd, setVotingEnd] = useState("");
  const [error, setError] = useState(null);

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

  // Function to reset all form values
  const resetForm = () => {
    setIsSubmmiting(false);
    setSelectedTheme("");
    setEntryFee("");
    setPrizePool("");
    setPrizes(["", "", ""]);
    setSubmissionStart("");
    setSubmissionEnd("");
    setVotingStart("");
    setVotingEnd("");
    setError(null);
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
      setIsSubmmiting(true);
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

      setIsSubmmiting(false);
      resetForm()
      ToastUtils.success("Contest created successfully!");
      setError(null);
    } catch (err) {
      setIsSubmmiting(false);
      setError(err.message);
    }
  };

  return (
    <div className="create-contest-container common-admin-container">
      <div className="header new-header p0 centered">
        <h2>Manage Contests - Create Contest</h2>
      </div>

      {error && (
        <div className="error-message no-space margin-bottom-20">
          <p>{error}</p>
        </div>
      )}

      <div className="common-form">
        {/* Basic Information Section */}
        <div className="section-card basic-info-section full-width">
          <h3 className="section-title">Basic Information</h3>
          <div className="flex-row">
            <div className="field-box half-width">
              <label className="form-label admin-label" htmlFor="entry-fee">
                Entry Fee <span className="star-required">*</span>
              </label>
              <div className="input-box">
                <input
                  className="form-input admin-input number-input"
                  id="entry-fee"
                  type="number"
                  placeholder="Entry fee"
                  value={entryFee}
                  disabled={isSubmmiting}
                  onChange={(e) => setEntryFee(e.target.value)}
                />
              </div>
            </div>

            <div className="field-box half-width">
              <label className="form-label admin-label" htmlFor="thmeme-select">
                Theme <span className="star-required">*</span>
              </label>
              <div className="input-box">
                <select
                  className="form-input admin-input select-input"
                  id="thmeme-select"
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  placeholder="Select theme"
                  disabled={isSubmmiting}
                >
                  <option value="">Select Theme</option>
                  {themes.map((theme) => (
                    <option key={theme.id} value={theme.id}>
                      {theme.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Prizes and Contest Dates Side by Side */}
        <div className="flex-row">
          <div className="section-card prizes-section half-width">
            <h3 className="section-title">Prize Distribution</h3>
            <div className="field-box">
              <label className="form-label admin-label" htmlFor="price-poll">
                Prize Pool <span className="star-required">*</span>
              </label>
              <div className="input-box">
                <input
                  className="form-input admin-input "
                  id="price-poll"
                  placeholder="Prize pool"
                  type="number"
                  value={prizePool}
                  disabled={isSubmmiting}
                  onChange={(e) => setPrizePool(e.target.value)}
                />
              </div>
            </div>

            {["1st Place", "2nd Place", "3rd Place"].map((label, index) => (
              <div key={index} className="field-box">
                <label className="form-label admin-label">
                  {label} <span className="star-required">*</span>
                </label>
                <div className="input-box">
                  <input
                    className="form-input admin-input "
                    type="number"
                    placeholder={`${label} prize`}
                    value={prizes[index]}
                    disabled={isSubmmiting}
                    onChange={(e) => {
                      const updatedPrizes = [...prizes];
                      updatedPrizes[index] = e.target.value;
                      setPrizes(updatedPrizes);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="section-card date-section half-width">
            <h3 className="section-title">Contest Timeline</h3>
            <div className="field-box">
              <label
                className="form-label admin-label"
                htmlFor="submission-start"
              >
                Submission Start <span className="star-required">*</span>
              </label>
              <div className="input-box">
                <input
                  className="form-input admin-input date-input"
                  id="submission-start"
                  type="date"
                  placeholder="Start date"
                  value={submissionStart}
                  disabled={isSubmmiting}
                  onChange={handleSubmissionStartChange}
                />
              </div>
            </div>
            <div className="field-box">
              <label
                className="form-label admin-label"
                htmlFor="submission-end"
              >
                Submission End <span className="star-required">*</span>
              </label>
              <div className="input-box">
                <input
                  className="form-input admin-input date-input"
                  id="submission-end"
                  type="date"
                  placeholder="End date"
                  value={submissionEnd}
                  disabled={isSubmmiting}
                  onChange={handleSubmissionEndChange}
                />
              </div>
            </div>
            <div className="field-box">
              <label className="form-label admin-label" htmlFor="voting-start">
                Voting Start <span className="star-required">*</span>
              </label>
              <div className="input-box">
                <input
                  className="form-input admin-input date-input"
                  id="voting-start"
                  type="date"
                  placeholder="Voting starts"
                  value={votingStart}
                  disabled={isSubmmiting}
                  onChange={handleVotingStartChange}
                />
              </div>
            </div>
            <div className="field-box">
              <label className="form-label admin-label" htmlFor="voting-end">
                Voting End <span className="star-required">*</span>
              </label>
              <div className="input-box">
                <input
                  className="form-input admin-input date-input"
                  id="voting-end"
                  type="date"
                  placeholder="Voting ends"
                  value={votingEnd}
                  disabled={isSubmmiting}
                  onChange={(e) => setVotingEnd(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <BackButton
          className="no-spacing small-button width-auto"
          text={"Reset"}
          onClick={resetForm}
        />

        <Submit
          className="no-spacing small-button width-auto success-button"
          text={isSubmmiting ? "Creating..." : "Create Contest"}
          onClick={handleCreateContest}
          disabled={isSubmmiting}
        />
      </div>
    </div>
  );
};

export default CreateContest;
