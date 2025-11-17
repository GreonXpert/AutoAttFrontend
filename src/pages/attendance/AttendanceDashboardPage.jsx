//  Dashboard with stats, recent records, calendar
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Button, Paper } from '@mui/material';
import { Add, Assessment, Download } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { getAllAttendance, getAttendanceStats, reset } from '../../features/attendance/attendanceSlice';
import AttendanceStats from '../../components/attendance/AttendanceStats';
import AttendanceTable from '../../components/attendance/AttendanceTable';
import AttendanceCalendar from '../../components/attendance/AttendanceCalendar';

const AttendanceDashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { attendanceRecords, attendanceStats, pagination, isLoading, isError, message } = useSelector((state) => state.attendance);
  const [filters, setFilters] = useState({ page: 1, limit: 10 });

  useEffect(() => {
    dispatch(getAllAttendance(filters));
    dispatch(getAttendanceStats({}));
    return () => dispatch(reset());
  }, [dispatch, filters]);

  useEffect(() => {
    if (isError && message) toast.error(message);
  }, [isError, message]);

  const handlePageChange = (page) => setFilters((prev) => ({ ...prev, page }));
  const handleRowsPerPageChange = (limit) => setFilters((prev) => ({ ...prev, limit, page: 1 }));

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>Attendance Dashboard</Typography>
          <Typography variant="body2" color="text.secondary">Track and manage employee attendance</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<Assessment />} onClick={() => navigate('/attendance/reports')}>Reports</Button>
          <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/attendance/mark')}>Mark Attendance</Button>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <AttendanceStats stats={attendanceStats} />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Recent Attendance</Typography>
            <AttendanceTable
              data={attendanceRecords}
              pagination={pagination}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onView={(record) => console.log('View:', record)}
              isLoading={isLoading}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <AttendanceCalendar attendanceData={attendanceRecords} onDateClick={(date) => console.log('Date:', date)} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AttendanceDashboardPage;
