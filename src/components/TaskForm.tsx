// src/components/TaskForm.tsx
import React, { useState } from 'react';

interface TaskFormProps {
  onAddTask: (task: any) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const categories = ['Work', 'Personal', 'Urgent'];
  const priorities = ['High', 'Medium', 'Low'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName || !category || !priority) return;
    onAddTask({ name: taskName, description: taskDescription, category, priority });
    setTaskName('');
    setTaskDescription('');
    setCategory('');
    setPriority('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
        <option value="">Select Priority</option>
        {priorities.map((pri) => (
          <option key={pri} value={pri}>
            {pri}
          </option>
        ))}
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
