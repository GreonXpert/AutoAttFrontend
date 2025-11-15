import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  attendanceRecords: [],
  stats: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

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
  },
  extraReducers: (builder) => {
    // Async thunks will be added here
  },
});

export const { reset } = attendanceSlice.actions;
export default attendanceSlice.reducer;