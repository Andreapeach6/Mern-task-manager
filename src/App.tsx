// src/App.tsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TaskManager from './pages/TaskManager';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ToastContainer } from 'react-toastify';
import ThemeToggle from "./components/common/ThemeToggle";
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
        <ThemeToggle />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<TaskManager />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      <ToastContainer />
    </div>
  );
};

export default App;
