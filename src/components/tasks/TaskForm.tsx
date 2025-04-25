// src/components/TaskForm.tsx
import React, { useState } from 'react';
import '../styles/TaskForm.css';  // Import the styles from the styles folder

interface TaskFormProps {
  onAddTask: (task: any) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [error, setError] = useState<string | null>(null);

  const categories = ['Work', 'Personal', 'Urgent'];
  const priorities = ['High', 'Medium', 'Low'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskName || !category || !priority) {
      setError('All fields are required!');
      return;
    }

    setError(null);
    onAddTask({ name: taskName, description: taskDescription, category, priority });
    setTaskName('');
    setTaskDescription('');
    setCategory('');
    setPriority('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-field">
        <label htmlFor="task-name">Task Name</label>
        <input
          id="task-name"
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="task-description">Task Description</label>
        <textarea
          id="task-description"
          placeholder="Enter task description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="">Select Priority</option>
          {priorities.map((pri) => (
            <option key={pri} value={pri}>
              {pri}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      <button type="submit" className="submit-btn">Add Task</button>
    </form>
  );
};

export default TaskForm;
