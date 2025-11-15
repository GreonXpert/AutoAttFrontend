import { apiService } from '../../services/api';

// Auth API endpoints
const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh-token',
  GET_ME: '/auth/me',
  CHANGE_PASSWORD: '/auth/change-password',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
};

// Login user
const login = async (credentials) => {
  try {
    const response = await apiService.post(AUTH_ENDPOINTS.LOGIN, credentials);
    
    if (response.success && response.data) {
      // Store token and user data in localStorage
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.admin));
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Logout user
const logout = async () => {
  try {
    await apiService.post(AUTH_ENDPOINTS.LOGOUT);
    
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    return true;
  } catch (error) {
    // Even if API fails, clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    throw error;
  }
};

// Refresh access token
const refreshToken = async (refreshToken) => {
  try {
    const response = await apiService.post(AUTH_ENDPOINTS.REFRESH_TOKEN, {
      refreshToken,
    });
    
    if (response.success && response.data) {
      // Update token in localStorage
      localStorage.setItem('token', response.data.accessToken);
    }
    
    return response.data;
  } catch (error) {
    // If refresh fails, clear everything
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    throw error;
  }
};

// Get current user profile
const getMe = async () => {
  try {
    const response = await apiService.get(AUTH_ENDPOINTS.GET_ME);
    
    if (response.success && response.data) {
      // Update user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Change password
const changePassword = async (passwordData) => {
  try {
    const response = await apiService.post(
      AUTH_ENDPOINTS.CHANGE_PASSWORD,
      passwordData
    );
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Forgot password - Send reset email
const forgotPassword = async (email) => {
  try {
    const response = await apiService.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, {
      email,
    });
    
    return response;
  } catch (error) {
    throw error;
  }
};

// Reset password with token
const resetPassword = async (token, passwordData) => {
  try {
    const response = await apiService.post(
      `${AUTH_ENDPOINTS.RESET_PASSWORD}/${token}`,
      passwordData
    );
    
    return response;
  } catch (error) {
    throw error;
  }
};

// Get user from localStorage
const getUserFromStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Check if user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const user = getUserFromStorage();
  return !!(token && user);
};

const authService = {
  login,
  logout,
  refreshToken,
  getMe,
  changePassword,
  forgotPassword,
  resetPassword,
  getUserFromStorage,
  isAuthenticated,
};

export default authService;