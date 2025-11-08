// Mock leave request data
const leaveRequests = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'John Doe',
    leaveType: 'Vacation',
    startDate: '2024-12-20',
    endDate: '2024-12-27',
    days: 7,
    reason: 'Family vacation',
    status: 'pending',
    appliedDate: '2024-11-01'
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'Jane Smith',
    leaveType: 'Sick Leave',
    startDate: '2024-11-10',
    endDate: '2024-11-12',
    days: 3,
    reason: 'Medical appointment',
    status: 'approved',
    appliedDate: '2024-11-05'
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: 'Mike Johnson',
    leaveType: 'Personal',
    startDate: '2024-11-25',
    endDate: '2024-11-25',
    days: 1,
    reason: 'Personal work',
    status: 'rejected',
    appliedDate: '2024-11-10'
  }
];

export default leaveRequests;
