import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { alpha } from '@mui/material/styles';

const DashboardCard = ({ title, value, icon: Icon, color = 'primary', subtitle }) => {
  return (
    <Card
      sx={{
        height: '100%',
        boxShadow: 2,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 500, mb: 1 }}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: 700, color: `${color}.main`, mb: 0.5 }}
            >
              {value !== null && value !== undefined ? value : '-'}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Avatar
            sx={{
              bgcolor: alpha(
                color === 'primary'
                  ? '#667eea'
                  : color === 'success'
                  ? '#4caf50'
                  : color === 'error'
                  ? '#f44336'
                  : color === 'warning'
                  ? '#ff9800'
                  : '#2196f3',
                0.1
              ),
              width: 56,
              height: 56,
            }}
          >
            <Icon
              sx={{
                fontSize: 28,
                color:
                  color === 'primary'
                    ? '#667eea'
                    : color === 'success'
                    ? '#4caf50'
                    : color === 'error'
                    ? '#f44336'
                    : color === 'warning'
                    ? '#ff9800'
                    : '#2196f3',
              }}
            />
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;