import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor - Add token to requests
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔐 Token attached to request:', token.substring(0, 20) + '...');
    } else {
      console.warn('⚠️ No token found in localStorage');
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (refreshToken) {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/refresh-token`,
            { refreshToken }
          );

          // ✅ FIX: Backend sends "token", not "accessToken"
          const newToken = response.data.token;

          if (newToken) {
            // Save new token
            localStorage.setItem('token', newToken);

            // Update authorization header
            api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

            console.log('🔄 Token refreshed successfully');

            // Retry original request
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error('❌ Token refresh failed, logging out...', refreshError);
        
        // Refresh token failed - logout user
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        // Redirect to login
        window.location.href = '/login';
        
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';

    console.error('❌ API Error:', {
      status: error.response?.status,
      message,
      url: error.config?.url
    });

    return Promise.reject({
      message,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

// Helper functions for different HTTP methods
export const apiService = {
  // GET request
  get: async (url, config = {}) => {
    try {
      const response = await api.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST request
  post: async (url, data = {}, config = {}) => {
    try {
      const response = await api.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PUT request
  put: async (url, data = {}, config = {}) => {
    try {
      const response = await api.put(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PATCH request
  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await api.patch(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE request
  delete: async (url, config = {}) => {
    try {
      const response = await api.delete(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // File upload with progress
  upload: async (url, formData, onUploadProgress, config = {}) => {
    try {
      const response = await api.post(url, formData, {
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
          ...config.headers,
        },
        onUploadProgress,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Export the axios instance for direct use if needed
export default api;