import { apiService } from '../../services/api';

// Notification API endpoints
const NOTIFICATION_ENDPOINTS = {
  GET_NOTIFICATIONS: '/notifications',
  GET_NOTIFICATION_BY_ID: '/notifications',
  GET_NOTIFICATION_STATS: '/notifications/stats',
  MARK_AS_READ: '/notifications',
  MARK_ALL_AS_READ: '/notifications/read-all',
  DELETE_NOTIFICATION: '/notifications',
  DELETE_READ_NOTIFICATIONS: '/notifications/delete-read',
};

// Get all notifications
const getNotifications = async (params = {}) => {
  try {
    const { page = 1, limit = 10, type = '', priority = '', isRead = '' } = params;
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...(type && { type }),
      ...(priority && { priority }),
      ...(isRead !== '' && { isRead }),
    });

    const response = await apiService.get(
      `${NOTIFICATION_ENDPOINTS.GET_NOTIFICATIONS}?${queryParams}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Get notification by ID
const getNotificationById = async (id) => {
  try {
    const response = await apiService.get(
      `${NOTIFICATION_ENDPOINTS.GET_NOTIFICATION_BY_ID}/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get notification statistics
const getNotificationStats = async () => {
  try {
    const response = await apiService.get(NOTIFICATION_ENDPOINTS.GET_NOTIFICATION_STATS);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Mark notification as read
const markAsRead = async (id) => {
  try {
    const response = await apiService.put(
      `${NOTIFICATION_ENDPOINTS.MARK_AS_READ}/${id}/read`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Mark all notifications as read
const markAllAsRead = async () => {
  try {
    const response = await apiService.put(NOTIFICATION_ENDPOINTS.MARK_ALL_AS_READ);
    return response;
  } catch (error) {
    throw error;
  }
};

// Delete notification
const deleteNotification = async (id) => {
  try {
    const response = await apiService.delete(
      `${NOTIFICATION_ENDPOINTS.DELETE_NOTIFICATION}/${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Delete all read notifications
const deleteReadNotifications = async () => {
  try {
    const response = await apiService.delete(
      NOTIFICATION_ENDPOINTS.DELETE_READ_NOTIFICATIONS
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const notificationService = {
  getNotifications,
  getNotificationById,
  getNotificationStats,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteReadNotifications,
};

export default notificationService;
