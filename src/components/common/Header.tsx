// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle'; // Assuming ThemeToggle component is already implemented

const Header: React.FC = () => {
  return (
    <header className="header-container">
      <div className="logo-container">
        <h1 className="logo">TaskMaster</h1> {/* Replace with your logo or app name */}
      </div>
      <nav className="nav-links">
        <ul>
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/settings" className="nav-link">Settings</Link>
          </li>
        </ul>
      </nav>
      <div className="theme-toggle-container">
        <ThemeToggle /> {/* Include the ThemeToggle component here */}
      </div>
    </header>
  );
};

export default Header;
