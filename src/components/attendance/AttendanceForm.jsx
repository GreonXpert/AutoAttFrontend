import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Paper,
} from '@mui/material';
import {
  Close as CloseIcon,
  Fingerprint as FingerprintIcon,
  LocationOn as LocationIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

const AttendanceForm = ({
  open,
  onClose,
  onSubmit,
  employee = null,
  type = 'checkin', // 'checkin' or 'checkout'
  isLoading = false,
  error = null,
}) => {
  const [location, setLocation] = useState({ latitude: null, longitude: null, address: '' });
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [fingerprintVerified, setFingerprintVerified] = useState(false);
  const [fingerprintData, setFingerprintData] = useState({ deviceId: '', matchScore: 0 });
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    if (open) {
      // Simulate getting device location
      getCurrentLocation();
    }
  }, [open]);

  const getCurrentLocation = () => {
    setLocationLoading(true);
    setLocationError('');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude,
            longitude,
            address: 'Office Location', // In production, use reverse geocoding
            accuracy: position.coords.accuracy,
          });
          setLocationLoading(false);
        },
        (error) => {
          setLocationError('Unable to get location. Please enable location services.');
          setLocationLoading(false);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser');
      setLocationLoading(false);
    }
  };

  const handleFingerprintVerification = () => {
    // Simulate fingerprint verification
    setFingerprintVerified(true);
    setFingerprintData({
      deviceId: 'DEVICE_' + Math.random().toString(36).substr(2, 9),
      template: 'FINGERPRINT_TEMPLATE_DATA',
      matchScore: Math.floor(Math.random() * 20) + 80, // 80-100
    });
  };

  const handleSubmit = () => {
    if (!location.latitude || !location.longitude) {
      setLocationError('Location is required');
      return;
    }

    if (!fingerprintVerified) {
      alert('Please verify fingerprint first');
      return;
    }

    const attendanceData = {
      employeeId: employee?._id || employee?.employeeId,
      ...(type === 'checkin'
        ? {
            checkInLocation: {
              latitude: location.latitude,
              longitude: location.longitude,
              address: location.address,
              accuracy: location.accuracy,
            },
            fingerprintData,
          }
        : {
            checkOutLocation: {
              latitude: location.latitude,
              longitude: location.longitude,
              address: location.address,
              accuracy: location.accuracy,
            },
            fingerprintData,
          }),
      remarks,
    };

    onSubmit(attendanceData);
  };

  const handleClose = () => {
    setLocation({ latitude: null, longitude: null, address: '' });
    setFingerprintVerified(false);
    setFingerprintData({ deviceId: '', matchScore: 0 });
    setRemarks('');
    setLocationError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={isLoading ? undefined : handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Mark {type === 'checkin' ? 'Check-In' : 'Check-Out'}
          </Typography>
          <IconButton onClick={handleClose} disabled={isLoading}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Employee Info */}
        {employee && (
          <Paper sx={{ p: 2, mb: 3, bgcolor: 'primary.50' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Employee
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {employee.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {employee.employeeId || employee._id}
            </Typography>
            {employee.department && (
              <Chip label={employee.department} size="small" sx={{ mt: 1 }} />
            )}
          </Paper>
        )}

        <Grid container spacing={3}>
          {/* Location Section */}
          <Grid item xs={12}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <LocationIcon color="primary" />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Location Verification
                </Typography>
              </Box>

              {locationLoading ? (
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <CircularProgress size={30} />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Getting location...
                  </Typography>
                </Box>
              ) : locationError ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {locationError}
                  <Button size="small" onClick={getCurrentLocation} sx={{ mt: 1 }}>
                    Retry
                  </Button>
                </Alert>
              ) : location.latitude ? (
                <Paper variant="outlined" sx={{ p: 2, bgcolor: 'success.50' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon color="success" />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Location Verified
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Lat: {location.latitude?.toFixed(6)}, Lon: {location.longitude?.toFixed(6)}
                      </Typography>
                      {location.address && (
                        <Typography variant="caption" display="block">
                          {location.address}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Paper>
              ) : null}
            </Box>
          </Grid>

          {/* Fingerprint Section */}
          <Grid item xs={12}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <FingerprintIcon color="primary" />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Fingerprint Verification
                </Typography>
              </Box>

              {fingerprintVerified ? (
                <Paper variant="outlined" sx={{ p: 2, bgcolor: 'success.50' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon color="success" />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Fingerprint Verified
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Match Score: {fingerprintData.matchScore}%
                      </Typography>
                      <Typography variant="caption" display="block">
                        Device: {fingerprintData.deviceId}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ) : (
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<FingerprintIcon />}
                  onClick={handleFingerprintVerification}
                  size="large"
                  sx={{ py: 2 }}
                >
                  Verify Fingerprint
                </Button>
              )}
            </Box>
          </Grid>

          {/* Remarks */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Remarks (Optional)"
              multiline
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              disabled={isLoading}
              placeholder="Add any additional notes..."
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isLoading || !location.latitude || !fingerprintVerified}
          startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
        >
          {isLoading
            ? 'Marking...'
            : type === 'checkin'
            ? 'Mark Check-In'
            : 'Mark Check-Out'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttendanceForm;
