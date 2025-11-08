// Mock attendance records and regularization requests
const attendanceRecords = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'John Doe',
    date: '2024-11-01',
    checkIn: '09:15',
    checkOut: '18:30',
    status: 'present',
    regularizationRequested: false
  },
  {
    id: 2,
    employeeId: 1,
    employeeName: 'John Doe',
    date: '2024-11-02',
    checkIn: '10:30',
    checkOut: '18:00',
    status: 'late',
    regularizationRequested: true,
    regularizationStatus: 'pending',
    regularizationReason: 'Traffic jam on highway'
  },
  {
    id: 3,
    employeeId: 2,
    employeeName: 'Jane Smith',
    date: '2024-11-01',
    checkIn: '09:00',
    checkOut: '18:00',
    status: 'present',
    regularizationRequested: false
  },
  {
    id: 4,
    employeeId: 2,
    employeeName: 'Jane Smith',
    date: '2024-11-02',
    checkIn: null,
    checkOut: null,
    status: 'absent',
    regularizationRequested: true,
    regularizationStatus: 'approved',
    regularizationReason: 'Was working from home, forgot to mark attendance'
  }
];

export default attendanceRecords;
