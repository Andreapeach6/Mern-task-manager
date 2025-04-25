// src/pages/Home.tsx
import React, { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  const addTask = (newTask: any) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <h1>Your Tasks</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Home;
