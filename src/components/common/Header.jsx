import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Header = ({ onMenuClick, isMobile }) => {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const handleLogoutClick = async () => {
    handleMenuClose();
    await handleLogout();
  };

  const getAvatarUrl = () => {
    if (user?.profileImage) {
      if (user.profileImage.startsWith('http')) {
        return user.profileImage;
      }
      return `${process.env.REACT_APP_API_BASE_URL}${user.profileImage}`;
    }
    return null;
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: 1,
      }}
    >
      <Toolbar>
        {/* Menu Icon for Mobile */}
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* App Title */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, fontWeight: 600 }}
        >
          AutoAttendanceTracker
        </Typography>

        {/* Notifications */}
        <IconButton color="inherit" sx={{ mr: 1 }}>
          <Badge badgeContent={0} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* User Menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'right', mr: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {user?.name || 'Admin'}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {user?.role === 'superadmin' ? 'Super Admin' : 'Admin'}
            </Typography>
          </Box>
          <IconButton
            onClick={handleMenuOpen}
            size="small"
            aria-controls="user-menu"
            aria-haspopup="true"
          >
            <Avatar
              src={getAvatarUrl()}
              alt={user?.name}
              sx={{ width: 40, height: 40, border: 2, borderColor: 'white' }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </Avatar>
          </IconButton>
        </Box>

        {/* User Menu Dropdown */}
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: { mt: 1, minWidth: 220 },
          }}
        >
          {/* User Info */}
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {user?.name || 'Admin'}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              {user?.email}
            </Typography>
            <Chip
              label={user?.role === 'superadmin' ? 'Super Admin' : 'Admin'}
              size="small"
              color={user?.role === 'superadmin' ? 'error' : 'primary'}
              sx={{ mt: 1 }}
            />
          </Box>

          <Divider />

          {/* Menu Items */}
          <MenuItem onClick={handleProfileClick}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleLogoutClick}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>
              <Typography color="error">Logout</Typography>
            </ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;