import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  login,
  logout,
  getMe,
  changePassword,
  forgotPassword,
  resetPassword,
  reset,
  clearError,
} from '../features/auth/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    isSuccess,
    isError,
    message,
  } = useSelector((state) => state.auth);

  // Login function
  const handleLogin = async (credentials) => {
    try {
      const result = await dispatch(login(credentials)).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/login', { replace: true });
    } catch (error) {
      // Even if logout API fails, still navigate to login
      navigate('/login', { replace: true });
    }
  };

  // Get current user
  const getCurrentUser = async () => {
    try {
      const result = await dispatch(getMe()).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Change password
  const handleChangePassword = async (passwordData) => {
    try {
      const result = await dispatch(changePassword(passwordData)).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Forgot password
  const handleForgotPassword = async (email) => {
    try {
      const result = await dispatch(forgotPassword(email)).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Reset password
  const handleResetPassword = async (token, passwordData) => {
    try {
      const result = await dispatch(resetPassword({ token, passwordData })).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Reset state
  const resetAuthState = () => {
    dispatch(reset());
  };

  // Clear error
  const clearAuthError = () => {
    dispatch(clearError());
  };

  // Check if user is super admin
  const isSuperAdmin = () => {
    return user?.role === 'superadmin';
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin' || user?.role === 'superadmin';
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    isSuccess,
    isError,
    message,
    handleLogin,
    handleLogout,
    getCurrentUser,
    handleChangePassword,
    handleForgotPassword,
    handleResetPassword,
    resetAuthState,
    clearAuthError,
    isSuperAdmin,
    isAdmin,
  };
};

export default useAuth;