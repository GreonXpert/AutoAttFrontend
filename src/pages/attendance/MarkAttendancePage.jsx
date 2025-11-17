
//Mark attendance page with employee selection
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Typography, Button, Paper, TextField, Avatar, List, ListItem, ListItemAvatar, ListItemText, ListItemButton, Chip } from '@mui/material';
import { ArrowBack, CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { markAttendance, markCheckout, reset } from '../../features/attendance/attendanceSlice';
import AttendanceForm from '../../components/attendance/AttendanceForm';

const MarkAttendancePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.attendance);
  const [employees] = useState([
    { _id: '1', name: 'John Doe', employeeId: 'EMP001', department: 'IT', hasActiveAttendance: false },
    { _id: '2', name: 'Jane Smith', employeeId: 'EMP002', department: 'HR', hasActiveAttendance: true },
    { _id: '3', name: 'Bob Johnson', employeeId: 'EMP003', department: 'Finance', hasActiveAttendance: false },
  ]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [attendanceType, setAttendanceType] = useState('checkin');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isSuccess && message) {
      toast.success(message);
      setFormOpen(false);
      setSelectedEmployee(null);
    }
    if (isError && message) toast.error(message);
  }, [isSuccess, isError, message]);

  const handleMarkAttendance = (employee, type) => {
    setSelectedEmployee(employee);
    setAttendanceType(type);
    setFormOpen(true);
  };

  const handleSubmit = async (attendanceData) => {
    try {
      if (attendanceType === 'checkin') {
        await dispatch(markAttendance(attendanceData)).unwrap();
      } else {
        await dispatch(markCheckout({ attendanceId: selectedEmployee.attendanceId, checkoutData: attendanceData })).unwrap();
      }
    } catch (error) {}
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/attendance')}>Back</Button>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>Mark Attendance</Typography>
          <Typography variant="body2" color="text.secondary">Select an employee to mark attendance</Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Employees</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mb: 2 }}
            />
            <List>
              {filteredEmployees.map((employee) => (
                <ListItem key={employee._id} disablePadding>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar>{employee.name.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={employee.name}
                      secondary={`${employee.employeeId} • ${employee.department}`}
                    />
                    <Box>
                      {employee.hasActiveAttendance ? (
                        <Button size="small" variant="outlined" color="error" onClick={() => handleMarkAttendance(employee, 'checkout')}>Check-Out</Button>
                      ) : (
                        <Button size="small" variant="contained" onClick={() => handleMarkAttendance(employee, 'checkin')}>Check-In</Button>
                      )}
                    </Box>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Today's Summary</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: 'success.50', borderRadius: 1 }}>
                <Typography>Checked In</Typography>
                <Chip label="1" color="success" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: 'error.50', borderRadius: 1 }}>
                <Typography>Checked Out</Typography>
                <Chip label="0" color="error" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: 'info.50', borderRadius: 1 }}>
                <Typography>Total Active</Typography>
                <Chip label="1" color="info" />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <AttendanceForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setSelectedEmployee(null); }}
        onSubmit={handleSubmit}
        employee={selectedEmployee}
        type={attendanceType}
        isLoading={isLoading}
        error={isError ? message : null}
      />
    </Box>
  );
};

export default MarkAttendancePage;
