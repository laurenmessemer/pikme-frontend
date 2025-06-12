/*
 * File: WinnerSkeletonCard.jsx
 * Author: HARSH CHAUHAN
 * Created Date: June 12th, 2025
 * Description: This file contains loading code of card component.
 */

const WinnerSkeletonCard = ({ isFull = false, withShadow = false }) => {
  return (
    <div
      className={`winner-skeleton-card ${isFull ? "full" : ""}  ${
        withShadow ? "with-shadow" : ""
      }`}
    >
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-subtitle"></div>
      </div>
    </div>
  );
};

export default WinnerSkeletonCard;
