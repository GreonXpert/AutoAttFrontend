import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layouts
import AuthLayout from '../layouts/AuthLayout';

// Route Guards
import PrivateRoute from './PrivateRoute';
import SuperAdminRoute from './SuperAdminRoute';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';

// Placeholder Pages (to be created)
import DashboardPage from '../pages/admin/DashboardPage';
import SuperAdminDashboardPage from '../pages/superAdmin/SuperAdminDashboardPage';

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

        {/* Protected Admin Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* Add more admin routes here */}
        </Route>

        {/* Protected Super Admin Routes */}
        <Route element={<SuperAdminRoute />}>
          <Route path="/super-admin/dashboard" element={<SuperAdminDashboardPage />} />
          {/* Add more super admin routes here */}
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;