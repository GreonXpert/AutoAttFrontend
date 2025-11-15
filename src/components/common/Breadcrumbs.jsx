import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { NavigateNext as NavigateNextIcon, Home as HomeIcon } from '@mui/icons-material';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Map route segments to readable names
  const routeNameMap = {
    dashboard: 'Dashboard',
    profile: 'Profile',
    'login-history': 'Login History',
    'edit-history': 'Edit History',
    'super-admin': 'Super Admin',
    admins: 'Manage Admins',
    'create-admin': 'Create Admin',
    statistics: 'Statistics',
    'login-logs': 'Login Logs',
    notifications: 'Notifications',
    attendance: 'Attendance',
    reports: 'Reports',
    settings: 'Settings',
  };

  const getRouteName = (segment) => {
    return routeNameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  // Don't show breadcrumbs on login or root
  if (pathnames.length === 0 || location.pathname === '/login') {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link
          component={RouterLink}
          to="/dashboard"
          underline="hover"
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
            '&:hover': { color: 'primary.main' },
          }}
        >
          <HomeIcon sx={{ mr: 0.5, fontSize: 20 }} />
          Home
        </Link>

        {pathnames.map((segment, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <Typography key={routeTo} color="text.primary" sx={{ fontWeight: 500 }}>
              {getRouteName(segment)}
            </Typography>
          ) : (
            <Link
              key={routeTo}
              component={RouterLink}
              to={routeTo}
              underline="hover"
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {getRouteName(segment)}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
};

export default Breadcrumbs;