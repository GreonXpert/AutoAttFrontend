import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Chip,
  Grid,
  Divider,
  Button,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import {
  ArrowBack,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  CalendarToday,
  Login as LoginIcon,
  LockReset,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { getAdminById, deleteAdmin, reset } from '../../features/superAdmin/superAdminSlice';
import { format } from 'date-fns';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useState } from 'react';

const AdminDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedAdmin: admin, isLoading, isError, message, isSuccess } = useSelector((state) => state.superAdmin);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getAdminById(id));
    }
    return () => dispatch(reset());
  }, [dispatch, id]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
    if (isSuccess && message && deleteOpen) {
      toast.success(message);
      navigate('/super-admin/admins');
    }
  }, [isError, isSuccess, message]);

  const formatDate = (date) => {
    if (!date) return 'N/A';
    try {
      return format(new Date(date), 'MMM dd, yyyy HH:mm:ss');
    } catch {
      return 'Invalid date';
    }
  };

  const getAvatarUrl = () => {
    if (!admin?.profileImage) return null;
    if (admin.profileImage.startsWith('http')) return admin.profileImage;
    return `${process.env.REACT_APP_API_BASE_URL}${admin.profileImage}`;
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteAdmin(id)).unwrap();
    } catch (error) {
      // Error handled by useEffect
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (isError && !admin) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 2 }}>{message}</Alert>
        <Button variant="contained" onClick={() => navigate('/super-admin/admins')}>
          Back to Admins
        </Button>
      </Box>
    );
  }

  if (!admin) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">Admin not found</Typography>
        <Button variant="contained" onClick={() => navigate('/super-admin/admins')} sx={{ mt: 2 }}>
          Back to Admins
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate('/super-admin/admins')}>
            <ArrowBack />
          </IconButton>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
              Admin Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Complete information about {admin.name}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<LockReset />}
            onClick={() => toast.info('Password reset feature coming soon')}
          >
            Reset Password
          </Button>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/super-admin/admins/edit/${id}`)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setDeleteOpen(true)}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              src={getAvatarUrl()}
              sx={{
                width: 150,
                height: 150,
                fontSize: 60,
                bgcolor: 'primary.main',
                mx: 'auto',
                mb: 2,
              }}
            >
              {admin.name?.charAt(0)?.toUpperCase()}
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              {admin.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              @{admin.username}
            </Typography>
            <Chip
              label={admin.isActive ? 'Active' : 'Inactive'}
              color={admin.isActive ? 'success' : 'default'}
              sx={{ mb: 3 }}
            />
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                Role
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, textTransform: 'capitalize' }}>
                {admin.role}
              </Typography>

              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                Account Created
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {formatDate(admin.createdAt)}
              </Typography>

              {admin.lastLogin && (
                <>
                  <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    Last Login
                  </Typography>
                  <Typography variant="body2">
                    {formatDate(admin.lastLogin)}
                  </Typography>
                </>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Details Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Contact Information
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <EmailIcon color="action" />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Email
                    </Typography>
                    <Typography variant="body2">{admin.email}</Typography>
                  </Box>
                </Box>
              </Grid>

              {admin.department && (
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <BusinessIcon color="action" />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Department
                      </Typography>
                      <Typography variant="body2">{admin.department}</Typography>
                    </Box>
                  </Box>
                </Grid>
              )}

              {admin.jobRole && (
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <WorkIcon color="action" />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Job Role
                      </Typography>
                      <Typography variant="body2">{admin.jobRole}</Typography>
                    </Box>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Paper>

          {/* Activity Statistics */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Activity Statistics
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.50', borderRadius: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {admin.loginHistory?.length || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Total Logins
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.50', borderRadius: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                    {admin.editHistory?.length || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Profile Edits
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'info.50', borderRadius: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
                    {admin.passwordHistory?.length || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Password Changes
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Recent Login History */}
          {admin.loginHistory && admin.loginHistory.length > 0 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Recent Login History
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Login Time</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Logout Time</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>IP Address</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {admin.loginHistory.slice(0, 5).map((login, index) => (
                      <TableRow key={index} hover>
                        <TableCell>{formatDate(login.loginTime)}</TableCell>
                        <TableCell>
                          {login.logoutTime ? formatDate(login.logoutTime) : (
                            <Chip label="Active" size="small" color="primary" />
                          )}
                        </TableCell>
                        <TableCell>
                          <Chip label={login.ipAddress || 'Unknown'} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell>
                          {login.logoutTime ? (
                            <Chip label="Completed" size="small" color="success" />
                          ) : (
                            <Chip label="Active" size="small" color="primary" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {admin.loginHistory.length > 5 && (
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Button
                    size="small"
                    onClick={() => navigate('/super-admin/login-logs')}
                  >
                    View All Login History
                  </Button>
                </Box>
              )}
            </Paper>
          )}
        </Grid>
      </Grid>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Admin?"
        message={`Are you sure you want to delete ${admin.name}? This action cannot be undone and will permanently remove all associated data.`}
        confirmText="Delete Permanently"
        confirmColor="error"
        isLoading={isLoading}
        showWarningIcon
      />
    </Box>
  );
};

export default AdminDetailsPage;
