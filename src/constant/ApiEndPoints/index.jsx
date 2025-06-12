/*
 * File: index.jsx (Contains API endpoints)
 * Author: HARSH CHAUHAN
 * Created Date: May 29th, 2025
 * Description: You can put only enpoint of apis inside apiEndpoints object.
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

  /* ---------------------------------- Reports endpoints ---------------------------------- */
  ENDPOINTS_GET_ALL_REPORTS: "/api/reports/get-reports",
  ENDPOINTS_GET_BY_ID_REPORTED: "/api/reports/get-reports/",
  ENDPOINTS_POST_USER_REPORT_STATUS: "/api/reports/update-report-status",
  // Flagged users
  ENDPOINTS_GET_REPORTED_REPORTS: "/api/reports/get-reported-users",
  ENDPOINTS_GET_BY_ID_REPORTED_REPORTS: "/api/reports/get-reported-user/",
  ENDPOINTS_POST_USER_REPORT_ACTION: "/api/reports/action-on-reported-user",
  // Flagged images
  ENDPOINTS_GET_REPORTED_IMAGES: "/api/reports/get-reported-images",

  /* ---------------------------------- User Warning endpoints ---------------------------------- */
  ENDPOINTS_POST_CLOSE_WARNING_POPUP:'/api/users/close-warn-popup',

  /* ---------------------------------- Admin user endpoints ---------------------------------- */
  ENDPOINTS_GET_USERS_DOWNLOAD_CSV:'/api/users/download-csv',
  ENDPOINTS_POST_USERS_UPLOAD_CSV:'/api/users/upload-userlist',

  /* ---------------------------------- Contest endpoints ---------------------------------- */
  ENDPOINTS_GET_CONTEST_DOWNLOAD_CSV:'/api/contests/downlaod-contest-template',
  ENDPOINTS_POST_CONTEST_UPLOAD_CSV:'/api/contests/upload-fake-participents',

  
};
