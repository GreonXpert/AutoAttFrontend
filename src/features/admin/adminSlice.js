import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import attendanceService from '../attendance/attendanceService';

// Initial state
const initialState = {
  attendanceRecords: [],
  selectedAttendance: null,
  employeeAttendance: [],
  attendanceReport: null,
  attendanceSummary: null,
  attendanceStats: null,
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

// Mark attendance (Check-in)
export const markAttendance = createAsyncThunk(
  'attendance/markAttendance',
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
  'attendance/markCheckout',
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
  'attendance/getAllAttendance',
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
  'attendance/getAttendanceById',
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
  'attendance/getEmployeeAttendance',
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
  'attendance/getAttendanceReport',
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
  'attendance/getAttendanceSummary',
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
  'attendance/getAttendanceStats',
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
  'attendance/updateAttendance',
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
  'attendance/deleteAttendance',
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
  'attendance/exportAttendance',
  async (params, thunkAPI) => {
    try {
      return await attendanceService.exportAttendance(params);
    } catch (error) {
      const message = error.message || 'Failed to export attendance';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Attendance slice
const attendanceSlice = createSlice({
  name: 'attendance',
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

export const { reset, clearError, clearSelectedAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;
