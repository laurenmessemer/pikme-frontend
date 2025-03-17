import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext"; // ✅ Import AuthContext
import "../../styles/wallet/WalletLanding.css";
import Referral from "../Wallet/Referral";
import TokenBalance from "../Wallet/TokenBalance";

const WalletLanding = () => {
  const { user } = useContext(AuthContext); // ✅ Get `user`
  const [balance, setBalance] = useState(0);
  const [prizeHistory, setPrizeHistory] = useState([]);
  const inviteLink = "https://pikme.com/InviteCode"; // ✅ Static Invite Link

  useEffect(() => {
    const fetchWalletData = async () => {
      if (!user) return; // ✅ Ensure user exists

      try {
        const response = await axios.get(`http://localhost:5004/api/wallet?user_id=${user.id}`); // ✅ Send user_id

        setBalance(response.data.balance);
        setPrizeHistory(generateFakePrizeHistory()); // ✅ Replace with fake history
      } catch (error) {
        console.error("❌ Error fetching wallet data:", error);
      }
    };

    fetchWalletData();
  }, [user]);

// ✅ Function to generate fake prize history with specific dates
const generateFakePrizeHistory = () => {
  return [
    { type: "Joining Bonus: +10 tokens", amount: 10, description: "Joining Bonus: +10 tokens", timestamp: "2025-01-01 12:00:00" },
    { type: "Won 2 tokens from Contest!", amount: 2, description: "Won 2 tokens from voting!", timestamp: "2025-01-05 14:30:00" },
    { type: "Won 2 tokens from Contest!", amount: 2, description: "Jackpot Bonus: Won 2 tokens!", timestamp: "2025-01-10 18:45:00" },
    { type: "Spent 1 token on entry", amount: -1, description: "Spent 1 token on entry", timestamp: "2025-01-12 09:15:00" }
  ];
};


  return (
    <div className="wallet-landing">
      <div className="wallet-landing-content">
        <Referral inviteLink={inviteLink} />
        <TokenBalance balance={balance} prizeHistory={prizeHistory} />
      </div>
    </div>
  );
};

export default WalletLanding;
