import { useState, useEffect } from 'react';
import onboardingTasks from '../../data/onboardingTasks';
import './OnboardingList.css';

function OnboardingList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('onboardingTasks');
    if (stored) {
      setTasks(JSON.parse(stored));
    } else {
      setTasks(onboardingTasks);
      localStorage.setItem('onboardingTasks', JSON.stringify(onboardingTasks));
    }
  }, []);

  const handleStatusChange = (id) => {
    const updated = tasks.map(task => {
      if (task.id === id) {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        return {
          ...task,
          status: newStatus,
          completedDate: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : null
        };
      }
      return task;
    });
    setTasks(updated);
    localStorage.setItem('onboardingTasks', JSON.stringify(updated));
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.employeeName]) {
      acc[task.employeeName] = [];
    }
    acc[task.employeeName].push(task);
    return acc;
  }, {});

  return (
    <div className="onboarding-list">
      <div className="list-header">
        <h2>Employee Onboarding</h2>
      </div>

      {Object.entries(groupedTasks).map(([employeeName, employeeTasks]) => {
        const completedCount = employeeTasks.filter(t => t.status === 'completed').length;
        const totalCount = employeeTasks.length;
        const progress = (completedCount / totalCount) * 100;

        return (
          <div key={employeeName} className="employee-section">
            <div className="employee-header">
              <h3>{employeeName}</h3>
              <div className="progress-info">
                <span>{completedCount} / {totalCount} tasks completed</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="tasks-list">
              {employeeTasks.map(task => (
                <div key={task.id} className={`task-item ${task.status}`}>
                  <div className="task-checkbox">
                    <input
                      type="checkbox"
                      checked={task.status === 'completed'}
                      onChange={() => handleStatusChange(task.id)}
                    />
                  </div>
                  <div className="task-details">
                    <h4>{task.task}</h4>
                    <div className="task-meta">
                      <span>Due: {task.dueDate}</span>
                      {task.completedDate && (
                        <span className="completed-date">
                          Completed: {task.completedDate}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="task-status">
                    <span className={`status-badge status-${task.status}`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OnboardingList;
