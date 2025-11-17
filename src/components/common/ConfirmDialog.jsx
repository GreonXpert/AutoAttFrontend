import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Box,
  CircularProgress,
  TextField,
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColor = 'primary',
  isLoading = false,
  showWarningIcon = false,
  textField = null, // { label, value, onChange, type, helperText }
}) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog
      open={open}
      onClose={isLoading ? undefined : onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {showWarningIcon && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarningIcon color="warning" />
            {title}
          </Box>
        )}
        {!showWarningIcon && title}
      </DialogTitle>
      
      <DialogContent>
        <DialogContentText sx={{ mb: textField ? 2 : 0 }}>
          {message}
        </DialogContentText>
        
        {textField && (
          <TextField
            fullWidth
            label={textField.label}
            type={textField.type || 'text'}
            value={textField.value}
            onChange={textField.onChange}
            helperText={textField.helperText}
            disabled={isLoading}
            autoFocus
          />
        )}
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={isLoading}>
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color={confirmColor}
          disabled={isLoading}
          startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
        >
          {isLoading ? 'Processing...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
