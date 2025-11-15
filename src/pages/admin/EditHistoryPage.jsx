import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { toast } from 'react-toastify';
import { getEditHistory, reset } from '../../features/admin/adminSlice';
import EditHistoryTable from '../../components/admin/EditHistoryTable';

const EditHistoryPage = () => {
  const dispatch = useDispatch();
  const { editHistory, isLoading, isError, message } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(getEditHistory());

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
          Edit History
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View all changes made to your profile
        </Typography>
      </Box>

      {/* Stats */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Total Edit Records: {editHistory?.length || 0}
        </Typography>
      </Paper>

      {/* Edit History Table */}
      <EditHistoryTable
        data={editHistory}
        isLoading={isLoading}
        error={isError ? message : null}
      />
    </Box>
  );
};

export default EditHistoryPage;