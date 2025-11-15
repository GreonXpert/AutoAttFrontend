import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminService from './adminService';

// Initial state
const initialState = {
  profile: null,
  dashboardStats: null,
  loginHistory: [],
  editHistory: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Async thunks

// Get profile
export const getProfile = createAsyncThunk(
  'admin/getProfile',
  async (_, thunkAPI) => {
    try {
      return await adminService.getProfile();
    } catch (error) {
      const message = error.message || 'Failed to fetch profile';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update profile
export const updateProfile = createAsyncThunk(
  'admin/updateProfile',
  async (profileData, thunkAPI) => {
    try {
      return await adminService.updateProfile(profileData);
    } catch (error) {
      const message = error.message || 'Failed to update profile';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete profile image
export const deleteProfileImage = createAsyncThunk(
  'admin/deleteProfileImage',
  async (_, thunkAPI) => {
    try {
      return await adminService.deleteProfileImage();
    } catch (error) {
      const message = error.message || 'Failed to delete profile image';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get login history
export const getLoginHistory = createAsyncThunk(
  'admin/getLoginHistory',
  async (_, thunkAPI) => {
    try {
      return await adminService.getLoginHistory();
    } catch (error) {
      const message = error.message || 'Failed to fetch login history';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get edit history
export const getEditHistory = createAsyncThunk(
  'admin/getEditHistory',
  async (_, thunkAPI) => {
    try {
      return await adminService.getEditHistory();
    } catch (error) {
      const message = error.message || 'Failed to fetch edit history';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get dashboard stats
export const getDashboardStats = createAsyncThunk(
  'admin/getDashboardStats',
  async (_, thunkAPI) => {
    try {
      return await adminService.getDashboardStats();
    } catch (error) {
      const message = error.message || 'Failed to fetch dashboard stats';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Admin slice
const adminSlice = createSlice({
  name: 'admin',
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
    },
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

      // Delete Profile Image
      .addCase(deleteProfileImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProfileImage.fulfilled, (state) => {
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
      });
  },
});

export const { reset, clearError } = adminSlice.actions;
export default adminSlice.reducer;