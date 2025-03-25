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
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/wallet?user_id=${user.id}`); // ✅ Send user_id

        setBalance(response.data.balance);
        setPrizeHistory(response.data.prizeHistory); // ✅ Already fetching real data
      } catch (error) {
        console.error("❌ Error fetching wallet data:", error);
      }
    };

    fetchWalletData();
  }, [user]);


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
