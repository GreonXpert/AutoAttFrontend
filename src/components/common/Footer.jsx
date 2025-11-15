import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} AutoAttendanceTracker. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="#" variant="body2" color="text.secondary" underline="hover">
              Privacy Policy
            </Link>
            <Link href="#" variant="body2" color="text.secondary" underline="hover">
              Terms of Service
            </Link>
            <Link href="#" variant="body2" color="text.secondary" underline="hover">
              Contact Support
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;