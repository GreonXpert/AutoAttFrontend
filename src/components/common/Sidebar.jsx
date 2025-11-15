import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Toolbar,
  Collapse,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Login as LoginIcon,
  Edit as EditIcon,
  Notifications as NotificationsIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  ExpandLess,
  ExpandMore,
  Group as GroupIcon,
  Assessment as AssessmentIcon,
  History as HistoryIcon,
  CheckCircle as CheckCircleIcon,
  Fingerprint as FingerprintIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const DRAWER_WIDTH = 260;

const Sidebar = ({ mobileOpen, onMobileClose, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isSuperAdmin } = useAuth();

  const [superAdminOpen, setSuperAdminOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      onMobileClose();
    }
  };

  const handleSuperAdminToggle = () => {
    setSuperAdminOpen(!superAdminOpen);
  };

  const isActive = (path) => location.pathname === path;

  // Admin Menu Items
  const adminMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'My Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'Login History', icon: <LoginIcon />, path: '/login-history' },
    { text: 'Edit History', icon: <EditIcon />, path: '/edit-history' },
    { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
  ];

  // Super Admin Menu Items
  const superAdminMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/super-admin/dashboard' },
    { text: 'Manage Admins', icon: <GroupIcon />, path: '/super-admin/admins' },
    { text: 'Statistics', icon: <AssessmentIcon />, path: '/super-admin/statistics' },
    { text: 'Login Logs', icon: <HistoryIcon />, path: '/super-admin/login-logs' },
  ];

  const drawerContent = (
    <Box>
      <Toolbar />
      <Box sx={{ overflow: 'auto', px: 1 }}>
        <List>
          {adminMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={isActive(item.path)}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 1,
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive(item.path) ? 'white' : 'inherit',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Super Admin Section */}
        {isSuperAdmin() && (
          <>
            <Divider sx={{ my: 2 }} />
            <List>
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={handleSuperAdminToggle}
                  sx={{
                    borderRadius: 1,
                    bgcolor: 'error.light',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'error.main',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                    <AdminPanelSettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Super Admin" />
                  {superAdminOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>

              <Collapse in={superAdminOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {superAdminMenuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                      <ListItemButton
                        selected={isActive(item.path)}
                        onClick={() => handleNavigation(item.path)}
                        sx={{
                          pl: 4,
                          borderRadius: 1,
                          '&.Mui-selected': {
                            bgcolor: 'error.main',
                            color: 'white',
                            '&:hover': {
                              bgcolor: 'error.dark',
                            },
                            '& .MuiListItemIcon-root': {
                              color: 'white',
                            },
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: isActive(item.path) ? 'white' : 'inherit',
                            minWidth: 36,
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={item.text}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </List>
          </>
        )}

        {/* Additional Features (Placeholder) */}
        <Divider sx={{ my: 2 }} />
        <List>
          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={isActive('/attendance')}
              onClick={() => handleNavigation('/attendance')}
              sx={{
                borderRadius: 1,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive('/attendance') ? 'white' : 'inherit',
                  minWidth: 40,
                }}
              >
                <CheckCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Attendance" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={isActive('/fingerprint')}
              onClick={() => handleNavigation('/fingerprint')}
              sx={{
                borderRadius: 1,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive('/fingerprint') ? 'white' : 'inherit',
                  minWidth: 40,
                }}
              >
                <FingerprintIcon />
              </ListItemIcon>
              <ListItemText primary="Fingerprint" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
    >
      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onMobileClose}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
export { DRAWER_WIDTH };