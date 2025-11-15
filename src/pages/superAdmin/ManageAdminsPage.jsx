import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { getAllAdmins, createAdmin, updateAdmin, deleteAdmin, reset, clearSelectedAdmin } from '../../features/superAdmin/superAdminSlice';
import AdminTable from '../../components/superAdmin/AdminTable';
import CreateAdminForm from '../../components/superAdmin/CreateAdminForm';
import EditAdminForm from '../../components/superAdmin/EditAdminForm';
import AdminDetailsModal from '../../components/superAdmin/AdminDetailsModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';

const ManageAdminsPage = () => {
  const dispatch = useDispatch();
  const { admins, pagination, isLoading, isError, isSuccess, message } = useSelector((state) => state.superAdmin);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [resetPwdOpen, setResetPwdOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [filters, setFilters] = useState({ page: 1, limit: 10, search: '', department: '', isActive: '' });

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
        dispatch(getAllAdmins(filters));
      }
    }
    if (isError && message) toast.error(message);
    return () => dispatch(reset());
  }, [isSuccess, isError, message]);

  const handleCreate = async (formData) => {
    try {
      await dispatch(createAdmin(formData)).unwrap();
    } catch (error) {}
  };

  const handleEdit = async (formData) => {
    try {
      await dispatch(updateAdmin({ id: selectedAdmin._id, adminData: formData })).unwrap();
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteAdmin(selectedAdmin._id)).unwrap();
    } catch (error) {}
  };

  const handlePageChange = (page) => setFilters((prev) => ({ ...prev, page }));
  const handleRowsPerPageChange = (limit) => setFilters((prev) => ({ ...prev, limit, page: 1 }));
  const handleSearch = (search) => setFilters((prev) => ({ ...prev, search, page: 1 }));
  const handleFilterDepartment = (department) => setFilters((prev) => ({ ...prev, department, page: 1 }));
  const handleFilterStatus = (isActive) => setFilters((prev) => ({ ...prev, isActive, page: 1 }));

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>Manage Admins</Typography>
          <Typography variant="body2" color="text.secondary">Create, edit, and manage administrator accounts</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>Create Admin</Button>
      </Box>

      <AdminTable
        data={admins}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onEdit={(admin) => { setSelectedAdmin(admin); setEditOpen(true); }}
        onDelete={(admin) => { setSelectedAdmin(admin); setDeleteOpen(true); }}
        onView={(admin) => { setSelectedAdmin(admin); setDetailsOpen(true); }}
        onResetPassword={(admin) => { setSelectedAdmin(admin); setResetPwdOpen(true); }}
        onSearch={handleSearch}
        onFilterDepartment={handleFilterDepartment}
        onFilterStatus={handleFilterStatus}
        isLoading={isLoading}
      />

      <CreateAdminForm open={createOpen} onClose={() => setCreateOpen(false)} onSave={handleCreate} isLoading={isLoading} error={isError ? message : null} />
      <EditAdminForm open={editOpen} onClose={() => { setEditOpen(false); setSelectedAdmin(null); }} admin={selectedAdmin} onSave={handleEdit} isLoading={isLoading} error={isError ? message : null} />
      <AdminDetailsModal open={detailsOpen} onClose={() => { setDetailsOpen(false); setSelectedAdmin(null); }} admin={selectedAdmin} />
      
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

      <ConfirmDialog
        open={resetPwdOpen}
        onClose={() => setResetPwdOpen(false)}
        onConfirm={() => toast.info('Password reset feature coming soon')}
        title="Reset Password?"
        message={`Reset password for ${selectedAdmin?.name}? A new password will be sent to their email.`}
        confirmText="Reset"
        confirmColor="warning"
      />
    </Box>
  );
};

export default ManageAdminsPage;