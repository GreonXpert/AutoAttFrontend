import { useState } from 'react';
import { Paper, Box, Typography, IconButton, Grid, Chip } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';

const AttendanceCalendar = ({ attendanceData = [], onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  const getStatusForDate = (date) => {
    const record = attendanceData.find(r => isSameDay(new Date(r.date), date));
    return record?.status || null;
  };

  const getStatusColor = (status) => {
    const colors = {
      present: '#4caf50',
      absent: '#f44336',
      late: '#ff9800',
      'half-day': '#2196f3',
      leave: '#9e9e9e',
    };
    return colors[status] || '#fff';
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {format(currentDate, 'MMMM yyyy')}
        </Typography>
        <Box>
          <IconButton onClick={previousMonth}><ChevronLeft /></IconButton>
          <IconButton onClick={nextMonth}><ChevronRight /></IconButton>
        </Box>
      </Box>

      <Grid container spacing={1}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Grid item xs={12/7} key={day}>
            <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', textAlign: 'center' }}>
              {day}
            </Typography>
          </Grid>
        ))}

        {Array.from({ length: monthStart.getDay() }).map((_, i) => (
          <Grid item xs={12/7} key={`empty-${i}`}>
            <Box sx={{ height: 60 }} />
          </Grid>
        ))}

        {days.map((day) => {
          const status = getStatusForDate(day);
          const isCurrentDay = isToday(day);

          return (
            <Grid item xs={12/7} key={day.toString()}>
              <Box
                onClick={() => onDateClick && onDateClick(day)}
                sx={{
                  height: 60,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 1,
                  borderColor: isCurrentDay ? 'primary.main' : 'grey.300',
                  borderRadius: 1,
                  cursor: 'pointer',
                  bgcolor: status ? getStatusColor(status) : 'background.paper',
                  color: status ? '#fff' : 'text.primary',
                  '&:hover': { bgcolor: status ? getStatusColor(status) : 'grey.100', opacity: 0.9 },
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: isCurrentDay ? 600 : 400 }}>
                  {format(day, 'd')}
                </Typography>
                {status && (
                  <Typography variant="caption" sx={{ fontSize: 10 }}>
                    {status.charAt(0).toUpperCase()}
                  </Typography>
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Chip label="Present" size="small" sx={{ bgcolor: '#4caf50', color: '#fff' }} />
        <Chip label="Absent" size="small" sx={{ bgcolor: '#f44336', color: '#fff' }} />
        <Chip label="Late" size="small" sx={{ bgcolor: '#ff9800', color: '#fff' }} />
        <Chip label="Half Day" size="small" sx={{ bgcolor: '#2196f3', color: '#fff' }} />
        <Chip label="Leave" size="small" sx={{ bgcolor: '#9e9e9e', color: '#fff' }} />
      </Box>
    </Paper>
  );
};

export default AttendanceCalendar;
