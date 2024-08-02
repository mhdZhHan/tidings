import axios from 'axios';

// types
import type {UserType} from '../types/User.type';

// Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Handle authentication tokens
const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// API call: Get User Data

// API call: Login
export const login = async (credentials: UserType) => {
  try {
    const response = await apiClient.post('/login', credentials);
    setAuthToken(response.data.token);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// API call: Register

export const register = async (credentials: UserType) => {
  try {
    const response = await apiClient.post('/register', credentials);
    setAuthToken(response.data.token);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// API call: Logout
export const logout = () => {
  setAuthToken(null);
};
