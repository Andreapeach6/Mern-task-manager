import React, { useState } from 'react';
import { Card, CardContent, Button, TextField, Typography } from '@mui/material';
import { Task } from '../../types/Task';
import { TaskCardProps } from '../../types/Task';

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState<Task>(task);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save the updated task
  const handleSave = () => {
    onUpdateTask(updatedTask);
    setIsEditing(false);
  };

  return (
    <Card
      className="task-card"
      sx={{
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        ':hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      {isEditing ? (
        <CardContent>
          <TextField
            label="Title"
            name="title"
            value={updatedTask.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            label="Description"
            name="description"
            value={updatedTask.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            label="Due Date"
            name="dueDate"
            value={updatedTask.dueDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ marginBottom: '10px' }}
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
              backgroundColor: '#0069d9',
              ':hover': { backgroundColor: '#0056b3' },
              width: '100%',
            }}
          >
            Save
          </Button>
        </CardContent>
      ) : (
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: '600', marginBottom: '10px' }}>
            {task.title}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: '10px' }}>
            {task.description}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: '500', marginBottom: '10px' }}>
            Due Date: {task.dueDate}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: '500', marginBottom: '15px' }}>
            Priority: {task.priority}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setIsEditing(true)}
            sx={{
              borderColor: '#0069d9',
              color: '#0069d9',
              ':hover': {
                borderColor: '#0056b3',
                color: '#0056b3',
              },
              marginRight: '10px',
            }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => onDeleteTask(task.id)}
            sx={{
              borderColor: '#f44336',
              color: '#f44336',
              ':hover': {
                borderColor: '#d32f2f',
                color: '#d32f2f',
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
