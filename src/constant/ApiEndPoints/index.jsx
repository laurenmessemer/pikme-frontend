/****
 * You can put only enpoint of apis inside apiEndpoints object
 */
export const apiEndpoints = {
  /* ---------------------------------- authentication endpoints ---------------------------------- */
  ENDPOINTS_REINVITE_OPPONENT: "/api/leaderboard/reinvite-opponent",
  ENDPOINTS_CONTEST_LIVE_UPCOMING: "/api/contests/live-upcoming",
  ENDPOINTS_VERIFY_YOUR_AGE: "/api/users/verify-age",

  /* ---------------------------------- alerts endpoints ---------------------------------- */
  ENDPOINTS_GET_ALL_ALERTS: "/api/alerts",
  ENDPOINTS_MARK_ALERT_SEEN: "/api/alerts",
  ENDPOINTS_DELETE_ALERT: "/api/alerts",
};
