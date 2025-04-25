// src/components/TaskList.tsx
import React from 'react';

const TaskList: React.FC<{ tasks: any[] }> = ({ tasks }) => {
  return (
    <div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <span>Category: {task.category}</span>
            <span>Priority: {task.priority}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
