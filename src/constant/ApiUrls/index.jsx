import { apiEndpoints } from "../ApiEndPoints";
import {
  API_METHOD_GET,
  API_METHOD_POST,
  API_METHOD_DELETE,
  DEFAULT_SERVICE_KEY,
  API_METHOD_PUT,
} from "../appConstants";


export const REINVITE_OPPONENT_API = {
  url: apiEndpoints.ENDPOINTS_REINVITE_OPPONENT,
  method: API_METHOD_POST,
  withToken: true,
  module: DEFAULT_SERVICE_KEY,
  isMultipart: false,
  showToast: true,
};
export const ENDPOINTS_CONTEST_LIVE_UPCOMING_API = {
  url: apiEndpoints.ENDPOINTS_CONTEST_LIVE_UPCOMING,
  method: API_METHOD_GET,
  withToken: true,
  module: DEFAULT_SERVICE_KEY,
  isMultipart: false,
  showToast: true,
};
export const VERIFY_YOUR_AGE_API = {
  url: apiEndpoints.ENDPOINTS_VERIFY_YOUR_AGE,
  method: API_METHOD_POST,
  withToken: true,
  module: DEFAULT_SERVICE_KEY,
  isMultipart: false,
  showToast: true,
};

// Alert APIs
export const GET_ALL_ALERTS_API = {
  url: apiEndpoints.ENDPOINTS_GET_ALL_ALERTS,
  method: API_METHOD_GET,
  withToken: true,
  module: DEFAULT_SERVICE_KEY,
  isMultipart: false,
  showToast: false,
};

export const MARK_ALERT_SEEN_API = {
  url: apiEndpoints.ENDPOINTS_MARK_ALERT_SEEN,
  method: API_METHOD_PUT,
  withToken: true,
  module: DEFAULT_SERVICE_KEY,
  isMultipart: false,
  showToast: false,
};

export const DELETE_ALERT_API = {
  url: apiEndpoints.ENDPOINTS_DELETE_ALERT,
  method: API_METHOD_DELETE,
  withToken: true,
  module: DEFAULT_SERVICE_KEY,
  isMultipart: false,
  showToast: false,
};

// REPORTS APIs
export const GET_ALL_REPORTS = {
  url: apiEndpoints.ENDPOINTS_GET_ALL_REPORTS,
  method: API_METHOD_GET,
  withToken: true,
  module: DEFAULT_SERVICE_KEY,
  isMultipart: false,
  showToast: false,
};
export const GET_BY_ID_REPORTED = {
  url: apiEndpoints.ENDPOINTS_GET_BY_ID_REPORTED,
  method: API_METHOD_GET,
  withToken: true,
  module: DEFAULT_SERVICE_KEY,
  isMultipart: false,
  showToast: false,
};
export const POST_USER_REPORT_STATUS = {
  url: apiEndpoints.ENDPOINTS_POST_USER_REPORT_STATUS,
  method: API_METHOD_POST,
  withToken: true,
  module: DEFAULT_SERVICE_KEY,
  isMultipart: false,
  showToast: false,
};
export const GET_REPORTED_REPORTS = {
  url: apiEndpoints.ENDPOINTS_GET_REPORTED_REPORTS,
  method: API_METHOD_GET,
  withToken: true,
  module: DEFAULT_SERVICE_KEY,
  isMultipart: false,
  showToast: false,
};
export const GET_REPORTED_IMAGES = {
  url: apiEndpoints.ENDPOINTS_GET_REPORTED_IMAGES,
  method: API_METHOD_GET,
  withToken: true,
  module: DEFAULT_SERVICE_KEY,
  isMultipart: false,
  showToast: false,
};
export const GET_BY_ID_REPORTED_REPORTS = {
  url: apiEndpoints.ENDPOINTS_GET_BY_ID_REPORTED_REPORTS,
  method: API_METHOD_GET,
  withToken: true,
  module: DEFAULT_SERVICE_KEY,
  isMultipart: false,
  showToast: false,
};
export const POST_USER_REPORT_ACTION = {
  url: apiEndpoints.ENDPOINTS_POST_USER_REPORT_ACTION,
  method: API_METHOD_POST,
  withToken: true,
  module: DEFAULT_SERVICE_KEY,
  isMultipart: false,
  showToast: false,
};
export const POST_CLOSE_WARNING_POPUP = {
  url: apiEndpoints.ENDPOINTS_POST_CLOSE_WARNING_POPUP,
  method: API_METHOD_POST,
  withToken: true,
  module: DEFAULT_SERVICE_KEY,
  isMultipart: false,
  showToast: false,
};