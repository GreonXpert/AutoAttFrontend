import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layouts
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';

// Route Guards
import PrivateRoute from './PrivateRoute';
import SuperAdminRoute from './SuperAdminRoute';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';

// Admin Pages
import DashboardPage from '../pages/admin/DashboardPage';
import ProfilePage from '../pages/admin/ProfilePage';
import LoginHistoryPage from '../pages/admin/LoginHistoryPage';
import EditHistoryPage from '../pages/admin/EditHistoryPage';

// Super Admin Pages
import SuperAdminDashboardPage from '../pages/superAdmin/SuperAdminDashboardPage';
import ManageAdminsPage from '../pages/superAdmin/ManageAdminsPage';
import StatisticsPage from '../pages/superAdmin/StatisticsPage';
import LoginLogsPage from '../pages/superAdmin/LoginLogsPage';

const AppRoutes = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Redirect authenticated users from root
  const RedirectRoot = () => {
    if (isAuthenticated && user) {
      if (user.role === 'superadmin') {
        return <Navigate to="/super-admin/dashboard" replace />;
      }
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        {/* Root redirect */}
        <Route path="/" element={<RedirectRoot />} />

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        </Route>

        {/* Protected Routes with MainLayout */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            {/* Admin Routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login-history" element={<LoginHistoryPage />} />
            <Route path="/edit-history" element={<EditHistoryPage />} />
            <Route path="/notifications" element={<div>Notifications Page (Coming Soon)</div>} />
            <Route path="/attendance" element={<div>Attendance Page (Coming Soon)</div>} />
            <Route path="/fingerprint" element={<div>Fingerprint Page (Coming Soon)</div>} />
          </Route>
        </Route>

        {/* Protected Super Admin Routes with MainLayout */}
        <Route element={<SuperAdminRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/super-admin/dashboard" element={<SuperAdminDashboardPage />} />
            <Route path="/super-admin/admins" element={<ManageAdminsPage />} />
            <Route path="/super-admin/statistics" element={<StatisticsPage />} />
            <Route path="/super-admin/login-logs" element={<LoginLogsPage />} />
          </Route>
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;