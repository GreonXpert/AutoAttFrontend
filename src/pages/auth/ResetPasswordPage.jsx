import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  LockReset as LockResetIcon,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';

// Validation schema
const validationSchema = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const {
    isLoading,
    isError,
    isSuccess,
    message,
    handleResetPassword,
    resetAuthState,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await handleResetPassword(token, {
          password: values.password,
          confirmPassword: values.confirmPassword,
        });
      } catch (error) {
        // Error is handled by Redux and useAuth
      }
    },
  });

  // Handle success/error messages
  useEffect(() => {
    if (isSuccess) {
      toast.success('Password reset successfully!');
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);
    }

    if (isError && message) {
      toast.error(message);
    }

    // Cleanup on unmount
    return () => {
      resetAuthState();
    };
  }, [isSuccess, isError, message, navigate, resetAuthState]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
        Reset Password
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mb: 3,
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        Enter your new password below
      </Typography>

      {isError && message && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      {isSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Password reset successfully! Redirecting to login...
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="password"
          name="password"
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          disabled={isLoading || isSuccess}
          autoComplete="new-password"
          autoFocus
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  disabled={isLoading || isSuccess}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm New Password"
          type={showConfirmPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          disabled={isLoading || isSuccess}
          autoComplete="new-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                  disabled={isLoading || isSuccess}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Password must:
          </Typography>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <Typography component="li" variant="caption" color="text.secondary">
              Be at least 8 characters long
            </Typography>
            <Typography component="li" variant="caption" color="text.secondary">
              Contain at least one uppercase letter
            </Typography>
            <Typography component="li" variant="caption" color="text.secondary">
              Contain at least one lowercase letter
            </Typography>
            <Typography component="li" variant="caption" color="text.secondary">
              Contain at least one number
            </Typography>
          </ul>
        </Box>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          startIcon={
            isLoading ? <CircularProgress size={20} color="inherit" /> : <LockResetIcon />
          }
          disabled={isLoading || !formik.isValid || isSuccess}
          sx={{ mt: 3, mb: 2, py: 1.5 }}
        >
          {isLoading ? 'Resetting Password...' : 'Reset Password'}
        </Button>
      </form>
    </Box>
  );
};

export default ResetPasswordPage;