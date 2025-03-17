import { useContext } from "react";
import AuthContext from "./AuthContext"; // Import the context itself

// Export the hook separately
export const useAuth = () => {
  return useContext(AuthContext);
};
