import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UseAuth";
import JoinCodeCard from "../Cards/JoinCodeCard";

const Join = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);

  // ✅ Auto-redirect if a ?invite_code param is passed
  useEffect(() => {
    const inviteCode = queryParams.get("invite_code");
    if (inviteCode && user) {
      navigate(`/join/upload/${inviteCode.trim().toLowerCase()}`);
    }
  }, [user, navigate]);

  // ✅ Auto-redirect if a ?code param is passed
  useEffect(() => {
    const code = queryParams.get("code");

    if (code && user) {
      navigate(`/join/upload/${code.trim().toLowerCase()}`);
    }
  }, [user, navigate]);

  // ✅ Handles form submission
  const handleCodeSubmit = (code) => {
    const cleaned = code.trim().toLowerCase();
    if (!user) {
      navigate(`/login?redirect=/join?code=${cleaned}`);
    } else {
      navigate(`/join/upload/${cleaned}`);
    }
  };

  return (
    <>
      <JoinCodeCard onSubmit={handleCodeSubmit} />
    </>
  );
};

export default Join;
