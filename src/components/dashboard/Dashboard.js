import { Link, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Dashboard.css';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h1>HR Portal</h1>
          <div className="user-info">
            <p className="user-name">{user?.name}</p>
            <p className="user-role">{user?.role}</p>
          </div>
        </div>
        <ul className="nav-menu">
          <li>
            <Link to="/dashboard" className="nav-link">
              <span className="icon">📊</span>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/dashboard/employees" className="nav-link">
              <span className="icon">👥</span>
              Employees
            </Link>
          </li>
          <li>
            <Link to="/dashboard/leave" className="nav-link">
              <span className="icon">🏖️</span>
              Leave Management
            </Link>
          </li>
          <li>
            <Link to="/dashboard/onboarding" className="nav-link">
              <span className="icon">🎯</span>
              Onboarding
            </Link>
          </li>
          <li>
            <Link to="/dashboard/attendance" className="nav-link">
              <span className="icon">📅</span>
              Attendance
            </Link>
          </li>
        </ul>
        <button onClick={handleLogout} className="logout-button">
          <span className="icon">🚪</span>
          Logout
        </button>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

function DashboardHome() {
  const { user } = useAuth();

  return (
    <div className="dashboard-home">
      <h2>Welcome, {user?.name}!</h2>
      <p>Select a module from the sidebar to get started.</p>
      
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-icon">👥</div>
          <h3>Employee Management</h3>
          <p>Manage employee information, add new employees, and update records.</p>
          <Link to="/dashboard/employees" className="card-link">Go to Employees →</Link>
        </div>
        
        <div className="dashboard-card">
          <div className="card-icon">🏖️</div>
          <h3>Leave Management</h3>
          <p>Request leaves, approve or reject leave requests, and track leave balance.</p>
          <Link to="/dashboard/leave" className="card-link">Go to Leave →</Link>
        </div>
        
        <div className="dashboard-card">
          <div className="card-icon">🎯</div>
          <h3>Employee Onboarding</h3>
          <p>Track onboarding progress and manage new employee tasks.</p>
          <Link to="/dashboard/onboarding" className="card-link">Go to Onboarding →</Link>
        </div>
        
        <div className="dashboard-card">
          <div className="card-icon">📅</div>
          <h3>Attendance</h3>
          <p>View attendance records and handle regularization requests.</p>
          <Link to="/dashboard/attendance" className="card-link">Go to Attendance →</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
export { DashboardHome };
