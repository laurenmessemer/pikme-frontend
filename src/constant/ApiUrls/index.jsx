import { apiEndpoints } from "../ApiEndPoints";
import {
  API_METHOD_GET,
  API_METHOD_POST,
  DEFAULT_SERVICE_KEY,
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
