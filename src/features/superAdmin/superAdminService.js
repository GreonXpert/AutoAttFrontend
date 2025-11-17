import { apiService } from '../../services/api';

// Super Admin API endpoints
const SUPER_ADMIN_ENDPOINTS = {
  CREATE_ADMIN: '/super-admin/create-admin',
  GET_ADMINS: '/super-admin/admins',
  GET_ADMIN: '/super-admin/admin',
  UPDATE_ADMIN: '/super-admin/admin',
  DELETE_ADMIN: '/super-admin/admin',
  GET_PASSWORD_INFO: '/super-admin/admin',
  RESET_PASSWORD: '/super-admin/admin',
  GET_LOGIN_LOGS: '/super-admin/login-logs',
  GET_STATISTICS: '/super-admin/statistics',
};

// Create new admin
const createAdmin = async (adminData) => {
  try {
    const response = await apiService.upload(
      SUPER_ADMIN_ENDPOINTS.CREATE_ADMIN,
      adminData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all admins
const getAllAdmins = async (params = {}) => {
  try {
    const { page = 1, limit = 10, search = '', department = '', isActive = '' } = params;
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...(search && { search }),
      ...(department && { department }),
      ...(isActive !== '' && { isActive }),
    });
    
    const response = await apiService.get(
      `${SUPER_ADMIN_ENDPOINTS.GET_ADMINS}?${queryParams}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Get admin by ID
const getAdminById = async (id) => {
  try {
    const response = await apiService.get(
      `${SUPER_ADMIN_ENDPOINTS.GET_ADMIN}/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update admin
const updateAdmin = async (id, adminData) => {
  try {
    const response = await apiService.upload(
      `${SUPER_ADMIN_ENDPOINTS.UPDATE_ADMIN}/${id}`,
      adminData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete admin
const deleteAdmin = async (id) => {
  try {
    const response = await apiService.delete(
      `${SUPER_ADMIN_ENDPOINTS.DELETE_ADMIN}/${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Get admin password info
const getPasswordInfo = async (id) => {
  try {
    const response = await apiService.get(
      `${SUPER_ADMIN_ENDPOINTS.GET_PASSWORD_INFO}/${id}/password-info`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Reset admin password
const resetPassword = async (id, newPassword) => {
  try {
    const response = await apiService.post(
      `${SUPER_ADMIN_ENDPOINTS.RESET_PASSWORD}/${id}/reset-password`,
      { newPassword }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Get login logs
const getLoginLogs = async (params = {}) => {
  try {
    const { page = 1, limit = 10, adminId = '', startDate = '', endDate = '' } = params;
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...(adminId && { adminId }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    });
    
    const response = await apiService.get(
      `${SUPER_ADMIN_ENDPOINTS.GET_LOGIN_LOGS}?${queryParams}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Get system statistics
const getStatistics = async () => {
  try {
    const response = await apiService.get(SUPER_ADMIN_ENDPOINTS.GET_STATISTICS);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const superAdminService = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  getPasswordInfo,
  resetPassword,
  getLoginLogs,
  getStatistics,
};

export default superAdminService;
