import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UseAuth";
import JoinCodeCard from "../Cards/JoinCodeCard";

const Join = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ Auto-redirect if a ?code param is passed
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
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

  return <JoinCodeCard onSubmit={handleCodeSubmit} />;
};

export default Join;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import StepThreeInvite from "../../competition/StepThreeInvite";
// import { useAuth } from "../../context/UseAuth";
// import JoinCodeCard from "../Cards/JoinCodeCard";
// import UploadImage from "../Cards/UploadImage";

// // ✅ Join.jsx = entire invite flow logic
// // ✅ JoinInvite.jsx = no longer needed (StepThreeInvite handles it)
// // ✅ JoinCodeCard.jsx = visual input form

// const Join = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const queryParams = new URLSearchParams(location.search);
//   const initialCode = queryParams.get("code");

//   const [inviteCode, setInviteCode] = useState(initialCode || "");
//   const [competition, setCompetition] = useState(null);
//   const [uploadedImage, setUploadedImage] = useState("");
//   const [error, setError] = useState("");

//   // Auto-validate code on load (e.g. after login redirect)
//   useEffect(() => {
//     if (inviteCode && !competition) {
//       validateInviteCode(inviteCode);
//     }
//   }, [inviteCode]);

//   const validateInviteCode = async (code) => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/competition-entry/invite/${code}`
//       );
//       setCompetition(res.data.competition);
//       setError("");
//     } catch (err) {
//       setError("❌ Invalid or expired invite code.");
//       setCompetition(null);
//     }
//   };

//   const handleCodeSubmit = (code) => {
//     const cleaned = code.trim().toLowerCase();
//     setInviteCode(cleaned);

//     // Redirect to login if not signed in
//     if (!user) {
//       navigate(`/login?redirect=/join?code=${cleaned}`);
//     } else {
//       validateInviteCode(cleaned);
//     }
//   };

//   if (error) return <p className="error-message">{error}</p>;

//   // Step 1: Ask for code
//   if (!inviteCode || !competition) {
//     return <JoinCodeCard onSubmit={handleCodeSubmit} />;
//   }

//   // Step 2: Upload Image
//   if (!uploadedImage) {
//     return (
//       <UploadImage
//         onUpload={setUploadedImage}
//         contestId={competition.contest_id}
//         matchType="invite_friend"
//       />
//     );
//   }

//   // Step 3: Confirm & Join
//   return (
//     <StepThreeInvite
//     inviteLink={inviteCode}
//     contestId={competition.contest_id}
//     uploadedImage={uploadedImage}
//     entryFee={1} // ✅ Always 1 token
//     nextStep={() => navigate("/leaderboard/MySubmissions")}
//     />
//   );
// };

// export default Join;
