import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import attendanceService from '../attendance/attendanceService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// ============================================================================
// ADMIN PROFILE ASYNC THUNKS
// ============================================================================

// Get admin profile
export const getProfile = createAsyncThunk(
  'admin/getProfile',
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
  'admin/updateProfile',
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
  'admin/getDashboardStats',
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
  'admin/getLoginHistory',
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
  'admin/getEditHistory',
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
  'admin/deleteProfileImage',
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

// ============================================================================
// ATTENDANCE ASYNC THUNKS
// ============================================================================

// Mark attendance (Check-in)
export const markAttendance = createAsyncThunk(
  'admin/markAttendance',
  async (attendanceData, thunkAPI) => {
    try {
      return await attendanceService.markAttendance(attendanceData);
    } catch (error) {
      const message = error.message || 'Failed to mark attendance';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Mark checkout
export const markCheckout = createAsyncThunk(
  'admin/markCheckout',
  async ({ attendanceId, checkoutData }, thunkAPI) => {
    try {
      return await attendanceService.markCheckout(attendanceId, checkoutData);
    } catch (error) {
      const message = error.message || 'Failed to mark checkout';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all attendance records
export const getAllAttendance = createAsyncThunk(
  'admin/getAllAttendance',
  async (params, thunkAPI) => {
    try {
      return await attendanceService.getAllAttendance(params);
    } catch (error) {
      const message = error.message || 'Failed to fetch attendance records';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get attendance by ID
export const getAttendanceById = createAsyncThunk(
  'admin/getAttendanceById',
  async (id, thunkAPI) => {
    try {
      return await attendanceService.getAttendanceById(id);
    } catch (error) {
      const message = error.message || 'Failed to fetch attendance';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get employee attendance
export const getEmployeeAttendance = createAsyncThunk(
  'admin/getEmployeeAttendance',
  async ({ employeeId, params }, thunkAPI) => {
    try {
      return await attendanceService.getEmployeeAttendance(employeeId, params);
    } catch (error) {
      const message = error.message || 'Failed to fetch employee attendance';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get attendance report
export const getAttendanceReport = createAsyncThunk(
  'admin/getAttendanceReport',
  async (params, thunkAPI) => {
    try {
      return await attendanceService.getAttendanceReport(params);
    } catch (error) {
      const message = error.message || 'Failed to fetch attendance report';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get attendance summary
export const getAttendanceSummary = createAsyncThunk(
  'admin/getAttendanceSummary',
  async (params, thunkAPI) => {
    try {
      return await attendanceService.getAttendanceSummary(params);
    } catch (error) {
      const message = error.message || 'Failed to fetch attendance summary';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get attendance statistics
export const getAttendanceStats = createAsyncThunk(
  'admin/getAttendanceStats',
  async (params, thunkAPI) => {
    try {
      return await attendanceService.getAttendanceStats(params);
    } catch (error) {
      const message = error.message || 'Failed to fetch attendance statistics';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update attendance
export const updateAttendance = createAsyncThunk(
  'admin/updateAttendance',
  async ({ id, attendanceData }, thunkAPI) => {
    try {
      return await attendanceService.updateAttendance(id, attendanceData);
    } catch (error) {
      const message = error.message || 'Failed to update attendance';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete attendance
export const deleteAttendance = createAsyncThunk(
  'admin/deleteAttendance',
  async (id, thunkAPI) => {
    try {
      await attendanceService.deleteAttendance(id);
      return id;
    } catch (error) {
      const message = error.message || 'Failed to delete attendance';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Export attendance
export const exportAttendance = createAsyncThunk(
  'admin/exportAttendance',
  async (params, thunkAPI) => {
    try {
      return await attendanceService.exportAttendance(params);
    } catch (error) {
      const message = error.message || 'Failed to export attendance';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState = {
  // Admin Profile State
  profile: null,
  dashboardStats: null,
  loginHistory: [],
  editHistory: [],
  
  // Attendance State
  attendanceRecords: [],
  selectedAttendance: null,
  employeeAttendance: [],
  attendanceReport: null,
  attendanceSummary: null,
  attendanceStats: null,
  
  // Pagination
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  
  // Loading/Success/Error States
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// ============================================================================
// ADMIN SLICE
// ============================================================================

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
    clearSelectedAttendance: (state) => {
      state.selectedAttendance = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ========================================================================
      // ADMIN PROFILE REDUCERS
      // ========================================================================
      
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
      })

      // ========================================================================
      // ATTENDANCE REDUCERS
      // ========================================================================
      
      // Mark Attendance
      .addCase(markAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(markAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Attendance marked successfully';
      })
      .addCase(markAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Mark Checkout
      .addCase(markCheckout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(markCheckout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Checkout marked successfully';
      })
      .addCase(markCheckout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get All Attendance
      .addCase(getAllAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.attendanceRecords = action.payload.data;
        state.pagination = {
          page: action.payload.currentPage,
          limit: action.payload.limit,
          total: action.payload.total,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(getAllAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Attendance By ID
      .addCase(getAttendanceById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAttendanceById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedAttendance = action.payload;
      })
      .addCase(getAttendanceById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Employee Attendance
      .addCase(getEmployeeAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployeeAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employeeAttendance = action.payload.data;
        state.pagination = {
          page: action.payload.currentPage,
          limit: action.payload.limit,
          total: action.payload.total,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(getEmployeeAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Attendance Report
      .addCase(getAttendanceReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAttendanceReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.attendanceReport = action.payload;
      })
      .addCase(getAttendanceReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Attendance Summary
      .addCase(getAttendanceSummary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAttendanceSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.attendanceSummary = action.payload;
      })
      .addCase(getAttendanceSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Attendance Stats
      .addCase(getAttendanceStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAttendanceStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.attendanceStats = action.payload;
      })
      .addCase(getAttendanceStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update Attendance
      .addCase(updateAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Attendance updated successfully';
        state.selectedAttendance = action.payload;
      })
      .addCase(updateAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete Attendance
      .addCase(deleteAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Attendance deleted successfully';
        state.attendanceRecords = state.attendanceRecords.filter(
          (record) => record._id !== action.payload
        );
      })
      .addCase(deleteAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Export Attendance
      .addCase(exportAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(exportAttendance.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Attendance exported successfully';
      })
      .addCase(exportAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, clearError, clearSelectedAttendance } = adminSlice.actions;
export default adminSlice.reducer;
