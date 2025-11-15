# Redux Store, API Service & Auth Slice - Setup Guide

## 📁 File Placement in Your React Project

Place the files in the following locations within your React app:

```
src/
├── app/
│   └── store.js                          ✅ Redux Store Configuration
│
├── services/
│   └── api.js                            ✅ Axios API Service with Interceptors
│
└── features/
    ├── auth/
    │   ├── authSlice.js                  ✅ Auth Redux Slice
    │   └── authService.js                ✅ Auth API Service
    │
    ├── admin/
    │   └── adminSlice.js                 ✅ Admin Slice (Placeholder)
    │
    ├── superAdmin/
    │   └── superAdminSlice.js            ✅ Super Admin Slice (Placeholder)
    │
    ├── notifications/
    │   └── notificationSlice.js          ✅ Notification Slice (Placeholder)
    │
    ├── attendance/
    │   └── attendanceSlice.js            ✅ Attendance Slice (Placeholder)
    │
    └── fingerprint/
        └── fingerprintSlice.js           ✅ Fingerprint Slice (Placeholder)
```

---

## 🚀 Integration with React App

### Step 1: Wrap App with Redux Provider

Update your **`src/index.js`** or **`src/main.jsx`**:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

---

## 🔧 Key Features Implemented

### 1. **Redux Store (store.js)**
- ✅ Configured with all feature slices
- ✅ Redux DevTools enabled (only in development)
- ✅ Serialization checks configured for dates and tokens
- ✅ Ready for all features: auth, admin, superAdmin, notifications, attendance, fingerprint

### 2. **API Service (api.js)**
- ✅ Axios instance with base URL from environment variables
- ✅ Request interceptor that automatically adds JWT token to headers
- ✅ Response interceptor with automatic token refresh on 401 errors
- ✅ Helper methods for GET, POST, PUT, PATCH, DELETE
- ✅ File upload support with progress tracking
- ✅ Automatic logout on token expiration
- ✅ Error handling with formatted error messages

### 3. **Auth Slice (authSlice.js)**
- ✅ Complete authentication state management
- ✅ Async thunks for:
  - Login
  - Logout
  - Refresh Token
  - Get Current User (Me)
  - Change Password
  - Forgot Password
  - Reset Password
- ✅ Synchronous actions:
  - reset: Clear loading/success/error states
  - clearError: Clear error messages
  - updateUser: Update user data
  - clearAuth: Manual logout and state clearing
- ✅ Proper loading, success, and error state handling
- ✅ Persistent user data in localStorage

### 4. **Auth Service (authService.js)**
- ✅ All authentication API calls
- ✅ Token management (access & refresh tokens)
- ✅ User data persistence in localStorage
- ✅ Helper functions for checking authentication status

---

## 📖 Usage Examples

### Using Auth in Components

```jsx
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, reset } from '../features/auth/authSlice';

function LoginPage() {
  const dispatch = useDispatch();
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  const handleLogin = async (credentials) => {
    try {
      await dispatch(login(credentials)).unwrap();
      // Navigate to dashboard
    } catch (error) {
      // Handle error
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    // Your login form JSX
  );
}
```

### Using API Service Directly

```jsx
import { apiService } from '../services/api';

// GET request
const fetchData = async () => {
  try {
    const data = await apiService.get('/endpoint');
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
};

// POST request
const submitData = async (formData) => {
  try {
    const response = await apiService.post('/endpoint', formData);
    console.log(response);
  } catch (error) {
    console.error(error.message);
  }
};

// File upload
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await apiService.upload(
      '/endpoint',
      formData,
      (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        console.log(`Upload Progress: ${progress}%`);
      }
    );
    console.log(response);
  } catch (error) {
    console.error(error.message);
  }
};
```

---

## 🔐 Authentication Flow

1. **User logs in** → `dispatch(login(credentials))`
2. **Store receives token** → Saved to localStorage
3. **All API requests** → Automatically include Bearer token via interceptor
4. **Token expires (401)** → Interceptor automatically refreshes token
5. **Refresh fails** → User logged out and redirected to login
6. **User logs out** → `dispatch(logout())` → Clears localStorage and state

---

## 🛡️ Security Features

- ✅ JWT tokens stored in localStorage
- ✅ Automatic token refresh on expiration
- ✅ Automatic logout on authentication failure
- ✅ Protected routes can check `isAuthenticated` state
- ✅ Request timeout set to 30 seconds
- ✅ Error handling for network failures

---

## 🎯 Next Steps

After you give the instruction, I can create:

1. **Custom Hooks**: `useAuth.js` for easier auth access
2. **Route Protection**: `PrivateRoute.jsx` and `SuperAdminRoute.jsx`
3. **Login Components**: Complete login, forgot password, reset password forms
4. **Other Feature Services**: Admin, SuperAdmin, Notifications, etc.
5. **Complete Slices**: Full implementation for all features

---

## 📝 Important Notes

- All placeholder slices are ready and won't cause errors
- They have basic structure and can be expanded later
- Environment variable `REACT_APP_API_URL` must be set in `.env`
- Make sure backend is running on the configured URL
- Redux DevTools will be available in development mode

---

## ✅ What's Completed

- [x] Redux Store Configuration
- [x] API Service with Interceptors
- [x] Auth Slice with all actions
- [x] Auth Service with all API calls
- [x] Token refresh mechanism
- [x] Error handling
- [x] Loading states
- [x] Placeholder slices for other features

---

## 🔄 Token Refresh Flow

```
User Request → 401 Error
    ↓
Check for Refresh Token
    ↓
Send Refresh Request
    ↓
Success → Update Token → Retry Original Request
    ↓
Failure → Logout User → Redirect to Login
```

---

Ready for the next steps! 🚀