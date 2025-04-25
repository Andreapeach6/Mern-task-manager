// src/components/TaskList.tsx
import React from 'react';
import { TaskListProps } from '../../types'; // Importing Task type

// Defining the props type for TaskList
interface TaskListProps {
  tasks: Task[]; // Array of tasks passed as props
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="task-list">
      <ul className="task-list__items">
        {tasks.length === 0 ? (
          <li className="task-list__empty-message">No tasks available</li> // Display message if no tasks
        ) : (
          tasks.map((task) => (
            <li key={task.id} className="task-list__item">
              <div className="task-list__item-header">
                <h3 className="task-list__item-title">{task.title}</h3>
                <div className="task-list__item-info">
                  <span className="task-list__item-category">{task.category}</span>
                  <span className="task-list__item-priority">{task.priority}</span>
                </div>
              </div>
              <p className="task-list__item-description">{task.description}</p>
              <p className="task-list__item-due-date">Due Date: {task.dueDate}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList;
