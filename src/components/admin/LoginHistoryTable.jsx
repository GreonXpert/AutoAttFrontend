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
} from '@mui/material';
import {
  Login as LoginIcon,
  Logout as LogoutIcon,
  Computer as ComputerIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';

const LoginHistoryTable = ({ data = [], isLoading = false, error = null }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (date) => {
    if (!date) return '-';
    try {
      return format(new Date(date), 'MMM dd, yyyy HH:mm:ss');
    } catch (error) {
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
      
      if (hours > 0) {
        return `${hours}h ${mins}m`;
      }
      return `${mins}m`;
    } catch (error) {
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
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No login history available
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
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
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ComputerIcon fontSize="small" />
                  Device/Browser
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((record, index) => (
                <TableRow
                  key={record._id || index}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(record.loginTime)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color={record.logoutTime ? 'text.primary' : 'text.secondary'}>
                      {record.logoutTime ? formatDate(record.logoutTime) : 'Still Active'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {calculateDuration(record.loginTime, record.logoutTime)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={record.ipAddress || 'Unknown'}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" sx={{ display: 'block', maxWidth: 200 }}>
                      {record.userAgent || 'Unknown'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {record.logoutTime ? (
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
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default LoginHistoryTable;