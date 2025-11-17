import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Paper, Grid, Tabs, Tab, Button, Chip } from '@mui/material';
import { DoneAll, DeleteSweep, Refresh } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { getNotifications, getNotificationStats, markAllAsRead, deleteReadNotifications, markAsRead, deleteNotification, reset } from '../../features/notification/notificationSlice';
import NotificationList from '../../components/notification/NotificationList';

const NotificationPage = () => {
  const dispatch = useDispatch();
  const { notifications, stats, pagination, isLoading, isError, message } = useSelector((state) => state.notification);
  const [tabValue, setTabValue] = useState(0);
  const [filters, setFilters] = useState({ page: 1, limit: 10 });

  useEffect(() => {
    const isRead = tabValue === 1 ? 'false' : tabValue === 2 ? 'true' : '';
    dispatch(getNotifications({ ...filters, isRead }));
    dispatch(getNotificationStats());
  }, [tabValue, filters, dispatch]);

  useEffect(() => {
    if (isError && message) toast.error(message);
  }, [isError, message]);

  const handleTabChange = (event, newValue) => { setTabValue(newValue); setFilters({ page: 1, limit: 10 }); };
  const handleRefresh = () => { dispatch(getNotifications({ ...filters, isRead: tabValue === 1 ? 'false' : tabValue === 2 ? 'true' : '' })); toast.success('Notifications refreshed'); };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box><Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>Notifications</Typography><Typography variant="body2" color="text.secondary">View and manage your notifications</Typography></Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<Refresh />} onClick={handleRefresh}>Refresh</Button>
          <Button variant="outlined" startIcon={<DoneAll />} onClick={() => dispatch(markAllAsRead())}>Mark All Read</Button>
          <Button variant="outlined" color="error" startIcon={<DeleteSweep />} onClick={() => dispatch(deleteReadNotifications())}>Clear Read</Button>
        </Box>
      </Box>

      {stats && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={3}><Paper sx={{ p: 2, textAlign: 'center' }}><Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>{stats.overview?.total || 0}</Typography><Typography variant="body2" color="text.secondary">Total</Typography></Paper></Grid>
          <Grid item xs={6} sm={3}><Paper sx={{ p: 2, textAlign: 'center' }}><Typography variant="h4" sx={{ fontWeight: 700, color: 'error.main' }}>{stats.overview?.unread || 0}</Typography><Typography variant="body2" color="text.secondary">Unread</Typography></Paper></Grid>
          <Grid item xs={6} sm={3}><Paper sx={{ p: 2, textAlign: 'center' }}><Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>{stats.overview?.high || 0}</Typography><Typography variant="body2" color="text.secondary">High Priority</Typography></Paper></Grid>
          <Grid item xs={6} sm={3}><Paper sx={{ p: 2, textAlign: 'center' }}><Typography variant="h4" sx={{ fontWeight: 700, color: 'error.dark' }}>{stats.overview?.urgent || 0}</Typography><Typography variant="body2" color="text.secondary">Urgent</Typography></Paper></Grid>
        </Grid>
      )}

      <Paper>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ px: 2, pt: 2 }}><Tab label="All" /><Tab label="Unread" /><Tab label="Read" /></Tabs>
        <Box sx={{ p: 2 }}>
          <NotificationList notifications={notifications} isLoading={isLoading} onItemClick={(n) => !n.isRead && dispatch(markAsRead(n._id))} onDelete={(id) => dispatch(deleteNotification(id))} onLoadMore={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))} hasMore={pagination.page < pagination.totalPages} />
        </Box>
      </Paper>
    </Box>
  );
};

export default NotificationPage;
