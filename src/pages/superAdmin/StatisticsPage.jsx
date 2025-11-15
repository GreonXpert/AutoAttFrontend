import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Grid, Paper, CircularProgress, Alert } from '@mui/material';
import { Group, CheckCircle, Cancel, Notifications, TrendingUp } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { getStatistics, reset } from '../../features/superAdmin/superAdminSlice';
import StatisticsCard from '../../components/superAdmin/StatisticsCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#667eea', '#4caf50', '#f44336', '#ff9800'];

const StatisticsPage = () => {
  const dispatch = useDispatch();
  const { statistics, isLoading, isError, message } = useSelector((state) => state.superAdmin);

  useEffect(() => {
    dispatch(getStatistics());
    return () => dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) toast.error(message);
  }, [isError, message]);

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
  }

  if (isError) {
    return <Alert severity="error">{message}</Alert>;
  }

  const pieData = [
    { name: 'Active', value: statistics?.admins?.active || 0 },
    { name: 'Inactive', value: statistics?.admins?.inactive || 0 },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>System Statistics</Typography>
        <Typography variant="body2" color="text.secondary">Overview of system performance and metrics</Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatisticsCard title="Total Admins" value={statistics?.admins?.total || 0} icon={Group} color="primary" subtitle="All administrators" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatisticsCard title="Active Admins" value={statistics?.admins?.active || 0} icon={CheckCircle} color="success" subtitle="Currently active" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatisticsCard title="Inactive Admins" value={statistics?.admins?.inactive || 0} icon={Cancel} color="error" subtitle="Deactivated accounts" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatisticsCard title="Recent Logins" value={statistics?.activity?.recentLogins24h || 0} icon={TrendingUp} color="info" subtitle="Last 24 hours" />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Admins by Department</Typography>
            {statistics?.departments?.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statistics.departments.map(d => ({ name: d._id || 'Unknown', count: d.count }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#667eea" name="Admins" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Typography variant="body2" color="text.secondary">No department data available</Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Active vs Inactive</Typography>
            {pieData.some(d => d.value > 0) ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" labelLine={false} label={entry => `${entry.name}: ${entry.value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                    {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <Typography variant="body2" color="text.secondary">No data available</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatisticsPage;