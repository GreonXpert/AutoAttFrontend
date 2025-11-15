import { Box, Typography, Paper, Chip } from '@mui/material';
import {
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';

const SuperAdminDashboardPage = () => {
  const { user } = useAuth();

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <AdminIcon sx={{ fontSize: 40, mr: 2, color: 'error.main' }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 0.5 }}>
            Super Admin Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your system and all administrators
          </Typography>
        </Box>
        <Chip
          label="SUPER ADMIN"
          color="error"
          size="small"
        />
      </Box>

      {/* Welcome Card */}
      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Welcome, {user?.name || 'Super Admin'}!
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Username
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            @{user?.username}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Email
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {user?.email}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Role
          </Typography>
          <Typography variant="body1" sx={{ color: 'error.main', fontWeight: 500 }}>
            Super Administrator
          </Typography>
        </Box>
      </Paper>

      {/* Coming Soon Note */}
      <Paper sx={{ p: 3, mt: 3, bgcolor: 'info.lighter', borderLeft: 4, borderColor: 'info.main' }}>
        <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
          📊 Super Admin Features Coming Soon
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Manage all administrators
          • View system statistics
          • Monitor login logs
          • Advanced reporting
        </Typography>
      </Paper>
    </Box>
  );
};

export default SuperAdminDashboardPage;