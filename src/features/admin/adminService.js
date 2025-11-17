import { apiService } from '../../services/api';

// Attendance API endpoints
const ATTENDANCE_ENDPOINTS = {
  MARK_ATTENDANCE: '/admin/attendance/mark',
  MARK_CHECKOUT: '/admin/attendance/checkout',
  GET_ALL_ATTENDANCE: '/admin/attendance',
  GET_ATTENDANCE_BY_ID: '/admin/attendance',
  UPDATE_ATTENDANCE: '/admin/attendance',
  DELETE_ATTENDANCE: '/admin/attendance',
  GET_EMPLOYEE_ATTENDANCE: '/admin/attendance/employee',
  GET_ATTENDANCE_REPORT: '/admin/attendance/report',
  GET_ATTENDANCE_SUMMARY: '/admin/attendance/summary',
  GET_ATTENDANCE_STATS: '/admin/attendance/stats',
  EXPORT_ATTENDANCE: '/admin/attendance/export',
};

// Mark attendance (Check-in)
const markAttendance = async (attendanceData) => {
  try {
    const response = await apiService.post(
      ATTENDANCE_ENDPOINTS.MARK_ATTENDANCE,
      attendanceData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Mark checkout
const markCheckout = async (attendanceId, checkoutData) => {
  try {
    const response = await apiService.put(
      `${ATTENDANCE_ENDPOINTS.MARK_CHECKOUT}/${attendanceId}`,
      checkoutData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Get all attendance records with filters
const getAllAttendance = async (params = {}) => {
  try {
    const {
      page = 1,
      limit = 10,
      employeeId = '',
      department = '',
      status = '',
      startDate = '',
      endDate = '',
      search = '',
    } = params;

    const queryParams = new URLSearchParams({
      page,
      limit,
      ...(employeeId && { employeeId }),
      ...(department && { department }),
      ...(status && { status }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(search && { search }),
    });

    const response = await apiService.get(
      `${ATTENDANCE_ENDPOINTS.GET_ALL_ATTENDANCE}?${queryParams}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Get attendance by ID
const getAttendanceById = async (id) => {
  try {
    const response = await apiService.get(
      `${ATTENDANCE_ENDPOINTS.GET_ATTENDANCE_BY_ID}/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get employee attendance history
const getEmployeeAttendance = async (employeeId, params = {}) => {
  try {
    const { startDate = '', endDate = '', page = 1, limit = 10 } = params;

    const queryParams = new URLSearchParams({
      page,
      limit,
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    });

    const response = await apiService.get(
      `${ATTENDANCE_ENDPOINTS.GET_EMPLOYEE_ATTENDANCE}/${employeeId}?${queryParams}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Get attendance report
const getAttendanceReport = async (params = {}) => {
  try {
    const {
      startDate,
      endDate,
      department = '',
      employeeId = '',
      status = '',
    } = params;

    const queryParams = new URLSearchParams({
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(department && { department }),
      ...(employeeId && { employeeId }),
      ...(status && { status }),
    });

    const response = await apiService.get(
      `${ATTENDANCE_ENDPOINTS.GET_ATTENDANCE_REPORT}?${queryParams}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get attendance summary
const getAttendanceSummary = async (params = {}) => {
  try {
    const { startDate, endDate, department = '' } = params;

    const queryParams = new URLSearchParams({
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(department && { department }),
    });

    const response = await apiService.get(
      `${ATTENDANCE_ENDPOINTS.GET_ATTENDANCE_SUMMARY}?${queryParams}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get attendance statistics
const getAttendanceStats = async (params = {}) => {
  try {
    const { startDate, endDate, department = '' } = params;

    const queryParams = new URLSearchParams({
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(department && { department }),
    });

    const response = await apiService.get(
      `${ATTENDANCE_ENDPOINTS.GET_ATTENDANCE_STATS}?${queryParams}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update attendance record
const updateAttendance = async (id, attendanceData) => {
  try {
    const response = await apiService.put(
      `${ATTENDANCE_ENDPOINTS.UPDATE_ATTENDANCE}/${id}`,
      attendanceData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete attendance record
const deleteAttendance = async (id) => {
  try {
    const response = await apiService.delete(
      `${ATTENDANCE_ENDPOINTS.DELETE_ATTENDANCE}/${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Export attendance data
const exportAttendance = async (params = {}) => {
  try {
    const {
      startDate,
      endDate,
      department = '',
      format = 'csv',
    } = params;

    const queryParams = new URLSearchParams({
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(department && { department }),
      format,
    });

    const response = await apiService.get(
      `${ATTENDANCE_ENDPOINTS.EXPORT_ATTENDANCE}?${queryParams}`,
      { responseType: 'blob' }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const attendanceService = {
  markAttendance,
  markCheckout,
  getAllAttendance,
  getAttendanceById,
  getEmployeeAttendance,
  getAttendanceReport,
  getAttendanceSummary,
  getAttendanceStats,
  updateAttendance,
  deleteAttendance,
  exportAttendance,
};

export default attendanceService;
