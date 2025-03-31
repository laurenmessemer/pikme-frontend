import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// ✅ Create Context
const CompetitionContext = createContext();

// ✅ Custom Hook to Use Context
export const useCompetition = () => useContext(CompetitionContext);

// ✅ Provider Component
export const CompetitionProvider = ({ children }) => {
  const location = useLocation();
  const [contestId, setContestId] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [matchType, setMatchType] = useState("pick_random");
  const [entryData, setEntryData] = useState(null);
  const [pendingEntryId, setPendingEntryId] = useState(null);

  // ✅ Restore from localStorage (if available)
  useEffect(() => {
    const storedImage = localStorage.getItem("uploadedImage");
    if (storedImage && !imageUrl) setImageUrl(storedImage);
  }, [imageUrl]);

  // ✅ Reset context when leaving competition flow
  useEffect(() => {
    const competitionPages = [
      "/step-one",
      "/step-two",
      "/step-three",
      "/step-four",
      "/join/upload", // base path for invites
    ];

    const isInCompetitionFlow = competitionPages.some((path) =>
      location.pathname.startsWith(path)
    );

    if (!isInCompetitionFlow) {
      console.log("🔄 Resetting Competition Context - User left competition flow");
      setContestId(null);
      setImageUrl("");
      setImageFile(null);
      setEntryData(null);
      setMatchType("pick_random");
      setPendingEntryId(null);
      localStorage.removeItem("uploadedImage");
    }
  }, [location.pathname]);

  return (
    <CompetitionContext.Provider value={{
      contestId, setContestId,
      imageUrl, setImageUrl,
      imageFile, setImageFile,
      matchType, setMatchType,
      entryData, setEntryData,
      pendingEntryId, setPendingEntryId,
    }}>
      {children}
    </CompetitionContext.Provider>
  );
};

// ✅ Fix Prop Validation for `children`
CompetitionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CompetitionContext;
