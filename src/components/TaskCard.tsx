import React, { useState } from 'react';
import { Card, CardContent, Button, TextField, Typography } from '@mui/material';
import { Task } from '../types';

// Define an array of caramel colors for unique task card backgrounds
const colorPalette = [
  '#f3e1b5', // Soft caramel
  '#f8d7a1', // Light golden caramel
  '#e09f4b', // Rich caramel orange
  '#d87d2d', // Darker caramel orange
  '#c3a68a', // Muted caramel beige
];

interface TaskCardProps {
  task: Task;
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState<Task>(task);

  // Randomly select a color from the palette for each card
  const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onUpdateTask(updatedTask);
    setIsEditing(false);
  };

  return (
    <Card className="task-card" sx={{
      backgroundColor: randomColor,
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      ':hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      },
    }}>
      {isEditing ? (
        <CardContent>
          <TextField
            label="Title"
            name="title"
            value={updatedTask.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            label="Description"
            name="description"
            value={updatedTask.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            label="Due Date"
            name="dueDate"
            value={updatedTask.dueDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            label="Priority"
            name="priority"
            value={updatedTask.priority}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ marginBottom: '15px' }}
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSave}
            sx={{
              backgroundColor: '#e09f4b',
              ':hover': {
                backgroundColor: '#d87d2d',
              },
            }}
          >
            Save
          </Button>
        </CardContent>
      ) : (
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: '600', color: '#3e2a22' }}>
            {task.title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#5c4a3a', marginBottom: '10px' }}>
            {task.description}
          </Typography>
          <Typography variant="body1" sx={{ color: '#3e2a22' }}>
            Due Date: {task.dueDate}
          </Typography>
          <Typography variant="body2" sx={{ color: '#3e2a22', marginBottom: '10px' }}>
            Priority: {task.priority}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setIsEditing(true)}
            sx={{
              marginRight: '10px',
              borderColor: '#e09f4b',
              color: '#e09f4b',
              ':hover': {
                borderColor: '#d87d2d',
                color: '#d87d2d',
              },
            }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => onDeleteTask(task.id)}
            sx={{
              borderColor: '#d87d2d',
              color: '#d87d2d',
              ':hover': {
                borderColor: '#c63d1d',
                color: '#c63d1d',
              },
            }}
          >
            Delete
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default TaskCard;
