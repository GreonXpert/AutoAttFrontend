//Reports page with filters and export
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Typography, Button, Paper, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Download, Refresh } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { getAttendanceReport, exportAttendance, reset } from '../../features/attendance/attendanceSlice';
import AttendanceTable from '../../components/attendance/AttendanceTable';
import { format } from 'date-fns';

const AttendanceReportPage = () => {
  const dispatch = useDispatch();
  const { attendanceReport, isLoading, isError, message } = useSelector((state) => state.attendance);
  const [filters, setFilters] = useState({
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
    department: '',
    status: '',
  });

  useEffect(() => {
    handleGenerateReport();
  }, []);

  useEffect(() => {
    if (isError && message) toast.error(message);
  }, [isError, message]);

  const handleGenerateReport = async () => {
    try {
      await dispatch(getAttendanceReport(filters)).unwrap();
      toast.success('Report generated successfully');
    } catch (error) {}
  };

  const handleExport = async (format) => {
    try {
      await dispatch(exportAttendance({ ...filters, format })).unwrap();
      toast.success(`Report exported as ${format.toUpperCase()}`);
    } catch (error) {}
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>Attendance Reports</Typography>
          <Typography variant="body2" color="text.secondary">Generate and export attendance reports</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<Download />} onClick={() => handleExport('csv')}>Export CSV</Button>
          <Button variant="outlined" startIcon={<Download />} onClick={() => handleExport('pdf')}>Export PDF</Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Filters</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth size="small" label="Start Date" type="date" value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth size="small" label="End Date" type="date" value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Department</InputLabel>
              <Select value={filters.department} onChange={(e) => setFilters({ ...filters, department: e.target.value })} label="Department">
                <MenuItem value="">All</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} label="Status">
                <MenuItem value="">All</MenuItem>
                <MenuItem value="present">Present</MenuItem>
                <MenuItem value="absent">Absent</MenuItem>
                <MenuItem value="late">Late</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <Button fullWidth variant="contained" startIcon={<Refresh />} onClick={handleGenerateReport} disabled={isLoading}>Generate</Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Report Results</Typography>
        {attendanceReport?.records ? (
          <AttendanceTable data={attendanceReport.records} pagination={{ total: attendanceReport.records.length }} isLoading={isLoading} />
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body2" color="text.secondary">No data available. Please generate a report.</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AttendanceReportPage;
