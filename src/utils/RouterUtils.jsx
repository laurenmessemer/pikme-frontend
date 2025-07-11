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
  
  const nyDateString = today.toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const [month, day, year] = nyDateString.split('/');

  const nyDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);

  nyDate.setFullYear(nyDate.getFullYear() - 18);
  nyDate.setDate(nyDate.getDate() - 1);

  return nyDate.toISOString().split("T")[0];
};
