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
  IconButton,
  Avatar,
  Chip,
  Box,
  Typography,
  Tooltip,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  LockReset as LockResetIcon,
} from '@mui/icons-material';

const AdminTable = ({
  data = [],
  pagination = {},
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
  onView,
  onResetPassword,
  onSearch,
  onFilterDepartment,
  onFilterStatus,
  isLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleDepartmentChange = (event) => {
    const value = event.target.value;
    setDepartment(value);
    if (onFilterDepartment) {
      onFilterDepartment(value);
    }
  };

  const handleStatusChange = (event) => {
    const value = event.target.value;
    setStatus(value);
    if (onFilterStatus) {
      onFilterStatus(value);
    }
  };

  const getAvatarUrl = (profileImage) => {
    if (!profileImage) return null;
    if (profileImage.startsWith('http')) return profileImage;
    return `${process.env.REACT_APP_API_BASE_URL}${profileImage}`;
  };

  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No admins found
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Filters */}
      <Box sx={{ p: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          size="small"
          placeholder="Search by name or username..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ minWidth: 250 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Department</InputLabel>
          <Select value={department} onChange={handleDepartmentChange} label="Department">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Operations">Operations</MenuItem>
            <MenuItem value="Marketing">Marketing</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={handleStatusChange} label="Status">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="true">Active</MenuItem>
            <MenuItem value="false">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Admin</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Username</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Department</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Job Role</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50', textAlign: 'center' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((admin) => (
              <TableRow key={admin._id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                      src={getAvatarUrl(admin.profileImage)}
                      alt={admin.name}
                      sx={{ width: 40, height: 40 }}
                    >
                      {admin.name?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {admin.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">@{admin.username}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{admin.email}</Typography>
                </TableCell>
                <TableCell>
                  <Chip label={admin.department || 'N/A'} size="small" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{admin.jobRole || 'N/A'}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={admin.isActive ? 'Active' : 'Inactive'}
                    size="small"
                    color={admin.isActive ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                    <Tooltip title="View Details">
                      <IconButton size="small" onClick={() => onView && onView(admin)}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => onEdit && onEdit(admin)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Reset Password">
                      <IconButton
                        size="small"
                        color="warning"
                        onClick={() => onResetPassword && onResetPassword(admin)}
                      >
                        <LockResetIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDelete && onDelete(admin)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={pagination.total || 0}
        rowsPerPage={pagination.limit || 10}
        page={(pagination.page || 1) - 1}
        onPageChange={(e, newPage) => onPageChange && onPageChange(newPage + 1)}
        onRowsPerPageChange={(e) =>
          onRowsPerPageChange && onRowsPerPageChange(parseInt(e.target.value, 10))
        }
      />
    </Paper>
  );
};

export default AdminTable;
