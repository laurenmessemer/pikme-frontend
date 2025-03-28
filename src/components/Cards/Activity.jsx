import axios from "axios";
import { useEffect, useState } from "react";
import fileIcon from "../../assets/icons/file.svg";
import pointerIcon from "../../assets/icons/pointer.svg";
import { useAuth } from "../../context/UseAuth";
import "../../styles/cards/Activity.css";
import Dropdown from "../Dropdowns/Dropdown";
import ThemeTimer from "../Timers/ThemeTimer";

const tokenImg = "https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/token.svg";

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
        setVoters(res.data.topVoters);
        setMyVotes(res.data.me.count);
      } catch (err) {
        console.error("❌ Error fetching top voters:", err);
      }
    };

    const fetchTopReferrers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/activity/referrals`, {
          params: { userId: authUser?.id },
        });
        setReferrers(res.data.topReferrers);
        setMyReferrals(res.data.me.count);
      } catch (err) {
        console.error("❌ Error fetching top referrers:", err);
      }
    };

    if (authUser?.id) {
      fetchTopVoters();
      fetchTopReferrers();
    }
  }, [authUser?.id]);

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

        {voters.slice(0, 5).map((user, i) => (
          <div key={i} className="activity-leaderboard-card">
            <div className="rank-badge-wrapper">
              {i === 0 && <img src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/firstplace.svg" alt="1st" className="rank-icon" />}
              {i === 1 && <img src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/secondplace.svg" alt="2nd" className="rank-icon" />}
              {i === 2 && <img src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/thirdplace.svg" alt="3rd" className="rank-icon" />}
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

        {referrers.slice(0, 5).map((user, i) => (
          <div key={i} className="activity-leaderboard-card">
            <div className="rank-badge-wrapper">
              {i === 0 && <img src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/firstplace.svg" alt="1st" className="rank-icon" />}
              {i === 1 && <img src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/secondplace.svg" alt="2nd" className="rank-icon" />}
              {i === 2 && <img src="https://photo-contest-storage.s3.us-east-2.amazonaws.com/icons/thirdplace.svg" alt="3rd" className="rank-icon" />}
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
