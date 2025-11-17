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
  Grid,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { Close as CloseIcon, PhotoCamera as PhotoCameraIcon, Save as SaveIcon } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required').min(2, 'Min 2 characters').max(50, 'Max 50 characters'),
  username: Yup.string().required('Username is required').min(3, 'Min 3 characters').max(30, 'Max 30 characters').matches(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, underscores'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  password: Yup.string().required('Password is required').min(8, 'Min 8 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Must contain uppercase, lowercase, number'),
  department: Yup.string().max(50, 'Max 50 characters'),
  jobRole: Yup.string().max(50, 'Max 50 characters'),
});

const CreateAdminForm = ({ open, onClose, onSave, isLoading = false, error = null }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      department: '',
      jobRole: '',
      isActive: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (values[key] !== '') {
          formData.append(key, values[key]);
        }
      });
      if (selectedFile) {
        formData.append('profileImage', selectedFile);
      }
      await onSave(formData);
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClose = () => {
    formik.resetForm();
    setSelectedFile(null);
    setImagePreview(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Create New Admin</Typography>
          <IconButton onClick={handleClose} disabled={isLoading}><CloseIcon /></IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent dividers>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar src={imagePreview} sx={{ width: 100, height: 100, fontSize: 40, bgcolor: 'primary.main' }}>
              {formik.values.name?.charAt(0)?.toUpperCase() || 'A'}
            </Avatar>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} disabled={isLoading} />
            <Box sx={{ mt: 1 }}>
              <Button size="small" startIcon={<PhotoCameraIcon />} onClick={() => fileInputRef.current?.click()} disabled={isLoading}>
                Upload Photo
              </Button>
              {selectedFile && <Button size="small" onClick={handleRemoveImage} disabled={isLoading}>Remove</Button>}
            </Box>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth id="name" name="name" label="Full Name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} disabled={isLoading} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth id="username" name="username" label="Username" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.username && Boolean(formik.errors.username)} helperText={formik.touched.username && formik.errors.username} disabled={isLoading} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth id="email" name="email" label="Email" type="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} disabled={isLoading} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth id="password" name="password" label="Password" type="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password} disabled={isLoading} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth id="department" name="department" label="Department" value={formik.values.department} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.department && Boolean(formik.errors.department)} helperText={formik.touched.department && formik.errors.department} disabled={isLoading} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth id="jobRole" name="jobRole" label="Job Role" value={formik.values.jobRole} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.jobRole && Boolean(formik.errors.jobRole)} helperText={formik.touched.jobRole && formik.errors.jobRole} disabled={isLoading} />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel control={<Switch checked={formik.values.isActive} onChange={formik.handleChange} name="isActive" disabled={isLoading} />} label="Active Account" />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleClose} disabled={isLoading}>Cancel</Button>
          <Button type="submit" variant="contained" startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />} disabled={isLoading || !formik.isValid}>
            {isLoading ? 'Creating...' : 'Create Admin'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateAdminForm;
