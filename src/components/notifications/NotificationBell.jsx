import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Badge } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { getNotifications } from '../../features/notification/notificationSlice';
import NotificationDrawer from './NotificationDrawer';

const NotificationBell = () => {
  const dispatch = useDispatch();
  const { unreadCount } = useSelector((state) => state.notification);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    dispatch(getNotifications({ page: 1, limit: 10 }));
    const interval = setInterval(() => {
      dispatch(getNotifications({ page: 1, limit: 10 }));
    }, 60000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <>
      <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <NotificationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default NotificationBell;
