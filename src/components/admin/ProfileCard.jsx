import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Email as EmailIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Delete as DeleteIcon,
  PhotoCamera as PhotoCameraIcon,
} from '@mui/icons-material';

const ProfileCard = ({
  profile,
  isLoading = false,
  error = null,
  onEdit,
  onDeleteImage,
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <Alert severity="error">{error}</Alert>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card>
        <CardContent>
          <Typography variant="body1" color="text.secondary" align="center">
            No profile data available
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const getAvatarUrl = () => {
    if (profile.profileImage) {
      // If it's a full URL, use it directly
      if (profile.profileImage.startsWith('http')) {
        return profile.profileImage;
      }
      // Otherwise, construct the URL with the base URL
      return `${process.env.REACT_APP_API_BASE_URL}${profile.profileImage}`;
    }
    return null;
  };

  const avatarUrl = getAvatarUrl();

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        {/* Profile Image */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={avatarUrl}
              alt={profile.name}
              sx={{
                width: 120,
                height: 120,
                border: 3,
                borderColor: 'primary.main',
                fontSize: 48,
                fontWeight: 600,
                bgcolor: 'primary.main',
              }}
            >
              {profile.name?.charAt(0)?.toUpperCase() || 'A'}
            </Avatar>
            {avatarUrl && onDeleteImage && (
              <IconButton
                size="small"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  bgcolor: 'error.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'error.dark' },
                }}
                onClick={onDeleteImage}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          {/* Name and Role */}
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
              {profile.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              @{profile.username}
            </Typography>
            <Chip
              label={profile.role === 'superadmin' ? 'Super Admin' : 'Admin'}
              color={profile.role === 'superadmin' ? 'error' : 'primary'}
              size="small"
            />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Profile Details */}
        <Grid container spacing={2}>
          {/* Email */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <EmailIcon color="action" fontSize="small" />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Email
                </Typography>
                <Typography variant="body2">{profile.email}</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Department */}
          {profile.department && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <BusinessIcon color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Department
                  </Typography>
                  <Typography variant="body2">{profile.department}</Typography>
                </Box>
              </Box>
            </Grid>
          )}

          {/* Job Role */}
          {profile.jobRole && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <WorkIcon color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Job Role
                  </Typography>
                  <Typography variant="body2">{profile.jobRole}</Typography>
                </Box>
              </Box>
            </Grid>
          )}

          {/* Account Status */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <PersonIcon color="action" fontSize="small" />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Account Status
                </Typography>
                <Chip
                  label={profile.isActive ? 'Active' : 'Inactive'}
                  color={profile.isActive ? 'success' : 'default'}
                  size="small"
                  sx={{ mt: 0.5 }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      {onEdit && (
        <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={onEdit}
            fullWidth
            sx={{ mx: 2 }}
          >
            Edit Profile
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default ProfileCard;