import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WalletContext } from "../../context/WalletContext"; // ✅ Import WalletContext
import "../../styles/wallet/WalletBadge.css";
import { ImageUrl } from "../../constant/appConstants";

const walletBadgeIcon = `${ImageUrl}/icons/walletbadge.svg`;

const WalletBadge = () => {
  const { balance } = useContext(WalletContext); // ✅ Get real-time balance
  const navigate = useNavigate();

  return (
    <div
      className="wallet-badge-wrapper"
      onClick={() => navigate("/wallet")}
      style={{ cursor: "pointer" }}
    >
      <img
        src={walletBadgeIcon}
        alt="Wallet Badge"
        className="wallet-badge-icon"
      />
      <span className="wallet-badge-balance">{balance}</span>
    </div>
  );
};

export default WalletBadge;
