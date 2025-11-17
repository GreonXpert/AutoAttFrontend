import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Fab, Tooltip } from '@mui/material';
import { Add as AddIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  resetPassword,
  reset,
  clearSelectedAdmin,
} from '../../features/superAdmin/superAdminSlice';
import AdminTable from '../../components/superAdmin/AdminTable';
import CreateAdminForm from '../../components/superAdmin/CreateAdminForm';
import EditAdminForm from '../../components/superAdmin/EditAdminForm';
import AdminDetailsModal from '../../components/superAdmin/AdminDetailsModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';

const ManageAdminsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admins, pagination, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.superAdmin
  );

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [resetPwdOpen, setResetPwdOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    department: '',
    isActive: '',
  });

  useEffect(() => {
    dispatch(getAllAdmins(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    if (isSuccess && message) {
      toast.success(message);
      if (createOpen || editOpen || deleteOpen || resetPwdOpen) {
        setCreateOpen(false);
        setEditOpen(false);
        setDeleteOpen(false);
        setResetPwdOpen(false);
        setSelectedAdmin(null);
        setNewPassword('');
        dispatch(getAllAdmins(filters));
      }
    }
    if (isError && message) toast.error(message);
    return () => dispatch(reset());
  }, [isSuccess, isError, message]);

  const handleCreate = async (formData) => {
    try {
      await dispatch(createAdmin(formData)).unwrap();
    } catch (error) {
      // Error handled by useEffect
    }
  };

  const handleEdit = async (formData) => {
    try {
      await dispatch(updateAdmin({ id: selectedAdmin._id, adminData: formData })).unwrap();
    } catch (error) {
      // Error handled by useEffect
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteAdmin(selectedAdmin._id)).unwrap();
    } catch (error) {
      // Error handled by useEffect
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    try {
      await dispatch(resetPassword({ id: selectedAdmin._id, newPassword })).unwrap();
    } catch (error) {
      // Error handled by useEffect
    }
  };

  const handleViewDetails = (admin) => {
    // Navigate to dedicated details page
    navigate(`/super-admin/admins/${admin._id}`);
  };

  const handlePageChange = (page) => setFilters((prev) => ({ ...prev, page }));
  const handleRowsPerPageChange = (limit) => setFilters((prev) => ({ ...prev, limit, page: 1 }));
  const handleSearch = (search) => setFilters((prev) => ({ ...prev, search, page: 1 }));
  const handleFilterDepartment = (department) =>
    setFilters((prev) => ({ ...prev, department, page: 1 }));
  const handleFilterStatus = (isActive) => setFilters((prev) => ({ ...prev, isActive, page: 1 }));

  const handleRefresh = () => {
    dispatch(getAllAdmins(filters));
    toast.success('Admin list refreshed');
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
            Manage Admins
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create, edit, and manage administrator accounts ({pagination.total || 0} total)
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<RefreshIcon />} onClick={handleRefresh}>
            Refresh
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
            Create Admin
          </Button>
        </Box>
      </Box>

      {/* Admin Table */}
      <AdminTable
        data={admins}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onEdit={(admin) => {
          setSelectedAdmin(admin);
          setEditOpen(true);
        }}
        onDelete={(admin) => {
          setSelectedAdmin(admin);
          setDeleteOpen(true);
        }}
        onView={handleViewDetails}
        onResetPassword={(admin) => {
          setSelectedAdmin(admin);
          setResetPwdOpen(true);
        }}
        onSearch={handleSearch}
        onFilterDepartment={handleFilterDepartment}
        onFilterStatus={handleFilterStatus}
        isLoading={isLoading}
      />

      {/* Create Admin Form */}
      <CreateAdminForm
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSave={handleCreate}
        isLoading={isLoading}
        error={isError ? message : null}
      />

      {/* Edit Admin Form */}
      <EditAdminForm
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelectedAdmin(null);
        }}
        admin={selectedAdmin}
        onSave={handleEdit}
        isLoading={isLoading}
        error={isError ? message : null}
      />

      {/* Admin Details Modal */}
      <AdminDetailsModal
        open={detailsOpen}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedAdmin(null);
        }}
        admin={selectedAdmin}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Admin?"
        message={`Are you sure you want to delete ${selectedAdmin?.name}? This action cannot be undone.`}
        confirmText="Delete"
        confirmColor="error"
        isLoading={isLoading}
        showWarningIcon
      />

      {/* Reset Password Dialog */}
      <ConfirmDialog
        open={resetPwdOpen}
        onClose={() => {
          setResetPwdOpen(false);
          setNewPassword('');
        }}
        onConfirm={handleResetPassword}
        title="Reset Password?"
        message={`Reset password for ${selectedAdmin?.name}? A new password will be sent to their email.`}
        confirmText="Reset Password"
        confirmColor="warning"
        isLoading={isLoading}
        textField={{
          label: 'New Password',
          type: 'password',
          value: newPassword,
          onChange: (e) => setNewPassword(e.target.value),
          helperText: 'Minimum 8 characters',
        }}
      />
    </Box>
  );
};

export default ManageAdminsPage;
