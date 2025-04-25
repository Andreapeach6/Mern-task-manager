// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaTasks, FaUserCog, FaSignOutAlt } from 'react-icons/fa'; // Optional: you can use icons for a more polished look

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h2 className="sidebar-logo">TaskMaster</h2> {/* Logo */}
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/" className="sidebar-link">
              <FaHome className="sidebar-icon" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/tasks" className="sidebar-link">
              <FaTasks className="sidebar-icon" />
              Tasks
            </Link>
          </li>
          <li>
            <Link to="/settings" className="sidebar-link">
              <FaUserCog className="sidebar-icon" />
              Settings
            </Link>
          </li>
          <li>
            <Link to="/logout" className="sidebar-link">
              <FaSignOutAlt className="sidebar-icon" />
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
