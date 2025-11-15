import { apiService } from '../../services/api';

// Admin API endpoints
const ADMIN_ENDPOINTS = {
  GET_PROFILE: '/admin/profile',
  UPDATE_PROFILE: '/admin/profile',
  DELETE_PROFILE_IMAGE: '/admin/profile/image',
  GET_LOGIN_HISTORY: '/admin/login-history',
  GET_EDIT_HISTORY: '/admin/edit-history',
  GET_DASHBOARD_STATS: '/admin/dashboard',
};

// Get admin profile
const getProfile = async () => {
  try {
    const response = await apiService.get(ADMIN_ENDPOINTS.GET_PROFILE);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update admin profile
const updateProfile = async (profileData) => {
  try {
    const response = await apiService.upload(
      ADMIN_ENDPOINTS.UPDATE_PROFILE,
      profileData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete profile image
const deleteProfileImage = async () => {
  try {
    const response = await apiService.delete(ADMIN_ENDPOINTS.DELETE_PROFILE_IMAGE);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get login history
const getLoginHistory = async () => {
  try {
    const response = await apiService.get(ADMIN_ENDPOINTS.GET_LOGIN_HISTORY);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get edit history
const getEditHistory = async () => {
  try {
    const response = await apiService.get(ADMIN_ENDPOINTS.GET_EDIT_HISTORY);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get dashboard stats
const getDashboardStats = async () => {
  try {
    const response = await apiService.get(ADMIN_ENDPOINTS.GET_DASHBOARD_STATS);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const adminService = {
  getProfile,
  updateProfile,
  deleteProfileImage,
  getLoginHistory,
  getEditHistory,
  getDashboardStats,
};

export default adminService;