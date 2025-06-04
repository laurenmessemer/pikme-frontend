import {
  RESPONSE_CREATED,
  RESPONSE_OK,
  ROLE_ADMIN,
  ROLE_USER,
  ROUTE_ADMIN,
} from "../constant/appConstants";

import placeholderImage from "../assets/placeholders/notsuppoted-image.jpg";

export const getRoleBasedOnRoute = (routerPath) => {
  if (routerPath.includes(`/${ROUTE_ADMIN}/`)) {
    return ROLE_ADMIN;
  }

  return ROLE_USER;
};

/**
 * It takes an object and returns a query string
 * @param obj - The object you want to convert to a query string.
 * @returns A query string.
 */
export const convertObjToQueryString = (obj) => {
  return "?" + new URLSearchParams(obj).toString();
};

export const checkSuccessResponse = (res) => {
  return res?.status === RESPONSE_OK || res?.status === RESPONSE_CREATED;
};
export const onImageError = (e) => {
  e.target.src = placeholderImage;
};
export const getMaxDOB = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  today.setDate(today.getDate() - 1);
  return today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
};
