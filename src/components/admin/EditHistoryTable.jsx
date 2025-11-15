import { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Chip,
  Box,
  CircularProgress,
  Alert,
  Collapse,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';

const EditHistoryRow = ({ record }) => {
  const [open, setOpen] = useState(false);

  const formatDate = (date) => {
    if (!date) return '-';
    try {
      return format(new Date(date), 'MMM dd, yyyy HH:mm:ss');
    } catch (error) {
      return '-';
    }
  };

  const getEditedFields = () => {
    if (!record.editedFields || typeof record.editedFields !== 'object') {
      return [];
    }

    // Convert Map-like structure to array
    const fields = [];
    for (const [key, value] of Object.entries(record.editedFields)) {
      fields.push({
        field: key,
        oldValue: value.old || '-',
        newValue: value.new || '-',
      });
    }
    return fields;
  };

  const editedFields = getEditedFields();

  return (
    <>
      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{formatDate(record.editedAt)}</Typography>
        </TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon fontSize="small" color="action" />
            <Box>
              <Typography variant="body2">
                {record.editedBy?.name || 'Unknown'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                @{record.editedBy?.username || 'unknown'}
              </Typography>
            </Box>
          </Box>
        </TableCell>
        <TableCell>
          <Chip
            label={`${editedFields.length} field${editedFields.length !== 1 ? 's' : ''}`}
            size="small"
            color="primary"
            variant="outlined"
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                Changes Made
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Field</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Old Value</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>New Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {editedFields.map((field, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <Chip label={field.field} size="small" />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {field.oldValue}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="primary.main" sx={{ fontWeight: 500 }}>
                          {field.newValue}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const EditHistoryTable = ({ data = [], isLoading = false, error = null }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No edit history available
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50', width: 50 }} />
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EditIcon fontSize="small" />
                  Edit Time
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Edited By</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Fields Changed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((record, index) => (
                <EditHistoryRow key={record._id || index} record={record} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default EditHistoryTable;