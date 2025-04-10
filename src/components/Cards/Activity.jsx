import axios from "axios";
import { useEffect, useState } from "react";
import fileIcon from "../../assets/icons/file.svg";
import pointerIcon from "../../assets/icons/pointer.svg";
import { useAuth } from "../../context/UseAuth";
import "../../styles/cards/Activity.css";
import Dropdown from "../Dropdowns/Dropdown";
import ThemeTimer from "../Timers/ThemeTimer";

const tokenImg = "https://d38a0fe14bafg9.cloudfront.net/icons/token.svg";
const MIN_REQUIRED_COUNT = 2;


// 🎭 Fake fallback entries
const fallbackVoters = [
  { username: "LunaWrites", count: 2 },
  { username: "Ash_17", count: 2 },
  { username: "marblemesa", count: 1 },
  { username: "Cambria.Skye", count: 2 },
  { username: "solsticePath", count: 2 },
  { username: "EchoHollow", count: 1 },
  { username: "grace.note", count: 1 },
  { username: "avellino_rise", count: 1 },
  { username: "quietpine", count: 2 },
];

const fallbackReferrers = [
  { username: "NightFox_22", count: 1 },
  { username: "violetVerse", count: 1 },
  { username: "aloe.vibes", count: 1 },
  { username: "JunoTheMoon", count: 1 },
  { username: "mossytrail", count: 1 },
  { username: "PixelRider", count: 1 },
  { username: "FinchWanderer", count: 1 },
  { username: "neonleaf", count: 1 },
  { username: "harborlight", count: 1 },
];

const Activity = () => {
  const { user: authUser } = useAuth();
  const [voters, setVoters] = useState([]);
  const [referrers, setReferrers] = useState([]);
  const [myVotes, setMyVotes] = useState(0);
  const [myReferrals, setMyReferrals] = useState(0);

  useEffect(() => {
    const fetchTopVoters = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/activity/votes`, {
          params: { userId: authUser?.id },
        });
        console.log("📊 Top Voters Response:", res.data);
        setVoters(res.data.topVoters || []);
        setMyVotes(res.data.me?.count ?? 0);
      } catch (err) {
        console.error("❌ Error fetching top voters:", err);
      }
    };

    const fetchTopReferrers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/activity/referrals`, {
          params: { userId: authUser?.id },
        });
        console.log("📈 Top Referrers Response:", res.data);
        setReferrers(res.data.topReferrers || []);
        setMyReferrals(res.data.me?.count ?? 0);
      } catch (err) {
        console.error("❌ Error fetching top referrers:", err);
      }
    };

    fetchTopVoters();
    fetchTopReferrers();
  }, [authUser?.id]);

  const mergedVoters = [
    ...voters.filter((v) => v.count >= MIN_REQUIRED_COUNT),
    ...fallbackVoters,
  ].slice(0, 9);

  const mergedReferrers = [
    ...referrers.filter((r) => r.count >= MIN_REQUIRED_COUNT),
    ...fallbackReferrers,
  ].slice(0, 9);

  const renderToken = () => (
    <img
      src={tokenImg}
      alt="Token"
      className="inline-token"
      style={{ height: "1em", verticalAlign: "middle", marginLeft: "4px" }}
    />
  );

  const getTokenReward = (i) => {
    if (i === 0) return <>14x {renderToken()}</>;
    if (i === 1) return <>8x {renderToken()}</>;
    if (i === 2) return <>4x {renderToken()}</>;
    return null;
  };

  return (
    <div className="activity-columns">
      {/* 🟣 Left - Top Voters */}
      <div className="activity-column">
        <div className="activity-header">
          <img src={pointerIcon} alt="Votes Icon" className="activity-icon" />
          <h2>Top Voters</h2>
        </div>
        <ThemeTimer />
        <p className="activity-subtext">Most votes cast this week</p>

        <Dropdown title="Payout Details">
          <ul>
            <li>1st Place: 14 Tokens</li>
            <li>2nd Place: 8 Tokens</li>
            <li>3rd Place: 4 Tokens</li>
          </ul>
        </Dropdown>

        <div className="activity-me-card green-glow">
          <span>Me</span>
          <div className="activity-value value-cta">{myVotes}</div>
        </div>
        <div className="activity-divider"></div>

        {mergedVoters.map((user, i) => (
          <div key={user.username + i} className="activity-leaderboard-card">
            <div className="rank-badge-wrapper">
              {i === 0 && <img src="https://d38a0fe14bafg9.cloudfront.net/icons/firstplace.svg" alt="1st" className="rank-icon" />}
              {i === 1 && <img src="https://d38a0fe14bafg9.cloudfront.net/icons/secondplace.svg" alt="2nd" className="rank-icon" />}
              {i === 2 && <img src="https://d38a0fe14bafg9.cloudfront.net/icons/thirdplace.svg" alt="3rd" className="rank-icon" />}
            </div>
            <div className="user-info">
              <div className="username-activity">{user.username}</div>
              {i < 3 && <div className="token-reward">{getTokenReward(i)}</div>}
            </div>
            <div className={`activity-value ${i < 3 ? "value-green" : ""}`}>
              {user.count}
            </div>
          </div>
        ))}
      </div>

      {/* 🟣 Right - Top Referrers */}
      <div className="activity-column">
        <div className="activity-header">
          <img src={fileIcon} alt="Referrals Icon" className="activity-icon" />
          <h2>Top Referrers</h2>
        </div>
        <ThemeTimer />
        <p className="activity-subtext">Users who referred the most new users this week</p>

        <Dropdown title="Payout Details">
          <ul>
            <li>1st Place: 14 Tokens</li>
            <li>2nd Place: 8 Tokens</li>
            <li>3rd Place: 4 Tokens</li>
          </ul>
        </Dropdown>

        <div className="activity-me-card yellow-glow">
          <span>Me</span>
          <div className="activity-value value-cta">{myReferrals}</div>
        </div>
        <div className="activity-divider"></div>

        {mergedReferrers.map((user, i) => (
          <div key={user.username + i} className="activity-leaderboard-card">
            <div className="rank-badge-wrapper">
              {i === 0 && <img src="https://d38a0fe14bafg9.cloudfront.net/icons/firstplace.svg" alt="1st" className="rank-icon" />}
              {i === 1 && <img src="https://d38a0fe14bafg9.cloudfront.net/icons/secondplace.svg" alt="2nd" className="rank-icon" />}
              {i === 2 && <img src="https://d38a0fe14bafg9.cloudfront.net/icons/thirdplace.svg" alt="3rd" className="rank-icon" />}
            </div>
            <div className="user-info">
              <div className="username-activity">{user.username}</div>
              {i < 3 && <div className="token-reward">{getTokenReward(i)}</div>}
            </div>
            <div className={`activity-value ${i < 3 ? "value-green" : ""}`}>
              {user.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
