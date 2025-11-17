import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, Box, Typography, IconButton, Button, Divider, Tabs, Tab } from '@mui/material';
import { Close, DoneAll, DeleteSweep } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { getNotifications, markAsRead, markAllAsRead, deleteNotification, deleteReadNotifications } from '../../features/notification/notificationSlice';
import NotificationList from './NotificationList';

const NotificationDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { notifications, pagination, isLoading, isSuccess, message } = useSelector((state) => state.notification);
  const [tabValue, setTabValue] = useState(0);
  const [filters, setFilters] = useState({ page: 1, limit: 10 });

  useEffect(() => {
    if (open) {
      const isRead = tabValue === 1 ? 'false' : tabValue === 2 ? 'true' : '';
      dispatch(getNotifications({ ...filters, isRead }));
    }
  }, [open, tabValue, filters, dispatch]);

  useEffect(() => {
    if (isSuccess && message) toast.success(message);
  }, [isSuccess, message]);

  const handleTabChange = (event, newValue) => { setTabValue(newValue); setFilters({ page: 1, limit: 10 }); };
  const handleMarkAsRead = async (id) => { await dispatch(markAsRead(id)); };
  const handleMarkAllAsRead = async () => { await dispatch(markAllAsRead()); };
  const handleDelete = async (id) => { await dispatch(deleteNotification(id)); };
  const handleDeleteAllRead = async () => { await dispatch(deleteReadNotifications()); };
  const handleLoadMore = () => { setFilters((prev) => ({ ...prev, page: prev.page + 1 })); };
  const handleItemClick = (notification) => { if (!notification.isRead) handleMarkAsRead(notification._id); };

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: { xs: '100%', sm: 450 } } }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><Typography variant="h6" sx={{ fontWeight: 600 }}>Notifications</Typography><IconButton onClick={onClose}><Close /></IconButton></Box>
      <Divider />
      <Box sx={{ px: 2, py: 1, display: 'flex', gap: 1 }}>
        <Button size="small" startIcon={<DoneAll />} onClick={handleMarkAllAsRead} disabled={isLoading}>Mark All Read</Button>
        <Button size="small" startIcon={<DeleteSweep />} onClick={handleDeleteAllRead} disabled={isLoading} color="error">Clear Read</Button>
      </Box>
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ px: 2 }}><Tab label="All" /><Tab label="Unread" /><Tab label="Read" /></Tabs>
      <Divider />
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <NotificationList notifications={notifications} isLoading={isLoading} onItemClick={handleItemClick} onDelete={handleDelete} onLoadMore={handleLoadMore} hasMore={pagination.page < pagination.totalPages} />
      </Box>
    </Drawer>
  );
};

export default NotificationDrawer;
