import { Grid, Paper, Box, Typography, LinearProgress } from '@mui/material';
import {
  CheckCircle, Cancel, Schedule, TrendingUp, Group, CalendarToday,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon: Icon, color, subtitle, progress }) => (
  <Paper sx={{ p: 3, height: '100%' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>{title}</Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, color: `${color}.main` }}>{value}</Typography>
        {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
      </Box>
      <Icon sx={{ fontSize: 40, color: `${color}.main`, opacity: 0.3 }} />
    </Box>
    {progress !== undefined && (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="caption">Progress</Typography>
          <Typography variant="caption">{progress}%</Typography>
        </Box>
        <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 3 }} />
      </Box>
    )}
  </Paper>
);

const AttendanceStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Total Present" value={stats.totalPresent || 0} icon={CheckCircle} color="success" subtitle="This month" progress={stats.presentPercentage} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Total Absent" value={stats.totalAbsent || 0} icon={Cancel} color="error" subtitle="This month" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Late Arrivals" value={stats.totalLate || 0} icon={Schedule} color="warning" subtitle="This month" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Avg Attendance" value={`${stats.averageAttendance || 0}%`} icon={TrendingUp} color="info" subtitle="Last 30 days" />
      </Grid>
    </Grid>
  );
};

export default AttendanceStats;
