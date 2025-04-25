// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/tasks/TaskList';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  // Load tasks from localStorage on initial render
  useEffect(() => {
    setLoading(true);
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    setLoading(false);
  }, []);

  const addTask = (newTask: Task) => {
    setLoading(true);
    try {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setMessage('✅ Task added successfully!');
    } catch (error) {
      setMessage('❌ Failed to add task. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Your Tasks</h1>

      {/* Show loading message */}
      {loading && <p>Loading tasks...</p>}

      {/* Show message after adding a task */}
      {message && <p>{message}</p>}

      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Home;
