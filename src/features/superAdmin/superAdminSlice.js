import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import superAdminService from './superAdminService';

// Initial state
const initialState = {
  admins: [],
  selectedAdmin: null,
  statistics: null,
  loginLogs: [],
  passwordInfo: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Async thunks

// Create admin
export const createAdmin = createAsyncThunk(
  'superAdmin/createAdmin',
  async (adminData, thunkAPI) => {
    try {
      return await superAdminService.createAdmin(adminData);
    } catch (error) {
      const message = error.message || 'Failed to create admin';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all admins
export const getAllAdmins = createAsyncThunk(
  'superAdmin/getAllAdmins',
  async (params, thunkAPI) => {
    try {
      return await superAdminService.getAllAdmins(params);
    } catch (error) {
      const message = error.message || 'Failed to fetch admins';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get admin by ID
export const getAdminById = createAsyncThunk(
  'superAdmin/getAdminById',
  async (id, thunkAPI) => {
    try {
      return await superAdminService.getAdminById(id);
    } catch (error) {
      const message = error.message || 'Failed to fetch admin';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update admin
export const updateAdmin = createAsyncThunk(
  'superAdmin/updateAdmin',
  async ({ id, adminData }, thunkAPI) => {
    try {
      return await superAdminService.updateAdmin(id, adminData);
    } catch (error) {
      const message = error.message || 'Failed to update admin';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete admin
export const deleteAdmin = createAsyncThunk(
  'superAdmin/deleteAdmin',
  async (id, thunkAPI) => {
    try {
      await superAdminService.deleteAdmin(id);
      return id;
    } catch (error) {
      const message = error.message || 'Failed to delete admin';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get password info
export const getPasswordInfo = createAsyncThunk(
  'superAdmin/getPasswordInfo',
  async (id, thunkAPI) => {
    try {
      return await superAdminService.getPasswordInfo(id);
    } catch (error) {
      const message = error.message || 'Failed to fetch password info';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Reset password
export const resetPassword = createAsyncThunk(
  'superAdmin/resetPassword',
  async ({ id, newPassword }, thunkAPI) => {
    try {
      return await superAdminService.resetPassword(id, newPassword);
    } catch (error) {
      const message = error.message || 'Failed to reset password';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get login logs
export const getLoginLogs = createAsyncThunk(
  'superAdmin/getLoginLogs',
  async (params, thunkAPI) => {
    try {
      return await superAdminService.getLoginLogs(params);
    } catch (error) {
      const message = error.message || 'Failed to fetch login logs';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get statistics
export const getStatistics = createAsyncThunk(
  'superAdmin/getStatistics',
  async (_, thunkAPI) => {
    try {
      return await superAdminService.getStatistics();
    } catch (error) {
      const message = error.message || 'Failed to fetch statistics';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Super Admin slice
const superAdminSlice = createSlice({
  name: 'superAdmin',
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
    clearSelectedAdmin: (state) => {
      state.selectedAdmin = null;
    },
    clearPasswordInfo: (state) => {
      state.passwordInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Admin
      .addCase(createAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Admin created successfully';
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get All Admins
      .addCase(getAllAdmins.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admins = action.payload.data;
        state.pagination = {
          page: action.payload.currentPage,
          limit: action.payload.limit,
          total: action.payload.total,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(getAllAdmins.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Admin By ID
      .addCase(getAdminById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedAdmin = action.payload;
      })
      .addCase(getAdminById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update Admin
      .addCase(updateAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Admin updated successfully';
        state.selectedAdmin = action.payload;
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete Admin
      .addCase(deleteAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Admin deleted successfully';
        state.admins = state.admins.filter((admin) => admin._id !== action.payload);
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Password Info
      .addCase(getPasswordInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPasswordInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.passwordInfo = action.payload;
      })
      .addCase(getPasswordInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Password reset successfully';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Login Logs
      .addCase(getLoginLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoginLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.loginLogs = action.payload.data;
        state.pagination = {
          page: action.payload.currentPage,
          limit: action.payload.limit,
          total: action.payload.total,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(getLoginLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Statistics
      .addCase(getStatistics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.statistics = action.payload;
      })
      .addCase(getStatistics.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, clearError, clearSelectedAdmin, clearPasswordInfo } = superAdminSlice.actions;
export default superAdminSlice.reducer;
