import api from './axios';

// Mock user data
const MOCK_USER = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  avatar: null
};

// Mock credentials
const VALID_CREDENTIALS = {
  email: 'test@example.com',
  password: 'password123'
};

export const login = async (email, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
    return {
      user: MOCK_USER,
      token: 'mock-jwt-token'
    };
  }

  throw new Error('Invalid credentials');
};

export const register = async (userData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // For demo purposes, always succeed with mock data
  return {
    user: {
      id: '2',
      name: userData.name,
      email: userData.email,
      avatar: null
    },
    token: 'mock-jwt-token'
  };
};

export const getCurrentUser = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  
  return MOCK_USER;
};
