import { List, Box, Typography, CircularProgress, Button } from '@mui/material';
import { Inbox } from '@mui/icons-material';
import NotificationItem from './NotificationItem';

const NotificationList = ({ notifications = [], isLoading, onItemClick, onDelete, onLoadMore, hasMore }) => {
  if (isLoading && notifications.length === 0) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>;
  if (!notifications || notifications.length === 0) return <Box sx={{ textAlign: 'center', py: 8 }}><Inbox sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} /><Typography variant="h6" color="text.secondary">No notifications</Typography><Typography variant="body2" color="text.disabled">You're all caught up!</Typography></Box>;

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {notifications.map((notification) => (<NotificationItem key={notification._id} notification={notification} onClick={onItemClick} onDelete={onDelete} />))}
      </List>
      {hasMore && <Box sx={{ textAlign: 'center', py: 2 }}><Button onClick={onLoadMore} disabled={isLoading}>{isLoading ? 'Loading...' : 'Load More'}</Button></Box>}
    </>
  );
};

export default NotificationList;
