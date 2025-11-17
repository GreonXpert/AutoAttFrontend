import { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Chip,
  Box,
  CircularProgress,
  Alert,
  Avatar,
} from '@mui/material';
import { Login as LoginIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { format } from 'date-fns';

const LoginLogsTable = ({ data = [], pagination = {}, onPageChange, onRowsPerPageChange, isLoading = false, error = null }) => {
  const formatDate = (date) => {
    if (!date) return '-';
    try {
      return format(new Date(date), 'MMM dd, yyyy HH:mm:ss');
    } catch {
      return '-';
    }
  };

  const calculateDuration = (loginTime, logoutTime) => {
    if (!loginTime || !logoutTime) return '-';
    try {
      const login = new Date(loginTime);
      const logout = new Date(logoutTime);
      const diffMs = logout - login;
      const diffMins = Math.floor(diffMs / 60000);
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      if (hours > 0) return `${hours}h ${mins}m`;
      return `${mins}m`;
    } catch {
      return '-';
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>;
  }

  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">No login logs available</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Admin</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LoginIcon fontSize="small" />
                  Login Time
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LogoutIcon fontSize="small" />
                  Logout Time
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Duration</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>IP Address</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Device/Browser</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((log, index) => (
              <TableRow key={log._id || index} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>
                      {log.adminName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{log.adminName}</Typography>
                      <Typography variant="caption" color="text.secondary">@{log.adminUsername}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{formatDate(log.loginTime)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color={log.logoutTime ? 'text.primary' : 'text.secondary'}>
                    {log.logoutTime ? formatDate(log.logoutTime) : 'Still Active'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{calculateDuration(log.loginTime, log.logoutTime)}</Typography>
                </TableCell>
                <TableCell>
                  <Chip label={log.ipAddress || 'Unknown'} size="small" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Typography variant="caption" sx={{ display: 'block', maxWidth: 200 }}>{log.userAgent || 'Unknown'}</Typography>
                </TableCell>
                <TableCell>
                  {log.logoutTime ? (
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={pagination.total || 0}
        rowsPerPage={pagination.limit || 10}
        page={(pagination.page || 1) - 1}
        onPageChange={(e, newPage) => onPageChange && onPageChange(newPage + 1)}
        onRowsPerPageChange={(e) => onRowsPerPageChange && onRowsPerPageChange(parseInt(e.target.value, 10))}
      />
    </Paper>
  );
};

export default LoginLogsTable;
