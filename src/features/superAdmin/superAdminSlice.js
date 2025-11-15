import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  admins: [],
  selectedAdmin: null,
  statistics: null,
  loginLogs: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

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
  },
  extraReducers: (builder) => {
    // Async thunks will be added here
  },
});

export const { reset } = superAdminSlice.actions;
export default superAdminSlice.reducer;