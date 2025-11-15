import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Dashboard as DashboardIcon, Logout as LogoutIcon } from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';

const DashboardPage = () => {
  const { user, handleLogout } = useAuth();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        <Paper sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <DashboardIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
              Admin Dashboard
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Welcome, {user?.name || 'Admin'}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Username: {user?.username}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Email: {user?.email}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Department: {user?.department || 'N/A'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Role: {user?.role}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default DashboardPage;