import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Group,
  CheckCircle,
  Cancel,
  TrendingUp,
  PersonAdd,
  Assessment,
  History,
  RefreshOutlined,
  ArrowForward,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { getStatistics, getAllAdmins, reset } from '../../features/superAdmin/superAdminSlice';
import StatisticsCard from '../../components/superAdmin/StatisticsCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { format } from 'date-fns';

const COLORS = ['#667eea', '#4caf50', '#f44336', '#ff9800', '#2196f3'];

const SuperAdminDashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { statistics, admins, isLoading, isError, message } = useSelector((state) => state.superAdmin);
  const { user } = useSelector((state) => state.auth);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  const loadDashboardData = async () => {
    try {
      await Promise.all([
        dispatch(getStatistics()).unwrap(),
        dispatch(getAllAdmins({ page: 1, limit: 5 })).unwrap(),
      ]);
    } catch (error) {
      // Error handled by useEffect
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
    toast.success('Dashboard refreshed');
  };

  const formatDate = (date) => {
    if (!date) return 'Never';
    try {
      return format(new Date(date), 'MMM dd, yyyy HH:mm');
    } catch {
      return 'Invalid date';
    }
  };

  const pieData = [
    { name: 'Active', value: statistics?.admins?.active || 0 },
    { name: 'Inactive', value: statistics?.admins?.inactive || 0 },
  ];

  if (isLoading && !statistics) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
            Super Admin Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome back, {user?.name}! Here's what's happening with your system.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={refreshing ? <CircularProgress size={20} /> : <RefreshOutlined />}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<PersonAdd />}
            onClick={() => navigate('/super-admin/admins')}
          >
            Create Admin
          </Button>
        </Box>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatisticsCard
            title="Total Admins"
            value={statistics?.admins?.total || 0}
            icon={Group}
            color="primary"
            subtitle="All administrators"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatisticsCard
            title="Active Admins"
            value={statistics?.admins?.active || 0}
            icon={CheckCircle}
            color="success"
            subtitle="Currently active"
            progress={statistics?.admins?.total ? Math.round((statistics.admins.active / statistics.admins.total) * 100) : 0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatisticsCard
            title="Inactive Admins"
            value={statistics?.admins?.inactive || 0}
            icon={Cancel}
            color="error"
            subtitle="Deactivated accounts"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatisticsCard
            title="Recent Logins"
            value={statistics?.activity?.recentLogins24h || 0}
            icon={TrendingUp}
            color="info"
            subtitle="Last 24 hours"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Department Statistics */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Assessment color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Admins by Department
                </Typography>
              </Box>
              <Button
                size="small"
                endIcon={<ArrowForward />}
                onClick={() => navigate('/super-admin/statistics')}
              >
                View All Stats
              </Button>
            </Box>
            {statistics?.departments && statistics.departments.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statistics.departments.map(d => ({ name: d._id || 'Unknown', count: d.count }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#667eea" name="Admins" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                <Typography variant="body2" color="text.secondary">
                  No department data available
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Active vs Inactive Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Account Status
            </Typography>
            {pieData.some(d => d.value > 0) ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                <Typography variant="body2" color="text.secondary">
                  No data available
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Recent Admins */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recent Admins
              </Typography>
              <Button
                size="small"
                endIcon={<ArrowForward />}
                onClick={() => navigate('/super-admin/admins')}
              >
                View All
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {admins && admins.length > 0 ? (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Admin</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Created</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {admins.slice(0, 5).map((admin) => (
                      <TableRow key={admin._id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate('/super-admin/admins')}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 32, height: 32 }}>
                              {admin.name?.charAt(0)?.toUpperCase()}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {admin.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                @{admin.username}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip label={admin.department || 'N/A'} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={admin.isActive ? 'Active' : 'Inactive'}
                            size="small"
                            color={admin.isActive ? 'success' : 'default'}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption">
                            {formatDate(admin.createdAt)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  No admins found
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<PersonAdd />}
                onClick={() => navigate('/super-admin/admins')}
                fullWidth
                sx={{ justifyContent: 'flex-start' }}
              >
                Create New Admin
              </Button>
              <Button
                variant="outlined"
                startIcon={<Assessment />}
                onClick={() => navigate('/super-admin/statistics')}
                fullWidth
                sx={{ justifyContent: 'flex-start' }}
              >
                View Statistics
              </Button>
              <Button
                variant="outlined"
                startIcon={<History />}
                onClick={() => navigate('/super-admin/login-logs')}
                fullWidth
                sx={{ justifyContent: 'flex-start' }}
              >
                View Login Logs
              </Button>
              <Button
                variant="outlined"
                startIcon={<Group />}
                onClick={() => navigate('/super-admin/admins')}
                fullWidth
                sx={{ justifyContent: 'flex-start' }}
              >
                Manage All Admins
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SuperAdminDashboardPage;
