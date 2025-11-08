import { useState, useEffect } from 'react';
import attendanceRecords from '../../data/attendanceRecords';
import './AttendanceList.css';

function AttendanceList() {
  const [records, setRecords] = useState([]);
  const [showRegularizationForm, setShowRegularizationForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('attendanceRecords');
    if (stored) {
      setRecords(JSON.parse(stored));
    } else {
      setRecords(attendanceRecords);
      localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
    }
  }, []);

  const handleRegularizationRequest = (record) => {
    setSelectedRecord(record);
    setShowRegularizationForm(true);
  };

  const handleRegularizationSubmit = (reason) => {
    const updated = records.map(record => {
      if (record.id === selectedRecord.id) {
        return {
          ...record,
          regularizationRequested: true,
          regularizationStatus: 'pending',
          regularizationReason: reason
        };
      }
      return record;
    });
    setRecords(updated);
    localStorage.setItem('attendanceRecords', JSON.stringify(updated));
    setShowRegularizationForm(false);
    setSelectedRecord(null);
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = records.map(record => {
      if (record.id === id) {
        return {
          ...record,
          regularizationStatus: newStatus
        };
      }
      return record;
    });
    setRecords(updated);
    localStorage.setItem('attendanceRecords', JSON.stringify(updated));
  };

  if (showRegularizationForm) {
    return (
      <RegularizationForm
        record={selectedRecord}
        onSubmit={handleRegularizationSubmit}
        onCancel={() => {
          setShowRegularizationForm(false);
          setSelectedRecord(null);
        }}
      />
    );
  }

  return (
    <div className="attendance-list">
      <div className="list-header">
        <h2>Attendance & Regularization</h2>
      </div>

      <div className="attendance-table">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
              <th>Regularization</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <tr key={record.id}>
                <td>{record.employeeName}</td>
                <td>{record.date}</td>
                <td>{record.checkIn || '-'}</td>
                <td>{record.checkOut || '-'}</td>
                <td>
                  <span className={`status-badge status-${record.status}`}>
                    {record.status}
                  </span>
                </td>
                <td>
                  {record.regularizationRequested ? (
                    <div className="regularization-info">
                      <span className={`reg-status reg-${record.regularizationStatus}`}>
                        {record.regularizationStatus}
                      </span>
                      <p className="reg-reason">{record.regularizationReason}</p>
                    </div>
                  ) : (
                    <span className="no-reg">-</span>
                  )}
                </td>
                <td>
                  {!record.regularizationRequested && record.status !== 'present' && (
                    <button
                      onClick={() => handleRegularizationRequest(record)}
                      className="request-button"
                    >
                      Request Regularization
                    </button>
                  )}
                  {record.regularizationRequested && record.regularizationStatus === 'pending' && (
                    <div className="action-buttons">
                      <button
                        onClick={() => handleStatusChange(record.id, 'approved')}
                        className="approve-button"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(record.id, 'rejected')}
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

function RegularizationForm({ record, onSubmit, onCancel }) {
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reason);
  };

  return (
    <div className="regularization-form">
      <h2>Attendance Regularization Request</h2>
      <div className="record-info">
        <p><strong>Date:</strong> {record.date}</p>
        <p><strong>Status:</strong> {record.status}</p>
        <p><strong>Check In:</strong> {record.checkIn || 'Not marked'}</p>
        <p><strong>Check Out:</strong> {record.checkOut || 'Not marked'}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reason">Reason for Regularization</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows="6"
            placeholder="Please explain why you need to regularize this attendance record..."
            required
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="submit" className="save-button">Submit Request</button>
          <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AttendanceList;
