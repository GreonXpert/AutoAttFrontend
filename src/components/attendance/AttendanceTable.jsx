import { useState } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, IconButton, Chip, Box, Typography, Avatar, Tooltip,
  TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel,
} from '@mui/material';
import {
  Visibility, Edit, Delete, Search, CheckCircle, Cancel, Schedule,
  Login, Logout,
} from '@mui/icons-material';
import { format } from 'date-fns';

const AttendanceTable = ({
  data = [],
  pagination = {},
  onPageChange,
  onRowsPerPageChange,
  onView,
  onEdit,
  onDelete,
  onSearch,
  onFilterStatus,
  onFilterDepartment,
  isLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('');
  const [department, setDepartment] = useState('');

  const formatTime = (date) => {
    if (!date) return '-';
    try {
      return format(new Date(date), 'hh:mm a');
    } catch {
      return '-';
    }
  };

  const formatDate = (date) => {
    if (!date) return '-';
    try {
      return format(new Date(date), 'MMM dd, yyyy');
    } catch {
      return '-';
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      present: 'success',
      absent: 'error',
      late: 'warning',
      'half-day': 'info',
      leave: 'default',
    };
    return colors[status] || 'default';
  };

  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography>No attendance records found</Typography>
      </Paper>
    );
  }

  return (
    <Paper>
      <Box sx={{ p: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          size="small"
          placeholder="Search employee..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); onSearch && onSearch(e.target.value); }}
          sx={{ minWidth: 250 }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
          }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={(e) => { setStatus(e.target.value); onFilterStatus && onFilterStatus(e.target.value); }} label="Status">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="present">Present</MenuItem>
            <MenuItem value="absent">Absent</MenuItem>
            <MenuItem value="late">Late</MenuItem>
            <MenuItem value="half-day">Half Day</MenuItem>
            <MenuItem value="leave">Leave</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Employee</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Check-In</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Check-Out</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Working Hours</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50', textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((record) => (
              <TableRow key={record._id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32 }}>{record.employee?.name?.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{record.employee?.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{record.employee?.employeeId}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{formatDate(record.date)}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Login fontSize="small" color="success" />
                    {formatTime(record.checkInTime)}
                  </Box>
                </TableCell>
                <TableCell>
                  {record.checkOutTime ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Logout fontSize="small" color="error" />
                      {formatTime(record.checkOutTime)}
                    </Box>
                  ) : (
                    <Chip label="Active" size="small" color="primary" />
                  )}
                </TableCell>
                <TableCell>{record.workingHours || '-'}</TableCell>
                <TableCell>
                  <Chip label={record.status} size="small" color={getStatusColor(record.status)} />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                    <Tooltip title="View"><IconButton size="small" onClick={() => onView && onView(record)}><Visibility fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Edit"><IconButton size="small" onClick={() => onEdit && onEdit(record)}><Edit fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Delete"><IconButton size="small" color="error" onClick={() => onDelete && onDelete(record)}><Delete fontSize="small" /></IconButton></Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={pagination.total || 0}
        rowsPerPage={pagination.limit || 10}
        page={(pagination.page || 1) - 1}
        onPageChange={(e, newPage) => onPageChange && onPageChange(newPage + 1)}
        onRowsPerPageChange={(e) => onRowsPerPageChange && onRowsPerPageChange(parseInt(e.target.value, 10))}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Paper>
  );
};

export default AttendanceTable;
