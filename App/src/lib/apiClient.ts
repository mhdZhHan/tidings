import axios from 'axios';

// types
import type {UserType} from '../types';

// Axios instance
const apiClient = axios.create({
  baseURL: 'http://192.168.1.75:3000',
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

// API call: Login
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await apiClient.post('/login', {email, password});
    setAuthToken(response.data.token);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// API call: Register
export const register = async ({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) => {
  try {
    const response = await apiClient.post('/register', {email, name, password});
    setAuthToken(response.data.token);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// API call: fetch users
export const getUsers = async (userId: string): Promise<UserType[]> => {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data.users; // Ensure the function returns the actual data
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// API call: Logout
export const logout = () => {
  setAuthToken(null);
};
