import { apiEndpoints } from "../ApiEndPoints";
import {
  API_METHOD_GET,
  API_METHOD_POST,
  API_METHOD_DELETE,
  DEFAULT_SERVICE_KEY,
  API_METHOD_PUT,
} from "../appConstants";

// Add PATCH method constant
const API_METHOD_PATCH = "PATCH";

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
