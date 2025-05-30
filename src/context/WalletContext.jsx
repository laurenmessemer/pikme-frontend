import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext"; // ✅ Import AuthContext to get user info

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  const [balance, setBalance] = useState(0);

  // ✅ Function to Fetch Wallet Balance
  const fetchWalletBalance = async () => {
    if (!user?.id) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/wallet?user_id=${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      ); // ✅ Use env variable
      console.log("✅ Updated Wallet Balance:", response.data.balance);
      setBalance(response.data.balance); // ✅ Ensure setBalance is used
    } catch (error) {
      console.error("❌ Error fetching wallet balance:", error);
    }
  };

  // ✅ Fetch balance when user logs in / changes
  useEffect(() => {
    fetchWalletBalance();
  }, [user?.id]);

  return (
    <WalletContext.Provider
      value={{ balance, setBalance, refreshBalance: fetchWalletBalance }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// ✅ Prop Validation
WalletProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WalletProvider;
