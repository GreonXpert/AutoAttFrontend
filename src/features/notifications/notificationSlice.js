import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import notificationService from './notificationService';

// Initial state
const initialState = {
  notifications: [],
  selectedNotification: null,
  stats: null,
  unreadCount: 0,
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

// Get all notifications
export const getNotifications = createAsyncThunk(
  'notification/getNotifications',
  async (params, thunkAPI) => {
    try {
      return await notificationService.getNotifications(params);
    } catch (error) {
      const message = error.message || 'Failed to fetch notifications';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get notification by ID
export const getNotificationById = createAsyncThunk(
  'notification/getNotificationById',
  async (id, thunkAPI) => {
    try {
      return await notificationService.getNotificationById(id);
    } catch (error) {
      const message = error.message || 'Failed to fetch notification';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get notification statistics
export const getNotificationStats = createAsyncThunk(
  'notification/getNotificationStats',
  async (_, thunkAPI) => {
    try {
      return await notificationService.getNotificationStats();
    } catch (error) {
      const message = error.message || 'Failed to fetch statistics';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Mark as read
export const markAsRead = createAsyncThunk(
  'notification/markAsRead',
  async (id, thunkAPI) => {
    try {
      await notificationService.markAsRead(id);
      return id;
    } catch (error) {
      const message = error.message || 'Failed to mark as read';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Mark all as read
export const markAllAsRead = createAsyncThunk(
  'notification/markAllAsRead',
  async (_, thunkAPI) => {
    try {
      return await notificationService.markAllAsRead();
    } catch (error) {
      const message = error.message || 'Failed to mark all as read';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete notification
export const deleteNotification = createAsyncThunk(
  'notification/deleteNotification',
  async (id, thunkAPI) => {
    try {
      await notificationService.deleteNotification(id);
      return id;
    } catch (error) {
      const message = error.message || 'Failed to delete notification';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete read notifications
export const deleteReadNotifications = createAsyncThunk(
  'notification/deleteReadNotifications',
  async (_, thunkAPI) => {
    try {
      return await notificationService.deleteReadNotifications();
    } catch (error) {
      const message = error.message || 'Failed to delete read notifications';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Notification slice
const notificationSlice = createSlice({
  name: 'notification',
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
    clearSelectedNotification: (state) => {
      state.selectedNotification = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Notifications
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notifications = action.payload.data;
        state.unreadCount = action.payload.unreadCount;
        state.pagination = {
          page: action.payload.currentPage,
          limit: action.payload.limit || 10,
          total: action.payload.total,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Notification By ID
      .addCase(getNotificationById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotificationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedNotification = action.payload;
      })
      .addCase(getNotificationById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Stats
      .addCase(getNotificationStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotificationStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stats = action.payload;
      })
      .addCase(getNotificationStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Mark As Read
      .addCase(markAsRead.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const notification = state.notifications.find((n) => n._id === action.payload);
        if (notification) {
          notification.isRead = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      .addCase(markAsRead.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Mark All As Read
      .addCase(markAllAsRead.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notifications.forEach((n) => (n.isRead = true));
        state.unreadCount = 0;
        state.message = 'All notifications marked as read';
      })
      .addCase(markAllAsRead.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete Notification
      .addCase(deleteNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const deletedNotification = state.notifications.find((n) => n._id === action.payload);
        if (deletedNotification && !deletedNotification.isRead) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.notifications = state.notifications.filter((n) => n._id !== action.payload);
        state.message = 'Notification deleted';
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete Read Notifications
      .addCase(deleteReadNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReadNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notifications = state.notifications.filter((n) => !n.isRead);
        state.message = action.payload.message || 'Read notifications deleted';
      })
      .addCase(deleteReadNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, clearError, clearSelectedNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
