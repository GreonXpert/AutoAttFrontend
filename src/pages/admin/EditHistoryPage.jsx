import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { getEditHistory, reset } from '../../features/admin/adminSlice';
import EditHistoryTable from '../../components/admin/EditHistoryTable';

const EditHistoryPage = () => {
  const navigate = useNavigate();
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
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/dashboard')}
            sx={{ mb: 2 }}
          >
            Back to Dashboard
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <EditIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                Edit History
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View all changes made to your profile
              </Typography>
            </Box>
          </Box>
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
      </Container>
    </Box>
  );
};

export default EditHistoryPage;