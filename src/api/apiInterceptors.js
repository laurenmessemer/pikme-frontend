import axios from "axios";

export const axiosInstance = axios.create();

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // If it's not a 401 error, return the error
    return Promise.reject(error);
  }
);
