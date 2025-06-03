import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import "../../styles/components/MySubmission.css";
import WinnerImagePopup from "../Popups/WinnerImagePopup";
import { useAuth } from "../../context/UseAuth";
import WinnerLatestCard from "./WinnerLatestCard";
import { allDummyWinners } from "../../constant/appConstants";

const WinnerSectionSubmissions = () => {
  const { token } = useAuth(); // ✅ get auth user
  const [contestRows, setContestRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(5); // Fixed limit per page
  const [hasMore, setHasMore] = useState(true);
  const [totalData, setTotalData] = useState(0);

  const fetchWinners = async (currentSkip = 0, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/winners`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
          params: {
            skip: currentSkip,
            limit: limit,
          },
        }
      );
      if (response.data.success) {
        // const allWinners = allDummyWinners || response.data.winners;
        const allWinners = response.data.winners;
        const winnersCount = response.data.winnersCount || 0;
        const processedContests = [];

        // Set total data for pagination
        setTotalData(winnersCount);

        // Handle both old and new data formats
        if (Array.isArray(allWinners) && allWinners.length > 0) {
          // Check if it's the new format (array of contest objects)
          if (allWinners[0].contest_id !== undefined) {
            // New format - process each contest object
            allWinners.forEach((contest) => {
              const contestData = {
                contestId: contest.contest_id,
                themeId: contest.theme_id,
                name: contest.name,
                description: contest.description,
                startDate: contest.startDate,
                endDate: contest.endDate,
                specialRules: contest.special_rules,
                coverImageUrl: contest.cover_image_url,
                totalParticipants: contest.totalParticipants,
                status: contest.status,
                createdAt: contest.createdAt,
                winners: contest.winners || [],
                cards: [],
              };

              // Create theme card
              contestData.cards.push({
                type: "theme",
                key: `theme-${contest.contest_id}`,
                image: contest.cover_image_url,
                startDate: contest.startDate,
                endDate: contest.endDate,
                theme: contest.name,
                totalParticipants: contest.totalParticipants,
                isThemeCard: true,
              });

              // Create winner cards
              contest.winners.forEach((winner) => {
                contestData.cards.push({
                  type: "winner",
                  key: `winner-${contest.contest_id}-${winner.position}`,
                  image: winner.image,
                  username: winner.username,
                  startDate: contest.startDate,
                  endDate: contest.endDate,
                  theme: contest.name,
                  payout: winner.payout,
                  totalVotes: winner.totalVotes,
                  position: winner.position,
                  isThemeCard: false,
                });
              });

              processedContests.push(contestData);
            });
          } else {
            // Old format - handle as before (fallback)
            console.warn("Using old data format - consider updating API");
            // You can add old format handling here if needed
          }
        }

        // Handle data based on whether it's initial load or load more
        if (isLoadMore) {
          setContestRows((prev) => [...prev, ...processedContests]);
        } else {
          setContestRows(processedContests);
        }

        // Check if there are more items to load
        const currentTotal = isLoadMore
          ? contestRows.length + processedContests.length
          : processedContests.length;
        setHasMore(currentTotal < winnersCount);
      } else {
        throw new Error("Failed to fetch winners.");
      }
    } catch (error) {
      console.error("❌ Error fetching winners:", error);
      setError("Failed to load winners.");
    } finally {
      if (isLoadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      const newSkip = skip + limit;
      setSkip(newSkip);
      fetchWinners(newSkip, true);
    }
  };

  useEffect(() => {
    fetchWinners();
  }, [token, limit]);

  const handleCardClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className="my-submissions-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : contestRows.length === 0 ? (
        <div className="no-submissions">
          <div className="dashed-box">
            <p>No winners yet!</p>
          </div>
        </div>
      ) : (
        <div className="new-grid-parent">
          {contestRows.map((contest) => (
            <div
              className="my-submissions-grid"
              key={`contest-${contest.contestId}`}
            >
              {contest.cards.map((card) => (
                <div key={card.key} onClick={() => handleCardClick(card.image)}>
                  <WinnerLatestCard
                    startDate={card.startDate}
                    endDate={card.endDate}
                    image={card.image}
                    username={card.username}
                    theme={card.theme}
                    payout={card.payout}
                    totalVotes={card.totalVotes}
                    totalParticipants={card.totalParticipants}
                    isThemeCard={card.isThemeCard}
                    position={card.position}
                    isNewCardUI={true}
                  />
                </div>
              ))}
            </div>
          ))}

          {/* Waypoint for infinite scroll */}
          {hasMore && <Waypoint onEnter={loadMore} bottomOffset="-200px" />}

          {/* Loading indicator for pagination */}
          {loadingMore && (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <p>Loading more winners...</p>
            </div>
          )}
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

WinnerSectionSubmissions.propTypes = {
  winners: PropTypes.array,
};

export default WinnerSectionSubmissions;
