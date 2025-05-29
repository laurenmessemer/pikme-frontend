import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Correct import
import placeholder from "../assets/placeholders/snack.webp"; // ✅ Import placeholder image
import Toggle from "../components/Buttons/Toggle"; // ✅ Import Toggle component
import JackpotCard from "../components/Cards/JackpotCard"; // ✅ Import JackpotCard component
import "../styles/pages/Compete.css"; // ✅ Import styles

const Compete1 = () => {
  const navigate = useNavigate(); // ✅ Correct usage

  const [selectedCard, setSelectedCard] = useState("jackpot"); // Default to JackpotCard

  // Example placeholder contest options
  // const placeholderOptions = [
  //     { prize: "10 Votes", entryFee: "FREE" },
  //     { prize: "$500", entryFee: "$250" },
  //     { prize: "$300", entryFee: "$150" },
  //     { prize: "$200", entryFee: "$100" },
  //     { prize: "$100", entryFee: "$50" },
  //     { prize: "$80", entryFee: "$40" },
  //     { prize: "$60", entryFee: "$30" },
  //     { prize: "$40", entryFee: "$20" },
  //     { prize: "$20", entryFee: "$10" },
  //     { prize: "$10", entryFee: "$5" },
  //     { prize: "$5", entryFee: "$2.50" },
  //     { prize: "$2", entryFee: "$1" },
  //     { prize: "$1", entryFee: "$0.50" },
  // ];

  // Function to handle navigation when submit is clicked
  const handleSubmission = () => {
    navigate("/compete2"); // ✅ Redirect to Compete2
  };

  return (
    <div className="compete-page bg-secondary flex">
      <div className="container">
        {/* Toggle Buttons for Selecting Card Type */}
        <div className="compete-toggle-buttons flex">
          <Toggle
            onText="Head-To-Head"
            offText="Head-To-Head"
            onToggle={() => setSelectedCard("jackpot")}
            isActive={selectedCard === "jackpot"}
          />
          {/* <Toggle 
                        onText="Head-to-Head" 
                        offText="Head-to-Head"
                        onToggle={() => setSelectedCard("h2h")} 
                        isActive={selectedCard === "h2h"}
                    /> */}
        </div>

        {/* Render Selected Card */}
        {selectedCard === "jackpot" && (
          <JackpotCard
            themePhoto={placeholder}
            entryFee={10}
            prizePool={500}
            timer="2h 30m left"
            themeName="Sunset Vibes"
            themeDescription="Submit your best sunset photo for a chance to win!"
            onSubmit={handleSubmission} // ✅ Pass function to JackpotCard
          />
        )}

        {/* {selectedCard === "h2h" && (
                    <H2HCard
                        contestId={999} // Placeholder contest ID
                        themePhoto={placeholder}
                        themeName="Sunset Vibes"
                        themeDescription="Submit your best sunset photo for a chance to win!"
                        selectedOptions={placeholderOptions} // Pass placeholder options
                    />
                )} */}
      </div>
    </div>
  );
};

export default Compete1;
