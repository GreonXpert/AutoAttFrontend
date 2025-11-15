import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  fingerprints: [],
  enrollmentStatus: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Fingerprint slice
const fingerprintSlice = createSlice({
  name: 'fingerprint',
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

export const { reset } = fingerprintSlice.actions;
export default fingerprintSlice.reducer;