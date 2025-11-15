import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
  },
  extraReducers: (builder) => {
    // Async thunks will be added here
  },
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;