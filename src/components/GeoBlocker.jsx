import { useEffect } from "react";

const GeoBlocker = () => {
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        const { country, region_code } = data;

        const blockedStates = ["AZ", "CT", "DE", "LA", "MD", "MT", "SC", "SD", "TN"];

        // Handle international users
        if (country !== "US") {
          console.warn("User is international – BLOCKED");
          alert("Sorry, PikMe competitions are currently open to U.S. residents only.");
          return;
        }

        // Handle blocked states
        if (blockedStates.includes(region_code)) {
          console.warn(`User is in ${region_code} – BLOCKED`);
          alert(`Unfortunately, users from ${region_code} are not eligible to enter competitions.`);
        } else {
          console.log(`User is in ${region_code} – ALLOWED`);
        }
      })
      .catch(err => {
        console.error("Geolocation lookup failed:", err);
      });
  }, []);

  return null;
};

export default GeoBlocker;
