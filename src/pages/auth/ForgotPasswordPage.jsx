import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Email as EmailIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const ForgotPasswordPage = () => {
  const {
    isLoading,
    isError,
    isSuccess,
    message,
    handleForgotPassword,
    resetAuthState,
  } = useAuth();

  const [emailSent, setEmailSent] = useState(false);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await handleForgotPassword(values.email);
        setEmailSent(true);
      } catch (error) {
        // Error is handled by Redux and useAuth
      }
    },
  });

  // Handle success/error messages
  useEffect(() => {
    if (isSuccess && message) {
      toast.success(message);
    }

    if (isError && message) {
      toast.error(message);
    }

    // Cleanup on unmount
    return () => {
      resetAuthState();
    };
  }, [isSuccess, isError, message, resetAuthState]);

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
        Forgot Password?
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mb: 3,
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        Enter your email address and we'll send you instructions to reset your password
      </Typography>

      {emailSent && isSuccess ? (
        <Box>
          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Password reset instructions have been sent to your email address.
            </Typography>
            <Typography variant="body2">
              Please check your inbox and follow the instructions to reset your password.
            </Typography>
          </Alert>

          <Button
            fullWidth
            component={RouterLink}
            to="/login"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{ mt: 2 }}
          >
            Back to Login
          </Button>
        </Box>
      ) : (
        <>
          {isError && message && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              variant="outlined"
              margin="normal"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              disabled={isLoading}
              autoComplete="email"
              autoFocus
              InputProps={{
                startAdornment: <EmailIcon sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <EmailIcon />}
              disabled={isLoading || !formik.isValid}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              {isLoading ? 'Sending...' : 'Send Reset Instructions'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link
                component={RouterLink}
                to="/login"
                variant="body2"
                sx={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
              >
                <ArrowBackIcon sx={{ fontSize: 18, mr: 0.5 }} />
                Back to Login
              </Link>
            </Box>
          </form>
        </>
      )}
    </Box>
  );
};

export default ForgotPasswordPage;