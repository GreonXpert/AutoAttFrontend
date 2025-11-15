import { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Avatar,
  IconButton,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Close as CloseIcon,
  PhotoCamera as PhotoCameraIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must not exceed 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  department: Yup.string().max(50, 'Department must not exceed 50 characters'),
  jobRole: Yup.string().max(50, 'Job Role must not exceed 50 characters'),
});

const ProfileEditForm = ({ open, onClose, profile, onSave, isLoading = false, error = null }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: profile?.name || '',
      username: profile?.username || '',
      email: profile?.email || '',
      department: profile?.department || '',
      jobRole: profile?.jobRole || '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Append form fields
      Object.keys(values).forEach((key) => {
        if (values[key]) {
          formData.append(key, values[key]);
        }
      });

      // Append image if selected
      if (selectedFile) {
        formData.append('profileImage', selectedFile);
      }

      await onSave(formData);
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }

      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    formik.resetForm();
    setSelectedFile(null);
    setImagePreview(null);
    onClose();
  };

  const getAvatarUrl = () => {
    if (imagePreview) {
      return imagePreview;
    }
    if (profile?.profileImage) {
      if (profile.profileImage.startsWith('http')) {
        return profile.profileImage;
      }
      return `${process.env.REACT_APP_API_BASE_URL}${profile.profileImage}`;
    }
    return null;
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Edit Profile
          </Typography>
          <IconButton onClick={handleClose} disabled={isLoading}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent dividers>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Profile Image Upload */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={getAvatarUrl()}
                alt={formik.values.name}
                sx={{
                  width: 100,
                  height: 100,
                  fontSize: 40,
                  bgcolor: 'primary.main',
                }}
              >
                {formik.values.name?.charAt(0)?.toUpperCase() || 'A'}
              </Avatar>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
                disabled={isLoading}
              />
              <IconButton
                size="small"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                }}
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
              >
                <PhotoCameraIcon fontSize="small" />
              </IconButton>
            </Box>
            {selectedFile && (
              <Box sx={{ mt: 1, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  {selectedFile.name}
                </Typography>
                <Button size="small" onClick={handleRemoveImage} disabled={isLoading}>
                  Remove
                </Button>
              </Box>
            )}
          </Box>

          {/* Form Fields */}
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            disabled={isLoading}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            disabled={isLoading}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            disabled={isLoading}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            id="department"
            name="department"
            label="Department"
            value={formik.values.department}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.department && Boolean(formik.errors.department)}
            helperText={formik.touched.department && formik.errors.department}
            disabled={isLoading}
            margin="normal"
          />

          <TextField
            fullWidth
            id="jobRole"
            name="jobRole"
            label="Job Role"
            value={formik.values.jobRole}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.jobRole && Boolean(formik.errors.jobRole)}
            helperText={formik.touched.jobRole && formik.errors.jobRole}
            disabled={isLoading}
            margin="normal"
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
            disabled={isLoading || !formik.isValid}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProfileEditForm;