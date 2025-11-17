import { ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Box, Chip, IconButton } from '@mui/material';
import { Delete, Circle } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

const NotificationItem = ({ notification, onClick, onDelete }) => {
  const getTypeColor = (type) => {
    const colors = { admin_created: 'success', admin_updated: 'info', admin_deleted: 'error', password_changed: 'warning', login_alert: 'primary', system_alert: 'secondary' };
    return colors[type] || 'default';
  };

  const getPriorityColor = (priority) => {
    const colors = { urgent: 'error', high: 'warning', medium: 'info', low: 'default' };
    return colors[priority] || 'default';
  };

  return (
    <ListItem
      sx={{ bgcolor: notification.isRead ? 'transparent' : 'action.hover', borderLeft: 3, borderColor: notification.isRead ? 'transparent' : 'primary.main', '&:hover': { bgcolor: 'action.selected', cursor: 'pointer' } }}
      onClick={() => onClick && onClick(notification)}
      secondaryAction={<IconButton edge="end" size="small" onClick={(e) => { e.stopPropagation(); onDelete && onDelete(notification._id); }}><Delete fontSize="small" /></IconButton>}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: `${getTypeColor(notification.type)}.main` }}><Circle sx={{ fontSize: 12 }} /></Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}><Typography variant="body2" sx={{ fontWeight: notification.isRead ? 400 : 600 }}>{notification.title}</Typography>{!notification.isRead && <Circle sx={{ fontSize: 8, color: 'primary.main' }} />}</Box>}
        secondary={<><Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{notification.message}</Typography><Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}><Chip label={notification.type} size="small" variant="outlined" color={getTypeColor(notification.type)} /><Chip label={notification.priority} size="small" color={getPriorityColor(notification.priority)} /><Typography variant="caption" color="text.secondary">{formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}</Typography></Box></>}
      />
    </ListItem>
  );
};

export default NotificationItem;
