import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Login as LoginIcon,
  Edit as EditIcon,
  Notifications as NotificationsIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { getDashboardStats, reset } from '../../features/admin/adminSlice';
import DashboardCard from '../../components/admin/DashboardCard';

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { dashboardStats, isLoading, isError, message } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(getDashboardStats());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  const formatLastLogin = (date) => {
    if (!date) return 'Never';
    try {
      return format(new Date(date), 'MMM dd, yyyy HH:mm');
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <Box>
      {/* Welcome Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
          Welcome back, {user?.name || 'Admin'}!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Here's what's happening with your account today.
        </Typography>
      </Box>

      {/* Error Alert */}
      {isError && message && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {message}
        </Alert>
      )}

      {/* Stats Cards */}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Total Logins"
              value={dashboardStats?.totalLogins || 0}
              icon={LoginIcon}
              color="primary"
              subtitle="All time"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Recent Logins"
              value={dashboardStats?.recentLogins || 0}
              icon={AccessTimeIcon}
              color="success"
              subtitle="Last 7 days"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Profile Edits"
              value={dashboardStats?.totalEdits || 0}
              icon={EditIcon}
              color="info"
              subtitle="Total changes"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Notifications"
              value={dashboardStats?.unreadNotifications || 0}
              icon={NotificationsIcon}
              color="warning"
              subtitle="Unread"
            />
          </Grid>
        </Grid>
      )}

      {/* Quick Info */}
      <Grid container spacing={3}>
        {/* Profile Info */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <PersonIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Profile Information
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Username
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                @{user?.username}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {user?.email}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Department
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {user?.department || 'N/A'}
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Job Role
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {user?.jobRole || 'N/A'}
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<PersonIcon />}
              onClick={() => navigate('/profile')}
              fullWidth
            >
              View Full Profile
            </Button>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <AccessTimeIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recent Activity
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Last Login
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {formatLastLogin(dashboardStats?.lastLogin)}
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Account Status
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'success.main' }}>
                Active
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<LoginIcon />}
              onClick={() => navigate('/login-history')}
              fullWidth
              sx={{ mb: 1 }}
            >
              View Login History
            </Button>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => navigate('/edit-history')}
              fullWidth
            >
              View Edit History
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;