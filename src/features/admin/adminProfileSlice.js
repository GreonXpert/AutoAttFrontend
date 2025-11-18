import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get admin profile
export const getProfile = createAsyncThunk(
  'adminProfile/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/admin/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch profile'
      );
    }
  }
);

// Update admin profile
export const updateProfile = createAsyncThunk(
  'adminProfile/updateProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/admin/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update profile'
      );
    }
  }
);

// Get dashboard statistics
export const getDashboardStats = createAsyncThunk(
  'adminProfile/getDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch dashboard stats'
      );
    }
  }
);

// Get login history
export const getLoginHistory = createAsyncThunk(
  'adminProfile/getLoginHistory',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/admin/login-history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch login history'
      );
    }
  }
);

// Get edit history
export const getEditHistory = createAsyncThunk(
  'adminProfile/getEditHistory',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/admin/edit-history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch edit history'
      );
    }
  }
);

// Delete profile image
export const deleteProfileImage = createAsyncThunk(
  'adminProfile/deleteProfileImage',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API_URL}/admin/profile/image`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete profile image'
      );
    }
  }
);

const initialState = {
  profile: null,
  dashboardStats: null,
  loginHistory: [],
  editHistory: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
};

const adminProfileSlice = createSlice({
  name: 'adminProfile',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    clearError: (state) => {
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
        state.message = 'Profile updated successfully';
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Dashboard Stats
      .addCase(getDashboardStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dashboardStats = action.payload;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Login History
      .addCase(getLoginHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoginHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.loginHistory = action.payload;
      })
      .addCase(getLoginHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Edit History
      .addCase(getEditHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEditHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.editHistory = action.payload;
      })
      .addCase(getEditHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete Profile Image
      .addCase(deleteProfileImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProfileImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (state.profile) {
          state.profile.profileImage = null;
        }
        state.message = 'Profile image deleted successfully';
      })
      .addCase(deleteProfileImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset, clearError } = adminProfileSlice.actions;
export default adminProfileSlice.reducer;