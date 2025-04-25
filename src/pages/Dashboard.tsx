// src/pages/Dashboard.tsx
import React from 'react';
import TaskList from '../components/TaskList';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Your Tasks</h1>
      <TaskList tasks={[]} /> {/* Replace with real task data */}
    </div>
  );
};

export default Dashboard;
