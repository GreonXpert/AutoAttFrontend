import { Box, CircularProgress, Typography, Backdrop } from '@mui/material';

const Loader = ({ 
  fullScreen = false, 
  size = 40, 
  message = 'Loading...', 
  showMessage = true 
}) => {
  if (fullScreen) {
    return (
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'rgba(0, 0, 0, 0.7)',
        }}
        open={true}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress color="inherit" size={size} />
          {showMessage && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </Box>
      </Backdrop>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        py: 4,
      }}
    >
      <CircularProgress size={size} />
      {showMessage && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default Loader;