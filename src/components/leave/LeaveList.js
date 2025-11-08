import { useState, useEffect } from 'react';
import leaveRequests from '../../data/leaveRequests';
import './LeaveList.css';

function LeaveList() {
  const [leaves, setLeaves] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const stored = localStorage.getItem('leaveRequests');
    if (stored) {
      setLeaves(JSON.parse(stored));
    } else {
      setLeaves(leaveRequests);
      localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests));
    }
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updated = leaves.map(leave =>
      leave.id === id ? { ...leave, status: newStatus } : leave
    );
    setLeaves(updated);
    localStorage.setItem('leaveRequests', JSON.stringify(updated));
  };

  const handleFormClose = (newLeave) => {
    if (newLeave) {
      const leaveWithId = {
        ...newLeave,
        id: Math.max(...leaves.map(l => l.id), 0) + 1,
        status: 'pending',
        appliedDate: new Date().toISOString().split('T')[0]
      };
      const updated = [...leaves, leaveWithId];
      setLeaves(updated);
      localStorage.setItem('leaveRequests', JSON.stringify(updated));
    }
    setShowForm(false);
  };

  const filteredLeaves = filter === 'all'
    ? leaves
    : leaves.filter(leave => leave.status === filter);

  if (showForm) {
    return <LeaveForm onClose={handleFormClose} />;
  }

  return (
    <div className="leave-list">
      <div className="list-header">
        <h2>Leave Management</h2>
        <button onClick={() => setShowForm(true)} className="add-button">
          Request Leave
        </button>
      </div>

      <div className="filter-bar">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={filter === 'pending' ? 'active' : ''}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={filter === 'approved' ? 'active' : ''}
          onClick={() => setFilter('approved')}
        >
          Approved
        </button>
        <button
          className={filter === 'rejected' ? 'active' : ''}
          onClick={() => setFilter('rejected')}
        >
          Rejected
        </button>
      </div>

      <div className="leave-table">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Days</th>
              <th>Reason</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map(leave => (
              <tr key={leave.id}>
                <td>{leave.employeeName}</td>
                <td>{leave.leaveType}</td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{leave.days}</td>
                <td>{leave.reason}</td>
                <td>{leave.appliedDate}</td>
                <td>
                  <span className={`status-badge status-${leave.status}`}>
                    {leave.status}
                  </span>
                </td>
                <td>
                  {leave.status === 'pending' && (
                    <div className="action-buttons">
                      <button
                        onClick={() => handleStatusChange(leave.id, 'approved')}
                        className="approve-button"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(leave.id, 'rejected')}
                        className="reject-button"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LeaveForm({ onClose }) {
  const [formData, setFormData] = useState({
    employeeName: '',
    leaveType: 'Vacation',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const leave = {
      ...formData,
      days: calculateDays(),
      employeeId: 1
    };
    onClose(leave);
  };

  return (
    <div className="leave-form">
      <h2>Request Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="employeeName">Employee Name</label>
          <input
            type="text"
            id="employeeName"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="leaveType">Leave Type</label>
          <select
            id="leaveType"
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
          >
            <option value="Vacation">Vacation</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Personal">Personal</option>
            <option value="Maternity">Maternity</option>
            <option value="Paternity">Paternity</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        {formData.startDate && formData.endDate && (
          <p className="days-info">Total Days: {calculateDays()}</p>
        )}
        <div className="form-group">
          <label htmlFor="reason">Reason</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="submit" className="save-button">Submit Request</button>
          <button type="button" onClick={() => onClose(null)} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default LeaveList;
