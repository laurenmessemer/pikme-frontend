import { useEffect, useState } from "react";
import GeoPopup from "../components/Popups/GeoPopup";

const GeoBlocker = () => {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const { country, region_code } = data;

        // New blocked list (2-letter codes)
        const blockedRegions = [
          "AR",
          "CT",
          "DE",
          "LA",
          "MD",
          "MI",
          "MT",
          "SC",
          "SD",
          "DC",
        ];

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
      })
      .catch((err) => {
        console.error("Geolocation lookup failed:", err);
      });
  }, []);

  if (isBlocked) return <GeoPopup onClose={() => setIsBlocked(false)} />;

  return null;
};

export default GeoBlocker;
