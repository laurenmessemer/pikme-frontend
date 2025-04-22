import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("verifying");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify-email`, {
          params: { token },
        });
        setStatus("success");
        setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        console.error("❌ Email verification failed:", err);
        setStatus("error");
      }
    };

    if (token) verify();
    else setStatus("error");
  }, [token, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      {status === "verifying" && <p>Verifying your email...</p>}
      {status === "success" && <p> Email verified! Redirecting to login...</p>}
      {status === "error" && <p>Invalid or expired token.</p>}
    </div>
  );
};

export default VerifyEmail;
