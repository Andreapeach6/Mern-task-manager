// src/pages/TaskManager.tsx
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { parseDate } from 'chrono-node';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TaskManager.css';

interface Task {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  dueDate?: string;
  tags: string[];
  subtasks: Task[];
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newText, setNewText] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPrio, setNewPrio] = useState<Task['priority']>('Medium');
  const [newDueDate, setNewDueDate] = useState<Date | null>(null);
  const [newTags, setNewTags] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editPrio, setEditPrio] = useState<Task['priority']>('Medium');
  const [editDueDate, setEditDueDate] = useState<Date | null>(null);
  const [editTags, setEditTags] = useState('');
  const [filterTag, setFilterTag] = useState('All');
  const timeouts = useRef<number[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize AudioContext and resume on user interaction
  useEffect(() => {
    audioCtxRef.current = new AudioContext();
    const resumeContext = () => {
      if (audioCtxRef.current?.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      window.removeEventListener('click', resumeContext);
    };
    window.addEventListener('click', resumeContext);
  }, []);

  // Request notification permission
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  // Load tasks from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  // Save tasks and reschedule notifications
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // clear existing timeouts
    timeouts.current.forEach(id => clearTimeout(id));
    timeouts.current = [];
    // schedule new notifications
    tasks.forEach(task => {
      if (task.dueDate) {
        const date = new Date(task.dueDate);
        scheduleNotification(task, date);
      }
    });
  }, [tasks]);

  // Schedule browser notification + audible alarm
  const scheduleNotification = (task: Task, date: Date) => {
    const delay = date.getTime() - Date.now();
    if (delay <= 0) return;
    const id = window.setTimeout(() => {
      if (Notification.permission === 'granted') {
        new Notification(`⏰ Reminder: ${task.text}`, {
          body: task.description || 'Task due now',
        });
      }
      // audible beep via Web Audio API
      const ctx = audioCtxRef.current!;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 880;
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(1, ctx.currentTime);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1);
    }, delay);
    timeouts.current.push(id);
  };

  // Add new task
  const handleAdd = () => {
    if (!newText.trim()) return toast.error('Task text required');
    const t: Task = {
      id: Date.now(),
      text: newText,
      description: newDesc,
      completed: false,
      priority: newPrio,
      dueDate: newDueDate ? newDueDate.toISOString() : undefined,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      subtasks: []
    };
    setTasks(prev => [...prev, t]);
    setNewText(''); setNewDesc(''); setNewPrio('Medium'); setNewDueDate(null); setNewTags('');
    toast.success('Task added');
  };

  // Toggle completion
  const toggle = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // Delete task
  const remove = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    toast.info('Task deleted');
  };

  // Start editing
  const startEdit = (t: Task) => {
    setEditingId(t.id);
    setEditText(t.text);
    setEditDesc(t.description);
    setEditPrio(t.priority);
    setEditDueDate(t.dueDate ? new Date(t.dueDate) : null);
    setEditTags(t.tags.join(', '));
  };

  // Save edit
  const saveEdit = () => {
    if (!editText.trim()) return toast.error('Text required');
    setTasks(prev => prev.map(t =>
      t.id === editingId
        ? {
            ...t,
            text: editText,
            description: editDesc,
            priority: editPrio,
            dueDate: editDueDate ? editDueDate.toISOString() : undefined,
            tags: editTags.split(',').map(x => x.trim()).filter(Boolean)
          }
        : t
    ));
    setEditingId(null);
    toast.success('Task updated');
  };

  // Filter and sort
  const visible = filterTag === 'All'
    ? tasks
    : tasks.filter(t => t.tags.includes(filterTag));

  const ord = { High: 1, Medium: 2, Low: 3 };
  visible.sort((a, b) => {
    if (a.dueDate && b.dueDate) return Date.parse(a.dueDate) - Date.parse(b.dueDate);
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;
    return ord[a.priority] - ord[b.priority];
  });

  return (
    <div className="task-manager-container">
      <h1>Task Manager</h1>

      <div className="task-input">
        <input placeholder="Task" value={newText} onChange={e => setNewText(e.target.value)} />
        <textarea placeholder="Description" value={newDesc} onChange={e => setNewDesc(e.target.value)} />
        <select value={newPrio} onChange={e => setNewPrio(e.target.value as any)}>
          <option>High</option><option>Medium</option><option>Low</option>
        </select>
        <DatePicker
          selected={newDueDate}
          onChange={date => setNewDueDate(date)}
          showTimeSelect
          timeFormat="hh:mm aa"
          timeIntervals={1}
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="Select due date & time"
        />
        <input placeholder="Tags, comma separated" value={newTags} onChange={e => setNewTags(e.target.value)} />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="task-filters">
        <label>Filter Tag:</label>
        <select value={filterTag} onChange={e => setFilterTag(e.target.value)}>
          <option>All</option>
          {Array.from(new Set(tasks.flatMap(t => t.tags))).map(tag => (
            <option key={tag}>{tag}</option>
          ))}
        </select>
      </div>

      <ul className="task-list">
        {visible.map(task => (
          <li key={task.id} className={`task-item ${task.priority.toLowerCase()}`}>
            {editingId === task.id ? (
              <div className="edit-task">
                <input value={editText} onChange={e => setEditText(e.target.value)} />
                <textarea value={editDesc} onChange={e => setEditDesc(e.target.value)} />
                <select value={editPrio} onChange={e => setEditPrio(e.target.value as any)}>
                  <option>High</option><option>Medium</option><option>Low</option>
                </select>
                <DatePicker
                  selected={editDueDate}
                  onChange={date => setEditDueDate(date)}
                  showTimeSelect
                  timeFormat="hh:mm aa"
                  timeIntervals={1}
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
                <input value={editTags} onChange={e => setEditTags(e.target.value)} />
                <button onClick={saveEdit}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <input type="checkbox" checked={task.completed} onChange={() => toggle(task.id)} />
                <span className="task-text">{task.text}</span>
                {task.dueDate && <small>Due: {new Date(task.dueDate).toLocaleString()}</small>}
                <p className="task-description">{task.description}</p>
                <p className="task-tags">Tags: {task.tags.join(', ') || '—'}</p>
                <button onClick={() => startEdit(task)}>Edit</button>
                <button onClick={() => remove(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
