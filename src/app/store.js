import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import adminReducer from '../features/admin/adminSlice';
import superAdminReducer from '../features/superAdmin/superAdminSlice';
import notificationReducer from '../features/notifications/notificationSlice';
import attendanceReducer from '../features/attendance/attendanceSlice';
import fingerprintReducer from '../features/fingerprint/fingerprintSlice';
import adminProfileReducer from '../features/admin/adminProfileSlice'; // NEW - This handles PROFILE

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    superAdmin: superAdminReducer,
    notifications: notificationReducer,
    adminProfile: adminProfileReducer,
    attendance: attendanceReducer,
    fingerprint: fingerprintReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/login/fulfilled', 'auth/refreshToken/fulfilled'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.user.lastLogin'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;