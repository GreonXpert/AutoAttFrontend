import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';

// Validation schema
const validationSchema = Yup.object({
  emailOrUsername: Yup.string()
    .required('Email or Username is required')
    .min(3, 'Must be at least 3 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    isLoading,
    isError,
    isSuccess,
    message,
    handleLogin,
    resetAuthState,
    isSuperAdmin,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      emailOrUsername: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await handleLogin(values);
      } catch (error) {
        // Error is handled by Redux and useAuth
      }
    },
  });

  // Handle success/error messages
  useEffect(() => {
    if (isSuccess && isAuthenticated) {
      toast.success('Login successful!');
      
      // Navigate based on role
      if (isSuperAdmin()) {
        navigate('/super-admin/dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }

    if (isError && message) {
      toast.error(message);
    }

    // Cleanup on unmount
    return () => {
      resetAuthState();
    };
  }, [isSuccess, isError, message, isAuthenticated, navigate, resetAuthState, isSuperAdmin]);

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated) {
      if (isSuperAdmin()) {
        navigate('/super-admin/dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, navigate, isSuperAdmin]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          mb: 1,
          fontWeight: 600,
          textAlign: 'center',
          color: 'primary.main',
        }}
      >
        Welcome Back
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mb: 3,
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        Sign in to your account to continue
      </Typography>

      {isError && message && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="emailOrUsername"
          name="emailOrUsername"
          label="Email or Username"
          variant="outlined"
          margin="normal"
          value={formik.values.emailOrUsername}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.emailOrUsername && Boolean(formik.errors.emailOrUsername)}
          helperText={formik.touched.emailOrUsername && formik.errors.emailOrUsername}
          disabled={isLoading}
          autoComplete="username"
          autoFocus
        />

        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          disabled={isLoading}
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  disabled={isLoading}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ textAlign: 'right', mt: 1 }}>
          <Link
            component={RouterLink}
            to="/forgot-password"
            variant="body2"
            sx={{ textDecoration: 'none' }}
          >
            Forgot Password?
          </Link>
        </Box>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
          disabled={isLoading || !formik.isValid}
          sx={{ mt: 3, mb: 2, py: 1.5 }}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Need help? Contact your administrator
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;