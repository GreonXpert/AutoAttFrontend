import { Card, CardContent, Typography, Box, Avatar, LinearProgress } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

const StatisticsCard = ({
  title,
  value,
  icon: Icon,
  color = 'primary',
  subtitle,
  trend,
  trendValue,
  progress,
}) => {
  const getTrendIcon = () => {
    if (!trend) return null;
    return trend === 'up' ? (
      <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
    ) : (
      <TrendingDown sx={{ fontSize: 16, color: 'error.main' }} />
    );
  };

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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 500, mb: 0.5 }}
            >
              {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: 700, color: `${color}.main` }}
              >
                {value !== null && value !== undefined ? value : '-'}
              </Typography>
              {trendValue && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {getTrendIcon()}
                  <Typography
                    variant="caption"
                    sx={{
                      color: trend === 'up' ? 'success.main' : 'error.main',
                      fontWeight: 600,
                    }}
                  >
                    {trendValue}
                  </Typography>
                </Box>
              )}
            </Box>
            {subtitle && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
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

        {progress !== undefined && (
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  bgcolor: `${color}.main`,
                },
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
