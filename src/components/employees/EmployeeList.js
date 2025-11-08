import { useState, useEffect } from 'react';
import employees from '../../data/employees';
import './EmployeeList.css';

function EmployeeList() {
  const [employeeList, setEmployeeList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    // Load employees from localStorage or use default data
    const stored = localStorage.getItem('employees');
    if (stored) {
      setEmployeeList(JSON.parse(stored));
    } else {
      setEmployeeList(employees);
      localStorage.setItem('employees', JSON.stringify(employees));
    }
  }, []);

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      const updated = employeeList.filter(emp => emp.id !== id);
      setEmployeeList(updated);
      localStorage.setItem('employees', JSON.stringify(updated));
    }
  };

  const handleFormClose = (updatedEmployee) => {
    if (updatedEmployee) {
      let updated;
      if (editingEmployee) {
        // Update existing employee
        updated = employeeList.map(emp =>
          emp.id === updatedEmployee.id ? updatedEmployee : emp
        );
      } else {
        // Add new employee
        const newEmployee = {
          ...updatedEmployee,
          id: Math.max(...employeeList.map(e => e.id), 0) + 1
        };
        updated = [...employeeList, newEmployee];
      }
      setEmployeeList(updated);
      localStorage.setItem('employees', JSON.stringify(updated));
    }
    setShowForm(false);
    setEditingEmployee(null);
  };

  if (showForm) {
    return <EmployeeForm employee={editingEmployee} onClose={handleFormClose} />;
  }

  return (
    <div className="employee-list">
      <div className="list-header">
        <h2>Employee Management</h2>
        <button onClick={() => setShowForm(true)} className="add-button">
          Add Employee
        </button>
      </div>
      <div className="employee-grid">
        {employeeList.map(employee => (
          <div key={employee.id} className="employee-card">
            <h3>{employee.name}</h3>
            <p><strong>Position:</strong> {employee.position}</p>
            <p><strong>Department:</strong> {employee.department}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Phone:</strong> {employee.phone}</p>
            <p><strong>Join Date:</strong> {employee.joinDate}</p>
            <p><strong>Status:</strong> <span className={`status-${employee.status}`}>{employee.status}</span></p>
            <div className="card-actions">
              <button onClick={() => handleEdit(employee)} className="edit-button">Edit</button>
              <button onClick={() => handleDelete(employee.id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmployeeForm({ employee, onClose }) {
  const [formData, setFormData] = useState(employee || {
    name: '',
    email: '',
    department: '',
    position: '',
    joinDate: '',
    phone: '',
    status: 'active'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose(formData);
  };

  return (
    <div className="employee-form">
      <h2>{employee ? 'Edit Employee' : 'Add New Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="joinDate">Join Date</label>
          <input
            type="date"
            id="joinDate"
            name="joinDate"
            value={formData.joinDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" className="save-button">Save</button>
          <button type="button" onClick={() => onClose(null)} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeList;
