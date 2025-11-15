import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import {
  Person as PersonIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import {
  getProfile,
  updateProfile,
  deleteProfileImage,
  reset,
} from '../../features/admin/adminSlice';
import { updateUser } from '../../features/auth/authSlice';
import ProfileCard from '../../components/admin/ProfileCard';
import ProfileEditForm from '../../components/admin/ProfileEditForm';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { profile, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.admin
  );

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(getProfile());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && message) {
      toast.success(message);
      setEditDialogOpen(false);
      setDeleteDialogOpen(false);
      // Update auth user data
      if (profile) {
        dispatch(updateUser(profile));
      }
    }

    if (isError && message) {
      toast.error(message);
    }
  }, [isSuccess, isError, message, profile, dispatch]);

  const handleEditProfile = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    dispatch(reset());
  };

  const handleSaveProfile = async (formData) => {
    try {
      await dispatch(updateProfile(formData)).unwrap();
    } catch (error) {
      // Error handled by Redux
    }
  };

  const handleDeleteImageClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteImageConfirm = async () => {
    try {
      await dispatch(deleteProfileImage()).unwrap();
      // Refresh profile
      dispatch(getProfile());
    } catch (error) {
      // Error handled by Redux
    }
  };

  const handleDeleteImageCancel = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
          My Profile
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage your account information
        </Typography>
      </Box>

      {/* Profile Content */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ProfileCard
            profile={profile}
            isLoading={isLoading}
            error={isError ? message : null}
            onEdit={handleEditProfile}
            onDeleteImage={profile?.profileImage ? handleDeleteImageClick : null}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Account Details
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Full Name
              </Typography>
              <Typography variant="body1">{profile?.name || '-'}</Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Username
              </Typography>
              <Typography variant="body1">@{profile?.username || '-'}</Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Email Address
              </Typography>
              <Typography variant="body1">{profile?.email || '-'}</Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Department
              </Typography>
              <Typography variant="body1">{profile?.department || 'Not specified'}</Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Job Role
              </Typography>
              <Typography variant="body1">{profile?.jobRole || 'Not specified'}</Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Account Type
              </Typography>
              <Typography variant="body1">
                {profile?.role === 'superadmin' ? 'Super Administrator' : 'Administrator'}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Account Status
              </Typography>
              <Typography variant="body1" sx={{ color: 'success.main', fontWeight: 500 }}>
                {profile?.isActive ? 'Active' : 'Inactive'}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Edit Profile Dialog */}
      <ProfileEditForm
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        profile={profile}
        onSave={handleSaveProfile}
        isLoading={isLoading}
        error={isError ? message : null}
      />

      {/* Delete Image Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteImageCancel}
      >
        <DialogTitle>Delete Profile Image?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your profile image? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteImageCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteImageConfirm}
            color="error"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;