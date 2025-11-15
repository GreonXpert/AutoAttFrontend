import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import { getLoginLogs, reset } from '../../features/superAdmin/superAdminSlice';
import LoginLogsTable from '../../components/superAdmin/LoginLogsTable';

const LoginLogsPage = () => {
  const dispatch = useDispatch();
  const { loginLogs, pagination, isLoading, isError, message } = useSelector((state) => state.superAdmin);
  const [filters, setFilters] = useState({ page: 1, limit: 10 });

  useEffect(() => {
    dispatch(getLoginLogs(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    if (isError && message) toast.error(message);
    return () => dispatch(reset());
  }, [isError, message]);

  const handlePageChange = (page) => setFilters((prev) => ({ ...prev, page }));
  const handleRowsPerPageChange = (limit) => setFilters((prev) => ({ ...prev, limit, page: 1 }));

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>Login Logs</Typography>
        <Typography variant="body2" color="text.secondary">Monitor all administrator login activities</Typography>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="body2" color="text.secondary">Total Login Records: {pagination.total || 0}</Typography>
      </Paper>

      <LoginLogsTable
        data={loginLogs}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        isLoading={isLoading}
        error={isError ? message : null}
      />
    </Box>
  );
};

export default LoginLogsPage;