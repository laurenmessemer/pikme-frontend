import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../../styles/components/MySubmission.css";
import WinnerImagePopup from "../Popups/WinnerImagePopup";
import WinnerCard from "./WinnerCard";
import { useAuth } from "../../context/UseAuth";

const WinnerSubmissions = () => {
  const { token } = useAuth(); // ✅ get auth user
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/winners`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        if (response.data.success) {
          const allWinners = response.data.winners;
          const flatCardList = [];

          const grouped = {};
          allWinners.forEach((entry) => {
            const id = entry.contestId;
            if (!grouped[id]) {
              grouped[id] = {
                contestId: id,
                theme: entry.Theme?.name || "Theme",
                themeImage: entry.Theme?.cover_image_url || "",
                startDate: entry.startDate,
                endDate: entry.endDate,
                entries: [],
              };
            }
            grouped[id].entries.push(entry);
          });

          Object.values(grouped).forEach((contest) => {
            // Theme card
            flatCardList.push({
              type: "theme",
              key: `theme-${contest.contestId}`,
              image: contest.themeImage,
              startDate: contest.startDate,
              endDate: contest.endDate,
              theme: contest.theme,
              entries: contest.entries.length,
              isThemeCard: true,
            });

            // Top 3 winner cards
            contest.entries.slice(0, 3).forEach((entry, index) => {
              flatCardList.push({
                type: "winner",
                key: `winner-${contest.contestId}-${index}`,
                image: entry.image,
                username: entry.username,
                startDate: contest.startDate,
                endDate: contest.endDate,
                theme: contest.theme,
                payout: parseFloat(entry.payout), // ✅ Ensure payout is a number
                entries: entry.totalVotes || 0,
                place: index + 1,
                isThemeCard: false,
              });
            });
          });

          setCards(flatCardList);
        } else {
          throw new Error("Failed to fetch winners.");
        }
      } catch (error) {
        console.error("❌ Error fetching winners:", error);
        setError("Failed to load winners.");
      } finally {
        setLoading(false);
      }
    };

    fetchWinners();
  }, []);

  const handleCardClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className="my-submissions-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : cards.length === 0 ? (
        <div className="no-submissions">
          <div className="dashed-box">
            <p>No winners yet!</p>
          </div>
        </div>
      ) : (
        <div className="my-submissions-grid">
          {cards.map((card) => (
            <div key={card.key} onClick={() => handleCardClick(card.image)}>
              <WinnerCard
                startDate={card.startDate}
                endDate={card.endDate}
                image={card.image}
                username={card.username}
                theme={card.theme}
                payout={card.payout}
                entries={card.entries}
                isThemeCard={card.isThemeCard}
                place={card.place}
                isNewCardUI={true}
              />
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <WinnerImagePopup
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

WinnerSubmissions.propTypes = {
  winners: PropTypes.array,
};

export default WinnerSubmissions;
