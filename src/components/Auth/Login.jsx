import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UseAuth";
import UtilityTemplate from "../../utils/UtilityTemplate";
import LoginCard from "../Cards/LoginCard";
import { checkSuccessResponse } from "../../utils/RouterUtils";
import ToastUtils from "../../utils/ToastUtils";

const Login = () => {
  const { login, setIsLoginLoading, isLoginLoading, token } = useAuth();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const inviteCode = queryParams.get("invite_code");
  const competitionId = queryParams.get("competitionId");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [emailForResend, setEmailForResend] = useState("");

  useEffect(() => {
    if (inviteCode && inviteCode.length >= 6) {
      async function getUserParticipationHandler() {
        setError("");
        setIsLoginLoading(true);
        setEmailForResend(""); // Store for resend button
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/competition-entry/validate-invite-code/${inviteCode}`,
          token
            ? {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "ngrok-skip-browser-warning": "true",
                },
              }
            : {
                headers: {
                  "ngrok-skip-browser-warning": "true",
                },
              }
        );
        if (checkSuccessResponse(response)) {
          setIsLoginLoading(false);
          if (response?.data?.goToJoin) {
            login(token, response.data?.user);

            setTimeout(() => {
              navigate(`/join/upload/${inviteCode}`);
            }, 100);
          } else {
            setEmail(response?.data?.competition?.invited_friend_email);
            setEmailForResend(
              response?.data?.competition?.invited_friend_email
            ); // Store for resend button
          }
        }
      }
      getUserParticipationHandler();
    }
  }, [inviteCode]);

  const handleLogin = async (email, password) => {
    try {
      setError("");
      setIsLoginLoading(true);
      setEmailForResend(email); // Store for resend button

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      if (checkSuccessResponse(response)) {
        setIsLoginLoading(false);
        login(response.data.token, response.data.user);

        setTimeout(() => {
          if (competitionId) {
            navigate(
              `/leaderboard/ReportedSubmission?competitionId=${competitionId}`
            );
          } else if (inviteCode && inviteCode?.length >= 6) {
            navigate(`/join/upload/${inviteCode}`);
          } else {
            navigate("/");
            // window.location.reload();
          }
        }, 100);
      }
    } catch (err) {
      console.error("❌ Login Error:", err);
      setIsLoginLoading(false);
      const backendMessage = err.response?.data?.message || "";
      if (backendMessage.toLowerCase().includes("suspended")) {
        setError("Your account has been suspended. Please contact support.");
      } else if (backendMessage.toLowerCase().includes("verify")) {
        setError("Please verify your email before logging in.");
      } else if (backendMessage.toLowerCase().includes("invalid")) {
        setError("Invalid email or password.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleResendVerification = async (email) => {
    if (!email) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/resend-verification`,
        {
          email,
        }
      );

      // alert("✅ Verification email resent. Please check your inbox.");
      ToastUtils.success("Verification email resent. Please check your inbox.");
    } catch (err) {
      console.error("❌ Resend failed:", err);
      // alert("Unable to resend verification email. Please try again later.");
      ToastUtils.error(
        "Unable to resend verification email. Please try again later."
      );
    }
  };

  return (
    <UtilityTemplate>
      <LoginCard
        onSubmit={handleLogin}
        error={error}
        emailForResend={emailForResend}
        onResendVerification={handleResendVerification}
        isLoginLoading={isLoginLoading}
        emailValue={email || ""}
      />
    </UtilityTemplate>
  );
};

export default Login;

// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/UseAuth";
// import UtilityTemplate from "../../utils/UtilityTemplate";
// import LoginCard from "../Cards/LoginCard";

// const Login = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [error, setError] = useState(""); // ✅ Error state added

//   const handleLogin = async (email, password) => {
//     try {
//       setError(""); // Reset error before making request

//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
//         email,
//         password,
//       });

//       console.log("✅ Login success:", response.data);
//       login(response.data.token, response.data.user);

//       setTimeout(() => {
//         navigate("/");
//         window.location.reload(); // ✅ Ensures AccessMenu updates
//       }, 100);
//     } catch (err) {
//       console.error("❌ Login Error:", err);
//       setError(err.response?.data?.message || "Login failed"); // ✅ Handles 404 errors properly
//     }
//   };

//   return (
//     <UtilityTemplate>
//       <LoginCard onSubmit={handleLogin} error={error} />
//     </UtilityTemplate>
//   );
// };

// export default Login;
