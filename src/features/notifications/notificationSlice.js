import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  notifications: [],
  stats: null,
  unreadCount: 0,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Notification slice
const notificationSlice = createSlice({
  name: 'notifications',
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

export const { reset } = notificationSlice.actions;
export default notificationSlice.reducer;