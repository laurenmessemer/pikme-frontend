import { useEffect, useState } from "react";
import GeoPopup from "../components/Popups/GeoPopup";

const GeoBlocker = () => {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    // Simulate an SC user for testing
    const mockData = {
      country: "US",
      region_code: "SC",
    };
  
    const { country, region_code } = mockData;
    const blockedRegions = ["AR", "CT", "DE", "LA", "MD", "MI", "MT", "SC", "SD", "DC"];
  
    if (country !== "US") {
      console.warn("User is international – BLOCKED");
      setIsBlocked(true);
      return;
    }
  
    if (blockedRegions.includes(region_code)) {
      console.warn(`User is in ${region_code} – BLOCKED`);
      setIsBlocked(true);
    } else {
      console.log(`User is in ${region_code} – ALLOWED`);
    }
  }, []);
  
  if (isBlocked) return <GeoPopup onClose={() => setIsBlocked(false)} />;

  return null;
};

export default GeoBlocker;
