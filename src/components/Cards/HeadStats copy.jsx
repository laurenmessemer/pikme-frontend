import Placeholder from "../../assets/placeholders/frog.webp";
import Dropdown from "../../components/Dropdowns/Dropdown";
import "../../styles/cards/HeadStats.css";

const piggybankIcon =
  "https://d38a0fe14bafg9.cloudfront.net/icons/piggybank.svg";

const HeadStats = () => {
  // ✅ Moved Mock Data Here
  const mockContestData = {
    contestName: "Nature's Palette",
    contestId: 101,
    entries: 250,
    prizePool: "$4,000",
    userSubmission: {
      username: "Billy123",
      imageUrl: { Placeholder },
      votes: 122,
      earnings: "$0",
    },
    leaderboard: [
      {
        id: 1,
        username: "SunsetLover21",
        imageUrl: { Placeholder },
        votes: 200,
        earnings: "$2500",
      },
      {
        id: 2,
        username: "OceanBreeze",
        imageUrl: { Placeholder },
        votes: 175,
        earnings: "$1000",
      },
      {
        id: 3,
        username: "GoldenHourPro",
        imageUrl: { Placeholder },
        votes: 150,
        earnings: "$500",
      },
    ],
    maxWinners: 3,
  };

  return (
    <div className="headstats-container">
      {/* Header */}
      <div className="headstats-header">
        <div className="theme-title">
          <img src={piggybankIcon} alt="Piggybank" className="piggybank-icon" />
          <h2 className="contest-name">{mockContestData.contestName}</h2>
        </div>
        <div>
          {/* <SubmissionTimer contestId={mockContestData.contestId} /> */}
          <p className="contest-details">{mockContestData.entries} Entries</p>
          <p className="prize-pool">Prize Pool: {mockContestData.prizePool}</p>

          <Dropdown title="Payout Details">
            <div className="payout-table-container">
              <table className="payout-table">
                <thead>
                  <tr>
                    <th>Placement</th>
                    <th>Payout</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>🥇 1st</td>
                    <td>$2500</td>
                  </tr>
                  <tr>
                    <td>🥈 2nd</td>
                    <td>$1000</td>
                  </tr>
                  <tr>
                    <td>🥉 3rd</td>
                    <td>$500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Dropdown>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="headstats-content">
        {/* Left Column - Leaderboard */}
        <div className="leaderboard-column">
          <div className="leaderboard-card user-submission">
            <img
              src={mockContestData.userSubmission.imageUrl}
              alt="Your Submission"
              className="submission-image"
            />
            <div className="user-info">
              <p className="username">
                {mockContestData.userSubmission.username}
              </p>
              <p className="user-votes">
                {mockContestData.userSubmission.votes} Votes
              </p>
            </div>
            <div className="earnings-container user-earnings">
              {mockContestData.userSubmission.earnings}
            </div>
          </div>

          <div className="user-submission-divider"></div>

          {/* Leaderboard Users */}
          {mockContestData.leaderboard
            .slice(0, mockContestData.maxWinners)
            .map((user) => (
              <div key={user.id} className="leaderboard-card">
                <img
                  src={user.imageUrl}
                  alt={user.username}
                  className="submission-image"
                />
                <div className="user-info">
                  <p className="username">{user.username}</p>
                  <p className="user-votes">{user.votes} Votes</p>
                </div>
                <div className="earnings-container other-earnings">
                  {user.earnings}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HeadStats;
