import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Avatar,
  Chip,
  Grid,
  Divider,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon, Email as EmailIcon, Work as WorkIcon, Business as BusinessIcon } from '@mui/icons-material';
import { format } from 'date-fns';

const AdminDetailsModal = ({ open, onClose, admin }) => {
  if (!admin) return null;

  const getAvatarUrl = () => {
    if (!admin.profileImage) return null;
    if (admin.profileImage.startsWith('http')) return admin.profileImage;
    return `${process.env.REACT_APP_API_BASE_URL}${admin.profileImage}`;
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    try {
      return format(new Date(date), 'MMM dd, yyyy HH:mm');
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Admin Details</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar src={getAvatarUrl()} sx={{ width: 100, height: 100, fontSize: 40, bgcolor: 'primary.main', mb: 2 }}>
            {admin.name?.charAt(0)?.toUpperCase()}
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>{admin.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>@{admin.username}</Typography>
          <Chip label={admin.isActive ? 'Active' : 'Inactive'} color={admin.isActive ? 'success' : 'default'} size="small" />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <EmailIcon color="action" fontSize="small" />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">Email</Typography>
                <Typography variant="body2">{admin.email}</Typography>
              </Box>
            </Box>
          </Grid>

          {admin.department && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <BusinessIcon color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">Department</Typography>
                  <Typography variant="body2">{admin.department}</Typography>
                </Box>
              </Box>
            </Grid>
          )}

          {admin.jobRole && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <WorkIcon color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">Job Role</Typography>
                  <Typography variant="body2">{admin.jobRole}</Typography>
                </Box>
              </Box>
            </Grid>
          )}

          <Grid item xs={12}>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Created At</Typography>
              <Typography variant="body2">{formatDate(admin.createdAt)}</Typography>
            </Box>
          </Grid>

          {admin.lastLogin && (
            <Grid item xs={12}>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">Last Login</Typography>
                <Typography variant="body2">{formatDate(admin.lastLogin)}</Typography>
              </Box>
            </Grid>
          )}

          <Grid item xs={12}>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Total Logins</Typography>
              <Typography variant="body2">{admin.loginHistory?.length || 0}</Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminDetailsModal;