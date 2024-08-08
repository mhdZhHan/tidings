import axios from 'axios';

// types
import type {RequestsType, UserType} from '../types';

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
    return response.data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// API call: send chat request
export const sendChatRequest = async ({
  userId,
  receiverId,
  message,
}: {
  userId: string;
  receiverId: string;
  message: string;
}) => {
  try {
    const response = await apiClient.post('/send-request', {
      senderId: userId,
      receiverId,
      message,
    });
    return {status: response.status};
  } catch (error) {
    console.error('Error sending request', error);
    throw error;
  }
};

// API call: get friend request
export const getFriendRequests = async (
  userId: string,
): Promise<RequestsType[]> => {
  try {
    const response = await apiClient.get(`/get-requests/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    throw error;
  }
};

// API call: accept friend request
export const acceptFriendRequests = async (
  userId: string,
  requestId: string,
) => {
  try {
    const response = await apiClient.post(`/accept-request/`, {
      userId,
      requestId,
    });
    return {status: response.status};
  } catch (error) {
    console.error('Error accept request:', error);
    throw error;
  }
};

// API call: get friends
export const getFriends = async (userId: string) => {
  try {
    const response = await apiClient.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching friend users:', error);
    throw error;
  }
};

// API call: post sending message
export const sendMessage = async ({
  senderId,
  receiverId,
  message,
}: {
  senderId: string;
  receiverId: string;
  message: string;
}) => {
  try {
    const response = await apiClient.post('/send-message', {
      senderId,
      receiverId,
      message,
    });

    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// API call: get fetch messages
export const fetchMessages = async ({
  senderId,
  receiverId,
}: {
  senderId: string;
  receiverId: string;
}) => {
  try {
    const response = await apiClient.get('/messages', {
      params: {senderId, receiverId},
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

// API call: Logout
export const logout = () => {
  setAuthToken(null);
};
