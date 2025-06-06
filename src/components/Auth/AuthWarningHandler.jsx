import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/UseAuth";
import AccountWarningPopup from "../Popups/AccountWarningPopup";

const AuthWarningHandler = () => {
  const { user, token } = useAuth();
  const location = useLocation();
  const [isWarningPopup, setIsWarningPopup] = useState(false);

  useEffect(() => {
    if ((user?.status === "Warn" || user?.status === "Ban") && token) {
      // Don't show warning popup if user is on settings page
      if (user?.status === "Warn") {
        if (location.pathname !== "/terms") {
          setIsWarningPopup(true);
        } else {
          setIsWarningPopup(false);
        }
      } else {
        if (location.pathname !== "/settings") {
          setIsWarningPopup(true);
        } else {
          setIsWarningPopup(false);
        }
      }
    } else {
      setIsWarningPopup(false);
    }
  }, [user, token, location.pathname]);

  if (!isWarningPopup || !user || !token) {
    return null;
  }

  return (
    <AccountWarningPopup
      title={user?.status === "Warn" ? "Account Warn" : "Account Ban"}
      onClose={() => setIsWarningPopup(false)}
      warningPopup={user?.status === "Warn"}
    />
  );
};

export default AuthWarningHandler;
