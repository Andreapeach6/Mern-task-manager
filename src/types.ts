// src/types.ts

// Defining a Task interface that can be used throughout the app
export interface Task {
    id: string;
    title: string;  // Title of the task
    description: string;  // Task description
    dueDate: string;  // Due date of the task (can be optional or required based on your requirements)
    priority: string;  // Priority level (e.g., "High", "Medium", "Low")
  }
  
  // Defining the props that TaskCard component will receive
  export interface TaskCardProps {
    task: Task;  // The task object passed to the TaskCard component
    onUpdateTask: (updatedTask: Task) => void;  // Function to update a task
    onDeleteTask: (taskId: string) => void;  // Function to delete a task by its ID
  }
  
  // Defining the props for the TaskList component
  export interface TaskListProps {
    tasks: Task[];  // Array of task objects to be passed to the TaskList component
  }
  