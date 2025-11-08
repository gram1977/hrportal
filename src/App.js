import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Login from './components/auth/Login';
import Dashboard, { DashboardHome } from './components/dashboard/Dashboard';
import EmployeeList from './components/employees/EmployeeList';
import LeaveList from './components/leave/LeaveList';
import OnboardingList from './components/onboarding/OnboardingList';
import AttendanceList from './components/attendance/AttendanceList';
import './App.css';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return isAuthenticated() ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="leave" element={<LeaveList />} />
          <Route path="onboarding" element={<OnboardingList />} />
          <Route path="attendance" element={<AttendanceList />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
