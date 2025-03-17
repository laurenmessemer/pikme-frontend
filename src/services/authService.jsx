import axios from 'axios';

const API_URL = 'http://localhost:5004/api/users'; // Adjust this if needed

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

export default {
  register,
  login
};
