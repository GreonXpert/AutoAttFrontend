import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { toast } from 'react-toastify';
import { getLoginHistory, reset } from '../../features/admin/adminSlice';
import LoginHistoryTable from '../../components/admin/LoginHistoryTable';

const LoginHistoryPage = () => {
  const dispatch = useDispatch();
  const { loginHistory, isLoading, isError, message } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(getLoginHistory());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
          Login History
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View all your login and logout activities
        </Typography>
      </Box>

      {/* Stats */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Total Login Records: {loginHistory?.length || 0}
        </Typography>
      </Paper>

      {/* Login History Table */}
      <LoginHistoryTable
        data={loginHistory}
        isLoading={isLoading}
        error={isError ? message : null}
      />
    </Box>
  );
};

export default LoginHistoryPage;